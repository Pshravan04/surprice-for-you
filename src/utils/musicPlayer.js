// Global music player state (singleton outside React)
let audio = null;
let currentVolume = 0.5;

// Use a royalty-free, bundled audio file
// We'll generate a simple romantic melody via Web Audio API
// since we can't guarantee an audio file exists.

let audioCtx = null;

/**
 * Creates a simple romantic melody using Web Audio API as fallback.
 * Falls back gracefully if audio context fails.
 */
function createMelodyBuffer(ctx) {
  // Simple waltz-like repeating pattern (C major / relative minor)
  const notes = [
    // Hz, duration in beats
    [523.25, 1], [659.25, 1], [783.99, 1], // C E G
    [698.46, 1], [587.33, 1], [523.25, 2], // F D C (long)
    [587.33, 1], [659.25, 1], [698.46, 1], // D E F
    [659.25, 1], [587.33, 1], [523.25, 2], // E D C (long)
    [440.00, 1], [523.25, 1], [587.33, 1], // A C D
    [523.25, 1], [493.88, 1], [440.00, 2], // C B A (long)
    [392.00, 1], [440.00, 1], [493.88, 1], // G A B
    [523.25, 4],                            // C (long hold)
  ];

  const BPM = 72;
  const beatDur = 60 / BPM;
  const totalDur = notes.reduce((acc, [, d]) => acc + d * beatDur, 0);
  const sr = ctx.sampleRate;
  const buffer = ctx.createBuffer(2, Math.ceil(totalDur * sr), sr);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let offset = 0;
    for (const [freq, beats] of notes) {
      const dur = beats * beatDur;
      const len = Math.ceil(dur * sr);
      for (let i = 0; i < len; i++) {
        const t = i / sr;
        const env = Math.min(1, t * 8) * Math.max(0, 1 - (t - dur * 0.6) / (dur * 0.4));
        // Simple sine + harmonics for a soft piano-like sound
        const sample =
          Math.sin(2 * Math.PI * freq * t) * 0.4 +
          Math.sin(2 * Math.PI * freq * 2 * t) * 0.15 +
          Math.sin(2 * Math.PI * freq * 3 * t) * 0.05;
        data[offset + i] = sample * env * 0.3;
      }
      offset += len;
    }
  }
  return buffer;
}

let bufferSource = null;
let gainNode = null;
let isPlaying = false;

export async function initMusic() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
    return true;
  } catch (e) {
    console.warn('Audio init failed:', e);
    return false;
  }
}

export async function playMusic(volume = 0.5) {
  try {
    if (!audioCtx) await initMusic();
    if (audioCtx.state === 'suspended') await audioCtx.resume();

    if (bufferSource) {
      bufferSource.stop();
      bufferSource.disconnect();
    }

    const buffer = createMelodyBuffer(audioCtx);
    bufferSource = audioCtx.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(gainNode);
    bufferSource.start(0);

    // Fade in
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 1.5);
    currentVolume = volume;
    isPlaying = true;
    return true;
  } catch (e) {
    console.warn('Music play failed:', e);
    return false;
  }
}

export function pauseMusic() {
  if (!gainNode || !audioCtx) return;
  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
  setTimeout(() => {
    if (bufferSource) {
      try { bufferSource.stop(); } catch (_) {}
    }
    isPlaying = false;
  }, 500);
}

export function resumeMusic() {
  if (!isPlaying) {
    playMusic(currentVolume);
  }
}

export function setVolume(vol) {
  currentVolume = vol;
  if (!gainNode || !audioCtx) return;
  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.1);
}

export function getIsPlaying() {
  return isPlaying;
}
