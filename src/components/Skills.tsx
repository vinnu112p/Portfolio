import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Layout, Server, Brain, BarChart2, Terminal } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  stack: string[];
  projects: string[];
}

const categories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    icon: <Layout size={28} />,
    description: 'Crafting high-performance, responsive user interfaces and interactive web experiences using modern frameworks.',
    stack: ['React (Vite)', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'GSAP', 'Framer Motion'],
    projects: ['GoalFlow', 'Planora', 'Gaming Portfolio', 'Pokedex', 'Portfolio Website']
  },
  {
    id: 'backend',
    name: 'Backend Engineering',
    icon: <Server size={28} />,
    description: 'Architecting robust backend services, APIs, and databases to power modern applications.',
    stack: ['Node.js', 'Express', 'Django', 'Flask', 'REST API Design', 'MySQL', 'MongoDB'],
    projects: ['GoalFlow', 'Planora', 'AlgoPush', 'SharpifyU', 'Design-of-Analysis-Algorithms']
  },
  {
    id: 'ai',
    name: 'AI & Intelligent Systems',
    icon: <Brain size={28} />,
    description: 'Developing intelligent workflows, semantic search, retrieval models, and agentic pipelines.',
    stack: ['OpenAI API', 'Gemini API', 'Groq', 'LangChain', 'MCP', 'RAG', 'Prompt Engineering', 'Python', 'Jupyter Notebooks'],
    projects: ['RAG Pipeline', 'AI Code Reviewer', 'Resume Analyzer', 'AI Engineering Hub']
  },
  {
    id: 'datascience',
    name: 'Data Science & Analytics',
    icon: <BarChart2 size={28} />,
    description: 'Analyzing datasets, performing semantic data parsing, and building visual business intelligence tools.',
    stack: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Python', 'Data Analytics', 'Data Visualization'],
    projects: ['Machine-Learning-Algorithms-Materials', 'AI Engineering Hub', 'RAG Pipeline']
  },
  {
    id: 'devops',
    name: 'Tools & DevOps',
    icon: <Terminal size={28} />,
    description: 'Managing cloud deployment platforms, version control systems, developer APIs, and automation infrastructure.',
    stack: ['Git', 'GitHub', 'Docker', 'Linux', 'Chrome Extension API', 'GitHub REST API', 'NPM', 'Vercel', 'Netlify', 'Render', 'ServiceNow', 'Agile / Scrum'],
    projects: ['AlgoPush Extension', 'GoalFlow App', 'Planora Deployment', 'MCP CLI']
  }
];

const marqueeData: Record<string, { row1: string[], row2: string[] }> = {
  frontend: {
    row1: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3', 'GSAP', 'Framer Motion', 'Bootstrap'],
    row2: ['JavaScript', 'CSS3', 'React', 'Framer Motion', 'Tailwind CSS', 'HTML5', 'Bootstrap', 'GSAP', 'TypeScript']
  },
  backend: {
    row1: ['Node.js', 'Express', 'Django', 'Flask', 'REST API Design', 'Python'],
    row2: ['Django', 'Node.js', 'REST API Design', 'Express', 'Flask', 'Python', 'Server Architecture']
  },
  ai: {
    row1: ['OpenAI', 'Gemini', 'Groq', 'LangChain', 'MCP', 'RAG', 'Prompt Engineering', 'AI Integrations'],
    row2: ['RAG', 'Prompt Engineering', 'LangChain', 'OpenAI', 'Gemini', 'Groq', 'MCP', 'Intelligent Systems']
  },
  datascience: {
    row1: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Data Analytics', 'Python', 'Data Science'],
    row2: ['Power BI', 'Seaborn', 'NumPy', 'Pandas', 'Matplotlib', 'Python', 'Data Visualization']
  },
  devops: {
    row1: ['Git', 'GitHub', 'Docker', 'Linux', 'Chrome Extension API', 'GitHub REST API', 'NPM', 'Tools & DevOps'],
    row2: ['Vercel', 'Netlify', 'Render', 'ServiceNow', 'Docker', 'Linux', 'CI/CD', 'GitHub']
  }
};

interface SkillsProps {
  theme: string;
}

