import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { ASSETS } from '../lib/assetsConfig';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

/* ─── Aceternity-inspired Timeline (vanilla CSS, portfolio theme) ─── */

const Timeline: React.FC<{ data: TimelineEntry[] }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '40px',
            paddingBottom: index === data.length - 1 ? '0' : '80px',
            position: 'relative',
          }}
          className="timeline-row"
        >
          {/* Left column: sticky date label + dot */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              alignSelf: 'flex-start',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '140px',
            }}
            className="timeline-sticky-label"
          >
            {/* Glowing dot */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent), 0 0 24px var(--exp-accent-dim-border)',
                border: '2px solid var(--bg-color)',
                position: 'relative',
                zIndex: 2,
              }}
            />
            {/* Date text */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: 'var(--text-primary)',
                marginTop: '16px',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
              }}
            >
              {item.title}
            </h3>
          </div>

          {/* Right column: content */}
          <div style={{ flex: 1, paddingTop: '4px' }}>
            {/* Mobile-only date header */}
            <h3
              className="timeline-mobile-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                marginBottom: '24px',
                display: 'none',
              }}
            >
              {item.title}
            </h3>
            {item.content}
          </div>
        </div>
      ))}

      {/* Animated scroll beam line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '69px', /* center of the 140px sticky label */
          width: '2px',
          height: `${height}px`,
          background: 'var(--border-color)',
          overflow: 'hidden',
        }}
        className="timeline-beam-track"
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: heightTransform,
            opacity: opacityTransform,
            background: 'linear-gradient(to bottom, var(--accent), var(--exp-accent-dim), transparent)',
            borderRadius: '9999px',
          }}
        />
      </div>
    </div>
  );
};

/* ─── Experience Section ─── */

export const Experience: React.FC = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  const responsibilities = [
    "Designed the company's main website landing page for a modern corporate presence.",
    "Designed and structured the Shritu EasyOps product page layout.",
    "Developed the user interface and user flows for the company's mobile application.",
    "Created the interface for the Shritu Fusion page (other services by the company, currently under development).",
    "Conducted research on AI integration and intelligent automation opportunities."
  ];

  const contributions = [
    "Delivered production-ready high-fidelity web and mobile layouts.",
    "Created custom interactive templates for new services under development (Fusion).",
    "Provided technical research and designs for future AI feature integrations."
  ];

  const galleryImages = [
    { src: ASSETS.experience.easy, caption: 'Shritu EasyOps product page design.' },
    { src: ASSETS.experience.login, caption: 'Company app user interface and login flow design.' },
    { src: ASSETS.experience.fusion, caption: 'Shritu Fusion page showing other company services (under development).' },
    { src: ASSETS.experience.dashboard, caption: 'Company app dashboard user interface design.' }
  ];

  const timelineData: TimelineEntry[] = [
    {
      title: '2026',
      content: (
        <div>
          {/* Role & Company */}
          <motion.div {...fadeUp}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '9999px',
                backgroundColor: 'var(--exp-accent-dim-bg)',
                border: '1px solid var(--exp-accent-dim-border)',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Freelance Developer
              </span>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: 'var(--text-primary)',
                margin: '0 0 8px',
                letterSpacing: '0.03em',
              }}
            >
              Shritu Technology Pvt Ltd
            </h4>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
            style={{
              fontSize: '1.05rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              marginBottom: '32px',
              maxWidth: '640px',
            }}
          >
            As a Freelance Developer for Shritu Technology Pvt Ltd in 2026, I designed and developed key digital products and interfaces, including the main company landing page, the Shritu EasyOps product page, and the company mobile app UI. I also built the Shritu Fusion page showcasing other company services (currently under development) and researched AI integrations for product optimization.
          </motion.p>

          {/* Responsibilities */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}>
            <h5
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '16px',
                letterSpacing: '0.02em',
              }}
            >
              Responsibilities
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {responsibilities.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--exp-accent-dim-bullet)',
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} strokeWidth={3} style={{ color: 'var(--accent)' }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Key Contributions Block */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
            style={{
              backgroundColor: 'var(--exp-accent-dim-card)',
              border: '1px solid var(--exp-accent-dim-card-border)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '40px',
            }}
          >
            <h5
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--accent)',
                marginBottom: '16px',
                letterSpacing: '0.02em',
              }}
            >
              Key Contributions
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contributions.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.25 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '40px',
            }}
            className="experience-gallery"
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                }}
                className="gallery-image-card"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="gallery-img"
                />
                <div
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.4',
                  }}
                >
                  {img.caption}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Closing Statement */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
            style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontWeight: 300,
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '20px',
              maxWidth: '600px',
            }}
          >
            Transforming ideas into production-ready experiences while exploring the future of AI-driven digital solutions.
          </motion.p>
        </div>
      ),
    },
  ];

  return (
    <section
      id="experience"
      style={{
        padding: '120px 24px 140px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ marginBottom: '80px', maxWidth: '600px' }}
        >
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
            PROFESSIONAL EXPERIENCE
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
            My first industry experience building real-world products and exploring AI-powered solutions.
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>

      {/* Responsive overrides */}
      <style>{`
        .gallery-image-card:hover .gallery-img {
          transform: scale(1.05);
        }
        .gallery-image-card {
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .gallery-image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
        }

        @media (max-width: 768px) {
          .timeline-sticky-label {
            display: none !important;
          }
          .timeline-mobile-title {
            display: block !important;
          }
          .timeline-row {
            gap: 0 !important;
            padding-left: 24px !important;
          }
          .timeline-beam-track {
            left: 6px !important;
          }
          .experience-gallery {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .experience-gallery {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-img {
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
};
