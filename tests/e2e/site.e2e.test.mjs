// End-to-end smoke tests driving a real headless Chrome through the DevTools Protocol.
// No new dependency: uses node:test + Node's built-in WebSocket + the locally installed Chrome/Edge.
//
// Prereqs:  npx vite build && npx vite preview --port 4175 --strictPort   (or set E2E_URL to a running dev server)
// Run:      node --test "tests/e2e/*.e2e.test.mjs"
// Env:      E2E_URL (default http://localhost:4175), CHROME_PATH (override browser binary)
//
// SAFETY: these tests never submit a *valid* contact form, so no real email is sent via EmailJS.
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const URL_ = process.env.E2E_URL || 'http://localhost:4175';
const PORT = 9333;
const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let chrome, ws, profileDir, msgId = 0;
const pending = new Map();
const consoleErrors = [];
const failedRequests = [];
const requestUrls = new Map();

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

/** Evaluate JS in the page and return the (JSON-serialisable) result. */
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error('page eval failed: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
  return r.result.value;
};

const waitFor = async (expr, timeout = 5000, label = expr) => {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    if (await ev(expr).catch(() => false)) return true;
    await sleep(100);
  }
  throw new Error('timeout waiting for: ' + label);
};

const load = async (url = URL_, { clearStorage = false, storage = {} } = {}) => {
  await send('Page.navigate', { url: 'about:blank' });
  await send('Page.navigate', { url });
  await waitFor('document.readyState === "complete" && !!document.querySelector("h1")', 10000, 'page load');
  if (clearStorage || Object.keys(storage).length) {
    await ev(`localStorage.clear(); ${Object.entries(storage).map(([k, v]) => `localStorage.setItem(${JSON.stringify(k)}, ${JSON.stringify(v)})`).join(';')}`);
    await send('Page.reload');
    await waitFor('document.readyState === "complete" && !!document.querySelector("h1")', 10000, 'page reload');
  }
  await sleep(600);
};

/** Click the first element of `sel` whose trimmed text matches `text` (exact, or RegExp source). */
const clickByText = (sel, text) =>
  ev(`(() => {
    const re = new RegExp(${JSON.stringify(text)});
    const el = [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => re.test(e.textContent.trim()));
    if (!el) return false; el.click(); return true;
  })()`);

/** Set a React-controlled input/textarea value so React's onChange fires. */
const typeInto = (sel, value) =>
  ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)});
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)});
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return el.value;
  })()`);

/** Wait until window.scrollY has stopped changing (smooth scroll finished). */
const settle = async (maxMs = 8000) => {
  let last = -1, stable = 0;
  const end = Date.now() + maxMs;
  while (Date.now() < end && stable < 4) {
    const y = await ev('Math.round(window.scrollY)');
    stable = y === last ? stable + 1 : 0;
    last = y;
    await sleep(150);
  }
};

const scrollToId = async (id) => {
  await ev(`document.getElementById(${JSON.stringify(id)}).scrollIntoView({behavior:'instant'})`);
  await sleep(400);
};

before(async () => {
  const bin = CANDIDATES.find((p) => fs.existsSync(p));
  assert.ok(bin, 'No Chrome/Edge found. Set CHROME_PATH.');
  // fail fast, with a helpful message, if the site is not being served
  const up = await fetch(URL_).then((r) => r.ok).catch(() => false);
  assert.ok(up, `Site not reachable at ${URL_}. Start it first (see header of this file).`);

  profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-chrome-'));
  chrome = spawn(bin, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profileDir}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--window-size=1280,900', 'about:blank',
  ], { stdio: 'ignore' });

  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    target = await fetch(`http://127.0.0.1:${PORT}/json`).then((r) => r.json()).then((l) => l.find((t) => t.type === 'page')).catch(() => null);
  }
  assert.ok(target, 'Chrome did not start');
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push('EXCEPTION ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push('console.error ' + msg.params.args.map((a) => a.value ?? a.description).join(' '));
    } else if (msg.method === 'Network.requestWillBeSent') {
      requestUrls.set(msg.params.requestId, msg.params.request.url);
    } else if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
      failedRequests.push(`${msg.params.response.status} ${msg.params.response.url}`);
    } else if (msg.method === 'Network.loadingFailed' && !msg.params.canceled) {
      failedRequests.push(`FAILED(${msg.params.errorText}) ${requestUrls.get(msg.params.requestId)}`);
    }
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  // SAFETY NET: hard-block EmailJS at the network layer so no test can ever send a real email.
  await send('Network.setBlockedURLs', { urls: ['*emailjs.com*'] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
});

