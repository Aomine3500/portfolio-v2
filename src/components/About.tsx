import React from 'react';
import { Code, Server, Laptop, Bot, ArrowRight } from 'lucide-react';
import { AppContent, UIContent } from '../types';
import { motion } from 'framer-motion';

interface AboutProps {
  data: AppContent['personalInfo'];
  ui: UIContent['about'];
}

const About: React.FC<AboutProps> = ({ data, ui }) => {
  const cards = [
    { icon: Bot, title: ui.cards.ai.title, description: ui.cards.ai.desc },
    { icon: Code, title: ui.cards.frontend.title, description: ui.cards.frontend.desc },
    { icon: Server, title: ui.cards.backend.title, description: ui.cards.backend.desc },
    { icon: Laptop, title: ui.cards.legacy.title, description: ui.cards.legacy.desc },
  ];

  return (
    <section id="about" className="py-24 section-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Profile + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary-500/40 to-accent-500/40 blur-2xl animate-pulse-glow" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden card glow-ring">
              <img
                src={data.heroImage}
                alt={data.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3b82f6&color=fff&size=256`;
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="section-title">{ui.title}</h2>
            <h3 className="text-xl font-semibold text-gradient mb-5 inline-block">{data.title}</h3>
            <p className="text-gray-500 dark:text-gray-300/80 leading-relaxed mb-8">
              {data.about}
            </p>
            <a href="#contact" className="btn-gradient inline-flex items-center gap-2 px-7 py-3">
              Hire Me
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl card text-center group"
            >
              <div className="w-14 h-14 mx-auto icon-chip mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 dark:group-hover:bg-primary-500">
                <card.icon size={28} className="group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300/70 leading-relaxed">{card.description}</p>
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
            <div key={index} className="text-center p-6 rounded-2xl card">
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2 inline-block">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
