import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Moon, Sun, Sparkles } from 'lucide-react';
import { Language } from '../App';
import { UIContent } from '../types';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  ui: UIContent;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, ui }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(prev => {
        const next = window.scrollY > 20;
        return prev !== next ? next : prev;
      });

      const sections = ['home', ...ui.nav.map(item => item.id)];
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(prev => prev !== section ? section : prev);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ui.nav]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center ${
          isScrolled
            ? 'glass-bar'
            : 'bg-transparent border-b border-transparent dark:border-white/[0.04]'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('home')}
              className="cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-extrabold text-gradient tracking-tight">Ahmed Znouda</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scrollToSection('home')}
                className={`nav-pill relative px-4 py-2 rounded-lg text-sm font-medium ${
                  activeSection === 'home'
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
                {activeSection === 'home' && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              {ui.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-pill relative px-4 py-2 rounded-lg text-sm font-medium ${
                    activeSection === item.id
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="nav-pill p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500"
                aria-label="Toggle language"
              >
                <Globe size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className="nav-pill p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden lg:inline-flex items-center gap-1.5 ml-2 px-5 py-2 text-sm btn-outline"
              >
                <Sparkles size={15} />
                Hire Me
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="nav-pill md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 glass-bar overflow-hidden md:hidden"
          >
            <div className="p-4 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className={`nav-pill block w-full text-left px-4 py-3 rounded-xl font-medium ${
                  activeSection === 'home'
                    ? 'gloss bg-primary-50 dark:bg-primary-500/10 text-primary-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
              </button>
              {ui.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-pill block w-full text-left px-4 py-3 rounded-xl font-medium ${
                    activeSection === item.id
                      ? 'gloss bg-primary-50 dark:bg-primary-500/10 text-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
