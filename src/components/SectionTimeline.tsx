import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { Compass, Flame, MapPin, ShieldCheck, Home, Sparkles } from 'lucide-react';

export const SectionTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getTimelineIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-burgundy-800" };
    switch (iconName) {
      case 'Compass': return <Compass {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Home': return <Home {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="timeline" className="relative py-28 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-gold-700/80 font-semibold"
        >
          Section IV • The Life I Imagine
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy-950 font-normal mt-3 mb-4"
        >
          {loveStory.timeline.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-burgundy-900/70 font-sans text-sm sm:text-base font-light"
        >
          {loveStory.timeline.subtitle}
        </motion.p>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Central connecting line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-gold-300 via-burgundy-300 to-gold-400 -translate-x-1/2 hidden sm:block" />

        <div className="space-y-12 sm:space-y-16">
          {loveStory.timeline.items.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full sm:w-1/2">
                  <div
                    onClick={() => setActiveIndex(idx)}
                    className={`p-7 sm:p-9 rounded-2xl transition-all duration-300 border ${
                      activeIndex === idx
                        ? 'glass-gold-subtle border-gold-400/60 shadow-xl'
                        : 'bg-white/70 hover:bg-white/95 border-ivory-300 shadow-sm'
                    } cursor-pointer group`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-burgundy-100/80 text-burgundy-800 text-[11px] font-sans font-medium uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-950 font-normal mb-3 group-hover:text-burgundy-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-sans text-burgundy-900/85 text-base font-light leading-relaxed mb-5">
                      {item.description}
                    </p>

                    <div className="pt-4 border-t border-gold-300/30">
                      <p className="font-serif italic text-burgundy-800/90 text-sm sm:text-base">
                        “{item.quote}”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Node / Number Badge */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      activeIndex === idx
                        ? 'bg-burgundy-900 border-gold-400 text-ivory-50 shadow-lg shadow-burgundy-900/30 scale-110'
                        : 'bg-ivory-100 border-gold-300/60 text-burgundy-900 hover:border-gold-500'
                    }`}
                  >
                    {getTimelineIcon(item.icon)}
                  </div>
                </div>

                {/* Empty spacer for the other column in desktop grid */}
                <div className="hidden sm:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
