import React, { useState } from 'react';
import { ExternalLink, Github, Layout, Smartphone, Laptop, Globe } from 'lucide-react';
import { Project, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../App';
import GaztrackProDetails from './GaztrackProDetails';
import MindSuiteDetails from './MindSuiteDetails';
import { content } from '../constants';

interface ProjectsProps {
  projects: Project[];
  ui: UIContent['projects'];
  language: Language;
  onRequestDemo: (message: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, ui, language, onRequestDemo }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const mindSuiteUi = content[language].ui.mindSuite;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => {
        const allTypes = p.types ?? [p.type];
        return allTypes.some(t => t.toLowerCase() === filter.toLowerCase());
      });

  // Sort projects so that "Mind Suite" is always first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.title === 'Mind Suite') return -1;
    if (b.title === 'Mind Suite') return 1;
    return a.id - b.id; // Secondary sort by id
  });

  const filterButtons = [
    { id: 'all', label: ui.filters.all, icon: Layout },
    { id: 'mobile', label: ui.filters.mobile, icon: Smartphone },
    { id: 'web', label: ui.filters.web, icon: Globe },
    { id: 'desktop', label: ui.filters.desktop, icon: Laptop },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-[#0e0e14] relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
          >
            My <span className="text-primary-500">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 dark:text-gray-400 mb-12"
          >
            {ui.subtitle}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filterButtons.map((btn) => (
              <motion.button
                key={btn.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(btn.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === btn.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500/30'
                }`}
              >
                <btn.icon size={18} />
                {btn.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="flex flex-row overflow-x-auto pb-12 gap-8 px-4 lg:px-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {/* Spacer pour un centrage parfait et résilient */}
          <div className="m-auto flex-shrink-0" />
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.4 }}
                className="group rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] overflow-hidden hover:border-primary-500/30 transition-all duration-500 flex flex-col cursor-pointer flex-shrink-0 snap-center w-[82vw] sm:w-[350px] md:w-[420px] h-[520px] shadow-sm hover:shadow-xl dark:shadow-none"
                onClick={() => {
                  if (project.title === 'Gaztrack Pro') setSelectedProject('Gaztrack Pro');
                  if (project.title === 'Mind Suite') setSelectedProject('Mind Suite');
                }}
              >
                {project.title === 'Mind Suite' ? (
                  /* ── Special MindSuite card ── */
                  <>
                    <div className="relative h-60 rounded-t-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-indigo-100 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-44 h-44 object-contain drop-shadow-2xl"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                      {/* Type badge */}
                      <div className="absolute top-4 right-4 flex gap-1.5">
                        {(project.types ?? [project.type]).map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-bold text-white bg-primary-500/90">{t}</span>
                        ))}
                      </div>
                      {/* In Development badge */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-500/30 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {mindSuiteUi.inDevelopment}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1 rounded-b-2xl">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                          Android — {mindSuiteUi.comingSoon}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                          iOS — {mindSuiteUi.comingSoon}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* ── Standard project card ── */
                  <>
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#0a0a0f] via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />

                      <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-3 w-full">
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary-500 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                              <ExternalLink size={16} />
                              {ui.demoBtn}
                            </a>
                          )}
                          {project.sourceUrl && (
                            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 backdrop-blur-md text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/20" onClick={(e) => e.stopPropagation()}>
                              <Github size={16} />
                              {ui.sourceBtn}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Type badge(s) */}
                      <div className="absolute top-4 right-4 flex gap-1.5">
                        {(project.types ?? [project.type]).map((t) => (
                          <span
                            key={t}
                            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                              t.toLowerCase() === 'web'
                                ? 'bg-indigo-500/90'
                                : 'bg-primary-500/90'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1 rounded-b-2xl">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {/* Spacer pour un centrage parfait et résilient */}
          <div className="m-auto flex-shrink-0" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject === 'Gaztrack Pro' && (
          <GaztrackProDetails language={language} onClose={() => setSelectedProject(null)} onRequestDemo={onRequestDemo} />
        )}
        {selectedProject === 'Mind Suite' && (
          <MindSuiteDetails language={language} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
