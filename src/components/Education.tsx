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
    <section id="education" className="py-24 bg-white dark:bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
          >
            Education & <span className="text-primary-500">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 dark:text-gray-400"
          >
            {ui.subtitle}
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {education.slice(0, 3).map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>

          {education.length > 3 && (
            <div className={`grid grid-cols-1 gap-6 ${
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
    whileHover={{ y: -5 }}
    className="group p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 transition-all duration-300 flex flex-col h-full"
  >
    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
      <Award size={24} className="text-primary-500 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
      {edu.degree}
    </h3>
    <div className="text-primary-500 font-semibold mb-6 flex items-center gap-2">
      <GraduationCap size={16} />
      <span>{edu.institution}</span>
    </div>
    <div className="space-y-3 text-sm text-gray-500 mb-6 flex-1">
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
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-white/[0.06] pt-6">
        {edu.details}
      </p>
    )}
  </motion.div>
);

export default EducationComponent;
