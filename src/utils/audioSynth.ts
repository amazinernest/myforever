/**
 * Romantic Ambient Piano & Harmony Synthesizer
 * Uses Web Audio API with gentle physical-modeled harmonics and soft envelope shaping
 * to create a beautiful, cinematic romantic soundtrack on demand.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;

  // Romantic chord progression (frequencies in Hz)
  // Dmaj9 -> Bm9 -> Gmaj9 -> Aadd9
  private chords = [
    [146.83, 220.00, 277.18, 369.99, 440.00, 554.37], // Dmaj9 (D3, A3, C#4, F#4, A4, C#5)
    [123.47, 185.00, 246.94, 293.66, 369.99, 440.00], // Bm9 (B2, F#3, B3, D4, F#4, A4)
    [98.00, 146.83, 196.00, 293.66, 369.99, 440.00],  // Gmaj9 (G2, D3, G3, D4, F#4, A4)
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00]  // Aadd9 (A2, E3, A3, C#4, E4, A4)
  ];

  private currentChordIndex = 0;
  private currentNoteIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.22;
      this.gainNode.connect(this.ctx.destination);
    }
  }

  public playCustomAudio(url: string) {
    if (!this.audioElement) {
      this.audioElement = new Audio(url);
      this.audioElement.loop = true;
    }
    this.audioElement.play().catch(() => {});
    this.isPlaying = true;
  }

  private playPianoNote(freq: number, duration = 3.5) {
    if (!this.ctx || !this.gainNode) return;

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (sine with warm triangle blend)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // subtle detune for acoustic warmth

    // Low pass filter to create soft warm felt piano tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.8);
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
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    const freq = chord[this.currentNoteIndex];

    this.playPianoNote(freq, 4.0);

    this.currentNoteIndex++;
    if (this.currentNoteIndex >= chord.length) {
      this.currentNoteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    // Varied arpeggio timing for natural human feel
    const interval = 580 + (Math.sin(Date.now() / 1000) * 80);
    this.timerId = window.setTimeout(this.stepArpeggio, interval);
  };

  public toggle(customUrl?: string): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (customUrl) {
      if (this.isPlaying) {
        this.audioElement?.pause();
        this.isPlaying = false;
      } else {
        this.playCustomAudio(customUrl);
      }
      return this.isPlaying;
    }

    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timerId) clearTimeout(this.timerId);
    } else {
      this.isPlaying = true;
      this.stepArpeggio();
    }

    return this.isPlaying;
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
