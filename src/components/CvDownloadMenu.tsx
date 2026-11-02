import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../App';

const CV_FILES: { lang: Language; label: string; href: string; filename: string }[] = [
  { lang: 'en', label: 'English', href: '/cv/Ahmed_Znouda_CV_EN.pdf', filename: 'Ahmed_Znouda_CV_EN.pdf' },
  { lang: 'fr', label: 'Français', href: '/cv/Ahmed_Znouda_CV_FR.pdf', filename: 'Ahmed_Znouda_CV_FR.pdf' },
];

// Rendered height of the menu plus its gap, used to decide whether it fits below the button
const MENU_HEIGHT = 160;

interface CvDownloadMenuProps {
  label: string;
  menuTitle: string;
  language: Language;
}

const CvDownloadMenu: React.FC<CvDownloadMenuProps> = ({ label, menuTitle, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // The site's current language is offered first
  const files = [...CV_FILES].sort((a, b) => Number(b.lang === language) - Number(a.lang === language));

  useEffect(() => {
    if (!isOpen) return;
    itemRefs.current[0]?.focus();

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggle = () => {
    if (!isOpen && buttonRef.current) {
      // The Hero section clips overflow, so flip the menu above the button when it wouldn't fit below
      const button = buttonRef.current.getBoundingClientRect();
      const section = buttonRef.current.closest('section')?.getBoundingClientRect();
      const bottomLimit = Math.min(section?.bottom ?? window.innerHeight, window.innerHeight);
      setOpenUpward(bottomLimit - button.bottom < MENU_HEIGHT && button.top > MENU_HEIGHT);
    }
    setIsOpen((open) => !open);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      items[(index + step + items.length) % items.length]?.focus();
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="cv-download-menu"
        className="btn-outline px-7 py-3 flex items-center gap-2"
      >
        <Download size={18} />
        {label}
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Positioning lives on the wrapper so framer-motion's transform doesn't override the centering */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-30 ${
          openUpward ? 'bottom-full mb-3' : 'top-full mt-3'
        }`}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="cv-download-menu"
              role="menu"
              aria-label={menuTitle}
              onKeyDown={handleMenuKeyDown}
              initial={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="card rounded-2xl p-2 w-64 text-left"
              // Opaque fill: the menu sits over the hero copy, which would show through the glass fill
              style={{ background: 'var(--gloss-sheen), var(--card-fill-solid)' }}
            >
              <p className="px-3 pt-1.5 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {menuTitle}
              </p>
              {files.map((file, i) => (
                <a
                  key={file.lang}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  href={file.href}
                  download={file.filename}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="nav-pill flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                >
                  <span className="w-9 h-9 rounded-lg icon-chip text-xs font-bold shrink-0">
                    {file.lang.toUpperCase()}
                  </span>
                  <span className="flex-1 font-medium">{file.label}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <FileText size={14} />
                    PDF
                  </span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CvDownloadMenu;
