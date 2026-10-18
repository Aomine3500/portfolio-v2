import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, BadgeCheck, ExternalLink, Sparkles } from 'lucide-react';
import { Certification, Education, UIContent } from '../types';
import { motion } from 'framer-motion';

interface EducationProps {
  education: Education[];
  certifications: Certification[];
  ui: UIContent['education'];
}

const EducationComponent: React.FC<EducationProps> = ({ education, certifications, ui }) => {
  const featured = certifications.filter(c => c.featured);
  const others = certifications.filter(c => !c.featured);

  return (
    <section id="education" className="py-24 section-alt relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Education & Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
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

          {/* AI & continuous learning certificates */}
          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-2">
                  <Sparkles size={22} className="text-accent-500" />
                  {ui.certsTitle}
                </h3>
                <p className="section-subtitle">{ui.certsSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {featured.map((cert) => (
                  <div key={cert.id} className="card rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 icon-chip flex-shrink-0">
                        <BadgeCheck size={20} />
                      </div>
                      <div className="text-xs leading-tight">
                        <div className="font-bold text-gray-900 dark:text-white">{cert.issuer}</div>
                        <div className="text-gray-500 dark:text-gray-400">via {cert.platform} · {cert.date}</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-5 flex-1">{cert.title}</h4>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline self-start inline-flex items-center gap-1.5 px-4 py-1.5 text-xs"
                    >
                      {ui.verifyBtn}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {others.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card rounded-full px-4 py-2 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-white"
                  >
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{cert.issuer}</span>
                    <span>{cert.title}</span>
                    {cert.hours && <span className="text-gray-400 dark:text-gray-500">· {cert.hours}</span>}
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                ))}
              </div>
            </motion.div>
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
    className="group p-8 rounded-2xl card transition-all duration-300 flex flex-col h-full"
  >
    <div className="w-12 h-12 icon-chip mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 dark:group-hover:bg-primary-500">
      <Award size={24} className="group-hover:text-white transition-colors" />
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