after(async () => {
  try { ws?.close(); } catch {}
  chrome?.kill();
  await sleep(300);
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch {}
});

describe('page load', () => {
  test('renders title, h1 and all six content sections', async () => {
    await load(URL_, { clearStorage: true });
    assert.match(await ev('document.title'), /Znouda/);
    assert.ok(await ev('!!document.querySelector("h1")'));
    for (const id of ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact']) {
      assert.ok(await ev(`!!document.getElementById("${id}")`), `missing #${id}`);
    }
  });

  test('no uncaught exceptions / console errors on load', async () => {
    await load(URL_, { clearStorage: true });
    for (const id of ['about', 'experience', 'skills', 'projects', 'education', 'contact']) await scrollToId(id);
    assert.deepEqual(consoleErrors, []);
  });

  test('no first-party asset returned 404 / failed (external hosts ignored)', async () => {
    const own = failedRequests.filter((u) => u.includes(new URL(URL_).host));
    assert.deepEqual(own, [], 'first-party failed requests (e.g. missing favicon)');
  });

  test('every <img> on the page loaded successfully', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('projects');
    await sleep(800);
    const broken = await ev(`[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)`);
    assert.deepEqual(broken, []);
  });
});

describe('navbar', () => {
  test('clicking each desktop nav item scrolls its section into view', async () => {
    await load(URL_, { clearStorage: true });
    for (const label of ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact']) {
      await ev('window.scrollTo(0,0)');
      await sleep(300);
      assert.ok(await clickByText('nav button', `^${label}$`), `nav "${label}" not found`);
      await sleep(500); // 300ms handler delay before the smooth scroll starts
      await settle();
      const top = await ev(`document.getElementById(${JSON.stringify(label.toLowerCase())}).getBoundingClientRect().top`);
      assert.ok(Math.abs(top) < 120, `#${label.toLowerCase()} top=${top} (expected near 0 after nav click)`);
    }
  });

  test('active nav item follows scroll position', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('skills');
    await ev('window.scrollBy(0, 5)');
    await sleep(500);
    const active = await ev(`[...document.querySelectorAll('nav button')].find(b => b.querySelector('span.bg-primary-500'))?.textContent.trim()`);
    assert.equal(active, 'Skills');
  });

  test('"back to top" button appears after scrolling down and works', async () => {
    await load(URL_, { clearStorage: true });
    assert.equal(await ev('!!document.querySelector(\'[aria-label="Back to top"]\')'), false);
    await ev('window.scrollTo(0, 1500)');
    await waitFor('!!document.querySelector(\'[aria-label="Back to top"]\')', 3000);
    await ev('document.querySelector(\'[aria-label="Back to top"]\').click()');
    await waitFor('window.scrollY < 50', 4000, 'scroll to top');
  });
});

