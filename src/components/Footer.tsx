import React from 'react';
import { Heart } from 'lucide-react';
import { loveStory } from '../config/loveStory';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-6 bg-[#12050A] text-ivory-400 text-center border-t border-gold-400/20">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gold-400/80 font-serif italic mb-2">
          <span>Crafted with endless love by</span>
          <span className="font-semibold text-gold-300">{loveStory.myName}</span>
          <span>for</span>
          <span className="font-semibold text-gold-300">{loveStory.herName}</span>
          <Heart className="w-3.5 h-3.5 text-burgundy-500 fill-burgundy-500 ml-1 inline" />
        </div>
        <p className="text-[11px] font-sans text-ivory-300/50 tracking-wider">
          {loveStory.subtitle} • Praise & {loveStory.myName}
        </p>
      </div>
    </footer>
  );
};
