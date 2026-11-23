import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { PixelHeartSVG } from '../assets/PixelAssets';

const QUOTES = [
  "YOU MAKE ORDINARY DAYS\nFEEL A LITTLE MORE MAGICAL.",
  "IF LIFE WAS A GAME,\nYOU WOULD ALWAYS BE\nMY FAVORITE PART.",
  "I DON'T NEED A PERFECT WORLD.\nI JUST NEED LITTLE\nMOMENTS WITH YOU.",
  "YOU ARE MY FAVORITE NOTIFICATION,\nMY FAVORITE THOUGHT,\nAND MY FAVORITE PERSON.",
  "NO MATTER HOW MANY LEVELS\nLIFE HAS, I WOULD ALWAYS\nCHOOSE TO PLAY THEM WITH YOU.",
  "YOU DESERVE EVERY FLOWER\nIN EVERY GARDEN.",
  "AND IF I HAD TO START THIS GAME\nA THOUSAND TIMES,\nI WOULD STILL LOOK FOR YOU.",
];

// Renders INSIDE the console screen (position: absolute, inset: 0)
export default function QuoteTerminal({ onClose }) {
  const rootRef    = useRef(null);
  const windowRef  = useRef(null);
  const messageRef = useRef(null);
  const typingRef  = useRef(null);

  const [quoteIdx,     setQuoteIdx]     = useState(0);
  const [displayText,  setDisplayText]  = useState('');
  const [isTyping,     setIsTyping]     = useState(false);
  const [isEnd,        setIsEnd]        = useState(false);

  /* ── Typewriter ─────────────────────── */
  const typeText = useCallback((text) => {
    setIsTyping(true);
    setDisplayText('');
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
      }
    }, 28);
  }, []);

  /* ── Animate in + first quote on mount ─── */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(rootRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    tl.fromTo(windowRef.current,
      { opacity: 0, scale: 0.9, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' },
      '-=0.1'
    );
    tl.call(() => typeText(QUOTES[0]));
    return () => { tl.kill(); clearInterval(typingRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Next message ───────────────────── */
  const handleNext = useCallback(() => {
    if (isTyping) {
      clearInterval(typingRef.current);
      setDisplayText(QUOTES[quoteIdx]);
      setIsTyping(false);
      return;
    }
    const next = quoteIdx + 1;
    if (next >= QUOTES.length) { setIsEnd(true); return; }

    if (messageRef.current) {
      gsap.to(messageRef.current, {
        opacity: 0, y: -8, duration: 0.2,
        onComplete: () => {
          setQuoteIdx(next);
          typeText(QUOTES[next]);
          gsap.fromTo(messageRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
          );
        }
      });
    }
  }, [quoteIdx, isTyping, typeText]);

  /* ── Close ──────────────────────────── */
  const handleClose = useCallback(() => {
    gsap.to(rootRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  }, [onClose]);

  /* ── Play again ─────────────────────── */
  const handlePlayAgain = useCallback(() => {
    setQuoteIdx(0);
    setIsEnd(false);
    setDisplayText('');
    setTimeout(() => typeText(QUOTES[0]), 100);
  }, [typeText]);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #EDE3FF 0%, #DCCBFF 60%, #F8BBD0 100%)',
        opacity: 0,
        padding: 8,
      }}
      role="dialog"
      aria-label="Love letter terminal"
      aria-modal="true"
    >
      {/* Terminal window */}
      <div
        ref={windowRef}
        style={{
          width: '100%',
          background: 'linear-gradient(160deg, #FFF0F5 0%, #EDE3FF 100%)',
          border: '2px solid #725B82',
          boxShadow: '3px 3px 0 #725B82',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: '10px 10px 8px',
          opacity: 0,
        }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #725B82', paddingBottom: 6 }}>
          <div style={{ animation: 'gentleFloat 2s ease-in-out infinite' }}>
            <PixelHeartSVG size={12} color="#F4A6C1" outline="#725B82" />
          </div>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(0.28rem, 1.3vw, 0.4rem)', color: 'var(--text)', flex: 1, letterSpacing: 1 }}>
            LOVE.LETTERS.EXE
          </span>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.3rem', color: 'var(--dark-outline)', opacity: 0.6 }}>
            {isEnd ? '✦' : `${quoteIdx + 1}/${QUOTES.length}`}
          </span>
        </div>

        {/* Message */}
        <div ref={messageRef} style={{ minHeight: 70, display: 'flex', alignItems: 'flex-start' }} aria-live="polite">
          {!isEnd ? (
            <span style={{ fontFamily: 'var(--font-terminal)', fontSize: 'clamp(0.95rem, 4vw, 1.3rem)', color: 'var(--text)', lineHeight: 1.5 }}>
              {displayText.split('\n').map((line, i) => (
                <span key={i}>{line}{i < displayText.split('\n').length - 1 && <br />}</span>
              ))}
              {isTyping && <span className="cursor" aria-hidden="true">█</span>}
            </span>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(0.3rem, 1.5vw, 0.46rem)', color: 'var(--deep-lavender)', marginBottom: 8 }}>
                END OF TRANSMISSION ♡
              </div>
              <div style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(0.75rem, 3vw, 0.95rem)', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.6 }}>
                "But my love for you has no end."
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {!isEnd ? (
            <button
              onClick={handleNext}
              style={{
                fontFamily: 'var(--font-pixel)', fontSize: 'clamp(0.3rem, 1.3vw, 0.42rem)',
                color: '#fff', background: 'var(--deep-lavender)',
                border: '2px solid var(--dark-outline)', boxShadow: '2px 2px 0 var(--dark-outline)',
                padding: '8px', cursor: 'pointer', width: '100%', minHeight: 36,
                WebkitTapHighlightColor: 'transparent', letterSpacing: '0.5px',
              }}
            >
              {isTyping ? 'SKIP ▶▶' : 'NEXT MESSAGE →'}
            </button>
          ) : (
            <button
              onClick={handlePlayAgain}
              style={{
                fontFamily: 'var(--font-pixel)', fontSize: 'clamp(0.3rem, 1.3vw, 0.42rem)',
                color: '#fff', background: 'var(--deep-lavender)',
                border: '2px solid var(--dark-outline)', boxShadow: '2px 2px 0 var(--dark-outline)',
                padding: '8px', cursor: 'pointer', width: '100%', minHeight: 36,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              ♡ PLAY AGAIN
            </button>
          )}
          <button
            onClick={handleClose}
            style={{
              fontFamily: 'var(--font-pixel)', fontSize: 'clamp(0.28rem, 1.2vw, 0.4rem)',
              color: 'var(--text)', background: 'var(--white)',
              border: '2px solid var(--dark-outline)', boxShadow: '2px 2px 0 var(--dark-outline)',
              padding: '7px', cursor: 'pointer', width: '100%', minHeight: 32,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );
}
