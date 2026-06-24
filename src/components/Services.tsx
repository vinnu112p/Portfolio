import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { ASSETS } from '../lib/assetsConfig';

interface ServicesProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
  onHeightChange: () => void;
}

interface AccordionItem {
  id: number;
  title: string;
  items: string[];
  techStack: string[];
  previewImage: string;
}

export const Services: React.FC<ServicesProps> = ({ placeholderRef, onHeightChange }) => {
  const [openSection, setOpenSection] = useState<number | null>(1); // Expanded by default on 1
  const [hoveredItem, setHoveredItem] = useState<AccordionItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const accordionItems: AccordionItem[] = [
    {
      id: 1,
      title: 'FULL-STACK APPLICATIONS',
      items: [
        'Responsive Frontend Development',
        'Backend API Development',
        'Authentication Systems',
        'Database Integration',
        'Deployment & Optimization'
      ],
      techStack: ['HTML', 'CSS', 'JavaScript', 'React', 'Flask', 'SQLAlchemy'],
      previewImage: ASSETS.services.planora
    },
    {
      id: 2,
      title: 'AI-POWERED PRODUCTS',
      items: [
        'Resume Analysis Systems',
        'AI Integrations',
        'Smart Recommendations',
        'Automation Workflows'
      ],
      techStack: ['Python', 'OpenAI APIs', 'Vector Databases'],
      previewImage: ASSETS.services.goalflows
    },
    {
      id: 3,
      title: 'JAVA & DSA SOLUTIONS',
      items: [
        'Object-Oriented Programming',
        'Collections Framework',
        'Problem Solving',
        'Data Structures',
        'Algorithms'
      ],
      techStack: ['Java', 'JDBC', 'DSA'],
      previewImage: ASSETS.services.algopush
    },
    {
      id: 4,
      title: 'MODERN WEB EXPERIENCES',
      items: [
        'Interactive Websites',
        'Responsive Design',
        'GSAP Animations',
        'UI Engineering'
      ],
      techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Tailwind CSS'],
      previewImage: ASSETS.services.shrituui
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenSection(openSection === id ? null : id);
    // Let height complete transitions then trigger ScrollTrigger refresh
    setTimeout(() => {
      onHeightChange();
    }, 350);
  };

  return (
    <section
      id="about" // Maintain ID for observers and navigation
      ref={containerRef}
      style={{
        padding: '120px 24px 140px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Grid Wrapper */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '60px',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
          className="services-grid"
        >
          {/* Left Column - Services & Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
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
                WHAT I CAN DO FOR YOU
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                }}
              >
                I build modern digital products, AI-powered solutions, and scalable web applications focused on solving real-world problems.
              </p>
            </div>

            {/* Accordion list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {accordionItems.map((item) => {
                const isOpen = openSection === item.id;
                const isHovered = hoveredItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`services-row ${isHovered ? 'is-hovered' : ''}`}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      padding: '24px 0',
                      position: 'relative',
                    }}
                  >
                    {/* Diagonal fill hover background overlay */}
                    <div className="services-row-hover-bg" />

                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="services-btn"
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: 0,
                        color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.8rem',
                        letterSpacing: '0.05em',
                        transition: 'color 0.2s ease',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <span>
                        {item.id}. {item.title}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={20} className="services-chevron" style={{ color: isOpen ? 'var(--accent)' : 'inherit', transition: 'color 0.2s ease' }} />
                      ) : (
                        <ChevronDown size={20} className="services-chevron" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} />
                      )}
                    </button>

                    {/* Collapsible content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}
                        >
                          <div style={{ padding: '16px 8px 8px' }}>
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginBottom: '20px',
                              }}
                            >
                              {item.items.map((bullet, idx) => (
                                <li
                                  key={idx}
                                  className="services-bullet"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'var(--font-body)',
                                    transition: 'color 0.2s ease',
                                  }}
                                >
                                  <span
                                    className="services-check-circle"
                                    style={{
                                      width: '18px',
                                      height: '18px',
                                      borderRadius: '50%',
                                      backgroundColor: 'var(--exp-accent-dim-bullet, rgba(216,255,79,0.1))',
                                      border: '1px solid var(--accent)',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      flexShrink: 0,
                                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                                    }}
                                  >
                                    <Check size={10} strokeWidth={3} className="services-check-icon" style={{ color: 'var(--accent)', transition: 'color 0.2s ease' }} />
                                  </span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>

                            {/* Tech Stack tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {item.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="services-tech-tag"
                                  style={{
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'var(--font-body)',
                                    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
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
              className="services-portrait-placeholder"
            >
              {/* Mobile only static image fallback displaying workspace back face */}
              <img
                src={ASSETS.workspaceBack}
                alt="Workspace preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'rotate(-6deg) scale(1.05)',
                }}
                className="mobile-portrait-fallback"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Previews */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              left: mousePos.x + 20,
              top: mousePos.y - 120,
              pointerEvents: 'none',
              zIndex: 99,
              width: '220px',
              height: '140px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
              border: '1px solid var(--border-color)',
              backgroundColor: '#141414',
            }}
            className="hover-preview-image"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={hoveredItem.id}
                src={hoveredItem.previewImage}
                alt="Project preview"
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .services-row {
          position: relative;
          transition: border-color 0.3s ease;
        }

        .services-row-hover-bg {
          position: absolute;
          inset: 0 -16px;
          border-radius: 16px;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .services-row.is-hovered .services-row-hover-bg {
          opacity: 1;
        }

        .services-row-hover-bg::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 350%;
          background-color: var(--accent);
          z-index: -1;
          transform: translate(-50%, -50%) rotate(45deg) translateY(100%);
          transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .services-row.is-hovered .services-row-hover-bg::before {
          transform: translate(-50%, -50%) rotate(45deg) translateY(0);
        }

        /* Hover overrides for active / hovered state */
        .services-row.is-hovered .services-btn {
          color: var(--accent-text) !important;
        }

        .services-row.is-hovered .services-chevron {
          color: var(--accent-text) !important;
        }

        .services-row.is-hovered .services-bullet {
          color: var(--accent-text) !important;
        }

        .services-row.is-hovered .services-check-circle {
          background-color: rgba(0, 0, 0, 0.08) !important;
          border-color: var(--accent-text) !important;
        }

        [data-theme='light'] .services-row.is-hovered .services-check-circle {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }

        .services-row.is-hovered .services-check-icon {
          color: var(--accent-text) !important;
        }

        .services-row.is-hovered .services-tech-tag {
          background-color: rgba(0, 0, 0, 0.05) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
          color: var(--accent-text) !important;
        }

        [data-theme='light'] .services-row.is-hovered .services-tech-tag {
          background-color: rgba(255, 255, 255, 0.15) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: var(--accent-text) !important;
        }

        @media (min-width: 901px) {
          .mobile-portrait-fallback {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .hover-preview-image {
            display: none !important;
          }
          .services-portrait-placeholder {
            border: 1px solid var(--border-color) !important;
            box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .services-portrait-placeholder {
            max-width: 320px !important;
            height: 410px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
};
