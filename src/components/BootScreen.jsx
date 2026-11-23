import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PixelHeartSVG, PixelStarSVG } from '../assets/PixelAssets';
import '../styles/components.css';

const NUM_STARS = 28;

export default function BootScreen({ onComplete }) {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const barRef = useRef(null);
  const heartRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });
      tlRef.current = tl;

      // Stagger stars in
      const stars = containerRef.current?.querySelectorAll('.boot-star');
      tl.fromTo(stars,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: { each: 0.04, from: 'random' }, ease: 'back.out(2)' }
      );

      // Heart pulse
      tl.fromTo(heartRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.3'
      );
      tl.to(heartRef.current, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' });

      // Typewriter line 1
      const typeLine = (el, text, speed = 0.045) => {
        if (!el) return;
        el.style.opacity = 1;
        el.textContent = '';
        const chars = text.split('');
        chars.forEach((ch, i) => {
          tl.call(() => { el.textContent += ch; }, null, `>+${speed}`);
        });
        tl.to({}, { duration: 0.3 }); // pause after line
      };

      typeLine(line1Ref.current, 'INITIALIZING SOMETHING SPECIAL...');
      typeLine(line2Ref.current, 'LOADING A LITTLE WORLD FOR YOU...');
      typeLine(line3Ref.current, 'PLAYER 01: MY FAVORITE PERSON');

      // Loading bar
      tl.to(barRef.current, { width: '100%', duration: 1.6, ease: 'power1.inOut' }, '-=0.5');

      // Final pause then fade out
      tl.to({}, { duration: 0.6 });
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1).kill();
    }
    if (containerRef.current) {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.3, onComplete });
    }
  };

  // Generate star positions deterministically
  const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
    left: `${(i * 37 + 11) % 97}%`,
    top: `${(i * 53 + 7) % 95}%`,
    delay: (i * 0.07) % 1.8,
    animDur: 1.5 + (i % 5) * 0.4,
  }));

  return (
    <div className="boot-screen" ref={containerRef} onClick={handleSkip} aria-label="Skip intro">
      <div className="boot-stars" aria-hidden="true">
        {stars.map((s, i) => (
          <div
            key={i}
            className="boot-star"
            style={{
              left: s.left,
              top: s.top,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.animDur}s`,
              animation: `twinkle ${s.animDur}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="boot-center">
        <div ref={heartRef}>
          <PixelHeartSVG size={48} color="#F4A6C1" outline="#725B82" />
        </div>

        <div className="boot-text-block">
          <div className="boot-line" ref={line1Ref} aria-live="polite">&nbsp;</div>
          <div className="boot-line" ref={line2Ref} aria-live="polite">&nbsp;</div>
          <div className="boot-line player" ref={line3Ref} aria-live="polite">&nbsp;</div>
        </div>

        <div className="boot-loading-bar-wrap" aria-hidden="true">
          <div className="boot-loading-bar" ref={barRef} />
        </div>

        <div className="boot-skip">TAP TO SKIP</div>
      </div>
    </div>
  );
}
