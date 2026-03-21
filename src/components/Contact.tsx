import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Send, CheckCircle, Facebook, AlertCircle, MessageCircle, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactInfo, AppContent, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_pxxk1ut",   
  TEMPLATE_ID: "template_65qcolw", 
  PUBLIC_KEY: "-eaZq4I5RByl6-PLF"    
};

interface ContactProps {
  contactInfo: ContactInfo;
  ui: UIContent['contact'];
  personalInfo: AppContent['personalInfo'];
}

const Contact: React.FC<ContactProps> = ({ contactInfo, ui, personalInfo }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
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
        if (form.current) form.current.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
    }, (error: { text: string }) => {
        setFormStatus('error');
        setErrorMessage(error.text || 'Failed to send. Please try again later.');
        setTimeout(() => setFormStatus('idle'), 5000);
    });
  };

  const socialLinks = [
    { name: "LinkedIn", url: contactInfo.linkedin, icon: Linkedin },
    { name: "GitHub", url: contactInfo.github, icon: Github },
    { name: "Facebook", url: contactInfo.facebook, icon: Facebook },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-500 text-sm font-semibold mb-6"
          >
            <MessageCircle size={16} />
            <span>Contact</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            {ui.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
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
            className="space-y-8"
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
            
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                  onClick={() => copyToClipboard(contactInfo.address)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-500 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{ui.locationLabel}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{contactInfo.address}</p>
                </div>
              </div>
              <AnimatePresence>
                {copiedText === contactInfo.address && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-8 text-xs font-bold text-emerald-500"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
              
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Social Connect</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    link.url && (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all shadow-sm"
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
            className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{ui.formTitle}</h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{ui.nameLabel}</label>
                  <input 
                    name="user_name" 
                    required 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-900 dark:text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{ui.emailInputLabel}</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    required 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-900 dark:text-white"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{ui.messageLabel}</label>
                <textarea 
                  name="message" 
                  rows={5} 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-900 dark:text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95
                  ${formStatus === 'success' ? 'bg-emerald-500' : formStatus === 'error' ? 'bg-red-500' : 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/25'}
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

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-slate-900 dark:text-white font-bold">{personalInfo.name}</span>. {ui.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon: Icon, title, details, hrefPrefix, onCopy, isCopied }: any) => (
  <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none group hover:border-primary-500/30 transition-all relative overflow-hidden">
    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
    <div className="space-y-2">
      {details.map((detail: string, idx: number) => (
        <div key={idx} className="flex items-center justify-between group/item">
          <a href={`${hrefPrefix}${detail}`} className="block text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors text-sm break-all">
            {detail}
          </a>
          <button 
            onClick={() => onCopy(detail)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-500 opacity-0 group-hover/item:opacity-100 transition-all"
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
          className="absolute top-4 right-4 text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full"
        >
          Copied!
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

export default Contact;
