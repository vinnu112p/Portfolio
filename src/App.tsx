import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { useLenis } from './lib/useLenis';
import { Analytics } from '@vercel/analytics/react';
import { ASSETS } from './lib/assetsConfig';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutMe } from './components/AboutMe';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { BadgeShowcase } from './components/BadgeShowcase';
import { CurrentFocus } from './components/CurrentFocus';
import { Contact } from './components/Contact';
import { GrainyBackground } from './components/GrainyBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const newReleases = [
  {
    title: 'AlgoPush',
    url: 'https://algopush.vercel.app/',
    image: ASSETS.scrollPreviews.algopush,
    scrollDuration: 8, // Short screenshot, fast cycle
  },
  {
    title: 'Planora',
    url: 'https://goplanora.vercel.app/',
    image: ASSETS.scrollPreviews.planora,
    scrollDuration: 14, // Taller screenshot, longer duration
  },
  {
    title: 'Shritu Website',
    url: 'https://shritu.com/',
    image: ASSETS.scrollPreviews.shritu,
    scrollDuration: 18, // Tallest screenshot, longest duration
  }
];

function App() {
  useLenis();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHiRemoved, setIsHiRemoved] = useState<boolean>(false);
  const [activeReleaseIndex, setActiveReleaseIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'project' | 'achievement' | 'service'>('default');
  const [isHeroHovered, setIsHeroHovered] = useState<boolean>(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(true);

  // Scroll Progress Bar logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Auto-cycle through new releases dynamically based on their specific duration, but pause if the modal is open!
  useEffect(() => {
    if (isPreviewOpen) return;

    const duration = newReleases[activeReleaseIndex].scrollDuration * 1000;
    const timer = setTimeout(() => {
      setActiveReleaseIndex((prev) => (prev + 1) % newReleases.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeReleaseIndex, isPreviewOpen]);


  // Refs for 3-placeholder ScrollTrigger transition
  const heroPlaceholderRef = useRef<HTMLDivElement>(null);
  const servicesPlaceholderRef = useRef<HTMLDivElement>(null);
  const aboutPlaceholderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Sync theme with body/document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Preloader duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for scroll to fade out/in the 'Hi' badge in the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsHiRemoved(true);
      } else {
        setIsHiRemoved(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Custom Cursor follower logic using GSAP quickTo (Inertia + Event Delegation)
  useEffect(() => {
    if (isLoading) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Position custom cursor off-screen initially
    gsap.set(cursor, { x: -100, y: -100 });

    // 0.3s duration + power3.out ease gives it a smooth, liquid inertia feel
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // Mathematically center the cursor follower on the mouse pointer
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .nav-item-btn, .resume-btn');
      const hoverable = target.closest('[data-cursor]');

      if (isInteractive) {
        setCursorState('pointer');
      } else if (hoverable) {
        const cursorType = hoverable.getAttribute('data-cursor') as any;
        setCursorState(cursorType || 'default');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isLoading]);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'about', 'about-me', 'experience', 'projects', 'skills', 'achievements', 'current-focus', 'contact'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(
              sectionId === 'about-me' ? 'about' :
                sectionId === 'current-focus' ? 'focus' :
                  sectionId
            );
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [isLoading]);

  // ScrollTrigger card layout transition setup (using native sticky track layout)
  const initScrollTrigger = useCallback(() => {
    // Disable card movements and scroll trigger animations on tablet and mobile viewports
    if (window.innerWidth <= 991) {
      const existing = ScrollTrigger.getById('app-portrait-card-trigger');
      if (existing) {
        existing.kill();
      }
      return;
    }

    if (
      !heroPlaceholderRef.current ||
      !servicesPlaceholderRef.current ||
      !aboutPlaceholderRef.current ||
      !wrapperRef.current ||
      !cardRef.current
    ) {
      return;
    }

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const wrapperHeight = wrapperRect.height;
    const totalScroll = wrapperHeight - window.innerHeight;

    if (totalScroll <= 0) return;

    // Kill existing ScrollTriggers created by App.tsx to avoid duplication
    const existing = ScrollTrigger.getById('app-portrait-card-trigger');
    if (existing) {
      existing.kill();
    }

    // Calculate vertical scroll landmarks based on centers of placeholders
    const wrapperTop = wrapperRect.top + window.scrollY;
    const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;

    const servicesRect = servicesPlaceholderRef.current.getBoundingClientRect();
    const servicesCenterX = servicesRect.left + servicesRect.width / 2;
    const servicesCenterY = servicesRect.top + window.scrollY + servicesRect.height / 2;
    const S_services = servicesCenterY - wrapperTop - window.innerHeight / 2;

    const aboutRect = aboutPlaceholderRef.current.getBoundingClientRect();
    const aboutCenterY = aboutRect.top + window.scrollY + aboutRect.height / 2;
    const S_about = aboutCenterY - wrapperTop - window.innerHeight / 2;

    // Dynamically calculate horizontal translation to align centers perfectly
    // The placeholder centers are in the right columns, which places the card further to the right.
    const translationX = servicesCenterX - wrapperCenterX;

    // Position card initially at center of the viewport (aligns with Hero centered placeholder)
    gsap.set(cardRef.current, {
      position: 'relative',
      x: 0,
      y: 0,
      z: 0,
      width: '380px',
      height: '490px',
      rotationZ: 0,
      rotationY: 0,
      rotationX: 0,
      opacity: 1,
      transformPerspective: 1200,
    });

    // Relative timeline progress positions (clamped 0 to 1)
    const p_services = Math.max(0.05, Math.min(0.95, S_services / totalScroll));
    const p_about = Math.max(p_services + 0.1, Math.min(0.98, S_about / totalScroll));

    // Create scroll-linked timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'app-portrait-card-trigger',
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.duration(1.0);

    // Phase 1: Hero → Services (0 → p_services)
    // Translate right + flip 180° continuously
    tl.to(cardRef.current, {
      x: translationX,
      rotationZ: -6,
      rotationY: 166, // 180° flip - 14° tilt to face left
      rotationX: 4,
      transformPerspective: 1200,
      duration: p_services,
      ease: 'none',
    }, 0);

    // Z-depth lift during Phase 1
    tl.to(cardRef.current, {
      z: 120,
      duration: p_services * 0.5,
      ease: 'none',
    }, 0);
    tl.to(cardRef.current, {
      z: 0,
      duration: p_services * 0.5,
      ease: 'none',
    }, p_services * 0.5);

    // Removed legacy scroll badge fade-out animation; badge lifecycle is now state-managed.

    // Phase 2: Services → About Me (p_services → p_about)
    // Flip another 180° continuously — NO PAUSE between sections
    tl.to(cardRef.current, {
      x: translationX,
      rotationZ: -6,
      rotationY: 346, // 360° - 14° tilt to face left
      rotationX: 4,
      transformPerspective: 1200,
      duration: p_about - p_services,
      ease: 'none',
    }, p_services);

    // Z-depth lift during Phase 2
    tl.to(cardRef.current, {
      z: 120,
      duration: (p_about - p_services) * 0.5,
      ease: 'none',
    }, p_services);
    tl.to(cardRef.current, {
      z: 0,
      duration: (p_about - p_services) * 0.5,
      ease: 'none',
    }, p_services + (p_about - p_services) * 0.5);

    // Phase 3: Stay pinned in About Me — card remains visible, no fade out
    tl.to(cardRef.current, {
      duration: 1.0 - p_about,
      ease: 'none',
    }, p_about);

    // Force ScrollTrigger index refresh
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (isLoading || isIntroPlaying) return;

    const timeoutId = setTimeout(initScrollTrigger, 50);

    window.addEventListener('resize', initScrollTrigger);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', initScrollTrigger);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, isIntroPlaying, initScrollTrigger]);

  // Card Intro Flip & Scale animation on page load
  useEffect(() => {
    if (!isLoading && cardRef.current) {
      gsap.fromTo(cardRef.current, {
        scale: 0.3,
        z: -400,
        y: 200,
        rotationX: 180,
        opacity: 0,
      }, {
        scale: 1,
        z: 0,
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 2.2,
        ease: 'power4.out',
        delay: 0.3,
        onComplete: () => {
          setIsIntroPlaying(false);
        }
      });
    }
  }, [isLoading]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Sleek Horizontal Scroll Progress Bar & Track */}
      <div
        className="scroll-progress-track"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--border-color)',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--accent)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 100000,
          pointerEvents: 'none',
        }}
      />

      {/* Custom Cursor follower */}
      <div ref={cursorRef} className={`custom-cursor state-${cursorState}`}>
        <span className="cursor-label">
          {cursorState === 'project' && 'VIEW'}
          {cursorState === 'achievement' && 'AWARD'}
          {cursorState === 'service' && 'MORE'}
        </span>
      </div>

      {/* Noise overlay */}
      <div className="grain-overlay" />

      {/* Animated Grainy Canvas Background (active in dark mode only) */}
      {theme === 'dark' && <GrainyBackground />}

      {/* Premium Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="loader-container"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  letterSpacing: '0.05em',
                  margin: 0,
                  color: '#ffffff'
                }}
              >
                VINAYAK PATEL
              </h1>
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: 'var(--accent)',
                  position: 'relative'
                }}
              >
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '30%',
                    height: '100%',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.85rem', letterSpacing: '0.3em', opacity: 0.5 }}>
                CREATIVE STUDIO
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <div style={{ opacity: 1 }}>
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Global Floating Theme Toggle Button (Centered Bottom, Reduced Size) */}
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 999, // below footer which has 99999
            }}
            className="global-theme-toggle"
          >
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light/Dark Theme"
              style={{
                width: '36px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                cursor: 'pointer',
                outline: 'none',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  position: 'absolute',
                  left: theme === 'dark' ? 'calc(100% - 17px)' : '3px',
                }}
              />
            </button>
          </div>

          {/* Scroll-Linked Animation Wrapper (Hero + Services + AboutMe) */}
          <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>

            {/* Absolute container that tracks the scroll-story height */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 100,
              }}
            >
              {/* Sticky container pinned to viewport */}
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Stacking wrapper to keep the badge outside the 3D transformed card but aligned with it */}
                <div
                  style={{
                    position: 'relative',
                    width: '380px',
                    height: '490px',
                    zIndex: 100,
                  }}
                  onMouseEnter={() => setIsHeroHovered(true)}
                  onMouseLeave={() => setIsHeroHovered(false)}
                >
                  {/* Global Transitioning Portrait Card (Double-Sided) */}
                  <div
                    ref={cardRef}
                    className="shared-portrait-card"
                    style={{
                      pointerEvents: 'auto',
                      transformStyle: 'preserve-3d',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    {/* FRONT FACE (Duncan Portrait) */}
                    <div className="card-face card-face-front">
                      <img
                        src={theme === 'light' ? ASSETS.hero.light : ASSETS.hero.dark}
                        alt="Vinayak Patel"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 20%',
                        }}
                      />
                    </div>

                    {/* BACK FACE (Workspace Preview) */}
                    <div className="card-face card-face-back">
                      <img
                        src={ASSETS.workspaceBack}
                        alt="Workspace Design"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* 3D Extrusion Thickness Layers (forms physical 6px solid depth rim) */}
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="card-thickness-layer"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: theme === 'light' ? '#dedede' : '#141416',
                          borderRadius: '32px',
                          transform: `translateZ(${-3 + idx * 0.54}px)`,
                          pointerEvents: 'none',
                          border: theme === 'light' 
                            ? '1px solid rgba(0, 0, 0, 0.04)' 
                            : '1px solid rgba(255, 255, 255, 0.015)',
                          boxShadow: theme === 'light'
                            ? '0 0 10px rgba(0, 0, 0, 0.05) inset'
                            : '0 0 15px rgba(0, 0, 0, 0.3) inset',
                        }}
                      />
                    ))}
                  </div>

                  {/* Repositioned Draggable green badge with solid hand print icon */}
                  <AnimatePresence>
                    {!isHiRemoved && (
                      <motion.div
                        className="hi-badge-container"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.7,
                          transition: { duration: 0.5, ease: 'easeInOut' }
                        }}
                        style={{
                          position: 'absolute',
                          bottom: '-50px',
                          left: '-35px',
                          zIndex: 200, // Rendered completely on top of the card
                          pointerEvents: 'auto',
                        }}
                      >
                        <motion.div
                          drag
                          dragConstraints={{ left: -120, right: 120, top: -120, bottom: 200 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'grab',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                          }}
                        >
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            color: 'var(--accent-text)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            userSelect: 'none',
                          }}>
                            <AnimatePresence mode="wait">
                              {isHeroHovered ? (
                                <motion.div
                                  key="hand"
                                  initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                                  animate={{ 
                                    scale: 1, 
                                    rotate: [0, -15, 15, -15, 15, 0], 
                                    opacity: 1 
                                  }}
                                  exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
                                  transition={{ duration: 0.45, ease: 'easeOut' }}
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  {/* Waving hand print SVG (matches Hero page hand icon exactly) */}
                                  <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--accent-text)" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c-.55 0-1 .45-1 1v7.15l-1.38-.92c-.55-.36-1.29-.29-1.76.18-.47.47-.54 1.21-.18 1.76l3.37 5.05c1.45 2.17 3.88 3.46 6.5 3.46h.45c1.1 0 2-.9 2-2V9c0-.55-.45-1-1-1s-1 .45-1 1v2h-1V6.5c0-.55-.45-1-1-1s-1 .45-1 1V11h-1V4.5c0-.55-.45-1-1-1s-1 .45-1 1V11h-1V4.5c0-.55-.45-1-1-1s-1 .45-1 1V2z" />
                                  </svg>
                                </motion.div>
                              ) : (
                                <motion.span
                                  key="text"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  Hi
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <Hero placeholderRef={heroPlaceholderRef} theme={theme} />
            <Services placeholderRef={servicesPlaceholderRef} onHeightChange={initScrollTrigger} />
            <AboutMe placeholderRef={aboutPlaceholderRef} theme={theme} />
          </div>

          <Experience />
          <Projects theme={theme} />
          <Skills theme={theme} />
          <Achievements theme={theme} isLoading={isLoading} />
          <BadgeShowcase theme={theme} />
          <CurrentFocus theme={theme} />
          <Contact theme={theme} />

          {/* Persistent Right Side Widgets (Fixed at bottom-right) */}
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-end',
              zIndex: 999,
            }}
            className="fixed-widgets"
          >
            {/* New Release Card */}
            <motion.div
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: 'var(--accent)',
                borderRadius: '16px',
                padding: '12px',
                width: '180px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              }}
              className="new-release-widget"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-text)', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  New Release
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 500, color: 'var(--accent-text)', opacity: 0.6 }}>
                  {activeReleaseIndex + 1}/{newReleases.length}
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  position: 'relative'
                }}
              >
                <img
                  key={activeReleaseIndex}
                  src={newReleases[activeReleaseIndex].image}
                  alt={newReleases[activeReleaseIndex].title}
                  className="mini-scroll-image"
                  style={{
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'block',
                    animation: `human-scroll ${newReleases[activeReleaseIndex].scrollDuration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`
                  }}
                />
              </div>





              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {newReleases[activeReleaseIndex].title}
                </span>
              </div>

              <button
                onClick={() => setIsPreviewOpen(true)}
                style={{
                  width: '100%',
                  backgroundColor: '#1b1b1f',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Preview live
              </button>
            </motion.div>
          </div>

          {/* Live Preview Iframe Modal Overlay */}
          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 10000,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24px',
                }}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{
                    width: '100%',
                    maxWidth: '1200px',
                    height: '85vh',
                    backgroundColor: '#16171a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Mockup Address Bar / Control Header */}
                  <div
                    style={{
                      height: '48px',
                      backgroundColor: '#1b1c20',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px',
                      flexShrink: 0,
                    }}
                  >
                    {/* Traffic Light Windows Dots */}
                    <div style={{ display: 'flex', gap: '6px', width: '80px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                    </div>

                    {/* Address Input */}
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '6px',
                        width: '50%',
                        maxWidth: '500px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: 'monospace',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        padding: '0 10px',
                      }}
                    >
                      🔒 {newReleases[activeReleaseIndex].url}
                    </div>

                    {/* Controls: Prev / Next / Close */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => setActiveReleaseIndex((prev) => (prev - 1 + newReleases.length) % newReleases.length)}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#ffffff',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        ◀ Prev
                      </button>
                      <button
                        onClick={() => setActiveReleaseIndex((prev) => (prev + 1) % newReleases.length)}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#ffffff',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        Next ▶
                      </button>

                      <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

                      <button
                        onClick={() => setIsPreviewOpen(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Iframe Viewport */}
                  <div style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>
                    <iframe
                      src={newReleases[activeReleaseIndex].url}
                      title={`Live preview of ${newReleases[activeReleaseIndex].title}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: '#ffffff',
                      }}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      )}

      {/* Global CSS overrides for the fixed controls on smaller screen sizes */}
      <style>{`
        @keyframes human-scroll {
          0%, 15% {
            transform: translateY(0);
          }
          40%, 60% {
            transform: translateY(calc(-50% + 40px));
          }
          85%, 100% {
            transform: translateY(calc(-100% + 80px));
          }
        }
        .mini-scroll-image {
          /* Defined dynamically inline */
        }
        @media (max-width: 991px) {
          .shared-portrait-card, .hi-badge-container {
            display: none !important;
          }
          .fixed-widgets {
            display: none !important;
          }
        }
      `}</style>
      <Analytics />
    </>
  );
}

export default App;
