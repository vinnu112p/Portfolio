import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ASSETS } from '../lib/assetsConfig';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  github: string;
  demo?: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: 'algopush',
    title: 'AlgoPush',
    description: 'A smart Chrome extension that synchronizes your LeetCode solutions directly to GitHub, automatically generating AI-optimized approach explanations and markdown notes.',
    features: [
      'Pushes code to GitHub automatically upon submission',
      'Generates AI-optimized solution analysis via Groq API',
      'Organizes files cleanly by difficulty (Easy/Medium/Hard)',
      'Supports review-first and instant-push workflows'
    ],
    tags: ['JavaScript', 'Chrome Extension APIs', 'Groq API', 'GitHub API', 'Monaco Editor'],
    github: 'https://github.com/vinnu112p/AlgoPush',
    demo: 'https://algopush.vercel.app/',
    image: ASSETS.projects.algopushSquare
  },
  {
    id: 'goalflow',
    title: 'GoalFlow',
    description: 'A role-based corporate goal management and performance tracking platform designed to replace scattered spreadsheets and email loops with a single unified workspace.',
    features: [
      'Multi-role access (Employee, Manager, Admin) with secure auth',
      'Cycle goal setting with weightage validation and UoM support',
      'Approval flows for managers to approve, return, or triage goals',
      'Quarterly progress forecasting and completion certificates'
    ],
    tags: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Zustand', 'Recharts', 'Groq API'],
    github: 'https://github.com/vinnu112p/GoalFlow',
    demo: 'https://goal-flows.vercel.app',
    image: ASSETS.projects.goalflows
  },
  {
    id: 'planora',
    title: 'Planora',
    description: 'A personalized travel planning and itinerary management platform that helps users organize trips, track budgets, manage checklists, and collaborate with fellow explorers.',
    features: [
      '14+ responsive views including dashboard and user profiles',
      'Relational database sync supporting 13+ tables with Sequelize',
      'Interactive routing, budget tracking, and checklist management',
      'Cloudinary media upload integration with Multer'
    ],
    tags: ['React 19', 'Vite', 'Tailwind CSS v4', 'Zustand', 'MySQL', 'Sequelize ORM', 'Node.js', 'Express.js'],
    github: 'https://github.com/vinnu112p/Planora',
    demo: 'https://odoo-x-pu-hackathon-3zdpk1ssm-dhruv-majis-projects-9df80bb8.vercel.app/',
    image: ASSETS.projects.planoraSquare
  },
  {
    id: 'rag-pipeline',
    title: 'RAG Pipeline',
    description: 'A Retrieval-Augmented Generation system from document ingestion to LLM response generation, reducing hallucinations and grounding answers in actual source documents.',
    features: [
      'Recursive text chunking with context preservation overlap',
      'Semantic dense embedding generation using SentenceTransformers',
      'Persistent ChromaDB vector database storage and query',
      'Ultra-fast context-grounded LLM synthesis using Groq'
    ],
    tags: ['Python 3.10+', 'LangChain', 'ChromaDB', 'SentenceTransformers', 'Groq API', 'llama-3.1-8b'],
    github: 'https://github.com/vinnu112p/RAG',
    image: ASSETS.projects.ragRaw
  }
];

interface ProjectsProps {
  theme: string;
}

