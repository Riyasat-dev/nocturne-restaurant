// Pure Web Audio API synthesized cinematic sound effects (zero external files required)
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playIgnition() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Warm bass surge
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.exponentialRampToValueAtTime(140, now + 0.3);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.exponentialRampToValueAtTime(0.35, now + 0.25);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.5);

      // 2. High chime / flint spark shimmer
      const sparkOsc = this.ctx.createOscillator();
      const sparkGain = this.ctx.createGain();
      sparkOsc.type = 'triangle';
      sparkOsc.frequency.setValueAtTime(587.33, now); // D5
      sparkOsc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      sparkGain.gain.setValueAtTime(0.12, now);
      sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      sparkOsc.connect(sparkGain);
      sparkGain.connect(this.ctx.destination);
      sparkOsc.start(now);
      sparkOsc.stop(now + 0.9);

      // 3. Start subtle background nocturnal room warmth
      this.startSubtleHum();
    } catch {
      // Audio autoplay policy or error safely caught
    }
  }

  playDoorOpen() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Heavy brass latch click
      const latchOsc = this.ctx.createOscillator();
      const latchGain = this.ctx.createGain();
      latchOsc.type = 'triangle';
      latchOsc.frequency.setValueAtTime(220, now);
      latchOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      latchGain.gain.setValueAtTime(0.2, now);
      latchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      latchOsc.connect(latchGain);
      latchGain.connect(this.ctx.destination);
      latchOsc.start(now);
      latchOsc.stop(now + 0.15);

      // Deep wooden threshold creak / air displacement
      const doorOsc = this.ctx.createOscillator();
      const doorGain = this.ctx.createGain();
      doorOsc.type = 'sine';
      doorOsc.frequency.setValueAtTime(75, now + 0.1);
      doorOsc.frequency.linearRampToValueAtTime(55, now + 1.6);

      doorGain.gain.setValueAtTime(0.0001, now + 0.1);
      doorGain.gain.linearRampToValueAtTime(0.15, now + 0.4);
      doorGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      doorOsc.connect(doorGain);
      doorGain.connect(this.ctx.destination);
      doorOsc.start(now + 0.1);
      doorOsc.stop(now + 2.1);
    } catch {
      // safely ignored
    }
  }

  playDiningArrival() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Crystal wine glass chime
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(1046.5, now); // C6

      bellGain.gain.setValueAtTime(0.1, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      bellOsc.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bellOsc.start(now);
      bellOsc.stop(now + 2.3);
    } catch {
      // safely ignored
    }
  }

  startSubtleHum() {
    if (this.isMuted || this.ambientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, now + 2.0);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, now); // A1

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(110, now); // A2

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start(now);
      this.ambientOsc2.start(now);
    } catch {
      // safely ignored
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      if (this.isMuted) {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
      } else {
        this.ambientGain.gain.setValueAtTime(0.0001, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.04, now + 1.0);
      }
    }
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
