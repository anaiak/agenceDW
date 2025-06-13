import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SiteTypesSection = styled.section`
  min-height: 100vh;
  background: #000000;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 100;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.6);
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  margin-bottom: 6rem;
  max-width: 900px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    margin-bottom: 4rem;
    padding: 0 1rem;
  }
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const TypeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  padding: 0;
  height: 300px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.03),
      transparent
    );
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  pointer-events: none;
`;

const TypeIcon = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  opacity: 0.3;
  z-index: 1;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: rgba(255, 255, 255, 0.6);
    fill: none;
    stroke-width: 1;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const TypeName = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.6rem;
  font-weight: 100;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const TypeDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
  }
`;

const TypeTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.6rem;
    font-size: 0.65rem;
  }
`;

const GeometricShape = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  z-index: 1;
`;

const ArtisticLine = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  z-index: 1;
`;

// Composants d'icônes SVG animées
const VitrineIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.rect
      x="3" y="3" width="18" height="18" rx="2"
      animate={{ 
        strokeDasharray: [0, 100],
        strokeDashoffset: [0, -100]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.line
      x1="9" y1="9" x2="15" y2="9"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.line
      x1="9" y1="12" x2="12" y2="12"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

const EcommerceIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.path
      d="M9 22C9.55 22 10 21.55 10 21C10 20.45 9.55 20 9 20C8.45 20 8 20.45 8 21C8 21.55 8.45 22 9 22Z"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.path
      d="M20 22C20.55 22 21 21.55 21 21C21 20.45 20.55 20 20 20C19.45 20 19 20.45 19 21C19 21.55 19.45 22 20 22Z"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    />
    <motion.path
      d="M1 1H5L7.68 14.39C7.77 14.8 8.13 15.1 8.55 15.1H19.4C19.82 15.1 20.18 14.8 20.27 14.39L22 5H6"
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.rect
      x="3" y="3" width="18" height="18" rx="2"
      animate={{ 
        strokeDasharray: [20, 5],
        strokeDashoffset: [0, -25]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.circle
      cx="8.5" cy="8.5" r="2.5"
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.3, 1, 0.3]
      }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <motion.path
      d="M21 15L16 10L11 15"
      animate={{ 
        strokeDasharray: [0, 20],
        strokeDashoffset: [0, -20]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
);

const EditorialIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      animate={{ 
        strokeDasharray: [40, 10],
        strokeDashoffset: [0, -50]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.path
      d="M14 2V8H20"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.line
      x1="8" y1="13" x2="16" y2="13"
      animate={{ 
        strokeDasharray: [0, 8],
        strokeDashoffset: [0, -8]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 0.5
      }}
    />
    <motion.line
      x1="8" y1="17" x2="13" y2="17"
      animate={{ 
        strokeDasharray: [0, 5],
        strokeDashoffset: [0, -5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 1
      }}
    />
  </svg>
);

const ApplicationIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.rect
      x="2" y="3" width="20" height="14" rx="2"
      animate={{ 
        strokeDasharray: [30, 5],
        strokeDashoffset: [0, -35]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.line
      x1="8" y1="21" x2="16" y2="21"
      animate={{ scaleX: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.line
      x1="12" y1="17" x2="12" y2="21"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.rect
      x="6" y="7" width="4" height="4"
      animate={{ 
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect
      x="14" y="7" width="4" height="4"
      animate={{ 
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

const ExperimentalIcon = () => (
  <svg viewBox="0 0 24 24">
    <motion.circle
      cx="12" cy="12" r="10"
      animate={{ 
        strokeDasharray: [20, 20],
        strokeDashoffset: [0, -40],
        rotate: 360
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.circle
      cx="12" cy="12" r="6"
      animate={{ 
        strokeDasharray: [10, 10],
        strokeDashoffset: [0, 20],
        rotate: -360
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.circle
      cx="12" cy="12" r="2"
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.3, 1, 0.3]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const SiteTypes: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const siteTypes = [
    {
      id: 'vitrine',
      icon: <VitrineIcon />,
      name: 'Sites Vitrine',
      description: 'Élégance minimaliste et impact visuel. Chaque élément raconte votre histoire avec sophistication et conversion optimale.',
      technologies: ['React', 'Next.js', 'CMS', 'SEO', 'Analytics']
    },
    {
      id: 'ecommerce',
      icon: <EcommerceIcon />,
      name: 'E-commerce',
      description: 'Expériences d\'achat immersives où design et performance convergent. Parcours utilisateur pensé pour la conversion.',
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'Inventory', 'UX/UI']
    },
    {
      id: 'portfolio',
      icon: <PortfolioIcon />,
      name: 'Portfolios Créatifs',
      description: 'Votre univers artistique sublimé par des interfaces sur-mesure. Chaque projet devient une œuvre d\'art interactive.',
      technologies: ['WebGL', 'Three.js', 'GSAP', 'Gallery', 'Motion']
    },
    {
      id: 'editorial',
      icon: <EditorialIcon />,
      name: 'Éditions Digitales',
      description: 'Plateformes éditoriales où contenu et design fusionnent. Typographie, rythme et lecture optimisée pour l\'engagement.',
      technologies: ['CMS', 'Typography', 'Newsletter', 'SEO', 'Social']
    },
    {
      id: 'application',
      icon: <ApplicationIcon />,
      name: 'Applications Métier',
      description: 'Interfaces fonctionnelles transformées en expériences esthétiques. La beauté au service de l\'efficacité.',
      technologies: ['React', 'Dashboard', 'API', 'Database', 'Auth']
    },
    {
      id: 'experimental',
      icon: <ExperimentalIcon />,
      name: 'Projets Expérimentaux',
      description: 'Laboratoire créatif où technologies émergentes et vision artistique repoussent les limites du web.',
      technologies: ['WebXR', 'AI', 'Generative', 'Interactive', 'Future']
    }
  ];

  return (
    <SiteTypesSection>
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Univers Créatifs
      </SectionTitle>
      
      <SectionSubtitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Chaque projet est un territoire vierge où vision artistique et excellence technique 
        convergent pour créer des expériences web transcendantes.
      </SectionSubtitle>

      <TypesGrid>
        {siteTypes.map((type, index) => (
          <TypeCard
            key={type.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 60px rgba(255, 255, 255, 0.05)'
            }}
            onMouseEnter={() => setHoveredCard(type.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardOverlay />
            
            {/* Éléments géométriques artistiques */}
            <GeometricShape
              style={{
                top: '1rem',
                left: '1rem',
                rotate: index * 15
              }}
              animate={{
                rotate: hoveredCard === type.id ? 360 : index * 15,
                scale: hoveredCard === type.id ? 1.2 : 1
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <ArtisticLine
              style={{
                width: '1px',
                height: '40px',
                top: '1rem',
                left: `${20 + index * 10}%`,
              }}
              animate={{
                height: hoveredCard === type.id ? '60px' : '40px',
                opacity: hoveredCard === type.id ? 1 : 0.3
              }}
              transition={{ duration: 0.3 }}
            />
            
            <FloatingElement
              style={{
                top: `${30 + index * 8}%`,
                right: `${15 + index * 5}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <TypeIcon
              animate={{
                rotate: hoveredCard === type.id ? 180 : 0,
                scale: hoveredCard === type.id ? 1.2 : 1,
                opacity: hoveredCard === type.id ? 0.6 : 0.3
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {type.icon}
            </TypeIcon>
            
            <CardContent>
              <div>
                <TypeName>{type.name}</TypeName>
                <TypeDescription>{type.description}</TypeDescription>
              </div>
              
              <TypeTechnologies>
                {type.technologies.map((tech, techIndex) => (
                  <TechTag
                    key={techIndex}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </TypeTechnologies>
            </CardContent>
          </TypeCard>
        ))}
      </TypesGrid>
    </SiteTypesSection>
  );
};

export default SiteTypes; 