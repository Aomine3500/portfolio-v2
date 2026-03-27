import React from 'react';
import { Code, Server, Laptop } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion } from 'framer-motion';

interface AboutProps {
  data: AppContent['personalInfo'];
  ui: UIContent['about'];
}

const About: React.FC<AboutProps> = ({ data, ui }) => {
  const cards = [
    { icon: Code, title: ui.cards.frontend.title, description: ui.cards.frontend.desc },
    { icon: Server, title: ui.cards.backend.title, description: ui.cards.backend.desc },
    { icon: Laptop, title: ui.cards.legacy.title, description: ui.cards.legacy.desc },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0e0e14] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {ui.title.split(' ').map((word, i) => (
              <span key={i}>
                {i === ui.title.split(' ').length - 1 ? (
                  <span className="text-primary-500">{word}</span>
                ) : (
                  <span className="text-gray-900 dark:text-white">{word} </span>
                )}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Profile + Description */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-8"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-b from-primary-500/30 to-transparent blur-xl animate-pulse-glow" />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 opacity-70" />
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden orange-glow">
              <img
                src={data.heroImage}
                alt={data.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=f97316&color=fff&size=256`;
                }}
              />
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {data.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl text-center mb-8"
          >
            {data.about}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#contact"
            className="px-8 py-3 rounded-full bg-primary-500 text-white font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                <card.icon size={28} className="text-primary-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
              <p className="text-gray-500">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '10+', label: 'Technologies' },
            { value: '100%', label: 'Dedication' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-primary-500 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
