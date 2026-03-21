import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  data: AppContent['personalInfo'];
  ui: UIContent['hero'];
}

const Hero: React.FC<HeroProps> = ({ data, ui }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const role = ui.roles[roleIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ui.roles.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(role.substring(0, displayText.length - 1));
        }, 50);
      }
    } else {
      if (displayText === role) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(role.substring(0, displayText.length + 1));
        }, 150);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, ui.roles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full blur opacity-40 animate-pulse" />
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
            <img 
              src={data.heroImage} 
              alt={data.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0ea5e9&color=fff&size=256`;
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>{data.title}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
            {data.name}
          </h1>

          <div className="h-10 md:h-12 mb-10">
            <span className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400">
              {displayText}
              <span className="inline-block w-[2px] h-6 md:h-8 bg-primary-500 ml-1 animate-blink align-middle" />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 rounded-full bg-primary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              {ui.contactBtn}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Ahmed_Znouda_CV.pdf"
              download
              className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Download size={20} />
              {ui.downloadBtn}
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium">{ui.scroll}</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
