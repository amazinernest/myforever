import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveStory } from '../config/loveStory';
import { 
  Smile, Brain, HeartHandshake, Shield, Compass, 
  MessageCircleHeart, TrendingUp, Heart, Star, Sparkles, X 
} from 'lucide-react';

interface Props {
  onSecretTrigger: () => void;
}

export const SectionConstellation: React.FC<Props> = ({ onSecretTrigger }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  const handleEasterEggClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextCount = easterEggClicks + 1;
    setEasterEggClicks(nextCount);
    if (nextCount >= 3) {
      onSecretTrigger();
      setEasterEggClicks(0);
    }
  };

  const getIcon = (name: string) => {
    const props = { className: "w-4 h-4 text-gold-500" };
    switch (name) {
      case 'Smile': return <Smile {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'MessageCircleHeart': return <MessageCircleHeart {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Star': return <Star {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const nodes = loveStory.constellation.nodes;
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <section id="constellation" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-gold-700/80 font-semibold"
          >
            Section II • The Little Things
          </motion.span>
          
          {/* Subtle hidden clickable star for Easter Egg */}
          <button
            onClick={handleEasterEggClick}
            title="A subtle star"
            className="text-gold-400/40 hover:text-gold-500 transition-colors p-1"
          >
            <Star className="w-3.5 h-3.5 fill-gold-400/20" />
          </button>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy-950 font-normal mb-3"
        >
          {loveStory.constellation.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-burgundy-900/70 font-sans text-sm sm:text-base font-light"
        >
          {loveStory.constellation.subtitle}
        </motion.p>
      </div>

      {/* Constellation Interactive Canvas/Grid */}
      <div className="relative min-h-[480px] sm:min-h-[560px] rounded-3xl bg-gradient-to-b from-[#2A060F]/95 via-[#1D050B] to-[#14060B] text-ivory-100 p-8 sm:p-12 border border-gold-400/30 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Constellation background ambient stars & lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-burgundy-900/30 via-transparent to-transparent pointer-events-none" />
        
        {/* SVG Decorative Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECC961" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C72F57" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FAF0D7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Subtle interconnected star lines */}
          <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="80%" y2="22%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="15%" y2="65%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="85%" y2="70%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="url(#goldGlow)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* Central Core */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full glass-burgundy border-2 border-gold-400/60 shadow-[0_0_50px_rgba(201,151,29,0.3)] text-center p-4 cursor-default"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-gold-300 shadow-[0_0_12px_#ECC961] mb-2 animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-sans font-medium">
            Center of My World
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal mt-0.5">
            {loveStory.herName}
          </h3>
          <span className="text-[10px] text-ivory-300/70 font-sans italic mt-1">
            Tap the stars
          </span>
        </motion.div>

        {/* Floating Constellation Nodes */}
        <div className="absolute inset-0 pointer-events-none">
          {nodes.map((node, index) => {
            // Position nodes in an organic ellipse around the center
            const angle = (index / nodes.length) * (2 * Math.PI) - Math.PI / 2;
            const radiusX = 38; // percentage from center
            const radiusY = 38;
            const posX = 50 + radiusX * Math.cos(angle);
            const posY = 50 + radiusY * Math.sin(angle);

            return (
              <div
                key={node.id}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.15, zIndex: 20 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 ${
                    selectedNodeId === node.id
                      ? 'bg-gold-500 text-velvet-950 border-gold-300 shadow-[0_0_25px_rgba(244,222,156,0.6)]'
                      : 'bg-[#2A060F]/80 hover:bg-[#3B101F] text-ivory-100 border-gold-400/30 hover:border-gold-300 shadow-md'
                  }`}
                >
                  <span className="shrink-0">{getIcon(node.iconName)}</span>
                  <span className="text-xs sm:text-sm font-serif font-medium whitespace-nowrap">
                    {node.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60 group-hover:opacity-100" />
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Modal / Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNodeId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-2xl bg-[#1A070E] border border-gold-400/40 p-8 shadow-2xl text-ivory-50 text-center"
            >
              <button
                onClick={() => setSelectedNodeId(null)}
                className="absolute top-4 right-4 p-2 text-ivory-300/60 hover:text-ivory-50 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-4">
                {getIcon(selectedNode.iconName)}
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-sans font-medium">
                {selectedNode.short}
              </span>

              <h4 className="font-serif text-3xl text-ivory-50 font-normal mt-1 mb-4">
                {selectedNode.title}
              </h4>

              <div className="w-12 h-[1px] bg-gold-400/40 mx-auto mb-4" />

              <p className="font-sans text-ivory-200/90 text-base font-light leading-relaxed mb-6">
                “{selectedNode.detail}”
              </p>

              <button
                onClick={() => setSelectedNodeId(null)}
                className="px-6 py-2 rounded-full bg-gold-500/20 hover:bg-gold-500 text-gold-200 hover:text-velvet-950 text-xs uppercase tracking-widest font-medium transition-all duration-300 border border-gold-400/40"
              >
                Keep Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