export const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const displayCategory = hoveredCategory || activeCategory;
  const activeData = categories.find(c => c.id === displayCategory) || categories[0];

  const [currentMarquee, setCurrentMarquee] = useState(marqueeData.frontend);
  const [marqueeOpacity, setMarqueeOpacity] = useState(1);

  // Transition marquee background smoothly when active category changes
  useEffect(() => {
    setMarqueeOpacity(0);
    const timer = setTimeout(() => {
      const data = marqueeData[displayCategory] || marqueeData.frontend;
      setCurrentMarquee(data);
      setMarqueeOpacity(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [displayCategory]);

  const getCircleLabel = (id: string) => {
    switch (id) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'ai': return 'AI Systems';
      case 'datascience': return 'Data Science';
      case 'devops': return 'Tools & DevOps';
      default: return '';
    }
  };

  const getDesktopPosition = (id: string): React.CSSProperties => {
    switch (id) {
      case 'frontend': return { top: '0px', left: '160px' };
      case 'ai': return { top: '111px', left: '312px' };
      case 'devops': return { top: '289px', left: '254px' };
      case 'datascience': return { top: '289px', left: '66px' };
      case 'backend': return { top: '111px', left: '8px' };
      default: return {};
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const marqueeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' }
    }
  };

  const circlesContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      }
    }
  };

  const circleVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={containerVariants}
      style={{
        padding: '120px 24px 140px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Marquee Layer */}
      <motion.div
        variants={marqueeVariants}
        animate={{ opacity: marqueeOpacity * 0.025 }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          transition: 'opacity 0.25s ease-in-out',
        }}
      >
        <div className="marquee-row">
          <div className="marquee-content-left">
            {currentMarquee.row1.map((item, idx) => (
              <span key={`r1-${idx}`} className="marquee-item">{item}</span>
            ))}
            {currentMarquee.row1.map((item, idx) => (
              <span key={`r1-dup-${idx}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>
        <div className="marquee-row">
          <div className="marquee-content-right">
            {currentMarquee.row2.map((item, idx) => (
              <span key={`r2-${idx}`} className="marquee-item">{item}</span>
            ))}
            {currentMarquee.row2.map((item, idx) => (
              <span key={`r2-dup-${idx}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: '64px', maxWidth: '800px', textAlign: 'left' }}
        >
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
            Technical Arsenal
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
            TECHNICAL ARSENAL
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
            Technologies, tools, and systems I use to build scalable applications, modern web experiences, and AI-powered solutions.
          </p>
        </motion.div>

        {/* Main Grid Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1100px',
            position: 'relative',
            zIndex: 1,
            marginTop: '40px',
          }}
          className="skills-grid"
        >
          {/* Left: Pentagon Expertise Modules */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              height: '480px',
            }}
            className="skills-diamond-container"
          >
            <motion.div
              className="skills-cluster"
              variants={circlesContainerVariants}
              style={{
                position: 'relative',
                width: '460px',
                height: '460px',
              }}
            >
              {/* Connecting lines SVG */}
              <div className="skills-connecting-lines" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 460 460" style={{ pointerEvents: 'none' }}>
                  {/* Outer Pentagon */}
                  <motion.path
                    d="M 230 70 L 382 181 L 324 359 L 136 359 L 78 181 Z"
                    fill="none"
                    stroke="var(--border-color)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  {/* Lines from center */}
                  <line x1="230" y1="230" x2="230" y2="70" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="230" y1="230" x2="382" y2="181" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="230" y1="230" x2="324" y2="359" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="230" y1="230" x2="136" y2="359" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1="230" y1="230" x2="78" y2="181" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4,4" />
                </svg>

                {/* Central hub (No glow shadow) */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '230px',
                    top: '230px',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    zIndex: 1
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>

              {/* Circles */}
              {categories.map((cat) => {
                const isHovered = hoveredCategory === cat.id;
                const isActive = displayCategory === cat.id;
                const isAnyHovered = hoveredCategory !== null;
                const isDimmed = isAnyHovered ? !isHovered : !isActive;

                const desktopStyle = getDesktopPosition(cat.id);

                return (
                  <motion.button
                    key={cat.id}
                    variants={circleVariants}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      position: 'absolute',
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-color)',
                      backgroundColor: theme === 'dark' ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      outline: 'none',
                      zIndex: isHovered ? 10 : 2,
                      padding: '16px',
                      gap: '8px',
                      transition: 'border-color 0.3s, background-color 0.3s',
                      backdropFilter: 'blur(8px)',
                      ...desktopStyle,
                    }}
                    animate={{
                      scale: isHovered ? 1.08 : isActive ? 1.03 : 1,
                      opacity: isDimmed ? 0.45 : 1,
                      borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="expertise-circle"
                  >
                    {/* Liquid / Smooth Bottom-to-Top Fill Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--accent)',
                        zIndex: -1,
                        transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'bottom',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* Subtle floating glow behind active circle */}
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          border: '2px solid var(--accent)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Icon with subtle animation */}
                    <motion.div
                      animate={{
                        y: isHovered ? -4 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      style={{
                        color: isActive ? 'var(--accent-text)' : 'var(--accent)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {cat.icon}
                    </motion.div>

                    {/* Label */}
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        maxWidth: '110px',
                        zIndex: 1,
                        color: isActive ? 'var(--accent-text)' : 'var(--text-primary)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {getCircleLabel(cat.id)}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Info Panel & Focus */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: '0 20px 40px var(--shadow-color)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  minHeight: '380px',
                }}
              >
                {/* Header */}
                <div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Category Expertise
                  </span>
                  <h3
                    style={{
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      margin: 0
                    }}
                  >
                    {activeData.name}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                    fontWeight: 300,
                    margin: 0
                  }}
                >
                  {activeData.description}
                </p>

                {/* Tech Stack pills */}
                <div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: '12px'
                    }}
                  >
                    Technology Stack
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeData.stack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ y: -3, borderColor: 'var(--accent)' }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          cursor: 'default',
                          transition: 'border-color 0.2s, color 0.2s',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Projects Used In */}
                <div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: '12px'
                    }}
                  >
                    Applied In Projects
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {activeData.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <span style={{ color: 'var(--accent)' }}>✦</span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Status Panel (Current Focus) */}
            <div style={{ marginTop: '16px', textAlign: 'left', padding: '0 8px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                ● Current Focus
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {['Full Stack Development', 'AI Applications'].map((focus, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
