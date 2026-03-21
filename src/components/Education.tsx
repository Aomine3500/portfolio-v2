import React from 'react';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Education, UIContent } from '../types';
import { motion } from 'framer-motion';

interface EducationProps {
  education: Education[];
  ui: UIContent['education'];
}

const EducationComponent: React.FC<EducationProps> = ({ education, ui }) => {
  return (
    <section id="education" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 text-sm font-semibold mb-6"
          >
            <GraduationCap size={16} />
            <span>{ui.badge}</span>
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
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            {ui.subtitle}
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* First row: up to 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {education.slice(0, 3).map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>

          {/* Remaining items: centered */}
          {education.length > 3 && (
            <div className={`grid grid-cols-1 gap-8 ${
              education.slice(3).length === 1
                ? 'md:grid-cols-1 max-w-sm mx-auto'
                : 'md:grid-cols-2 max-w-3xl mx-auto'
            }`}>
              {education.slice(3).map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index + 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface EducationCardProps {
  edu: Education;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 flex flex-col h-full"
  >
    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
      <Award size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
      {edu.degree}
    </h3>
    <div className="text-primary-500 font-semibold mb-6 flex items-center gap-2">
      <GraduationCap size={16} />
      <span>{edu.institution}</span>
    </div>
    <div className="space-y-3 text-sm text-slate-500 dark:text-slate-500 mb-6 flex-1">
      <div className="flex items-center gap-2">
        <MapPin size={14} />
        <span>{edu.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={14} />
        <span>{edu.period}</span>
      </div>
    </div>
    {edu.details && (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
        {edu.details}
      </p>
    )}
  </motion.div>
);

export default EducationComponent;
