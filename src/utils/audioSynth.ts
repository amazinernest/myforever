/**
 * Romantic Ambient Soundtrack Engine
 * Supports custom audio files (Akon - Escape) with gentle volume, 10s starting cue,
 * and automatic fallback to physical-modeled acoustic piano harmonics via Web Audio API.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private usingCustomAudio = false;
  private hasSetInitialTime = false;

  // Romantic harmonic progression
  private chords = [
    [146.83, 220.00, 277.18, 369.99, 440.00, 554.37], // Dmaj9
    [123.47, 185.00, 246.94, 293.66, 369.99, 440.00], // Bm9
    [98.00, 146.83, 196.00, 293.66, 369.99, 440.00],  // Gmaj9
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00]  // Aadd9
  ];

  private currentChordIndex = 0;
  private currentNoteIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.18; // gentle background level
      this.gainNode.connect(this.ctx.destination);
    }
  }

  public playCustomAudio(url: string) {
    if (!this.audioElement) {
      this.audioElement = new Audio(url);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.38; // Reduced soft romantic volume
      
      this.audioElement.addEventListener('loadedmetadata', () => {
        if (!this.hasSetInitialTime && this.audioElement) {
          this.audioElement.currentTime = 10; // Start playing from 10 seconds
          this.hasSetInitialTime = true;
        }
      });

      // Fallback to synth if custom audio file fails to load
      this.audioElement.onerror = () => {
        console.info('Custom audio file not found, falling back to romantic piano synth.');
        this.usingCustomAudio = false;
        if (this.isPlaying) {
          this.stepArpeggio();
        }
      };
    }

    if (!this.hasSetInitialTime && this.audioElement) {
      try {
        this.audioElement.currentTime = 10;
        this.hasSetInitialTime = true;
      } catch {
        // metadata might still be loading
      }
    }

    this.usingCustomAudio = true;
    this.isPlaying = true;
    this.audioElement.play().catch(() => {
      // If autoplay policy or load error, fallback smoothly
      this.usingCustomAudio = false;
      this.stepArpeggio();
    });
  }

  private playPianoNote(freq: number, duration = 3.5) {
    if (!this.ctx || !this.gainNode) return;

    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.1, now + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.00001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  private stepArpeggio = () => {
    if (!this.isPlaying || !this.ctx || this.usingCustomAudio) return;

    const chord = this.chords[this.currentChordIndex];
    const freq = chord[this.currentNoteIndex];

    this.playPianoNote(freq, 4.0);

    this.currentNoteIndex++;
    if (this.currentNoteIndex >= chord.length) {
      this.currentNoteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    const interval = 580 + (Math.sin(Date.now() / 1000) * 80);
    this.timerId = window.setTimeout(this.stepArpeggio, interval);
  };

  public toggle(customUrl?: string): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.audioElement) {
        this.audioElement.pause();
      }
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      return false;
    }

    // Start playing
    if (customUrl) {
      this.playCustomAudio(customUrl);
    } else {
      this.isPlaying = true;
      this.stepArpeggio();
    }

    return true;
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
