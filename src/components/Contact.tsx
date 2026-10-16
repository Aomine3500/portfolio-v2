import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Send, CheckCircle, Facebook, AlertCircle, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactInfo, AppContent, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import XIcon from './XIcon';

const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
};

const RATE_LIMIT_MS = 120000;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

const sanitizeInput = (str: string): string => {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/(https?:\/\/[^\s]+)/gi, '')
    .trim();
};

interface ContactProps {
  contactInfo: ContactInfo;
  ui: UIContent['contact'];
  personalInfo: AppContent['personalInfo'];
  prefillMessage?: string;
  onPrefillConsumed?: () => void;
  navItems: UIContent['nav'];
}

const Contact: React.FC<ContactProps> = ({ contactInfo, ui, personalInfo, prefillMessage, onPrefillConsumed, navItems }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState<string>('');
  const [lastSentTime, setLastSentTime] = useState<number>(() => {
    const saved = localStorage.getItem('lastSentTime');
    return saved ? parseInt(saved, 10) : 0;
  });
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (prefillMessage) {
      setMessageValue(prefillMessage);
      onPrefillConsumed?.();
    }
  }, [prefillMessage]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const now = Date.now();
    if (now - lastSentTime < RATE_LIMIT_MS) {
      const remainingSec = Math.ceil((RATE_LIMIT_MS - (now - lastSentTime)) / 1000);
      setFormStatus('error');
      setErrorMessage(`Please wait ${remainingSec}s before sending another message.`);
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }

    const nameInput = form.current.user_name?.value || '';
    const messageInput = messageValue;
    const sanitizedMessage = sanitizeInput(messageInput);
    const sanitizedName = sanitizeInput(nameInput);

    if (sanitizedName.length > MAX_NAME_LENGTH) {
      setFormStatus('error');
      setErrorMessage('Name is too long.');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }

    if (sanitizedMessage.length > MAX_MESSAGE_LENGTH) {
      setFormStatus('error');
      setErrorMessage('Message is too long. Please keep it under 2000 characters.');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }

    if (!sanitizedMessage.trim()) {
      setFormStatus('error');
      setErrorMessage('Message cannot be empty after sanitization.');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }

    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      setFormStatus('error');
      setErrorMessage('Email system configuration is missing.');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }

    if (form.current.user_name) form.current.user_name.value = sanitizedName;
    setMessageValue(sanitizedMessage);

    setFormStatus('submitting');
    setErrorMessage('');

    emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      form.current,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
    .then(() => {
      setFormStatus('success');
      const now = Date.now();
      setLastSentTime(now);
      localStorage.setItem('lastSentTime', String(now));
      if (form.current) form.current.reset();
      setMessageValue('');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, (error: unknown) => {
      setFormStatus('error');
      console.error('EmailJS error:', error);
      setErrorMessage('Failed to send. Please try again later.');
      setTimeout(() => setFormStatus('idle'), 5000);
    });
  };

  const socialLinks = [
    { name: "LinkedIn", url: contactInfo.linkedin, icon: Linkedin },
    { name: "GitHub", url: contactInfo.github, icon: Github },
    { name: "Facebook", url: contactInfo.facebook, icon: Facebook },
    { name: "X", url: contactInfo.twitter, icon: XIcon },
  ];

  return (
    <section id="contact" className="pt-24 section-base relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Contact Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            {ui.subtitle}
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactCard
                icon={Phone}
                title={ui.phoneLabel}
                details={contactInfo.phone}
                hrefPrefix="tel:"
                onCopy={copyToClipboard}
                isCopied={copiedText}
              />
              <ContactCard
                icon={Mail}
                title={ui.emailLabel}
                details={contactInfo.email}
                hrefPrefix="mailto:"
                onCopy={copyToClipboard}
                isCopied={copiedText}
              />
            </div>

            <div className="p-8 rounded-2xl card relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(contactInfo.address)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-primary-500 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 icon-chip flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{ui.locationLabel}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{contactInfo.address}</p>
                </div>
              </div>
              <AnimatePresence>
                {copiedText === contactInfo.address && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-8 text-xs font-bold text-primary-500"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="pt-8 border-t border-gray-200 dark:border-white/[0.06]">
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Social Connect</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    link.url && (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="w-11 h-11 rounded-lg bg-primary-500 text-white flex items-center justify-center shadow-md shadow-primary-500/30 hover:bg-accent-500 transition-all"
                      >
                        <link.icon size={20} />
                      </motion.a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-2xl card"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{ui.formTitle}</h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{ui.nameLabel}</label>
                  <input
                    name="user_name"
                    required
                    maxLength={MAX_NAME_LENGTH}
                    className="field"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{ui.emailInputLabel}</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="field"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{ui.messageLabel}</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={MAX_MESSAGE_LENGTH}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className="field !rounded-2xl resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-4 rounded-full font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 
                ${formStatus === 'success' ? 'bg-emerald-500' : formStatus === 'error' ? 'bg-red-500' : 'btn-gradient'} 
                `}
              >
                {formStatus === 'idle' && <><Send size={20} /> {ui.sendBtn}</>}
                {formStatus === 'submitting' && <span>{ui.sendingBtn}</span>}
                {formStatus === 'success' && <><CheckCircle size={20} /> {ui.sentBtn}</>}
                {formStatus === 'error' && <><AlertCircle size={20} /> Error</>}
              </button>
              {errorMessage && <p className="text-red-500 text-sm text-center font-medium">{errorMessage}</p>}
            </form>
          </motion.div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-200 dark:border-primary-500/15 bg-white/60 dark:bg-navy-950/60">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#home" className="text-xl font-extrabold text-gradient">{personalInfo.name}</a>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-300/80">
              {navItems.map((item) => (
                <a key={item.id} href={item.href} className="hover:text-primary-500 dark:hover:text-white transition-colors">
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                link.url && (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-8 h-8 rounded-md bg-primary-500 text-white flex items-center justify-center hover:bg-accent-500 transition-colors"
                  >
                    <link.icon size={15} />
                  </a>
                )
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/[0.06] text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {personalInfo.name} | {ui.footer}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

const ContactCard = ({ icon: Icon, title, details, hrefPrefix, onCopy, isCopied }: any) => (
  <div className="p-8 rounded-2xl card group transition-all relative overflow-hidden">
    <div className="w-12 h-12 icon-chip mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <div className="space-y-2">
      {details.map((detail: string, idx: number) => (
        <div key={idx} className="flex items-center justify-between group/item">
          <a href={`${hrefPrefix}${detail}`} className="block text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm break-all">
            {detail}
          </a>
          <button
            onClick={() => onCopy(detail)}
            className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-primary-500 opacity-0 group-hover/item:opacity-100 transition-all"
            title="Copy"
          >
            <Copy size={14} />
          </button>
        </div>
      ))}
    </div>
    <AnimatePresence>
      {details.some((d: string) => d === isCopied) && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 text-[10px] font-bold text-primary-500 bg-primary-50 dark:bg-primary-500/10 px-2 py-1 rounded-full"
        >
          Copied!
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

export default Contact;
