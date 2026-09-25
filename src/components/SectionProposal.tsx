import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { loveStory } from '../config/loveStory';
import { ThreeRingCanvas } from './ThreeRingCanvas';
import { Heart, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { sendDecisionNotification } from '../utils/notify';

export const SectionProposal: React.FC = () => {
  const [answer, setAnswer] = useState<'none' | 'yes' | 'think'>('none');

  const triggerCelebration = () => {
    setAnswer('yes');
    sendDecisionNotification({ decision: 'YES', timestamp: new Date().toISOString() });

    // Multi-stage refined gold & rose confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ECC961', '#FAF0D7', '#DE5B7E', '#A91F44'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ECC961', '#FAF0D7', '#DE5B7E', '#A91F44'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleLetMeThink = () => {
    setAnswer('think');
    sendDecisionNotification({ decision: 'LET_ME_THINK', timestamp: new Date().toISOString() });
  };

  return (
    <section
      id="proposal-section"
      className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#14060B] via-[#240813] to-[#12050A] text-ivory-50 text-center overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-burgundy-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold-400/15 blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {answer === 'none' && (
            <motion.div
              key="asking-flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center w-full"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-gold-400/80 font-medium mb-8">
                The Question
              </span>

              {/* 3D Ring Animation Canvas */}
              <div className="w-full max-w-sm mb-4">
                <ThreeRingCanvas />
              </div>

              {/* Gradual Questions */}
              <div className="space-y-6 mb-12">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-gold-200 font-normal"
                >
                  {loveStory.proposal.leadIn}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.9 }}
                  className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-200/90 font-light"
                >
                  {loveStory.proposal.question1}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.9 }}
                  className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-200/90 font-light"
                >
                  {loveStory.proposal.question2}
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.8, duration: 1.1 }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-shimmer-gold font-medium mt-6 pt-4"
                >
                  {loveStory.proposal.finalQuestion}
                </motion.h3>
              </div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md"
              >
                {/* YES BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(236,201,97,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={triggerCelebration}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-velvet-950 font-sans font-bold text-sm tracking-widest uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gold-200"
                >
                  <Heart className="w-4 h-4 fill-velvet-950 text-velvet-950" />
                  <span>{loveStory.proposal.yesButtonText}</span>
                </motion.button>

                {/* LET ME THINK BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLetMeThink}
                  className="w-full sm:w-auto px-7 py-4 rounded-full glass-burgundy text-ivory-300 hover:text-ivory-100 font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 border border-ivory-400/20"
                >
                  <span>{loveStory.proposal.thinkButtonText}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* THINK RESPONSE VIEW */}
          {answer === 'think' && (
            <motion.div
              key="think-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto glass-burgundy p-8 sm:p-12 rounded-3xl border border-gold-400/40 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-5 h-5 text-gold-300" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 mb-4">
                {loveStory.proposal.thinkResponse.title}
              </h3>

              <p className="font-sans text-ivory-200/90 text-base sm:text-lg font-light leading-relaxed mb-8">
                {loveStory.proposal.thinkResponse.message}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={triggerCelebration}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-velvet-950 font-sans font-semibold text-xs tracking-widest uppercase shadow-lg border border-gold-200"
                >
                  {loveStory.proposal.thinkResponse.reassureButton}
                </motion.button>

                <button
                  onClick={() => setAnswer('none')}
                  className="text-xs uppercase tracking-widest text-ivory-400 hover:text-ivory-200 transition-colors py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Back to proposal</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* YES CELEBRATION VIEW */}
          {answer === 'yes' && (
            <motion.div
              key="yes-celebration-view"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto w-full flex flex-col items-center"
            >
              {/* Animated 3D ring celebrating */}
              <div className="w-full max-w-xs mb-2">
                <ThreeRingCanvas isCelebration={true} />
              </div>

              <div className="p-8 sm:p-14 rounded-3xl glass-burgundy border-2 border-gold-400/70 shadow-[0_0_80px_rgba(201,151,29,0.25)] relative overflow-hidden w-full">
                {/* Decorative gold ribbon corner */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-gold-400 text-velvet-950 text-[9px] font-bold uppercase tracking-wider py-1 right-[-35px] top-[18px] w-[120px] text-center shadow-md">
                    Forever
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-xs uppercase tracking-[0.25em] text-gold-300 font-sans mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                  <span>Officially Engaged</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-6xl text-shimmer-gold font-normal mb-3">
                  {loveStory.proposal.yesCelebration.heading}
                </h2>

                <p className="font-serif italic text-xl sm:text-2xl text-ivory-200 font-light mb-8">
                  {loveStory.proposal.yesCelebration.subheading}
                </p>

                <div className="w-20 h-[1px] bg-gold-400/50 mx-auto my-6" />

                {/* Vows / Commitments */}
                <div className="space-y-3.5 text-left max-w-lg mx-auto mb-8">
                  {loveStory.proposal.yesCelebration.vows.map((vow, vIdx) => (
                    <div key={vIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                      <p className="font-sans text-sm sm:text-base text-ivory-200/90 font-light">
                        {vow}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gold-400/30 flex flex-col items-center">
                  <p className="font-script text-3xl sm:text-4xl text-gold-200">
                    {loveStory.proposal.yesCelebration.signatureNames}
                  </p>
                  <p className="font-serif italic text-sm text-ivory-400 mt-2">
                    “{loveStory.proposal.yesCelebration.finalMessage}”
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
