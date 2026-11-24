// Music player utility using HTML5 Audio for "The Way I Love You" by Michal Leah
let audio = null;
let currentVolume = 0.5;
let isPlaying = false;
let fadeTimer = null;

function getAudio() {
  if (!audio) {
    audio = new Audio('/the-way-i-love-you.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = currentVolume;

    // Fallback to m4a if mp3 has issue in any environment
    audio.addEventListener('error', () => {
      console.warn('Primary mp3 failed, falling back to m4a');
      if (audio && !audio.src.endsWith('.m4a')) {
        audio.src = '/the-way-i-love-you.m4a';
        if (isPlaying) {
          audio.play().catch(e => console.warn('Fallback play error:', e));
        }
      }
    });
  }
  return audio;
}

export async function initMusic() {
  getAudio();
  return true;
}

export async function playMusic(volume = 0.5) {
  try {
    currentVolume = volume;
    const a = getAudio();

    if (fadeTimer) clearInterval(fadeTimer);

    // If starting from stopped, fade in smoothly
    a.volume = 0;
    const playPromise = a.play();
    if (playPromise !== undefined) {
      await playPromise;
    }

    isPlaying = true;

    // Smooth fade in over 1.2 seconds
    const targetVol = volume;
    const step = targetVol / 20;
    fadeTimer = setInterval(() => {
      if (a.volume + step >= targetVol) {
        a.volume = targetVol;
        clearInterval(fadeTimer);
        fadeTimer = null;
      } else {
        a.volume = Math.min(1, a.volume + step);
      }
    }, 60);

    return true;
  } catch (e) {
    console.warn('Playback error (requires user gesture):', e);
    return false;
  }
}

export function pauseMusic() {
  const a = getAudio();
  if (fadeTimer) clearInterval(fadeTimer);

  // Smooth fade out over 300ms
  const step = a.volume / 8;
  fadeTimer = setInterval(() => {
    if (a.volume - step <= 0.05) {
      a.volume = 0;
      a.pause();
      isPlaying = false;
      clearInterval(fadeTimer);
      fadeTimer = null;
    } else {
      a.volume = Math.max(0, a.volume - step);
    }
  }, 40);
}

export function resumeMusic() {
  if (!isPlaying) {
    playMusic(currentVolume);
  }
}

export function setVolume(vol) {
  currentVolume = vol;
  const a = getAudio();
  if (fadeTimer) clearInterval(fadeTimer);
  a.volume = Math.max(0, Math.min(1, vol));
}

export function getIsPlaying() {
  return isPlaying;
}