describe('theme & language toggles', () => {
  test('theme toggle flips the <html> class and persists to localStorage', async () => {
    await load(URL_, { clearStorage: true });
    const before = await ev('document.documentElement.classList.contains("dark")');
    await ev('document.querySelector(\'[aria-label="Toggle theme"]\').click()');
    await sleep(300);
    assert.equal(await ev('document.documentElement.classList.contains("dark")'), !before);
    assert.equal(await ev('localStorage.getItem("theme")'), before ? 'light' : 'dark');
    await ev('document.querySelector(\'[aria-label="Toggle theme"]\').click()');
    await sleep(300);
    assert.equal(await ev('document.documentElement.classList.contains("dark")'), before);
  });

  test('language toggle switches EN -> FR (html lang, nav labels, persistence) and back', async () => {
    await load(URL_, { clearStorage: true });
    assert.equal(await ev('document.documentElement.lang'), 'en');
    await ev('document.querySelector(\'[aria-label="Toggle language"]\').click()');
    await sleep(400);
    assert.equal(await ev('document.documentElement.lang'), 'fr');
    assert.equal(await ev('localStorage.getItem("language")'), 'fr');
    const nav = await ev(`[...document.querySelectorAll('nav .md\\\\:flex button')].map(b => b.textContent.trim())`);
    assert.ok(!nav.includes('About'), 'nav still in English: ' + nav.join(','));
    await load(URL_); // reload keeps language
    assert.equal(await ev('document.documentElement.lang'), 'fr');
    await ev('document.querySelector(\'[aria-label="Toggle language"]\').click()');
    await sleep(300);
    assert.equal(await ev('document.documentElement.lang'), 'en');
  });

  // KNOWN i18n BUGS - hard-coded English strings are not translated in FR mode.
  test('FR mode: navbar "Home" label is translated', async () => {
    await load(URL_, { storage: { language: 'fr' } });
    const nav = await ev(`[...document.querySelectorAll('nav .md\\\\:flex button')].map(b => b.textContent.trim())`);
    assert.notEqual(nav[0], 'Home', 'navbar "Home" is hard-coded English in FR mode');
  });

  test('FR mode: section headings (Skills / Projects / Contact) are translated', async () => {
    await load(URL_, { storage: { language: 'fr' } });
    const headings = await ev(`['skills','projects','contact'].map(id => document.querySelector('#'+id+' h2').textContent.trim())`);
    assert.deepEqual(headings.filter((h) => /^(My Skills|My Portfolio|Contact Me)$/.test(h)), [],
      'section h2 titles are hard-coded English in FR mode: ' + headings.join(' | '));
  });
});

describe('skills search', () => {
  test('filters skills by query, shows empty state, and restores on clear', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('skills');
    const total = await ev('document.querySelectorAll("#skills .grid > div").length');
    await typeInto('#skills input[type="text"]', 'flutter');
    await sleep(700);
    const txt = await ev('document.getElementById("skills").innerText.toLowerCase()');
    assert.ok(txt.includes('flutter'));
    assert.ok(!txt.includes('windev'), 'non-matching skills still visible');
    await typeInto('#skills input[type="text"]', 'zzzzzz-no-match');
    await sleep(700);
    assert.match(await ev('document.getElementById("skills").innerText'), /No skills found/i);
    await typeInto('#skills input[type="text"]', '');
    await sleep(700);
    assert.equal(await ev('document.querySelectorAll("#skills .grid > div").length'), total);
  });

  test('search is case-insensitive', async () => {
    await typeInto('#skills input[type="text"]', 'FLUTTER');
    await sleep(600);
    assert.ok((await ev('document.getElementById("skills").innerText.toLowerCase()')).includes('flutter'));
    await typeInto('#skills input[type="text"]', '');
  });
});

