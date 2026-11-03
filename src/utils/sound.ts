// Minimalist Web Audio API Acoustic Wood Knock / Tap Synthesizer
// Zero external audio files required — uses modal hardwood resonance synthesis.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a subtle, warm, organic wooden knock/tap sound.
 * Uses 2 hardwood resonant modes (1 : 2.15 ratio) + a soft 8ms filtered transient impact.
 */
export function playWoodTap(variant: "soft" | "deep" | "switch" = "soft"): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Slight natural pitch variation (±3.5%) so consecutive taps feel organic
    const jitter = 0.965 + Math.random() * 0.07;

    const baseFreq =
      variant === "deep"
        ? 235 * jitter
        : variant === "switch"
          ? 340 * jitter
          : 285 * jitter;

    // Master output gain (kept minimalist and gentle)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, now);
    masterGain.connect(ctx.destination);

    // 1. Primary Hardwood Cavity Resonance (Fundamental mode)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(baseFreq * 1.45, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.014);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.92, now + 0.065);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.85, now + 0.002);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    // Low-pass filter to keep the wood tone warm and matte (never harsh)
    const woodFilter = ctx.createBiquadFilter();
    woodFilter.type = "lowpass";
    woodFilter.frequency.setValueAtTime(1100, now);
    woodFilter.Q.setValueAtTime(1.8, now);

    osc1.connect(gain1);
    gain1.connect(woodFilter);
    woodFilter.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.07);

    // 2. Secondary Woodblock Overtone Mode (~2.18x fundamental, decays faster)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 2.18, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.05, now + 0.032);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.35, now + 0.0015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    osc2.connect(gain2);
    gain2.connect(woodFilter);

    osc2.start(now);
    osc2.stop(now + 0.036);

    // 3. Tiny Tactile Knuckle/Finger Impact Transient (8ms bandpass noise burst)
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(baseFreq * 2.6, now);
    bandpass.Q.setValueAtTime(3.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.012);
  } catch {
    // Ignore audio context restrictions if blocked
  }
}
