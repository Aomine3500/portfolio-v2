import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Brain, ShieldCheck, Mic, ChevronRight, MessageSquare, Lock } from 'lucide-react';
import { content } from '../constants';
import { Language } from '../App';

interface Props {
  language: Language;
  onClose: () => void;
}

const MindSuiteDetails: React.FC<Props> = ({ language, onClose }) => {
  const ui = content[language].ui.mindSuite;
  const projectInfo = content[language].projects.find(p => p.id === 3)!;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const assessments = [
    { scale: 'PHQ-9', domain: ui.assessments.phq9.domain, desc: ui.assessments.phq9.desc },
    { scale: 'GAD-7', domain: ui.assessments.gad7.domain, desc: ui.assessments.gad7.desc },
    { scale: ui.assessments.loneliness.scale, domain: ui.assessments.loneliness.domain, desc: ui.assessments.loneliness.desc },
    { scale: ui.assessments.burnout.scale, domain: ui.assessments.burnout.domain, desc: ui.assessments.burnout.desc },
  ];

  const highlights = [
    { icon: Mic, text: ui.highlights.voice },
    { icon: Brain, text: ui.highlights.ai },
    { icon: ShieldCheck, text: ui.highlights.privacy },
    { icon: Smartphone, text: ui.highlights.crossPlatform },
  ];

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
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white dark:bg-[#0e0e14] w-full max-w-5xl min-h-[90vh] rounded-3xl overflow-hidden shadow-2xl overflow-y-auto flex flex-col relative my-auto cursor-default border border-gray-200 dark:border-white/10"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/80 dark:bg-[#0e0e14]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img src="/mindsuite/logo.png" alt="MindSuite Logo" className="w-10 h-10 object-contain" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                {projectInfo.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300 font-medium"
            >
              <span className="hidden sm:inline">{ui.backBtn}</span>
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10 space-y-14">

            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Logo + description */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img src="/mindsuite/logo.png" alt="MindSuite" className="w-24 h-24 object-contain drop-shadow-xl" />
                  <div>
                    {/* Coming soon badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                        <Smartphone size={12} />
                        Android — {ui.comingSoon}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-500/20">
                        <Smartphone size={12} />
                        iOS — {ui.comingSoon}
                      </span>
                    </div>
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {projectInfo.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold rounded-lg border border-violet-100 dark:border-violet-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {ui.tagline}
                </p>
                {ui.description.map((desc, idx) => (
                  <p key={idx} className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                ))}

                <div className="pt-2 flex gap-3 flex-wrap">
                  <button
                    disabled
                    title={ui.demoUnavailableHint}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-white/10 cursor-not-allowed select-none opacity-70"
                  >
                    <Lock size={15} className="flex-shrink-0" />
                    <MessageSquare size={16} className="flex-shrink-0" />
                    {ui.demoBtnLabel}
                  </button>
                  <span className="flex items-center text-xs text-gray-400 dark:text-gray-600 italic">
                    {ui.demoUnavailableHint}
                  </span>
                </div>
              </div>

              {/* Right: Key highlights */}
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-500/5 dark:to-violet-500/5 p-8 rounded-2xl border border-blue-100 dark:border-violet-500/10 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{ui.highlightsTitle}</h3>
                {highlights.map(({ icon: Icon, text }, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                      <Icon size={16} className="text-white" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pt-1">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Assessments Table */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{ui.assessmentsTitle}</h3>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assessments.map((a, idx) => (
                  <motion.div
                    key={a.scale}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:border-violet-300 dark:hover:border-violet-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold">
                        {a.scale}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-violet-500 transition-colors">{a.domain}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed flex items-start gap-1.5">
                      <ChevronRight size={13} className="text-violet-400 mt-0.5 flex-shrink-0" />
                      {a.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{ui.howItWorksTitle}</h3>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {ui.steps.map((step, idx) => (
                  <div key={idx} className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-500/5 dark:to-violet-500/5 border border-blue-100 dark:border-violet-500/10 text-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/5 to-violet-500/5 border border-blue-200 dark:border-violet-500/20 flex items-start gap-4">
              <ShieldCheck size={24} className="text-violet-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{ui.disclaimerTitle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{ui.disclaimer}</p>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MindSuiteDetails;