describe('projects', () => {
  const cardTitles = () => ev(`[...document.querySelectorAll('#projects h3')].map(h => h.textContent.trim())`);

  test('"All" shows 3 projects with Mind Screen first', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('projects');
    const t = await cardTitles();
    assert.deepEqual(t, ['Mind Screen', 'Gaztrack Pro', 'Balance Management System']);
  });

  test('filters: Desktop -> Balance only; Web -> Gaztrack only; Mobile -> Mind Screen + Gaztrack', async () => {
    await clickByText('#projects button', '^Desktop$'); await sleep(900);
    assert.deepEqual(await cardTitles(), ['Balance Management System']);
    await clickByText('#projects button', '^Web$'); await sleep(900);
    assert.deepEqual(await cardTitles(), ['Gaztrack Pro']);
    await clickByText('#projects button', '^Mobile$'); await sleep(900);
    assert.deepEqual(await cardTitles(), ['Mind Screen', 'Gaztrack Pro']);
    await clickByText('#projects button', '^All Projects$'); await sleep(900);
    assert.equal((await cardTitles()).length, 3);
  });

  test('Mind Screen external links open in a new tab with noopener', async () => {
    const links = await ev(`[...document.querySelectorAll('#projects a[href*="mind-screen.com"]')].map(a => [a.target, a.rel])`);
    assert.ok(links.length >= 1);
    for (const [t, r] of links) { assert.equal(t, '_blank'); assert.match(r, /noopener/); }
  });

  test('Gaztrack Pro card opens the detail view, and "Back" closes it', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('projects');
    await ev(`[...document.querySelectorAll('#projects h3')].find(h => h.textContent.trim() === 'Gaztrack Pro').closest('.group').click()`);
    await waitFor(`/Back to Portfolio/.test(document.body.innerText)`, 4000, 'gaztrack detail');
    assert.ok(await ev(`/Key Features/i.test(document.body.innerText)`));
    assert.ok(await clickByText('button', 'Back to Portfolio'));
    await waitFor(`!/Back to Portfolio/.test(document.body.innerText)`, 4000, 'detail closed');
  });

  test('Mind Screen card opens the detail view, and "Back" closes it', async () => {
    await scrollToId('projects');
    await ev(`[...document.querySelectorAll('#projects h3')].find(h => h.textContent.trim() === 'Mind Screen').closest('.group').click()`);
    await waitFor(`/Back to Portfolio/.test(document.body.innerText)`, 4000, 'mindscreen detail');
    assert.ok(await ev(`/Why Mind Screen/i.test(document.body.innerText)`));
    assert.ok(await clickByText('button', 'Back to Portfolio'));
    await waitFor(`!/Back to Portfolio/.test(document.body.innerText)`, 4000, 'detail closed');
  });

  test('Gaztrack "Request a Demo" scrolls to contact and pre-fills the message', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('projects');
    await ev(`[...document.querySelectorAll('#projects h3')].find(h => h.textContent.trim() === 'Gaztrack Pro').closest('.group').click()`);
    await waitFor(`/Request a Demo/.test(document.body.innerText)`, 4000);
    await clickByText('button', 'Request a Demo');
    await waitFor(`document.querySelector('textarea[name=message]').value.includes('Gaztrack Pro')`, 4000, 'prefill');
  });
});

describe('contact form (validation paths only - never sends a real email)', () => {
  const submit = () => ev('document.querySelector("#contact form button[type=submit]").click()');
  const errorText = () => ev('document.querySelector("#contact form p.text-red-500")?.textContent ?? ""');

  test('required fields block an empty submission (native validation)', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('contact');
    assert.equal(await ev('document.querySelector("#contact form").checkValidity()'), false);
    await submit(); await sleep(300);
    assert.equal(await errorText(), '', 'handler must not run when browser validation fails');
  });

  test('email input rejects malformed addresses', async () => {
    await typeInto('#contact input[name=user_email]', 'not-an-email');
    assert.equal(await ev('document.querySelector("#contact input[name=user_email]").validity.typeMismatch'), true);
    await typeInto('#contact input[name=user_email]', 'ok@example.com');
    assert.equal(await ev('document.querySelector("#contact input[name=user_email]").validity.valid'), true);
  });

  test('name and message inputs enforce maxLength (100 / 2000)', async () => {
    assert.equal(await ev('document.querySelector("#contact input[name=user_name]").maxLength'), 100);
    assert.equal(await ev('document.querySelector("#contact textarea").maxLength'), 2000);
  });

  test('message that is only HTML tags is rejected after sanitisation', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('contact');
    await typeInto('#contact input[name=user_name]', 'Tester');
    await typeInto('#contact input[name=user_email]', 'tester@example.com');
    await typeInto('#contact textarea', '<b></b><i>   </i><br/>');
    await submit(); await sleep(400);
    assert.match(await errorText(), /empty after sanitization/i);
  });

  test('message that is only a URL is rejected after sanitisation (links are stripped)', async () => {
    await load(URL_, { clearStorage: true });
    await scrollToId('contact');
    await typeInto('#contact input[name=user_name]', 'Tester');
    await typeInto('#contact input[name=user_email]', 'tester@example.com');
    await typeInto('#contact textarea', 'https://spam.example.com/buy-now');
    await submit(); await sleep(400);
    assert.match(await errorText(), /empty after sanitization/i);
  });

  test('rate limit: a send within 2 minutes of the last one is refused before any network call', async () => {
    await load(URL_, { storage: { lastSentTime: String(Date.now()) } });
    await scrollToId('contact');
    await typeInto('#contact input[name=user_name]', 'Tester');
    await typeInto('#contact input[name=user_email]', 'tester@example.com');
    await typeInto('#contact textarea', 'Hello, this is an automated test - please ignore.');
    const before = failedRequests.length;
    await submit(); await sleep(400);
    assert.match(await errorText(), /Please wait \d+s/);
    assert.equal(failedRequests.length, before);
  });

  test('error state auto-clears after ~5s', async () => {
    await waitFor('document.querySelector("#contact form p.text-red-500") === null', 7000, 'error cleared');
  });

  test('contact cards expose tel: / mailto: links', async () => {
    await load(URL_, { clearStorage: true });
    const hrefs = await ev(`[...document.querySelectorAll('#contact a')].map(a => a.getAttribute('href'))`);
    assert.ok(hrefs.some((h) => h.startsWith('tel:+216')));
    assert.ok(hrefs.some((h) => h.startsWith('mailto:') && h.includes('@')));
  });
});

