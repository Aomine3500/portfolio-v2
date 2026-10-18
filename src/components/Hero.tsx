import React, { useState, useEffect } from 'react';
import { Download, MessageCircle, Github, Linkedin, Facebook, Share2, Code2, Smartphone, Database, Bot } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion } from 'framer-motion';
import XIcon from './XIcon';

interface HeroProps {
  data: AppContent['personalInfo'];
  ui: UIContent['hero'];
}

const Hero: React.FC<HeroProps> = ({ data, ui }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
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

  const floatingBadges = [
    { icon: Share2, className: 'top-[6%] left-[2%]', delay: 0 },
    { icon: Code2, className: 'top-[4%] right-[4%]', delay: 1.2 },
    { icon: Smartphone, className: 'top-1/2 -left-[8%]', delay: 0.6 },
    { icon: Database, className: 'bottom-[2%] left-[14%]', delay: 1.8 },
    { icon: Bot, className: 'bottom-[18%] -right-[6%]', delay: 0.9 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden section-base">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-5"
            >
              <span className="block text-gray-900 dark:text-white">Hi, I'm</span>
              <span className="block text-gradient pb-2">{data.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-9 md:h-10 mb-4"
            >
              <span className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400">
                {displayText}
                <span className="inline-block w-[3px] h-6 md:h-7 bg-accent-500 ml-1 animate-blink align-middle" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 max-w-xl mx-auto lg:mx-0"
            >
              {ui.headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 dark:text-gray-300/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {data.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10 justify-center lg:justify-start"
            >
              <a href="#contact" className="btn-gradient px-7 py-3 flex items-center gap-2">
                <MessageCircle size={18} />
                {ui.contactBtn}
              </a>
              <a href="/Ahmed_Znouda_CV.pdf" download className="btn-outline px-7 py-3 flex items-center gap-2">
                <Download size={18} />
                {ui.downloadBtn}
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {[
                { icon: Github, url: "https://github.com/Aomine3500" },
                { icon: Linkedin, url: "https://www.linkedin.com/in/ahmedznouda/" },
                { icon: Facebook, url: "https://www.facebook.com/ahmadZNOUDA" },
                { icon: XIcon, url: "https://x.com/AhmedZnouda" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-lg icon-chip hover:text-white hover:bg-primary-500 dark:hover:bg-primary-500"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image with floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex-shrink-0 p-6 md:p-10"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary-500/40 via-violet-500/20 to-accent-500/40 blur-3xl animate-pulse-glow" />
              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-primary-500 via-violet-500 to-accent-500" />

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glow-ring bg-navy-900">
                <img
                  src={data.heroImage}
                  alt={data.name}
                  className="w-full h-full object-cover object-[center_15%]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3b82f6&color=fff&size=400`;
                  }}
                />
              </div>

              {floatingBadges.map(({ icon: Icon, className, delay }, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
                  className={`absolute ${className} w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center gloss bg-white dark:bg-navy-800 border border-primary-500/40 text-primary-500 dark:text-primary-400 shadow-lg shadow-primary-500/30`}
                >
                  <Icon size={20} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
