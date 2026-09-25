import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';
import { loveStory } from '../config/loveStory';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const nextState = romanticAudio.toggle(loveStory.audioTrack?.src);
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full glass-gold-subtle border border-gold-300/40 shadow-sm hover:shadow-md hover:border-gold-400 transition-all duration-300 transform active:scale-95"
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-burgundy-900/5 text-burgundy-800">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-burgundy-700 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-[3px] bg-burgundy-700 rounded-full animate-[bounce_1.2s_infinite_300ms] h-2/3" />
              <span className="w-[3px] bg-burgundy-700 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-burgundy-800 group-hover:rotate-12 transition-transform" />
          )}
        </div>

        <div className="flex flex-col text-left pr-1">
          <span className="text-[11px] font-medium tracking-wider uppercase text-burgundy-950 font-sans flex items-center gap-1.5">
            {isPlaying ? "Playing Soundtrack" : "♫ Play Our Soundtrack"}
          </span>
          <span className="text-[10px] text-burgundy-700/80 font-serif italic hidden sm:inline">
            {loveStory.audioTrack?.title || "Eternal Promise"}
          </span>
        </div>

        <div className="text-burgundy-700/60 ml-1">
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
        </div>
      </button>
    </div>
  );
};
