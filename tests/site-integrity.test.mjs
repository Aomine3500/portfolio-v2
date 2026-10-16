// Static / data-integrity tests for the portfolio site.
// Runner: Node's built-in `node:test` (no new dependency). Run: node --test tests/
// `esbuild` is already installed as a transitive dependency of Vite; it is used only
// to compile src/constants/index.ts so we can import the real content object.
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const SRC = path.join(ROOT, 'src');

const read = (p) => fs.readFileSync(p, 'utf8');
const existsPublic = (urlPath) => fs.existsSync(path.join(PUBLIC, urlPath.replace(/^\//, '')));

/** Shape signature: recursively replaces leaves by their typeof so EN/FR can be compared structurally. */
const shape = (v) => {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape(v[k])]));
  }
  return typeof v;
};

let content;

before(async () => {
  const out = await build({
    entryPoints: [path.join(SRC, 'constants', 'index.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const code = out.outputFiles[0].text;
  const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
  content = mod.content;
});

describe('content: EN / FR parity', () => {
  test('both languages are defined', () => {
    assert.ok(content.en && content.fr);
  });

  test('EN and FR have an identical structure (keys, array lengths, value types)', () => {
    assert.deepEqual(shape(content.fr), shape(content.en));
  });

  test('language-independent values (ids, skill levels, URLs, images) match between EN and FR', () => {
    for (const lang of ['en', 'fr']) {
      assert.deepEqual(
        content[lang].experiences.map((e) => e.id),
        content.en.experiences.map((e) => e.id),
      );
    }
    assert.deepEqual(
      content.fr.skillCategories.map((c) => c.skills.map((s) => s.level)),
      content.en.skillCategories.map((c) => c.skills.map((s) => s.level)),
    );
    assert.deepEqual(content.fr.contactInfo.email, content.en.contactInfo.email);
    assert.deepEqual(content.fr.contactInfo.phone, content.en.contactInfo.phone);
    assert.deepEqual(
      content.fr.projects.map((p) => [p.image, p.sourceUrl, p.websiteUrl, p.type]),
      content.en.projects.map((p) => [p.image, p.sourceUrl, p.websiteUrl, p.type]),
    );
  });

  test('no empty strings anywhere in EN or FR content', () => {
    const empties = [];
    const walk = (v, p) => {
      if (typeof v === 'string' && v.trim() === '') empties.push(p);
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, `${p}.${k}`));
    };
    walk(content.en, 'en');
    walk(content.fr, 'fr');
    assert.deepEqual(empties, []);
  });

  test('FR strings are actually translated (not left identical to EN) for UI labels', () => {
    const untranslated = [];
    for (const k of ['title', 'subtitle']) {
      for (const section of ['experience', 'skills', 'projects', 'education']) {
        if (content.fr.ui[section][k] === content.en.ui[section][k]) untranslated.push(`${section}.${k}`);
      }
    }
    assert.deepEqual(untranslated, []);
  });
});

describe('content: data validity', () => {
  for (const lang of ['en', 'fr']) {
    describe(lang, () => {
      test('ids are unique within experiences, education and projects', () => {
        for (const list of ['experiences', 'education', 'projects']) {
          const ids = content[lang][list].map((x) => x.id);
          assert.equal(new Set(ids).size, ids.length, `${list} has duplicate ids`);
        }
      });

      test('skill levels are numbers between 0 and 100', () => {
        for (const cat of content[lang].skillCategories) {
          for (const s of cat.skills) {
            assert.ok(Number.isFinite(s.level) && s.level >= 0 && s.level <= 100, `${s.name}=${s.level}`);
          }
        }
      });

      test('every experience has at least one description bullet and a period', () => {
        for (const e of content[lang].experiences) {
          assert.ok(e.description.length > 0, `experience ${e.id} has no bullets`);
          assert.ok(e.period.length > 0);
        }
      });

      test('project types are within the allowed filter set', () => {
        const allowed = new Set(['Mobile', 'Web', 'Desktop', 'Mobile & Web']);
        const filterable = new Set(['mobile', 'web', 'desktop']);
        for (const p of content[lang].projects) {
          assert.ok(allowed.has(p.type), `${p.title}: bad type ${p.type}`);
          for (const t of p.types ?? []) assert.ok(filterable.has(t.toLowerCase()), `${p.title}: bad types entry ${t}`);
        }
      });

      test('each project filter (mobile/web/desktop) matches at least one project', () => {
        for (const f of ['mobile', 'web', 'desktop']) {
          const hits = content[lang].projects.filter((p) =>
            (p.types ?? [p.type]).some((t) => t.toLowerCase() === f),
          );
          assert.ok(hits.length > 0, `filter "${f}" would show an empty list`);
        }
      });

      test('nav items have href === "#" + id, and every nav id is unique', () => {
        const nav = content[lang].ui.nav;
        for (const n of nav) assert.equal(n.href, `#${n.id}`);
        assert.equal(new Set(nav.map((n) => n.id)).size, nav.length);
      });

      test('hero roles list is non-empty', () => {
        assert.ok(content[lang].ui.hero.roles.length > 0);
      });
    });
  }
});

describe('contact info', () => {
  test('emails are well-formed', () => {
    for (const e of content.en.contactInfo.email) assert.match(e, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('phone numbers look like international numbers', () => {
    for (const p of content.en.contactInfo.phone) assert.match(p, /^\+\d[\d ]{7,}$/);
  });

  test('social/profile/external URLs are valid https URLs', () => {
    const c = content.en.contactInfo;
    const urls = [c.linkedin, c.github, c.facebook, c.twitter, c.threads];
    for (const p of content.en.projects) urls.push(p.sourceUrl, p.websiteUrl, p.demoUrl);
    for (const u of urls.filter(Boolean)) {
      const parsed = new URL(u);
      assert.equal(parsed.protocol, 'https:', u);
    }
  });

  test('Hero social links match the Contact social links (no drift)', () => {
    const hero = read(path.join(SRC, 'components', 'Hero.tsx'));
    const c = content.en.contactInfo;
    for (const u of [c.github, c.linkedin, c.facebook]) {
      assert.ok(hero.includes(u), `Hero.tsx is missing/has different URL: ${u}`);
    }
  });
});

describe('static assets referenced by the site exist in /public', () => {
  test('hero profile image', () => {
    assert.ok(existsPublic(content.en.personalInfo.heroImage), content.en.personalInfo.heroImage);
  });

  test('local project images', () => {
    for (const p of content.en.projects.filter((x) => x.image?.startsWith('/'))) {
      assert.ok(existsPublic(p.image), `${p.title}: ${p.image}`);
    }
  });

  test('Mind Screen detail-page images', () => {
    const src = read(path.join(SRC, 'components', 'MindScreenDetails.tsx'));
    const refs = [...src.matchAll(/src="(\/[^"]+)"/g)].map((m) => m[1]);
    assert.ok(refs.length > 0);
    for (const r of refs) assert.ok(existsPublic(r), r);
  });

  test('Gaztrack web + mobile screenshot galleries are complete', () => {
    const src = read(path.join(SRC, 'components', 'GaztrackProDetails.tsx'));
    const web = Number(src.match(/WEB_SCREENSHOTS_ALL = Array\.from\(\{ length: (\d+)/)[1]);
    const mobile = Number(src.match(/MOBILE_SCREENSHOTS_ALL = Array\.from\(\{ length: (\d+)/)[1]);
    const missing = [];
    for (let i = 1; i <= web; i++) if (!existsPublic(`/gaztrack/web/${i}.jpg`)) missing.push(`web/${i}.jpg`);
    for (let i = 1; i <= mobile; i++) {
      if (!existsPublic(`/gaztrack/mobile/${String(i).padStart(2, '0')}.jpg`)) missing.push(`mobile/${i}.jpg`);
    }
    assert.deepEqual(missing, []);
  });

  // KNOWN BUG (code/asset): the file was never committed -> Download CV button 404s.
  test('CV file referenced by the Hero "Download CV" button exists', () => {
    const hero = read(path.join(SRC, 'components', 'Hero.tsx'));
    const href = hero.match(/href="(\/[^"]+\.pdf)"/)?.[1];
    assert.ok(href, 'no .pdf link found in Hero.tsx');
    assert.ok(existsPublic(href), `${href} is missing from /public`);
  });

  // KNOWN BUG (minor): index.html favicon points to Vite's default which is not shipped.
  test('favicon referenced in index.html exists', () => {
    const html = read(path.join(ROOT, 'index.html'));
    const href = html.match(/rel="icon"[^>]*href="([^"]+)"/)?.[1];
    assert.ok(href);
    assert.ok(existsPublic(href), `${href} is missing from /public`);
  });
});

describe('page structure', () => {
  const componentSources = () =>
    fs.readdirSync(path.join(SRC, 'components')).map((f) => read(path.join(SRC, 'components', f))).join('\n');

  test('every nav target id exists as a section id in the components', () => {
    const all = componentSources() + read(path.join(SRC, 'App.tsx'));
    for (const n of content.en.ui.nav) {
      assert.ok(all.includes(`id="${n.id}"`), `no element with id="${n.id}"`);
    }
  });

  test('Hero exposes the #home anchor used by the navbar', () => {
    assert.ok(read(path.join(SRC, 'components', 'Hero.tsx')).includes('id="home"'));
  });

  test('external links opened in a new tab use rel="noopener noreferrer"', () => {
    const offenders = [];
    for (const f of fs.readdirSync(path.join(SRC, 'components'))) {
      const src = read(path.join(SRC, 'components', f));
      // every <a ...> / <motion.a ...> tag containing target="_blank"
      for (const m of src.matchAll(/<(?:motion\.)?a\b[^>]*>/gs)) {
        if (m[0].includes('target="_blank"') && !m[0].includes('noopener')) offenders.push(f);
      }
    }
    assert.deepEqual(offenders, []);
  });
});

describe('deployment config (vercel.json CSP)', () => {
  const vercel = JSON.parse(read(path.join(ROOT, 'vercel.json')));
  const csp = vercel.headers[0].headers.find((h) => h.key === 'Content-Security-Policy').value;
  const directive = (name) => csp.split(';').map((s) => s.trim()).find((s) => s.startsWith(name + ' ')) ?? '';

  test('every remote image host used in src/ is allowed by img-src', () => {
    const hosts = new Set();
    const walk = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(tsx?|css)$/.test(e.name)) {
          for (const m of read(p).matchAll(/https:\/\/(picsum\.photos|ui-avatars\.com|images\.unsplash\.com)/g)) hosts.add(m[1]);
        }
      }
    };
    walk(SRC);
    const imgSrc = directive('img-src');
    for (const h of hosts) assert.ok(imgSrc.includes(h), `${h} not allowed by img-src`);
  });

  test('EmailJS API is allowed by connect-src', () => {
    assert.ok(directive('connect-src').includes('https://api.emailjs.com'));
  });

  test('Google Fonts used in index.html are allowed by style-src and font-src', () => {
    assert.ok(read(path.join(ROOT, 'index.html')).includes('fonts.googleapis.com'));
    assert.ok(directive('style-src').includes('https://fonts.googleapis.com'));
    assert.ok(directive('font-src').includes('https://fonts.gstatic.com'));
  });

  test('built index.html has no inline <script> (would be blocked by script-src \'self\')', (t) => {
    const distHtml = path.join(ROOT, 'dist', 'index.html');
    if (!fs.existsSync(distHtml)) return t.skip('dist/ not built (run `npx vite build` first)');
    const inline = [...read(distHtml).matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/g)];
    assert.equal(inline.length, 0);
  });
});
