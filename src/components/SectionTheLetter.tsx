import React from 'react';
import { motion } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Heart, ChevronDown } from 'lucide-react';

interface Props {
  onProceedToProposal: () => void;
}

export const SectionTheLetter: React.FC<Props> = ({ onProceedToProposal }) => {
  return (
    <section id="the-letter" className="relative py-28 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-gold-700/80 font-semibold"
        >
          Section VI • An Open Heart
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy-950 font-normal mt-3"
        >
          {loveStory.theLetter.heading}
        </motion.h2>
      </div>

      {/* Handwritten Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="letter-paper rounded-3xl p-8 sm:p-14 md:p-16 border border-gold-300/60 relative overflow-hidden"
      >
        {/* Decorative Wax Seal Stamp Icon */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 flex flex-col items-center opacity-85">
          <div className="w-12 h-12 rounded-full bg-burgundy-900 border-2 border-gold-400 flex items-center justify-center shadow-lg transform rotate-12">
            <Heart className="w-5 h-5 text-gold-300 fill-gold-400" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-burgundy-900/60 font-sans mt-1 font-semibold">
            Personal
          </span>
        </div>

        {/* Salutation */}
        <div className="mb-8">
          <h3 className="font-serif italic text-3xl sm:text-4xl text-burgundy-950">
            {loveStory.theLetter.salutation}
          </h3>
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 max-w-2xl font-sans text-burgundy-950/90 text-base sm:text-lg font-light leading-relaxed">
          {loveStory.theLetter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Closing Question Lead-In */}
        <div className="mt-12 pt-8 border-t border-gold-300/40">
          <p className="font-serif italic text-xl sm:text-2xl text-burgundy-900 font-normal">
            {loveStory.theLetter.closingQuestion}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-burgundy-700/70 font-sans">
                {loveStory.theLetter.signOff}
              </p>
              <p className="font-script text-3xl sm:text-4xl text-burgundy-950 mt-1">
                {loveStory.myName}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onProceedToProposal}
              className="px-8 py-3.5 rounded-full bg-burgundy-900 text-ivory-50 text-xs uppercase tracking-widest font-sans font-medium flex items-center justify-center gap-2 shadow-xl hover:bg-burgundy-800 transition-all border border-gold-400/40"
            >
              <span>Turn The Page</span>
              <ChevronDown className="w-4 h-4 text-gold-300 animate-bounce" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
