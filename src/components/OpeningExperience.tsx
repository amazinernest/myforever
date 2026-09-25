import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface Props {
  onEnter: () => void;
}

export const OpeningExperience: React.FC<Props> = ({ onEnter }) => {
  const [phase, setPhase] = useState<'initial' | 'quote1' | 'quote2' | 'quote3' | 'ready'>('initial');
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    // Start ambient soundtrack gently upon user interaction if not already started
    romanticAudio.init();
    
    // Step through the cinematic narrative lines with thoughtful pauses
    setTimeout(() => setPhase('quote1'), 600);
    setTimeout(() => setPhase('quote2'), 3200);
    setTimeout(() => setPhase('quote3'), 6400);
    setTimeout(() => setPhase('ready'), 8800);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FAF7F2] text-[#2A060F] px-6 text-center select-none overflow-hidden">
      {/* Delicate background ambient glow */}
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />
      
      {/* Decorative corner borders for luxury vintage feel */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gold-300/40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-gold-300/40 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-gold-300/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gold-300/40 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="greeting-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full flex flex-col items-center z-10"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="text-xs uppercase tracking-[0.35em] text-gold-700/80 mb-6 font-medium"
            >
              A Personal Journey
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.4 }}
              className="font-serif text-5xl md:text-6xl text-burgundy-950 font-normal italic tracking-wide mb-4"
            >
              {loveStory.opening.greeting}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1.2 }}
              className="text-burgundy-800/80 font-sans text-base md:text-lg font-light tracking-wide mb-10"
            >
              {loveStory.opening.subline}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 25px -5px rgba(114, 21, 45, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="px-8 py-3.5 rounded-full bg-burgundy-900 text-ivory-50 text-sm tracking-widest font-sans font-medium uppercase shadow-lg shadow-burgundy-950/20 hover:bg-burgundy-800 transition-all duration-300 flex items-center gap-2.5 border border-gold-400/30"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>{loveStory.opening.buttonText}</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="narrative-stage"
            className="max-w-2xl w-full flex flex-col items-center z-10 space-y-6"
          >
            {/* Quote 1 */}
            {phase === 'quote1' && (
              <motion.p
                key="q1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.2 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl text-burgundy-950 font-light leading-relaxed italic"
              >
                “{loveStory.opening.quote1}”
              </motion.p>
            )}

            {/* Quote 2 */}
            {phase === 'quote2' && (
              <motion.p
                key="q2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.2 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl text-burgundy-900 font-light leading-relaxed italic"
              >
                “{loveStory.opening.quote2}”
              </motion.p>
            )}

            {/* Quote 3 */}
            {(phase === 'quote3' || phase === 'ready') && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-gold-700/80 mb-3 font-medium">
                  With Deep Admiration
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-burgundy-950 font-medium mb-6">
                  {loveStory.opening.quote3}
                </h2>
                {/* Quick advance / Step in button */}
                <div className="pt-8">
                  <button
                    onClick={onEnter}
                    className="text-xs uppercase tracking-[0.25em] text-burgundy-900/60 hover:text-burgundy-950 transition-colors font-sans py-2 px-4 rounded-full border border-burgundy-900/10 hover:border-gold-400"
                  >
                    {phase === 'ready' ? 'Step Into Our Story ↓' : 'Enter directly →'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
