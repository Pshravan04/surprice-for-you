import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PixelHeartSVG, PixelFlowerSVG, PixelBouquetSVG } from '../assets/PixelAssets';

const REVEAL_MSG_1 = "IF I COULD GIVE YOU ONE THING IN THIS WORLD, IT WOULD BE THE ABILITY TO SEE YOURSELF THROUGH MY EYES.";
const REVEAL_MSG_2 = "THEN YOU WOULD KNOW HOW SPECIAL YOU ARE TO ME.";

// Renders INSIDE the console screen (position: absolute, inset: 0)
export default function FlowerReveal({ onClose }) {
  const rootRef    = useRef(null);
  const backdropRef= useRef(null);
  const bouquetRef = useRef(null);
  const msgRef     = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Backdrop fades in
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 2. Particles stagger in
    particlesRef.current.forEach((p, i) => {
      if (!p) return;
      tl.fromTo(p,
        { opacity: 0, scale: 0, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(2)' },
        0.05 + i * 0.07
      );
    });

    // 3. Bouquet rises from bottom
    tl.fromTo(bouquetRef.current,
      { y: 60, scale: 0.3, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
      0.3
    );

    // 4. Bouquet gentle float
    tl.to(bouquetRef.current, {
      y: -5, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });

    // 5. Message fades in
    tl.fromTo(msgRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      1.1
    );

    return () => { tl.kill(); };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(bouquetRef.current, { y: 30, opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' }, 0);
    tl.to(msgRef.current,     { opacity: 0, duration: 0.2 }, 0);
    tl.to(backdropRef.current,{ opacity: 0, duration: 0.3 }, 0.1);
  };

  // Small floating pixel decorations
  const particles = [
    { left: '8%',  top: '12%', color: '#F4A6C1', size: 8 },
    { left: '82%', top: '10%', color: '#DCCBFF', size: 7 },
    { left: '15%', top: '55%', color: '#FFE082', size: 6 },
    { left: '78%', top: '50%', color: '#F4A6C1', size: 8 },
    { left: '50%', top: '8%',  color: '#DCCBFF', size: 6 },
    { left: '30%', top: '75%', color: '#FFE082', size: 5 },
    { left: '68%', top: '72%', color: '#F4A6C1', size: 6 },
  ];

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
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: '8px 6px 6px',
      }}
      role="dialog"
      aria-label="Flower surprise"
      aria-modal="true"
    >
      {/* Gradient backdrop */}
      <div
        ref={backdropRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #FFF0F5 0%, #EDE3FF 50%, #F8BBD0 100%)',
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Pixel heart particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            opacity: 0,
            zIndex: 1,
            pointerEvents: 'none',
            animation: `gentleFloat ${1.8 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
          }}
          aria-hidden="true"
        >
          <PixelHeartSVG size={p.size} color={p.color} outline="#725B82" />
        </div>
      ))}

      {/* Bouquet — centred, responsive size */}
      <div
        ref={bouquetRef}
        style={{
          position: 'relative',
          zIndex: 2,
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          width: '100%',
        }}
      >
        {/* size tuned so bouquet fits comfortably inside the handheld console screen */}
        <PixelBouquetSVG size={105} />
      </div>

      {/* Message area */}
      <div
        ref={msgRef}
        style={{
          position: 'relative',
          zIndex: 2,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          width: '100%',
          flexShrink: 0,
        }}
      >
        {/* Romantic text in a mini dialogue box */}
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          border: '2px solid #725B82',
          boxShadow: '2px 2px 0 #725B82',
          padding: '6px 8px',
          width: '100%',
        }}>
          <p style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: 'clamp(0.75rem, 3.2vw, 1rem)',
            color: 'var(--text)',
            lineHeight: 1.45,
            textAlign: 'center',
          }}>
            {REVEAL_MSG_1}
          </p>
          <p style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: 'clamp(0.72rem, 3vw, 0.95rem)',
            color: 'var(--deep-lavender)',
            lineHeight: 1.4,
            textAlign: 'center',
            marginTop: 4,
            fontStyle: 'italic',
          }}>
            {REVEAL_MSG_2}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'clamp(0.3rem, 1.3vw, 0.42rem)',
            color: 'var(--text)',
            background: 'var(--white)',
            border: '2px solid var(--dark-outline)',
            boxShadow: '2px 2px 0 var(--dark-outline)',
            padding: '6px 14px',
            cursor: 'pointer',
            minHeight: '36px',
            letterSpacing: '0.5px',
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-label="Return to game"
        >
          ♡ BACK
        </button>
      </div>
    </div>
  );
}
