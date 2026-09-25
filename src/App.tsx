import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BackgroundParticles } from './components/BackgroundParticles';
import { AudioPlayer } from './components/AudioPlayer';
import { OpeningExperience } from './components/OpeningExperience';
import { SectionHero } from './components/SectionHero';
import { SectionWhoYouAre } from './components/SectionWhoYouAre';
import { SectionConstellation } from './components/SectionConstellation';
import { SectionWhyYou3D } from './components/SectionWhyYou3D';
import { SectionTimeline } from './components/SectionTimeline';
import { SectionChooseFuture } from './components/SectionChooseFuture';
import { SectionTheLetter } from './components/SectionTheLetter';
import { SectionProposal } from './components/SectionProposal';
import { Footer } from './components/Footer';
import { EasterEggModal } from './components/EasterEggModal';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2A060F] font-sans selection:bg-burgundy-200 selection:text-burgundy-950 overflow-x-hidden">
      {/* Background Particles Layer */}
      <BackgroundParticles />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Opening Intro Gate */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningExperience onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main Love Story Flow */}
      <main className="relative z-10 transition-opacity duration-1000">
        <SectionHero onScrollToStory={() => scrollToSection('who-you-are')} />

        <SectionWhoYouAre />

        <SectionConstellation onSecretTrigger={() => setIsEasterEggOpen(true)} />

        <SectionWhyYou3D />

        <SectionTimeline />

        <SectionChooseFuture />

        <SectionTheLetter onProceedToProposal={() => scrollToSection('proposal-section')} />

        <SectionProposal />

        <Footer />
      </main>
    </div>
  );
};

export default App;
