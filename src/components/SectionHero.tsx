import React from 'react';
import { motion } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Sparkles, ChevronDown } from 'lucide-react';

interface Props {
  onScrollToStory: () => void;
}

export const SectionHero: React.FC<Props> = ({ onScrollToStory }) => {
  return (
    <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Soft atmospheric gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-burgundy-200/30 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold-200/30 blur-[100px] pointer-events-none" />

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold-subtle border border-gold-400/30 text-xs uppercase tracking-[0.28em] text-burgundy-900 font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>An Intimate Love Story</span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-950 font-light tracking-tight leading-[1.1] mb-6">
          For <span className="italic font-normal text-shimmer-gold">{loveStory.herName}</span>
        </h1>

        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-burgundy-800/90 font-light italic max-w-2xl mx-auto leading-relaxed mb-8">
          “The Future I Want to Build With You.”
        </p>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-4" />

        <p className="font-sans text-base sm:text-lg text-burgundy-900/80 font-light max-w-xl mx-auto leading-relaxed mt-2 mb-12">
          “I don’t just want to love you for today.<br className="hidden sm:inline" />
          <span className="font-medium text-burgundy-950"> I want to build an enduring life with you.</span>”
        </p>

        <motion.button
          onClick={onScrollToStory}
          whileHover={{ y: 3 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center gap-2 text-burgundy-800/70 hover:text-burgundy-950 transition-colors group cursor-pointer"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-medium font-sans">Begin The Journey</span>
          <div className="w-9 h-9 rounded-full border border-burgundy-900/20 flex items-center justify-center group-hover:border-gold-500 transition-colors">
            <ChevronDown className="w-4 h-4 text-burgundy-700 group-hover:text-gold-600 group-hover:translate-y-0.5 transition-all" />
          </div>
        </motion.button>
      </motion.div>
    </header>
  );
};
