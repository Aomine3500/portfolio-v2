import React from 'react';
import { SkillCategory, UIContent } from '../types';
import { motion } from 'framer-motion';

interface SkillsProps {
  categories: SkillCategory[];
  ui: UIContent['skills'];
}

const skillLevels: Record<string, number> = {
  "ReactJS": 85, "NodeJS": 80, "ExpressJS": 78, "MongoDB": 82,
  "TypeScript": 80, "Flutter": 90, "Dart": 88, "Tailwind CSS": 85,
  "WinDev": 95, "WebDev": 90, "C# (Basic)": 40, "Java (Basic)": 40,
  "C# (Basique)": 40, "Java (Basique)": 40,
  "SQL Server": 85, "MySQL": 80, "PostgreSQL": 75, "Firebase": 82,
  "Active Directory": 80, "Citrix": 75, "TeamViewer": 85,
  "Windows Server": 78, "Office Suite": 90, "Suite Office": 90,
  "Arabic (Native)": 100, "French (Fluent)": 90, "English (B1 - Good)": 65,
  "Arabe (Natif)": 100, "Français (Courant)": 90, "Anglais (B1 - Bon)": 65,
};

const Skills: React.FC<SkillsProps> = ({ categories, ui }) => {
  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            My <span className="text-primary-500">Skills</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{ui.subtitle}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 rounded-full bg-primary-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const level = skillLevels[skill] || 70;
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                        <span className="text-sm font-bold text-primary-500">{level}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: catIndex * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
