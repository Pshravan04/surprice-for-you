import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { PixelHeartSVG, PixelFlowerSVG, PixelCloudSVG, PixelCharacterSVG } from '../assets/PixelAssets';
import { spawnParticleBurst } from '../utils/animations';
import FlowerReveal from './FlowerReveal';
import QuoteTerminal from './QuoteTerminal';
import '../styles/components.css';

const DIALOGUE = [
  'HEY YOU!',
  'YES, YOU. THE PRETTIEST\nPLAYER IN THIS WORLD.',
  'I HAVE SOMETHING\nSPECIAL FOR YOU...',
];

export default function RetroConsole({ onStart, onQuote }) {
  const consoleRef           = useRef(null);
  const particleContainerRef = useRef(null);
  const typingRef            = useRef(null);

  const [displayText, setDisplayText] = useState('');
  const [isTyping,    setIsTyping]    = useState(false);
  const [showFlower,  setShowFlower]  = useState(false);
  const [showQuote,   setShowQuote]   = useState(false);

  /* ── Typewriter ─────────────────────────── */
  const typeDialogue = useCallback((text) => {
    setIsTyping(true);
    setDisplayText('');
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
      }
    }, 40);
  }, []);

  /* ── Auto-dialogue cycle ─────────────────── */
  useEffect(() => {
    const delays = [600, 2200, 4400];
    const timers = DIALOGUE.map((line, idx) =>
      setTimeout(() => typeDialogue(line), delays[idx])
    );
    return () => { timers.forEach(clearTimeout); clearInterval(typingRef.current); };
  }, [typeDialogue]);

  /* ── Entrance animation ──────────────────── */
  useEffect(() => {
    if (consoleRef.current) {
      gsap.fromTo(consoleRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)', delay: 0.1 }
      );
    }
  }, []);

  /* ── Button click handler ────────────────── */
  const handleButtonClick = useCallback((e, fn) => {
    if (particleContainerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnParticleBurst(particleContainerRef.current, rect.left + rect.width / 2, rect.top, 8);
    }
    fn();
  }, []);

  /* ── START ───────────────────────────────── */
  const handleStart = useCallback((e) => {
    handleButtonClick(e, () => {
      setShowFlower(true);
      setShowQuote(false);
      onStart?.();
    });
  }, [handleButtonClick, onStart]);

  /* ── QUOTE ───────────────────────────────── */
  const handleQuote = useCallback((e) => {
    handleButtonClick(e, () => {
      setShowQuote(true);
      setShowFlower(false);
      onQuote?.();
    });
  }, [handleButtonClick, onQuote]);

  return (
    <div className="retro-console-wrapper">
      {/* Particle container for button burst effects */}
      <div
        ref={particleContainerRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200 }}
      />

      <div className="retro-console" ref={consoleRef} role="main" aria-label="Retro game console">

        {/* ── Brand strip ── */}
        <div className="console-brand-strip">
          <span className="console-brand-label">♡ LITTLE WORLD</span>
          <div className="console-speaker-dots" aria-hidden="true">
            {[...Array(5)].map((_, i) => <div key={i} className="console-speaker-dot" />)}
          </div>
        </div>

        {/* ── Screen bezel + screen ── */}
        <div className="console-screen-bezel">
          <div className="console-screen scanlines">
            {/* Always-present world scene */}
            <PixelWorld />
            {/* Dialogue only when no overlay is open */}
            {!showFlower && !showQuote && (
              <DialogueBox text={displayText} isTyping={isTyping} />
            )}

            {/* FLOWER REVEAL — inside the screen */}
            {showFlower && (
              <FlowerReveal onClose={() => setShowFlower(false)} />
            )}

            {/* QUOTE TERMINAL — inside the screen */}
            {showQuote && (
              <QuoteTerminal onClose={() => setShowQuote(false)} />
            )}
          </div>
        </div>

        {/* ── Hardware controls (decorative) ── */}
        <div className="console-controls" aria-hidden="true">
          <div className="console-dpad">
            <div className="dpad-arm h" />
            <div className="dpad-arm v" />
            <div className="dpad-center" />
          </div>
          <div className="console-mini-buttons">
            <div className="mini-btn" />
            <div className="mini-btn" />
          </div>
          <div className="console-action-buttons">
            <div className="action-btn-row">
              <div className="action-btn purple">B</div>
              <div className="action-btn pink">A</div>
            </div>
          </div>
        </div>

        {/* ── Game control buttons ── */}
        <div className="console-game-controls">
          <button
            className="game-control-btn start-btn"
            onClick={handleStart}
            aria-label="Start the flower surprise"
          >
            <PixelHeartSVG size={12} color="#E91E63" outline="#725B82" />
            START
          </button>
          <button
            className="game-control-btn quote-btn"
            onClick={handleQuote}
            aria-label="Open love letters"
          >
            QUOTE ✿
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Pixel World Scene ───────────────────── */
function PixelWorld() {
  const heartsRef = useRef([]);
  useEffect(() => {
    heartsRef.current.forEach((h, i) => {
      if (!h) return;
      gsap.to(h, {
        y: -8 - (i % 3) * 3,
        duration: 2 + i * 0.3,
        yoyo: true, repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });
  }, []);

  return (
    <div className="pixel-world" aria-hidden="true">
      <div className="pw-sky" />
      <div style={{ position: 'absolute', top: 8, right: 14, width: 18, height: 18, background: '#FFE082', border: '2px solid #F9A825', imageRendering: 'pixelated' }} />
      <div style={{ position: 'absolute', top: 10, left: 10 }}><PixelCloudSVG width={40} /></div>
      <div style={{ position: 'absolute', top: 20, left: '55%' }}><PixelCloudSVG width={28} /></div>
      <div className="pw-ground" />
      {[12, 30, 68, '55%', '75%'].map((left, i) => (
        <div key={i} style={{ position: 'absolute', bottom: '28%', left: typeof left === 'string' ? left : left }}>
          <PixelFlowerSVG
            size={14 + (i % 3) * 4}
            petalColor={['#F4A6C1', '#DCCBFF', '#FFE082', '#F4A6C1', '#CE93D8'][i]}
            centerColor="#FFE082"
            stemColor="#7BC47A"
          />
        </div>
      ))}
      {[{ l: '15%', t: '20%', s: 10 }, { l: '72%', t: '28%', s: 8 }, { l: '45%', t: '15%', s: 12 }].map((h, i) => (
        <div key={i} ref={el => heartsRef.current[i] = el} style={{ position: 'absolute', left: h.l, top: h.t }}>
          <PixelHeartSVG size={h.s} color="#F4A6C1" outline="#E91E63" />
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-50%)' }}>
        <PixelCharacterSVG size={28} />
      </div>
    </div>
  );
}

/* ── Dialogue Box ────────────────────────── */
function DialogueBox({ text, isTyping }) {
  return (
    <div className="dialogue-box">
      <div className="dialogue-text" aria-live="polite">
        {text.split('\n').map((line, i) => (
          <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
        ))}
        {isTyping && <span className="cursor" aria-hidden="true">|</span>}
      </div>
      {!isTyping && text && <span className="dialogue-next-hint" aria-hidden="true">▼</span>}
    </div>
  );
}
