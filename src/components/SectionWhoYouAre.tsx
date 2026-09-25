import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Sparkles, Sun, Heart, ChevronRight, Eye } from 'lucide-react';

export const SectionWhoYouAre: React.FC = () => {
  const [unfoldedCard, setUnfoldedCard] = useState<string | null>("mind");
  const [beautyRevealed, setBeautyRevealed] = useState<boolean>(false);

  const toggleCard = (id: string) => {
    setUnfoldedCard(unfoldedCard === id ? null : id);
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-gold-600" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-gold-600" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-burgundy-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-600" />;
    }
  };

  return (
    <section id="who-you-are" className="relative py-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-gold-700/80 font-semibold"
        >
          Section I • What I See In You
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy-950 font-normal mt-3 mb-4"
        >
          {loveStory.whoYouAre.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-burgundy-900/70 font-sans text-sm sm:text-base font-light"
        >
          {loveStory.whoYouAre.subtitle}
        </motion.p>
      </div>

      {/* Cards Container */}
      <div className="space-y-6">
        {loveStory.whoYouAre.cards.map((card, index) => {
          const isUnfolded = unfoldedCard === card.id;
          const isBeautyCard = card.id === 'beauty';

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className={`rounded-2xl transition-all duration-500 overflow-hidden border ${
                isUnfolded
                  ? 'glass-gold-subtle border-gold-400/50 shadow-xl shadow-burgundy-900/5'
                  : 'bg-white/60 hover:bg-white/90 border-ivory-300/80 hover:border-gold-300/40 shadow-sm'
              }`}
            >
              {/* Header / Click trigger */}
              <button
                onClick={() => toggleCard(card.id)}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isUnfolded}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-ivory-100 border border-gold-300/40 flex items-center justify-center shrink-0 shadow-inner">
                    {getCardIcon(card.icon)}
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-burgundy-700/70 font-medium">
                      {card.tagline}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-950 font-normal">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-burgundy-700/60 font-sans hidden sm:inline">
                    {isUnfolded ? 'Close' : 'Read'}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-burgundy-900/20 flex items-center justify-center transition-transform duration-300 ${isUnfolded ? 'rotate-90 bg-burgundy-900 text-ivory-50' : 'text-burgundy-800'}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Unfolded Content */}
              <AnimatePresence>
                {isUnfolded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-gold-200/40">
                      {isBeautyCard && !beautyRevealed ? (
                        /* Playful prompt for Beauty Card */
                        <div className="py-6 flex flex-col items-center text-center max-w-lg mx-auto">
                          <p className="font-serif italic text-xl text-burgundy-900/80 mb-6">
                            “I could write an entire book about this…”
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBeautyRevealed(true);
                            }}
                            className="px-6 py-2.5 rounded-full bg-burgundy-900 text-ivory-50 text-xs uppercase tracking-widest font-sans font-medium flex items-center gap-2 shadow-md hover:bg-burgundy-800 transition-colors border border-gold-400/40"
                          >
                            <Eye className="w-3.5 h-3.5 text-gold-300" />
                            <span>Actually, let me try</span>
                          </motion.button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          className="space-y-4 max-w-3xl"
                        >
                          {card.content.map((paragraph, pIdx) => (
                            <p
                              key={pIdx}
                              className="font-sans text-burgundy-900/85 text-base sm:text-lg font-light leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          ))}

                          {card.highlight && (
                            <div className="mt-6 pt-4 border-t border-gold-300/30 flex items-start gap-3">
                              <span className="text-gold-600 mt-0.5 text-lg">✦</span>
                              <p className="font-serif italic text-burgundy-950 text-lg sm:text-xl font-normal">
                                {card.highlight}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
