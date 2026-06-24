import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AchievementCardData {
  emoji: string;
  category: string;
  year: string;
  title: string;
  badge: string;
  description: string;
  verificationUrl?: string;
  hueA: number;
  hueB: number;
}

const achievementsData: AchievementCardData[] = [
  {
    emoji: "⚙️",
    category: "Professional Certification",
    year: "2026",
    title: "ServiceNow Certified System Administrator (CSA)",
    badge: "CSA",
    description: "Earned the ServiceNow Certified System Administrator credential, demonstrating proficiency in platform administration, user management, workflow automation, configuration, and system maintenance within the ServiceNow ecosystem.",
    verificationUrl: "https://www.credly.com/badges/a4359819-b0ae-451c-b903-869d075bc673/public_url",
    hueA: 200,
    hueB: 240
  },
  {
    emoji: "💻",
    category: "Professional Certification",
    year: "2026",
    title: "ServiceNow Certified Application Developer (CAD)",
    badge: "CAD",
    description: "Earned the ServiceNow Certified Application Developer credential, demonstrating proficiency in building, customizing, and deploying applications using ServiceNow Studio, Flow Designer, scripting, and platform development tools.",
    verificationUrl: "https://www.credly.com/badges/74453dcb-f292-4eaa-970a-f532ebb346f0/public_url",
    hueA: 260,
    hueB: 300
  },
  {
    emoji: "🥇",
    category: "Academic Excellence",
    year: "2025",
    title: "Computer Network and Internet Protocol – NPTEL",
    badge: "TOP 1%",
    description: "Secured a Top 1% rank nationwide in the NPTEL Computer Network and Internet Protocol certification examination among thousands of participants across India.",
    hueA: 45,
    hueB: 65
  },
  {
    emoji: "🏆",
    category: "Competitive Programming",
    year: "2025",
    title: "Infinity Coderz Winner",
    badge: "PU",
    description: "Won the annual university-level coding competition at Parul University through strong algorithmic problem-solving and competitive programming skills.",
    hueA: 15,
    hueB: 35
  },
  {
    emoji: "⚡",
    category: "Competitive Programming",
    year: "2026",
    title: "Code Breakerz Winner",
    badge: "WIN",
    description: "Won the university-level coding competition by outperforming over 100 participants through efficient problem-solving and performance under time constraints.",
    hueA: 80,
    hueB: 110
  }
];

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

interface CardProps {
  data: AchievementCardData;
  i: number;
  theme: string;
  isLoading?: boolean;
}

// Side decoration configurations showing both left and right simultaneously
const leftDecorations = [
  {
    text: "CSA",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-gear">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    text: "CAD",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 5H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" className="anim-bracket-left" />
        <path d="M16 5h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2" className="anim-bracket-right" />
      </svg>
    )
  },
  {
    text: "IP",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-network">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="5" cy="5" r="2"/>
        <circle cx="19" cy="5" r="2"/>
        <circle cx="19" cy="19" r="2"/>
        <circle cx="5" cy="19" r="2"/>
        <line x1="5" y1="5" x2="12" y2="12"/>
        <line x1="19" y1="5" x2="12" y2="12"/>
        <line x1="19" y1="19" x2="12" y2="12"/>
        <line x1="5" y1="19" x2="12" y2="12"/>
      </svg>
    )
  },
  {
    text: "PU",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-infinity">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
      </svg>
    )
  },
  {
    text: "CODE",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-lightning">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }
];

const rightDecorations = [
  {
    text: "ADMIN",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-cloud">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    )
  },
  {
    text: "DEV",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-window">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="9" y1="9" x2="21" y2="9"/>
      </svg>
    )
  },
  {
    text: "NET",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-db">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    )
  },
  {
    text: "WIN",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-trophy">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
      </svg>
    )
  },
  {
    text: "WIN",
    svg: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="anim-term">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )
  }
];

