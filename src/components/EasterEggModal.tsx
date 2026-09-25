import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Sparkles, Heart, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full rounded-3xl bg-gradient-to-b from-[#2A060F] to-[#14060B] border-2 border-gold-400/60 p-8 sm:p-10 text-ivory-50 text-center shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ivory-400 hover:text-ivory-50 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-7 h-7 text-gold-300 animate-pulse" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-sans font-semibold">
              Hidden Easter Egg ✨
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal mt-1 mb-4">
              {loveStory.secretEasterEgg.revealedTitle}
            </h3>

            <div className="w-12 h-[1px] bg-gold-400/40 mx-auto mb-5" />

            <p className="font-serif italic text-lg sm:text-xl text-ivory-100 font-light leading-relaxed mb-6">
              “{loveStory.secretEasterEgg.revealedMessage}”
            </p>

            <div className="flex justify-center items-center gap-1 text-gold-300 mb-6">
              <Heart className="w-4 h-4 fill-gold-400" />
              <Heart className="w-4 h-4 fill-gold-400" />
              <Heart className="w-4 h-4 fill-gold-400" />
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gold-500/20 hover:bg-gold-500 text-gold-200 hover:text-velvet-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-gold-400/40"
            >
              Keep This Our Secret 🤫
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
