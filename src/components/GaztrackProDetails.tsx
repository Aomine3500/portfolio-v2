import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../constants';
import { Language } from '../App';

interface Props {
  language: Language;
  onClose: () => void;
  onRequestDemo: (message: string) => void;
}

const WEB_SCREENSHOTS_ALL = Array.from({ length: 43 }, (_, i) => `/gaztrack/web/${i + 1}.jpg`);
const MOBILE_SCREENSHOTS_ALL = Array.from({ length: 15 }, (_, i) => `/gaztrack/mobile/${(i + 1).toString().padStart(2, '0')}.jpg`);

const WEB_SCREENSHOTS = WEB_SCREENSHOTS_ALL.slice(0, 6);
const MOBILE_SCREENSHOTS = MOBILE_SCREENSHOTS_ALL.slice(0, 6);

const GaztrackProDetails: React.FC<Props> = ({ language, onClose, onRequestDemo }) => {
  const ui = content[language].ui.gaztrackPro;
  const projectInfo = content[language].projects.find(p => p.id === 1)!

  // Helper to render text with **bold** parts
  const renderWithBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900 dark:text-white">{part}</strong> : part
    );
  };

  const [lightboxOpen, setLightboxOpen] = useState<{ type: 'web' | 'mobile', index: number } | null>(null);

  const activeImages = lightboxOpen?.type === 'web' ? WEB_SCREENSHOTS : lightboxOpen?.type === 'mobile' ? MOBILE_SCREENSHOTS : [];

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!lightboxOpen) return;
    const arrayLength = activeImages.length;
    let newIndex = lightboxOpen.index;
    if (direction === 'next') {
      newIndex = (newIndex + 1) % arrayLength;
    } else {
      newIndex = (newIndex - 1 + arrayLength) % arrayLength;
    }
    setLightboxOpen({ ...lightboxOpen, index: newIndex });
  };

  // Lock body scroll and handle keyboard for lightbox
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(null);
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white dark:bg-[#0e0e14] w-full max-w-6xl min-h-[90vh] rounded-3xl overflow-hidden shadow-2xl overflow-y-auto flex flex-col relative my-auto cursor-default border border-gray-200 dark:border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/80 dark:bg-[#0e0e14]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
            {projectInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300 font-medium"
          >
            <span className="hidden sm:inline">{ui.backBtn}</span>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 md:p-10 space-y-16">
          
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="flex flex-wrap gap-2 mb-4">
                  {projectInfo.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-lg border border-primary-100 dark:border-primary-500/20">
                      {tech}
                    </span>
                  ))}
               </div>
               {ui.description.map((desc, idx) => (
                 <p key={idx} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                   {renderWithBold(desc)}
                 </p>
               ))}
               
               <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => { onRequestDemo(ui.demoMessage); onClose(); }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-primary-500/25"
                  >
                    <MessageSquare size={20} />
                    {ui.demoBtnLabel}
                  </button>
               </div>
            </div>

            <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/5">
               <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                 <CheckCircle2 className="text-primary-500" />
                 {ui.featuresTitle}
               </h3>
               <ul className="space-y-4">
                 {ui.features.map((feature, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                     <span>{feature}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Web Dashboard Screenshots */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{ui.webDashboard}</h3>
              <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WEB_SCREENSHOTS.map((src, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg group bg-gray-100 dark:bg-white/5 min-h-[200px] flex items-center justify-center cursor-pointer"
                  onClick={() => setLightboxOpen({ type: 'web', index: idx })}
                >
                  <img src={src} alt={`Web Dashboard ${idx + 1}`} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile App Screenshots */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{ui.mobileApp}</h3>
              <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {MOBILE_SCREENSHOTS.map((src, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg group bg-gray-100 dark:bg-white/5 min-h-[300px] flex items-center justify-center cursor-pointer"
                  onClick={() => setLightboxOpen({ type: 'mobile', index: idx })}
                >
                  <img src={src} alt={`Mobile App ${idx + 1}`} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
             </div>
          </div>

        </div>
      </motion.div>
    </motion.div>

    {/* Lightbox Overlay */}
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setLightboxOpen(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors z-20"
          >
            <X size={24} />
          </button>
          
          {/* Navigation Controls */}
          {activeImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-20"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-20"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxOpen.index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                src={activeImages[lightboxOpen.index]}
                alt="Gallery Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 font-medium bg-black/60 px-5 py-2.5 rounded-full border border-white/10">
              {lightboxOpen.index + 1} / {activeImages.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default GaztrackProDetails;
