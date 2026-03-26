import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Experience, UIContent } from '../types';
import { motion } from 'framer-motion';

interface ExperienceProps {
  experiences: Experience[];
  ui: UIContent['experience'];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ experiences, ui }) => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#0e0e14] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
          >
            Work <span className="text-primary-500">Experience</span>
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

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary-500 md:-translate-x-1/2 z-10 shadow-lg shadow-primary-500/50">
                  <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                  <div className="p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 transition-all duration-300 group">
                    {exp.isCurrent && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 text-primary-500 text-xs font-bold mb-4 uppercase tracking-widest">
                        {ui.currentBadge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary-500 font-semibold mb-4">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceComponent;
