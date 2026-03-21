import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { content } from "./constants";
import { ArrowUp } from "lucide-react";
import { ThemeProvider } from "./hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

export type Language = "en" | "fr";

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || "en";
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const data = content[language];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-primary-500 selection:text-white transition-colors duration-300">
      <Navbar language={language} setLanguage={setLanguage} ui={data.ui} />
      <main>
        <Hero data={data.personalInfo} ui={data.ui.hero} />
        <About data={data.personalInfo} ui={data.ui.about} />
        <Experience experiences={data.experiences} ui={data.ui.experience} />
        <Skills categories={data.skillCategories} ui={data.ui.skills} />
        <Projects projects={data.projects} ui={data.ui.projects} />
        <Education education={data.education} ui={data.ui.education} />
      </main>
      <Contact
        contactInfo={data.contactInfo}
        ui={data.ui.contact}
        personalInfo={data.personalInfo}
      />

      {/* Back To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full shadow-2xl hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors z-50 group"
            aria-label="Back to top"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
