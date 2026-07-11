import React, { useEffect, useRef } from 'react';
import { motion as motionFramer, useMotionValue as useMotionValueFramer, useTransform as useTransformFramer } from 'framer-motion';
import { gsap } from 'gsap';
import { ASSETS } from '../lib/assetsConfig';

interface HeroProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ placeholderRef, theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  // Parallax mouse effect values using framer motion
  const mouseX = useMotionValueFramer(0);
  const mouseY = useMotionValueFramer(0);

  // Map mouse movement to subtle translations
  const textX = useTransformFramer(mouseX, [-500, 500], [-15, 15]);
  const textY = useTransformFramer(mouseY, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = clientX - width / 2;
      const y = clientY - height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // GSAP Intro Loader Animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.fromTo(
      [nameRef.current, digitalRef.current],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15 }
    );

    tl.fromTo(
      [designerRef.current, descRef.current],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15 },
      '-=0.8'
    );
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Main Grid Wrapper matching image layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px 1fr',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1400px', // Expanded layout width to give columns more breathing room
          zIndex: 1,
          gap: '20px',
        }}
        className="hero-grid"
      >
        {/* Left text column */}
        <motionFramer.div
          style={{
            x: textX,
            y: textY,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end', // Aligned to the right to anchor next to the card
            justifyContent: 'center',
            textAlign: 'right',
            paddingRight: '35px', // Exact symmetric gap from the card (matches paddingLeft on right)
          }}
          className="hero-left"
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Name - Absolutely positioned above FULLSTACK on desktop, starts at leftmost edge */}
            <div 
              ref={nameRef} 
              className="hero-name-wrapper"
              style={{ 
                position: 'absolute', 
                bottom: '100%', 
                left: '15px', // Shifted slightly right to align perfectly with the "F" in FULLSTACK
                marginBottom: '12px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <h1
                id="hero-title"
                style={{
                  fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', // Increased size
                  fontWeight: 700, // Antonio bold weight
                  letterSpacing: '0.08em',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-display)', // Antonio font
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Vinayak Patel
              </h1>
            </div>
            {/* FULLSTACK */}
            <div ref={digitalRef} style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4.2rem, 7.8vw, 6.8rem)', // Increased size
                  lineHeight: 0.9,
                  fontWeight: 700, // Antonio bold weight
                  color: 'var(--text-primary)',
                  margin: 0,
                  padding: '0.05em 0', // Prevents clipping at top and bottom
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                FULLSTACK
              </div>
            </div>
          </div>
        </motionFramer.div>

        {/* Center column - Portrait Image Placeholder */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '490px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="hero-center"
        >
          <div
            ref={placeholderRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              overflow: 'hidden',
              position: 'relative',
            }}
            className="hero-portrait-placeholder"
          >
            {/* Mobile only static image fallback */}
            <img
              src={theme === 'light' ? ASSETS.hero.light : ASSETS.hero.dark}
              alt="Vinayak Patel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
              className="mobile-portrait-fallback"
            />
          </div>
        </div>

        {/* Right text column */}
        <motionFramer.div
          style={{
            x: textX,
            y: textY,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            textAlign: 'left',
            paddingLeft: '35px', // Pulled closer to the card boundary
            paddingRight: '15px', // Prevents screen overflow
          }}
          className="hero-right"
        >
          <div style={{ position: 'relative', width: '100%' }}>
            {/* DEVELOPER */}
            <div ref={designerRef} style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4.2rem, 7.8vw, 6.8rem)', // Increased size
                  lineHeight: 0.9,
                  fontWeight: 700, // Antonio bold weight
                  color: 'var(--text-primary)',
                  margin: 0,
                  padding: '0.05em 0', // Prevents clipping at top and bottom
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                DEVELOPER
              </div>
            </div>
            {/* Description - Absolutely positioned below DEVELOPER on desktop */}
            <div 
              ref={descRef} 
              className="hero-desc-wrapper"
              style={{ 
                position: 'absolute', 
                top: '100%', 
                left: '38%', // Starts under the second 'E' of DEVELOPER
                width: '62%', // Aligns right edge with 'R' of DEVELOPER (38% + 62% = 100%)
                marginTop: '16px',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.15rem',
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Building scalable applications, AI-powered solutions, and modern digital experiences.
              </p>
            </div>
          </div>
        </motionFramer.div>
      </div>

      {/* Global CSS overrides for the layout grid responsiveness */}
      <style>{`
        @media (min-width: 901px) {
          .mobile-portrait-fallback {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .hero-portrait-placeholder {
            border: 1px solid var(--border-color) !important;
            box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
          }
        }
        @media (min-width: 992px) and (max-width: 1280px) {
          .hero-right {
            padding-left: 10px !important;
          }
        }
        @media (max-width: 991px) {
          .hero-section {
            min-height: auto !important;
            padding: 140px 24px 50px !important; /* Added top padding to push text below the floating navbar */
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            gap: 24px !important; /* Reduced row gaps */
          }
          .hero-left, .hero-right {
            align-items: center !important;
            text-align: center !important;
            padding: 0 !important;
          }
          .hero-center {
            max-width: 380px !important;
            height: 420px !important; /* Restored original height */
            margin: 0 auto !important;
          }
          .hero-portrait-placeholder {
            max-width: 320px !important;
            height: 410px !important; /* Restored original height */
          }
          .hero-name-wrapper, .hero-desc-wrapper {
            position: static !important;
            margin: 8px 0 0 !important;
            transform: none !important;
            width: auto !important;
            max-width: none !important;
            text-align: center !important;
          }
          .hero-desc-wrapper p {
            max-width: 280px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 767px) {
          .hero-section {
            padding: 120px 16px 30px !important; /* Added top padding to push text below the floating navbar */
          }
          .hero-grid {
            gap: 16px !important; /* Even smaller gaps for phone screens */
          }
          .hero-center {
            max-width: 380px !important;
            height: 420px !important; /* Keep original large size on phone as well */
          }
          .hero-portrait-placeholder {
            max-width: 320px !important;
            height: 410px !important; /* Keep original large size on phone as well */
          }
        }
      `}</style>
    </section>
  );
};
