import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Sparkles, Layout, Smartphone, Laptop, Globe } from 'lucide-react';
import { Project, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsProps {
  projects: Project[];
  ui: UIContent['projects'];
}

const Projects: React.FC<ProjectsProps> = ({ projects, ui }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type.toLowerCase() === filter.toLowerCase());

  const filterButtons = [
    { id: 'all', label: ui.filters.all, icon: Layout },
    { id: 'mobile', label: ui.filters.mobile, icon: Smartphone },
    { id: 'web', label: ui.filters.web, icon: Globe },
    { id: 'desktop', label: ui.filters.desktop, icon: Laptop },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 text-sm font-semibold mb-6"
          >
            <Sparkles size={16} />
            <span>Portfolio</span>
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
            className="text-lg text-slate-600 dark:text-slate-400 mb-12"
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
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  filter === btn.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:text-primary-500'
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
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary-500/50 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4 w-full">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary-500 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors">
                          <ExternalLink size={16} />
                          {ui.demoBtn}
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/20 backdrop-blur-md text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/30 transition-colors border border-white/30">
                          <Github size={16} />
                          {ui.sourceBtn}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm">
                    {project.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
