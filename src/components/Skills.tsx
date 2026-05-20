import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SkillCategory, UIContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsProps {
  categories: SkillCategory[];
  ui: UIContent['skills'];
}

const Skills: React.FC<SkillsProps> = ({ categories, ui }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      skills: category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.skills.length > 0);

  // Detect language based on placeholder text to avoid breaking other files
  const isFrench = ui.searchPlaceholder.toLowerCase().includes('rechercher');
  const noResultsText = isFrench
    ? 'Aucune compétence ne correspond à votre recherche.'
    : 'No skills found matching your search.';

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            My <span className="text-primary-500">Skills</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{ui.subtitle}</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 dark:text-gray-500" size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ui.searchPlaceholder}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-2xl focus:outline-none focus:border-primary-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCategories.length > 0 ? (
              <motion.div 
                layout 
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06]"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1.5 h-8 rounded-full bg-primary-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                    </div>

                    <div className="space-y-6">
                      <AnimatePresence mode="popLayout">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                              <span className="text-sm font-bold text-primary-500">{skill.level}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: skillIndex * 0.05, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 dark:text-gray-400 mt-10 py-10"
              >
                <p className="text-lg font-medium">{noResultsText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
