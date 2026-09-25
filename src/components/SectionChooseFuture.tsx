import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const SectionChooseFuture: React.FC = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([
    loveStory.futureScenarios.scenarios[0].id,
  ]);

  const toggleScenario = (id: string) => {
    if (selectedScenarios.includes(id)) {
      if (selectedScenarios.length > 1) {
        setSelectedScenarios(selectedScenarios.filter((s) => s !== id));
      }
    } else {
      setSelectedScenarios([...selectedScenarios, id]);
    }
  };

  return (
    <section id="choose-future" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-gold-700/80 font-semibold"
        >
          Section V • Interactive Moments
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy-950 font-normal mt-3 mb-4"
        >
          {loveStory.futureScenarios.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-burgundy-900/70 font-sans text-sm sm:text-base font-light"
        >
          {loveStory.futureScenarios.subtitle}
        </motion.p>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {loveStory.futureScenarios.scenarios.map((scenario, index) => {
          const isSelected = selectedScenarios.includes(scenario.id);

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -4 }}
              onClick={() => toggleScenario(scenario.id)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'glass-gold-subtle border-gold-400 shadow-md shadow-gold-500/10'
                  : 'bg-white/60 hover:bg-white/90 border-ivory-300 shadow-sm opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-sm">{scenario.emoji}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'text-gold-600' : 'text-burgundy-900/20'}`}>
                    <CheckCircle2 className="w-5 h-5 fill-gold-100" />
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-burgundy-700/70 font-sans font-semibold">
                  {scenario.tag}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-burgundy-950 font-normal mt-1 mb-3">
                  {scenario.title}
                </h3>
              </div>

              {/* Reveal text */}
              <AnimatePresence>
                {isSelected ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-sans text-burgundy-900/80 text-sm font-light leading-relaxed pt-3 border-t border-gold-200/50"
                  >
                    {scenario.story}
                  </motion.p>
                ) : (
                  <span className="text-xs text-burgundy-600/50 font-sans italic pt-2">
                    Tap to envision
                  </span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Reflection */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center max-w-xl mx-auto p-6 rounded-2xl glass-ivory border border-gold-300/40"
      >
        <Sparkles className="w-5 h-5 text-gold-600 mx-auto mb-2 animate-pulse" />
        <p className="font-serif italic text-xl sm:text-2xl text-burgundy-950 font-normal">
          “{loveStory.futureScenarios.footerNote}”
        </p>
      </motion.div>
    </section>
  );
};
