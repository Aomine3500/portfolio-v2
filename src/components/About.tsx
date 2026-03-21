import React from 'react';
import { Code, Server, Laptop, Sparkles } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion } from 'framer-motion';

interface AboutProps {
  data: AppContent['personalInfo'];
  ui: UIContent['about'];
}

const About: React.FC<AboutProps> = ({ data, ui }) => {
  const cards = [
    {
      icon: Code,
      title: ui.cards.frontend.title,
      description: ui.cards.frontend.desc,
      color: 'blue',
    },
    {
      icon: Server,
      title: ui.cards.backend.title,
      description: ui.cards.backend.desc,
      color: 'purple',
    },
    {
      icon: Laptop,
      title: ui.cards.legacy.title,
      description: ui.cards.legacy.desc,
      color: 'orange',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold mb-6"
          >
            <Sparkles size={16} className="text-primary-500" />
            <span>{ui.title}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white"
          >
            {ui.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {data.about}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 3) }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                <card.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{card.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Completed' },
            { value: '10+', label: 'Technologies' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
