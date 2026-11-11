// Realistic Acoustic Hardwood Tap Synthesizer (Impulse-Excited Modal Filter Bank)
// Produces an authentic, dry, warm wooden "tok" without synthetic oscillator sweep.

const SOUND_STORAGE_KEY = "shop_sound_enabled";
const SOUND_CHANGE_EVENT = "woodwork:sound-change";

let audioCtx: AudioContext | null = null;
let sharedImpulseBuffer: AudioBuffer | null = null;

export function isSoundEnabled(): boolean {
  try {
    const saved = localStorage.getItem(SOUND_STORAGE_KEY);
    return saved === null ? true : saved === "true";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
    window.dispatchEvent(new CustomEvent(SOUND_CHANGE_EVENT, { detail: enabled }));
  } catch {
    // Ignore storage errors
  }
}

export function subscribeSoundEnabled(callback: (enabled: boolean) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<boolean>;
    callback(customEvent.detail);
  };
  window.addEventListener(SOUND_CHANGE_EVENT, handler);
  return () => window.removeEventListener(SOUND_CHANGE_EVENT, handler);
}

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
 * Creates a short 18ms physical wooden mallet/knuckle strike impulse buffer.
 * When fed into high-Q resonant bandpass filters, it rings like real dry oak/walnut.
 */
function getStrikeBuffer(ctx: AudioContext): AudioBuffer {
  if (sharedImpulseBuffer && sharedImpulseBuffer.sampleRate === ctx.sampleRate) {
    return sharedImpulseBuffer;
  }

  const duration = 0.018;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    // Sharp initial attack followed by rapid exponential damping
    const env = Math.pow(1 - t, 4.5);
    // Mix of initial Dirac-like click + warm pink-ish grain
    const click = i < 12 ? Math.cos((i / 12) * Math.PI * 0.5) * 1.4 : 0;
    const grain = (Math.random() * 2 - 1) * 0.65;
    data[i] = (click + grain) * env;
  }

  sharedImpulseBuffer = buffer;
  return buffer;
}

function triggerWoodGrainStrike(
  ctx: AudioContext,
  startTime: number,
  fundamentalHz: number,
  volume: number
): void {
  const strike = ctx.createBufferSource();
  strike.buffer = getStrikeBuffer(ctx);

  // Master envelope for this strike
  const outGain = ctx.createGain();
  outGain.gain.setValueAtTime(volume, startTime);
  outGain.gain.exponentialRampToValueAtTime(0.0008, startTime + 0.055);

  // Soft lowpass to remove digital harshness
  const warmthFilter = ctx.createBiquadFilter();
  warmthFilter.type = "lowpass";
  warmthFilter.frequency.setValueAtTime(2400, startTime);
  warmthFilter.Q.setValueAtTime(0.7, startTime);

  outGain.connect(warmthFilter);
  warmthFilter.connect(ctx.destination);

  // 3 acoustic hardwood formant modes (measured oak/walnut block ratios: 1 : 1.54 : 2.36)
  const modes = [
    { ratio: 1.0, q: 14, gain: 1.0, decay: 0.048 },   // Warm hollow wood body
    { ratio: 1.54, q: 16, gain: 0.72, decay: 0.036 }, // Crisp woody knock core ("tok")
    { ratio: 2.36, q: 12, gain: 0.38, decay: 0.022 }, // Surface grain articulation
  ];

  for (const mode of modes) {
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(fundamentalHz * mode.ratio, startTime);
    filter.Q.setValueAtTime(mode.q, startTime);

    const modeGain = ctx.createGain();
    modeGain.gain.setValueAtTime(mode.gain, startTime);
    modeGain.gain.exponentialRampToValueAtTime(0.001, startTime + mode.decay);

    strike.connect(filter);
    filter.connect(modeGain);
    modeGain.connect(outGain);
  }

  // Subtle low-end wooden table thump (short damped sine at 0.5x fundamental)
  const bodyOsc = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  bodyOsc.type = "sine";
  bodyOsc.frequency.setValueAtTime(fundamentalHz * 0.52, startTime);
  bodyOsc.frequency.exponentialRampToValueAtTime(fundamentalHz * 0.36, startTime + 0.024);

  bodyGain.gain.setValueAtTime(volume * 0.22, startTime);
  bodyGain.gain.exponentialRampToValueAtTime(0.0005, startTime + 0.026);

  bodyOsc.connect(bodyGain);
  bodyGain.connect(warmthFilter);

  strike.start(startTime);
  strike.stop(startTime + 0.055);
  bodyOsc.start(startTime);
  bodyOsc.stop(startTime + 0.028);
}

/**
 * Eagerly creates and resumes the AudioContext.
 * Call this as early as possible (ideally inside a user-gesture handler or
 * immediately on page mount when the page was itself reached via a user gesture
 * such as clicking a navigation link).
 * Returns a Promise that resolves once the context is running.
 */
export async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state !== "running") {
    await ctx.resume();
  }
}

/**
 * Plays a realistic, dry, tactile wooden tap sound.
 * - "soft": light oak button / link tap
 * - "deep": heavier walnut block tap (primary actions / add to cart)
 * - "switch": two-part mechanical wooden lamp switch click
 */
export function playWoodTap(
  variant: "soft" | "deep" | "switch" = "soft",
  force = false
): void {
  try {
    if (!force && !isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Micro-variation (±2.5%) so consecutive taps sound naturally human
    const jitter = 0.975 + Math.random() * 0.05;

    if (variant === "switch") {
      // Crisp 2-part vintage lamp pull/toggle click
      triggerWoodGrainStrike(ctx, now, 520 * jitter, 0.42);
      triggerWoodGrainStrike(ctx, now + 0.022, 690 * jitter, 0.55);
      return;
    }

    if (variant === "deep") {
      // Deeper, denser walnut block knock
      triggerWoodGrainStrike(ctx, now, 390 * jitter, 0.65);
      return;
    }

    // Standard crisp Nordic oak tap
    triggerWoodGrainStrike(ctx, now, 475 * jitter, 0.52);
  } catch {
    // Ignore audio context restrictions if blocked by browser policy
  }
}
