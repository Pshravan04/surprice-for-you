import { useState, useCallback, useRef, useEffect } from 'react';
import { playMusic, pauseMusic, setVolume } from '../utils/musicPlayer';

export default function MusicPlayer({ visible, autoStart }) {
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.5);
  const startedRef = useRef(false);

  // Auto-start when autoStart becomes true (after user interaction)
  useEffect(() => {
    if (autoStart && !startedRef.current) {
      startedRef.current = true;
      playMusic(0.5).then(success => {
        if (success) setPlaying(true);
      });
    }
  }, [autoStart]);

  const handleToggle = useCallback(async () => {
    if (playing) {
      pauseMusic();
      setPlaying(false);
    } else {
      const ok = await playMusic(vol);
      if (ok) setPlaying(true);
    }
  }, [playing, vol]);

  const handleVolume = useCallback((e) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    setVolume(v);
  }, []);

  return (
    <div
      className={`music-player${visible ? ' visible' : ''}`}
      role="region"
      aria-label="Music player"
    >
      <button
        className="music-btn"
        onClick={handleToggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause "The Way I Love You"' : 'Play "The Way I Love You" by Michal Leah'}
      >
        {playing ? (
          /* Pause icon pixel-style */
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <rect x="3" y="2" width="4" height="12" fill="#725B82" />
            <rect x="9" y="2" width="4" height="12" fill="#725B82" />
          </svg>
        ) : (
          /* Play icon pixel-style */
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <rect x="3" y="2" width="2" height="12" fill="#725B82" />
            <rect x="5" y="4" width="2" height="8" fill="#725B82" />
            <rect x="7" y="6" width="2" height="4" fill="#725B82" />
            <rect x="9" y="7" width="2" height="2" fill="#725B82" />
          </svg>
        )}
      </button>
      <span
        className="music-label"
        title="Michal Leah - The Way I Love You"
        style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {playing ? '♫ THE WAY I LOVE YOU' : '♫ OFF'}
      </span>
      <input
        type="range"
        className="music-volume"
        min="0"
        max="1"
        step="0.05"
        value={vol}
        onChange={handleVolume}
        aria-label="Volume"
        title="Volume"
      />
    </div>
  );
}