describe('Hero', () => {
  test('"Download CV" link points to a file that is actually served (not the SPA html)', async () => {
    await load(URL_, { clearStorage: true });
    const href = await ev(`document.querySelector('a[download]')?.getAttribute('href')`);
    assert.ok(href, 'no download link');
    const res = await fetch(new URL(href, URL_));
    const type = res.headers.get('content-type') || '';
    assert.ok(res.ok && /pdf/i.test(type), `GET ${href} -> ${res.status} ${type} (expected application/pdf)`);
  });

  test('profile image loads', async () => {
    assert.ok(await ev(`(() => { const i = document.querySelector('#home img'); return i && i.complete && i.naturalWidth > 0; })()`));
  });
});

describe('responsive (375x812 mobile)', () => {
  before(async () => {
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  });
  after(async () => {
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  });

  test('no horizontal page overflow at the top of the page', async () => {
    await load(URL_, { clearStorage: true });
    const { sw, iw } = await ev('({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })');
    assert.ok(sw <= iw + 1, `scrollWidth ${sw} > innerWidth ${iw}`);
  });

  test('no horizontal page overflow across all sections', async () => {
    for (const id of ['about', 'experience', 'skills', 'projects', 'education', 'contact']) {
      await scrollToId(id);
      const { sw, iw } = await ev('({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })');
      assert.ok(sw <= iw + 1, `#${id}: scrollWidth ${sw} > innerWidth ${iw}`);
    }
  });

  test('hamburger opens the mobile menu, a link navigates and closes the menu', async () => {
    await load(URL_, { clearStorage: true });
    assert.equal(await ev('!!document.querySelector(\'[aria-label="Toggle menu"]\') && getComputedStyle(document.querySelector(\'[aria-label="Toggle menu"]\')).display !== "none"'), true);
    await ev('document.querySelector(\'[aria-label="Toggle menu"]\').click()');
    await waitFor(`!!document.querySelector('div.fixed.top-20')`, 3000, 'menu open');
    await ev(`[...document.querySelectorAll('div.fixed.top-20 button')].find(b => b.textContent.trim() === 'Education').click()`);
    await sleep(2000);
    assert.equal(await ev(`!!document.querySelector('div.fixed.top-20')`), false, 'menu should close after selecting');
    const top = await ev('document.getElementById("education").getBoundingClientRect().top');
    assert.ok(Math.abs(top) < 120, `#education top=${top}`);
  });
});
