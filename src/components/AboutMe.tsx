import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../lib/assetsConfig';

interface AboutMeProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
}

export const AboutMe: React.FC<AboutMeProps> = ({ placeholderRef }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('loading');
    
    // Simulate pre-download packaging/loading progress
    setTimeout(() => {
      setDownloadState('success');
      
      // Trigger the local file download
      const link = document.createElement('a');
      link.href = '/Vinayak_Patel_Resume.pdf';
      link.download = 'Vinayak_Patel_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset state back to idle after 2.5 seconds
      setTimeout(() => {
        setDownloadState('idle');
      }, 2500);
    }, 2000);
  };
  const stats = [
    { value: '2+', label: 'Years Learning & Building' },
    { value: '10+', label: 'Projects Completed' },
    { value: '100+', label: 'Hours of Development' }
  ];

  const skills = [
    'Frontend Development',
    'Backend Development',
    'Java Development',
    'AI Applications',
    'Database Design',
    'Problem Solving'
  ];

  return (
    <section
      id="about-me"
      style={{
        padding: '120px 24px 140px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '60px',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
          className="aboutme-grid"
        >
          {/* Left Column - Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Header & Bio */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 6vw, 4.8rem)',
                  lineHeight: 0.95,
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  margin: '0 0 20px',
                }}
              >
                ABOUT ME
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  fontSize: '1.15rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                }}
              >
                <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                  Hi, I'm Vinayak.
                </p>
                <p>
                  A Computer Science student and developer focused on building modern web applications, AI-powered solutions, and scalable software solutions.
                </p>
                <p>
                  I enjoy transforming ideas into practical digital experiences while continuously learning new technologies and problem-solving techniques.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                padding: '24px 0',
              }}
              className="aboutme-stats"
            >
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                      color: 'var(--accent)',
                      lineHeight: '1',
                      fontWeight: 'bold',
                      display: 'block',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      lineHeight: '1.3',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Skills Badges */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}
              >
                Core Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <motion.button
                onClick={handleDownload}
                disabled={downloadState !== 'idle'}
                whileHover={downloadState === 'idle' ? { scale: 1.04 } : {}}
                whileTap={downloadState === 'idle' ? { scale: 0.96 } : {}}
                className="resume-btn"
                style={{
                  color: downloadState === 'idle' ? 'var(--accent)' : 'var(--accent-text)',
                  borderColor: downloadState === 'success' ? '#22c55e' : 'var(--accent)',
                  cursor: downloadState === 'idle' ? 'pointer' : 'default',
                }}
              >
                {/* Progress bar background fill */}
                {downloadState === 'loading' && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--accent)',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Success background fill */}
                {downloadState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: '#22c55e',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Content wrapper */}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {downloadState === 'idle' && (
                    <>
                      <span>DOWNLOAD RESUME</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </>
                  )}

                  {downloadState === 'loading' && (
                    <>
                      <span>DOWNLOADING...</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{
                          animation: 'spin 1s linear infinite'
                        }}
                      >
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                        <line x1="2" y1="12" x2="6" y2="12" />
                        <line x1="18" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                      </svg>
                    </>
                  )}

                  {downloadState === 'success' && (
                    <>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      >
                        RESUME SAVED!
                      </motion.span>
                      <motion.svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Right Column - Sticky Portrait Card Placeholder */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              perspective: '1200px',
              width: '100%',
              height: '520px',
              paddingTop: '60px',
            }}
          >
            <div
              ref={placeholderRef}
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '490px',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
              }}
              className="aboutme-portrait-placeholder"
            >
              {/* Mobile only static image fallback displaying front face of card (duncan portrait) */}
              <img
                src={ASSETS.duncanPortrait}
                alt="Portrait preview"
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
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .resume-btn {
          position: relative;
          background-color: transparent;
          border: 1px solid var(--accent);
          border-radius: 9999px;
          padding: 12px 36px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          font-family: var(--font-body);
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: color 0.25s ease-out, border-color 0.25s ease-out, transform 0.2s;
          outline: none;
          z-index: 1;
        }
        .resume-btn:not(:disabled)::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 350%;
          background-color: var(--accent);
          z-index: -1;
          transform: translate(-50%, -50%) rotate(45deg) translateY(100%);
          transition: transform 0.28s cubic-bezier(.25, .46, .45, .94);
        }
        .resume-btn:not(:disabled):hover::before {
          transform: translate(-50%, -50%) rotate(45deg) translateY(0);
        }
        .resume-btn:not(:disabled):hover {
          color: var(--accent-text) !important;
          border-color: var(--accent);
        }
        @media (min-width: 901px) {
          .mobile-portrait-fallback {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .aboutme-portrait-placeholder {
            border: 1px solid var(--border-color) !important;
            box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
          }
          .aboutme-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .aboutme-portrait-placeholder {
            max-width: 320px !important;
            height: 410px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
};
