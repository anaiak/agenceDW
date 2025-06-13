import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const PortfolioSection = styled.section`
  min-height: 100vh;
  background: #000000;
  padding: 15vh 5vw;
  position: relative;

  @media (max-width: 768px) {
    padding: 10vh 4vw;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 100;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 5vh;
  line-height: 0.8;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: 4vh;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 8vh;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 6vh;
  }
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? '#ffffff' : 'transparent'};
  color: ${props => props.$isActive ? '#000000' : '#ffffff'};
  border: 1px solid #ffffff;
  padding: 0.5rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  cursor: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffffff;
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1.2rem;
    font-size: 0.7rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)<{ size: 'small' | 'medium' | 'large' }>`
  position: relative;
  background: #ffffff;
  border: 2px solid #ffffff;
  overflow: hidden;
  cursor: none;
  
  grid-column: ${props => {
    switch(props.size) {
      case 'small': return 'span 4';
      case 'medium': return 'span 5';
      case 'large': return 'span 7';
      default: return 'span 4';
    }
  }};
  
  aspect-ratio: ${props => {
    switch(props.size) {
      case 'small': return '4/3';
      case 'medium': return '3/2';
      case 'large': return '16/9';
      default: return '4/3';
    }
  }};

  @media (max-width: 768px) {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }
`;

const ProjectImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 100%;
  background: #111111;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

// Rideau qui s'ouvre
const ProjectCurtain = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

// Titre sur le rideau
const CurtainTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 1.2;
  transform: rotate(-90deg);
  white-space: nowrap;
  
  @media (max-width: 768px) {
    transform: none;
    font-size: 1.2rem;
  }
`;

// Container pour les infos qui apparaissent
const ProjectInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 5;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProjectTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProjectCategory = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: #000000;
  background: #ffffff;
  padding: 0.3rem 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ProjectLink = styled(motion.a)`
  display: inline-block;
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.8rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  cursor: none;
`;

const StatisticsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-top: 10vh;
  padding-top: 5vh;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 8vh;
    padding-top: 4vh;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "BISTROT MODERNE",
      category: "VITRINE",
      tech: ["NEXT.JS", "SANITY", "STRIPE"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23000000'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' text-anchor='middle' dy='.3em' font-family='monospace' font-size='16'%3EBISTROT%3C/text%3E%3C/svg%3E",
      size: 'large' as const,
      link: "/project/bistrot-moderne"
    },
    {
      id: 2,
      title: "STARTUP FINTECH",
      category: "APPLICATION",
      tech: ["REACT", "DASHBOARD", "API"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Ctext x='50%25' y='50%25' fill='%23000000' text-anchor='middle' dy='.3em' font-family='monospace' font-size='16'%3EFINTECH%3C/text%3E%3C/svg%3E",
      size: 'small' as const,
      link: "/project/startup-fintech"
    },
    {
      id: 3,
      title: "E-COMMERCE MODE",
      category: "E-COMMERCE",
      tech: ["SHOPIFY", "WEBGL", "AR"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ff6b6b'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' text-anchor='middle' dy='.3em' font-family='monospace' font-size='16'%3EFASHION%3C/text%3E%3C/svg%3E",
      size: 'medium' as const,
      link: "/project/ecommerce-mode"
    },
    {
      id: 4,
      title: "CABINET DENTAIRE",
      category: "PROFESSIONNEL",
      tech: ["WORDPRESS", "BOOKING", "SEO"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%2348dbfb'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' text-anchor='middle' dy='.3em' font-family='monospace' font-size='14'%3EDENTAL%3C/text%3E%3C/svg%3E",
      size: 'medium' as const,
      link: "/project/cabinet-dentaire"
    },
    {
      id: 5,
      title: "AGENCE IMMOBILIÈRE",
      category: "VITRINE",
      tech: ["NUXT", "MAP", "CRM"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect x='10%25' y='20%25' width='80%25' height='60%25' fill='none' stroke='%23000000' stroke-width='2'/%3E%3Ctext x='50%25' y='50%25' fill='%23000000' text-anchor='middle' dy='.3em' font-family='monospace' font-size='12'%3EIMMOBILIER%3C/text%3E%3C/svg%3E",
      size: 'small' as const,
      link: "/project/agence-immobiliere"
    },
    {
      id: 6,
      title: "ARTISTE PORTFOLIO",
      category: "PORTFOLIO",
      tech: ["GATSBY", "THREE.JS", "CMS"],
      image: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23000000'/%3E%3Crect x='0' y='40%25' width='100%25' height='20%25' fill='%23ff9ff3' opacity='0.5'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' text-anchor='middle' dy='.3em' font-family='monospace' font-size='14'%3EARTIST%3C/text%3E%3C/svg%3E",
      size: 'large' as const,
      link: "/project/artiste-portfolio"
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'ALL' || project.category === activeFilter
  );

  const filters = ['ALL', 'VITRINE', 'E-COMMERCE', 'APPLICATION', 'PORTFOLIO', 'PROFESSIONNEL'];

  const statistics = [
    { number: "47", label: "PROJETS AVANT-GARDE" },
    { number: "12", label: "PRIX DESIGN" },
    { number: "98", label: "% SATISFACTION" },
    { number: "03", label: "ANNÉES EXPERTISE" }
  ];

  return (
    <PortfolioSection id="portfolio" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        PORTFOLIO
      </SectionTitle>

      <FilterBar>
        {filters.map(filter => (
          <FilterButton
            key={filter}
            $isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            {filter}
          </FilterButton>
        ))}
      </FilterBar>

      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            size={project.size}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            data-cursor="hover"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <ProjectImage $image={project.image} />
            
            {/* Rideau qui s'ouvre vers le haut */}
            <ProjectCurtain
              initial={{ height: "100%" }}
              animate={{ 
                height: hoveredProject === project.id ? "0%" : "100%" 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1] // Courbe d'animation fluide
              }}
            >
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 0 : 1,
                  y: hoveredProject === project.id ? -50 : 0
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                <CurtainTitle>{project.title}</CurtainTitle>
              </motion.div>
            </ProjectCurtain>

            {/* Informations qui apparaissent progressivement */}
            <ProjectInfo
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: hoveredProject === project.id ? 1 : 0 
              }}
              transition={{ 
                delay: hoveredProject === project.id ? 0.3 : 0,
                duration: 0.5 
              }}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: hoveredProject === project.id ? 0 : 30,
                  opacity: hoveredProject === project.id ? 1 : 0 
                }}
                transition={{ 
                  delay: hoveredProject === project.id ? 0.4 : 0,
                  duration: 0.4 
                }}
              >
                <ProjectCategory>{project.category}</ProjectCategory>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: hoveredProject === project.id ? 0 : 30,
                  opacity: hoveredProject === project.id ? 1 : 0 
                }}
                transition={{ 
                  delay: hoveredProject === project.id ? 0.5 : 0,
                  duration: 0.4 
                }}
              >
                <ProjectTitle className="text-fragmented">
                  {project.title}
                </ProjectTitle>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: hoveredProject === project.id ? 0 : 30,
                  opacity: hoveredProject === project.id ? 1 : 0 
                }}
                transition={{ 
                  delay: hoveredProject === project.id ? 0.6 : 0,
                  duration: 0.4 
                }}
              >
                <ProjectTech>
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </ProjectTech>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: hoveredProject === project.id ? 0 : 30,
                  opacity: hoveredProject === project.id ? 1 : 0 
                }}
                transition={{ 
                  delay: hoveredProject === project.id ? 0.7 : 0,
                  duration: 0.4 
                }}
              >
                <ProjectLink 
                  href={project.link}
                  data-cursor="hover"
                >
                  EXPLORER
                </ProjectLink>
              </motion.div>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <StatisticsSection
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {statistics.map((stat, index) => (
          <StatItem key={index}>
            <StatNumber className="accent-micro">{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatisticsSection>
    </PortfolioSection>
  );
};

export default Portfolio; 