function Card({ data, i, theme, isLoading }: CardProps) {
  const isDark = theme === 'dark';
  const background = `linear-gradient(306deg, ${hue(data.hueA)}, ${hue(data.hueB)})`;
  const containerRef = useRef<HTMLDivElement>(null);

  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
  const cardColor = isDark ? '#ffffff' : '#141414';
  const cardBorder = `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`;

  const cardShadow = isDark
    ? '0 15px 35px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
    : '0 15px 35px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.04)';

  const leftDeco = leftDecorations[i % leftDecorations.length];
  const rightDeco = rightDecorations[i % rightDecorations.length];

  // GSAP ScrollTrigger animation for background outlines and SVGs on scroll
  useEffect(() => {
    if (isLoading) return;

    const el = containerRef.current;
    if (!el) return;

    const decoL = el.querySelector('.side-deco-left');
    const decoR = el.querySelector('.side-deco-right');

    if (!decoL && !decoR) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=20',
        end: 'bottom top+=180',
        scrub: 1.2,
      }
    });

    if (decoL) {
      tl.fromTo(decoL, 
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // SVG Scroll Movements
      if (i === 0) {
        const gear = decoL.querySelector('.anim-gear');
        if (gear) tl.fromTo(gear, { rotation: -180 }, { rotation: 180, ease: 'none' }, 0);
      } else if (i === 1) {
        const bl = decoL.querySelector('.anim-bracket-left');
        const br = decoL.querySelector('.anim-bracket-right');
        if (bl) tl.fromTo(bl, { x: 12 }, { x: -8, ease: 'none' }, 0);
        if (br) tl.fromTo(br, { x: -12 }, { x: 8, ease: 'none' }, 0);
      } else if (i === 2) {
        const net = decoL.querySelector('.anim-network');
        if (net) tl.fromTo(net, { scale: 0.7, rotation: -45 }, { scale: 1.1, rotation: 45, ease: 'none' }, 0);
      } else if (i === 3) {
        const inf = decoL.querySelector('.anim-infinity');
        if (inf) tl.fromTo(inf, { scaleX: 0.6, rotation: -90 }, { scaleX: 1.2, rotation: 90, ease: 'none' }, 0);
      } else if (i === 4) {
        const light = decoL.querySelector('.anim-lightning');
        if (light) tl.fromTo(light, { scale: 0.5, y: -20 }, { scale: 1.2, y: 0, ease: 'none' }, 0);
      }
    }

    if (decoR) {
      tl.fromTo(decoR, 
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // SVG Scroll Movements
      if (i === 0) {
        const cloud = decoR.querySelector('.anim-cloud');
        if (cloud) tl.fromTo(cloud, { scale: 0.6 }, { scale: 1.2, ease: 'none' }, 0);
      } else if (i === 1) {
        const win = decoR.querySelector('.anim-window');
        if (win) tl.fromTo(win, { rotation: -45, y: 20 }, { rotation: 0, y: 0, ease: 'none' }, 0);
      } else if (i === 2) {
        const db = decoR.querySelector('.anim-db');
        if (db) tl.fromTo(db, { y: 30, scale: 0.7 }, { y: 0, scale: 1.1, ease: 'none' }, 0);
      } else if (i === 3) {
        const trophy = decoR.querySelector('.anim-trophy');
        if (trophy) tl.fromTo(trophy, { y: 40, scale: 0.6 }, { y: 0, scale: 1.1, ease: 'none' }, 0);
      } else if (i === 4) {
        const term = decoR.querySelector('.anim-term');
        if (term) tl.fromTo(term, { scale: 0.7, x: 20 }, { scale: 1.1, x: 0, ease: 'none' }, 0);
      }
    }

    return () => {
      // Clean up triggers created for this card container
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [i, isLoading]);

  // Positioned far outside the 500px central stack container to align with user's draw layout margins
  const leftDecoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '35%',
    left: 'calc(50% - 440px)', // Placed far to the left to prevent any overlapping with card/splash
    width: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 0, // Layered behind
  };

  const rightDecoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '35%',
    right: 'calc(50% - 440px)', // Placed far to the right to prevent any overlapping with card/splash
    width: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 0, // Layered behind
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '6.5rem', // Increased size from 4.5rem to fill horizontal space boldly
    lineHeight: '0.8',
    color: 'transparent',
    WebkitTextStroke: `1.5px ${isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.25)'}`, // High visibility contrast
    userSelect: 'none',
    textTransform: 'uppercase',
  };

  const svgStyle: React.CSSProperties = {
    color: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.2)', // High visibility contrast
    marginTop: '8px',
  };

  return (
    <motion.div
      ref={containerRef}
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      {/* Scroll Triggered Decorative Side Elements (Left and Right simultaneously) */}
      <div className="achievements-decoration side-deco-left" style={leftDecoStyle}>
        <span className="side-text" style={textStyle}>{leftDeco.text}</span>
        <span className="side-svg" style={svgStyle}>{leftDeco.svg}</span>
      </div>

      <div className="achievements-decoration side-deco-right" style={rightDecoStyle}>
        <span className="side-text" style={textStyle}>{rightDeco.text}</span>
        <span className="side-svg" style={svgStyle}>{rightDeco.svg}</span>
      </div>

      <div style={{ ...splash, background }} />
      <motion.div
        style={{
          ...card,
          backgroundColor: cardBg,
          color: cardColor,
          border: cardBorder,
          boxShadow: cardShadow,
        }}
        variants={cardVariants}
        className="card"
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              {data.category}
            </span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
            }}>
              {data.year}
            </span>
          </div>

          {/* Emoji */}
          <div style={{ fontSize: '3rem', margin: '12px 0 4px 0', display: 'flex' }}>
            {data.emoji}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            lineHeight: '1.35',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-body)',
          }}>
            {data.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.82rem',
            lineHeight: '1.45',
            color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
            fontWeight: 300,
            margin: '0 0 16px 0',
            flexGrow: 1
          }}>
            {data.description}
          </p>

          {/* Footer badges & links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              fontSize: '0.65rem',
              fontWeight: 600,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
            }}>
              {data.badge}
            </span>

            {data.verificationUrl && (
              <a
                href={data.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-text)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Verify ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Restored original slant pivot spring variants
const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

interface AchievementsProps {
  theme: string;
  isLoading?: boolean;
}

export const Achievements: React.FC<AchievementsProps> = ({ theme, isLoading }) => {
  return (
    <section
      id="achievements"
      style={{
        padding: '120px 24px 20px', // Blends cleanly with the BadgeShowcase immediately below
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hide side decorations on tablet/mobile screens to prevent overlap issues */}
      <style>{`
        @media (max-width: 900px) {
          .achievements-decoration {
            display: none !important;
          }
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px', maxWidth: '800px', textAlign: 'left' }}>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Achievements & Credentials
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              lineHeight: 0.95,
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Achievements &amp; Credentials
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              margin: 0
            }}
          >
            Milestones, contests, and technical certifications that mark my journey as a developer.
          </p>
        </div>

        {/* Scroll Triggered Cards Grid */}
        <div style={container}>
          {achievementsData.map((item, i) => (
            <Card i={i} data={item} theme={theme} isLoading={isLoading} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  margin: "60px auto 100px",
  maxWidth: 500, // Restored original 500 max-width for tight vertical stacking
  paddingBottom: 100,
  width: "100%",
};

const cardContainer: React.CSSProperties = {
  overflow: "visible", // Allowed overflow so side decorations display cleanly
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  paddingBottom: 80,
  marginBottom: -120, // Restored original overlay margin for cards stacking effect
  width: "100%",
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  width: 300, // Restored original card width exactly
  height: 430, // Restored original card height exactly
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 20,
  transformOrigin: "10% 60%", // Restored original transform-pivot origin for slant rotation
  padding: "24px",
  position: "relative",
  zIndex: 2, // Sits above decoration panels
};