export const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Sync isMobile state with viewport width - always use desktop scroll-pinning layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up useScroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const total = projects.length;
  const headerScrollEnd = 0.2;

  // Track active index based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < headerScrollEnd) {
      setCurrentIndex(0);
    } else {
      const segmentSize = (1 - headerScrollEnd) / (total - 1);
      const index = Math.min(
        Math.floor((latest - headerScrollEnd) / segmentSize) + 1,
        total - 1
      );
      setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
    }
  });

  // Header Animations: Scrolls completely off-screen upwards
  const headerY = useTransform(scrollYProgress, [0, headerScrollEnd], [0, -450]);
  const headerOpacity = useTransform(scrollYProgress, [0, headerScrollEnd], [1, 0]);

  // Centering translation for cards: slides cards container up as the header moves off-screen
  const cardContainerY = useTransform(scrollYProgress, [0, headerScrollEnd], [0, -125]);

  // Click-to-scroll logic for navigation indicators
  const scrollToProject = (index: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.scrollHeight;
    const scrollRange = sectionHeight - window.innerHeight;

    let targetProgress = 0;
    if (index > 0) {
      const segmentSize = (1 - headerScrollEnd) / (total - 1);
      targetProgress = headerScrollEnd + (index - 0.5) * segmentSize;
    } else {
      targetProgress = 0.02; // Tiny offset to trigger card 0 active state
    }

    window.scrollTo({
      top: sectionTop + targetProgress * scrollRange,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-color)',
        borderTop: '1px solid var(--border-color)',
        height: isMobile ? 'auto' : `${(total + 1.2) * 100}vh`,
        padding: isMobile ? '80px 16px' : '0',
      }}
    >
      <style>{`
        /* CSS overrides for responsive sticky projects section */
        @media (max-width: 991px) {
          .projects-inner-container {
            padding-top: 100px !important;
            padding-bottom: 80px !important;
          }
          .projects-header-block {
            text-align: center !important;
            margin-bottom: 24px !important;
            padding: 0 24px !important;
          }
          .projects-header-block h2 {
            font-size: clamp(2.4rem, 5vw, 3.5rem) !important;
            text-align: center !important;
          }
          .projects-header-block p {
            margin: 0 auto !important;
            font-size: 1rem !important;
            text-align: center !important;
          }
          .projects-cards-container {
            height: 520px !important;
            max-width: 90% !important;
          }
          .project-card-details {
            padding: 24px 28px !important;
          }
        }

        @media (max-width: 767px) {
          .projects-inner-container {
            padding-top: 95px !important;
            padding-bottom: 60px !important;
          }
          .projects-cards-container {
            height: 480px !important; /* Shorter card height for phone */
            max-width: 92% !important;
            margin-top: -50px !important; /* Shift card up to clear bottom cutoff on phone */
          }
          .project-card-details {
            padding: 20px 20px !important;
          }
          .project-card-mockup {
            display: none !important; /* Hide mockup on phone screens */
          }
          .projects-dots-container {
            bottom: 3% !important;
          }
        }
      `}</style>
      {isMobile ? (
        /* Mobile Layout: Premium vertical scroll list */
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '16px' }}>
              FEATURED PROJECTS
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              A selection of projects that showcase my skills in full-stack development, AI applications, modern web technologies, and problem-solving.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {projects.map((project) => (
              <MobileProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Sticky Viewport */
        <div
          className="projects-sticky-container"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle grid background pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1.5px, transparent 0)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            className="container projects-inner-container"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              paddingTop: '50px',
              paddingBottom: '30px',
            }}
          >
            {/* Header: Title and description (natural vertical flex, moves up on scroll) */}
            <motion.div
              className="projects-header-block"
              style={{
                y: headerY,
                opacity: headerOpacity,
                textAlign: 'left',
                width: '100%',
                maxWidth: '1100px',
                position: 'relative',
                marginBottom: '40px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  lineHeight: 0.95,
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}
              >
                FEATURED PROJECTS
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  fontSize: '1.15rem',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                }}
              >
                A selection of projects that showcase my skills in full-stack development, AI applications, modern web technologies, and problem-solving.
              </p>
            </motion.div>

            {/* Stacked Cards Container */}
            <motion.div
              className="projects-cards-container"
              style={{
                y: cardContainerY,
                position: 'relative',
                width: '100%',
                maxWidth: '1100px',
                height: '540px',
              }}
            >
              {projects.map((project, index) => (
                <StackCardItem
                  key={project.id}
                  project={project}
                  index={index}
                  total={total}
                  scrollYProgress={scrollYProgress}
                  headerScrollEnd={headerScrollEnd}
                  theme={theme}
                />
              ))}
            </motion.div>

            {/* Pagination / Progress Dots */}
            <div
              role="tablist"
              aria-label="Featured Projects Navigation"
              className="projects-dots-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                position: 'absolute',
                bottom: '6%',
                zIndex: 10,
              }}
            >
              {projects.map((_, i) => (
                <button
                  key={`indicator-${i}`}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Show project ${i + 1} of ${total}`}
                  onClick={() => scrollToProject(i)}
                  style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: i === currentIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)',
                    transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                    transition: 'background-color 0.25s ease, transform 0.25s ease',
                    padding: 0,
                    outline: 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const StackCardItem: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
  scrollYProgress: any;
  headerScrollEnd: number;
  theme: string;
}> = ({ project, index, total, scrollYProgress, headerScrollEnd, theme }) => {
  // Determine start and end scroll progress ranges for this card
  let pStart = 0;
  let pEnd = 0;

  if (index === 0) {
    pStart = 0;
    pEnd = headerScrollEnd;
  } else {
    pStart = headerScrollEnd + ((index - 1) * (1 - headerScrollEnd)) / (total - 1);
    pEnd = headerScrollEnd + (index * (1 - headerScrollEnd)) / (total - 1);
  }

  // Calculate precise transforms for slide-up and stack-scaling transitions
  let y, scale;

  if (index === 0) {
    // Card 0 starts visible, and slowly scales down & moves up as cards stack on it
    y = useTransform(scrollYProgress, [0, pEnd, 1.0], [0, 0, - (total - 1) * 12]);
    scale = useTransform(scrollYProgress, [0, pEnd, 1.0], [1, 1, 1 - (total - 1) * 0.035]);
  } else if (index === total - 1) {
    // Last card slides up and settles early (by 0.88 progress) so it is fully visible before scroll end
    y = useTransform(scrollYProgress, [Math.max(0, pStart - 0.05), pStart + 0.15], [800, index * 18]);
    scale = 1;
  } else {
    // Middle cards slide up, stay active for a bit, then scale down as subsequent cards stack
    y = useTransform(scrollYProgress, [Math.max(0, pStart - 0.05), pEnd, 1.0], [800, index * 18, index * 18 - (total - 1 - index) * 12]);
    scale = useTransform(scrollYProgress, [0, pEnd, 1.0], [1, 1, 1 - (total - 1 - index) * 0.035]);
  }

  // All cards are always 100% solid — no opacity animation.
  // The slide-up from y:800 (off-screen) handles visibility naturally.

  return (
    <motion.div
      className="project-card-item"
      data-cursor="project"
      style={{
        y,
        scale,
        opacity: 1,
        zIndex: index + 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: 'top center',
        backgroundColor: theme === 'dark' ? '#141414' : '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .project-card-mockup { display: none !important; }
        }
      `}</style>
      <div className="project-card-inner" style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
        {/* Left Column: Details */}
        <div
          className="project-card-details"
          style={{
            flex: 1.1,
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            textAlign: 'left',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '2.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '10px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.45',
                marginBottom: '16px',
              }}
            >
              {project.description}
            </p>

            {/* Key features checklist */}
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Key Features:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {project.features.slice(0, 4).map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '5px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.3',
                    }}
                  >
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {/* Tech tag list */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {project.tags.slice(0, 6).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.72rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                GitHub
              </motion.a>
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-text)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Landscape browser mockup display */}
        <div
          className="project-card-mockup"
          style={{
            flex: 1.3,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0c0d0f',
            borderLeft: '1px solid var(--border-color)',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(216,255,79,0.03) 1.5px, transparent 0)',
              backgroundSize: '24px 24px',
              opacity: 0.8,
            }}
          />

          {/* Browser Window Wrapper */}
          <div
            style={{
              width: '90%',
              height: '80%',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: '#16171a',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top address bar mockup */}
            <div
              style={{
                height: '30px',
                backgroundColor: '#1b1c20',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '55%',
                  height: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(255, 255, 255, 0.02)',
                }}
              >
                {project.id === 'algopush' ? 'algopush.vercel.app' :
                  project.id === 'goalflow' ? 'goal-flows.vercel.app' :
                    project.id === 'planora' ? 'planora.vercel.app' :
                      'github.com/vinnu112p/RAG'}
              </div>
            </div>

            {/* Mockup Preview Area */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', backgroundColor: '#16171a' }}>
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MobileProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      <div>
        <h3
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '10px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '16px',
          }}
        >
          {project.description}
        </p>

        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Key Features:
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {project.features.slice(0, 3).map((feat, fIdx) => (
              <li
                key={fIdx}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  lineHeight: '1.35',
                }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          backgroundColor: '#16171a',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.tags.slice(0, 4).map((tag, tIdx) => (
            <span
              key={tIdx}
              style={{
                padding: '3px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                fontSize: '0.7rem',
                color: 'var(--text-primary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 0',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 0',
                borderRadius: '9999px',
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-text)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={14} />
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
};
