import React, { useState, useEffect } from 'react';
import { Download, MessageCircle, Github, Linkedin, Facebook } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion } from 'framer-motion';

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

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-50 dark:bg-[#0a0a0f]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-600/3 dark:bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-500 font-semibold text-lg mb-4 tracking-wide uppercase"
            >
              Hello!
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white"
            >
              I'm <span className="text-primary-500">{data.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-10 md:h-12 mb-6"
            >
              <span className="text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300">
                {displayText}
                <span className="inline-block w-[3px] h-6 md:h-7 bg-primary-500 ml-1 animate-blink align-middle" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {data.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-primary-500 text-white font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 group"
              >
                <MessageCircle size={20} />
                {ui.contactBtn}
              </a>
              <a
                href="/Ahmed_Znouda_CV.pdf"
                download
                className="px-8 py-4 rounded-full border-2 border-primary-500/50 text-primary-500 font-bold hover:bg-primary-500/10 transition-all flex items-center gap-2"
              >
                <Download size={20} />
                {ui.downloadBtn}
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, url: "https://github.com/Aomine3500" },
                { icon: Linkedin, url: "https://www.linkedin.com/in/ahmedznouda/" },
                { icon: Facebook, url: "https://www.facebook.com/ahmadZNOUDA" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-500/10 transition-all"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-primary-500/40 to-primary-700/10 blur-2xl animate-pulse-glow" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 opacity-60" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden orange-glow">
              <img
                src={data.heroImage}
                alt={data.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=f97316&color=fff&size=400`;
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
