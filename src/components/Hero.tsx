import React, { useEffect, useRef } from 'react';
import { motion as motionFramer, useMotionValue as useMotionValueFramer, useTransform as useTransformFramer } from 'framer-motion';
import { gsap } from 'gsap';
import { ASSETS } from '../lib/assetsConfig';

interface HeroProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
}

export const Hero: React.FC<HeroProps> = ({ placeholderRef }) => {
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
          maxWidth: '1200px',
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            textAlign: 'left',
          }}
          className="hero-left"
        >
          <div ref={nameRef} style={{ overflow: 'hidden' }}>
            <h1
              id="hero-title"
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                margin: 0,
              }}
            >
              Vinayak Patel
            </h1>
          </div>
          <div ref={digitalRef} style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                lineHeight: 0.85,
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              FULL STACK
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
              src={ASSETS.duncanPortrait}
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
            paddingLeft: '16px',
          }}
          className="hero-right"
        >
          <div ref={designerRef} style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                lineHeight: 0.85,
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              DEVELOPER
            </div>
          </div>
          <div ref={descRef} style={{ overflow: 'hidden' }}>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.15rem',
                lineHeight: '1.5',
                marginTop: '16px',
                maxWidth: '280px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Building scalable applications, AI-powered solutions, and modern digital experiences.
            </p>
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
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            gap: 40px !important;
          }
          .hero-left, .hero-right {
            align-items: center !important;
            text-align: center !important;
            padding: 0 !important;
          }
          .hero-center {
            max-width: 380px !important;
            height: 420px !important;
            margin: 0 auto !important;
          }
          .hero-portrait-placeholder {
            max-width: 320px !important;
            height: 410px !important;
          }
        }
      `}</style>
    </section>
  );
};
