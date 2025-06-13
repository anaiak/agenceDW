import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ServicesSection = styled.section`
  min-height: 100vh;
  background: #000000;
  padding: 15vh 5vw;
  position: relative;
  overflow: hidden;

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
  margin-bottom: 10vh;
  line-height: 0.8;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #ffffff;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: 6vh;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServiceCard = styled(motion.div)<{ $position: string }>`
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2rem;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  
  grid-column: ${props => {
    switch(props.$position) {
      case 'left': return '1';
      case 'center': return '2';
      case 'right': return '3';
      case 'span': return '1 / 4';
      default: return 'auto';
    }
  }};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-left: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  @media (max-width: 1024px) {
    grid-column: ${props => props.$position === 'span' ? '1 / 3' : 'auto'};
  }

  @media (max-width: 768px) {
    grid-column: 1;
    padding: 2rem 1.5rem;
  }
`;

// Container pour les effets de scan
const ScanContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
`;

// Effet de scan principal comme dans l'intro
const ScanLine = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #ffffff,
    #ffffff,
    transparent
  );
  box-shadow: 0 0 20px #ffffff, 0 0 40px rgba(255, 255, 255, 0.5);
  left: -10px;
  z-index: 15;
`;

// Lignes de scan horizontales multiples
const HorizontalScan = styled(motion.div)<{ $delay: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    #ffffff,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation-delay: ${props => props.$delay}s;
`;

// Grille de scan subtle
const ScanGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.02) 2px,
    rgba(255, 255, 255, 0.02) 4px
  );
  opacity: 0;
`;

// Effet de révélation par zones
const RevealZone = styled(motion.div)<{ $zone: number }>`
  position: absolute;
  top: ${props => props.$zone * 25}%;
  left: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(
    45deg,
    transparent 48%,
    rgba(255, 255, 255, 0.05) 49%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 51%,
    transparent 52%
  );
  transform: translateX(-100%);
`;

const ServiceNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const ServiceDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ServiceTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ManifestoCard = styled(motion.div)`
  grid-column: 1 / 4;
  border: 2px solid #ffffff;
  padding: 4rem;
  text-align: center;
  margin-top: 5rem;

  @media (max-width: 768px) {
    grid-column: 1;
    padding: 2rem;
  }
`;

const ManifestoText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 300;
  color: #ffffff;
  line-height: 1.8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  strong {
    font-weight: 700;
    color: #ffffff;
  }
`;

// Composant pour animer chaque lettre individuellement
const AnimatedLetter = styled(motion.span)<{ $delay: number }>`
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const AnimatedLine = styled(motion.div)`
  margin-bottom: 0.5rem;
`;

// Composant pour animer le texte lettre par lettre
const AnimatedText: React.FC<{ 
  text: string; 
  isVisible: boolean; 
  lineDelay?: number;
  isBold?: boolean;
}> = ({ text, isVisible, lineDelay = 0, isBold = false }) => {
  const [animatedLetters, setAnimatedLetters] = useState<Array<{
    char: string;
    id: number;
    initialX: number;
    initialY: number;
    initialRotate: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const letters = text.split('').map((char, index) => ({
      char,
      id: Math.random(),
      // Directions aléatoires très variées
      initialX: (Math.random() - 0.5) * 2000, // -1000px à 1000px
      initialY: (Math.random() - 0.5) * 1500, // -750px à 750px
      initialRotate: (Math.random() - 0.5) * 720, // -360° à 360°
      delay: index * 0.03 + lineDelay // Délai progressif
    }));
    setAnimatedLetters(letters);
  }, [text, lineDelay]);

  return (
    <AnimatedLine>
      {animatedLetters.map((letter, index) => (
        <AnimatedLetter
          key={letter.id}
          $delay={letter.delay}
          initial={{
            x: letter.initialX,
            y: letter.initialY,
            rotate: letter.initialRotate,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 // Scale aléatoire
          }}
          animate={isVisible ? {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1
          } : {
            x: letter.initialX,
            y: letter.initialY,
            rotate: letter.initialRotate,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4, // Durée variable
            delay: letter.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            damping: 20,
            stiffness: 100
          }}
          style={{
            fontWeight: isBold ? 700 : 300,
            marginRight: letter.char === ' ' ? '0.3em' : '0'
          }}
        >
          {letter.char === ' ' ? '\u00A0' : letter.char}
        </AnimatedLetter>
      ))}
    </AnimatedLine>
  );
};

// Interface pour les effets de scan
interface ScanEffect {
  id: number;
  cardIndex: number;
}

// === SECTION CLIENTS ===

const ClientsSection = styled.section`
  min-height: 50vh;
  background: #000000;
  padding: 20vh 5vw;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 15vh 4vw;
  }
`;

const LogoCarouselSection = styled.div`
  width: 100%;
  overflow: hidden;
  background: #000000;
  padding: 6rem 0;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(90deg, #000000 0%, transparent 100%);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(270deg, #000000 0%, transparent 100%);
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const LogoCarouselTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8rem;
  width: fit-content;

  @media (max-width: 768px) {
    gap: 4rem;
  }
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 80px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-width: 150px;
    height: 60px;
  }
`;

const LogoText = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ffffff;
    transition: width 0.3s ease;
  }
  
  ${LogoItem}:hover &::before {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Composant pour les logos simplifiés
const LogoBranded = styled.div<{ $brand: string }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  
  ${props => {
    switch(props.$brand) {
      case 'LVMH':
        return `
          font-size: 2.2rem;
          letter-spacing: 0.3em;
          &::after {
            content: '®';
            font-size: 0.8rem;
            position: absolute;
            top: 0;
            right: -15px;
          }
        `;
      case 'BNP':
        return `
          color: #ffffff;
          border: 2px solid #ffffff;
          padding: 8px 16px;
          font-size: 1.4rem;
        `;
      case 'PEUGEOT':
        return `
          font-family: serif;
          font-style: italic;
          font-size: 2rem;
        `;
      case 'DANONE':
        return `
          border-radius: 20px;
          border: 2px solid #ffffff;
          padding: 6px 20px;
          font-size: 1.6rem;
        `;
      case 'VINCI':
        return `
          background: #ffffff;
          color: #000000;
          padding: 8px 16px;
          font-weight: 900;
        `;
      default:
        return '';
    }
  }}
`;

const Services: React.FC = () => {
  const ref = useRef(null);
  const manifestoRef = useRef(null);
  const clientsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isManifestoInView = useInView(manifestoRef, { once: true, margin: "-200px" });
  const isClientsInView = useInView(clientsRef, { once: true, margin: "-150px" });
  const [activeScan, setActiveScan] = useState<ScanEffect | null>(null);

  // Fonction pour déclencher l'effet de scan
  const triggerScan = (cardIndex: number) => {
    const scanEffect: ScanEffect = {
      id: Date.now(),
      cardIndex
    };
    
    setActiveScan(scanEffect);
    
    // Nettoyer après l'animation (2 secondes)
    setTimeout(() => {
      setActiveScan(null);
    }, 2000);
  };

  // Données clients françaises (pour les logos uniquement)
  const clients = [
    { name: "LVMH" },
    { name: "BNP PARIBAS" },
    { name: "PEUGEOT" },
    { name: "CRÉDIT AGRICOLE" },
    { name: "DANONE" },
    { name: "SODEXO" },
    { name: "VINCI" },
    { name: "MIRAKL" }
  ];

  const services = [
    {
      number: "01",
      title: "DESIGN RADICAL",
      description: "Brutalisme numérique. Minimalisme extrême. Contrastes saisissants. Nous cassons les codes pour créer l'inattendu.",
      tech: ["FIGMA", "SKETCH", "PHOTOSHOP", "BRUTALISM"],
      position: "left"
    },
    {
      number: "02", 
      title: "DÉVELOPPEMENT AVANT-GARDE",
      description: "Code propre, architecture modulaire, performances ultimes. Chaque ligne de code est pensée pour l'excellence technique.",
      tech: ["REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS"],
      position: "center"
    },
    {
      number: "03",
      title: "EXPÉRIENCE SENSORIELLE",
      description: "Interactions surprenantes, animations cinématographiques, parcours utilisateur révolutionnaire.",
      tech: ["FRAMER", "GSAP", "WEBGL", "CSS3"],
      position: "right"
    },
    {
      number: "04",
      title: "STRATÉGIE DISRUPTIVE",
      description: "Nous ne suivons pas les tendances, nous les créons. Chaque projet redéfinit les standards de son secteur.",
      tech: ["BRANDING", "UX/UI", "STRATEGY", "INNOVATION"],
      position: "left"
    },
    {
      number: "05",
      title: "PERFORMANCE EXTRÊME",
      description: "Vitesse de chargement record, SEO technique poussé, optimisation obsessionnelle pour l'excellence.",
      tech: ["LIGHTHOUSE", "CORE VITALS", "SEO", "PWA"],
      position: "center"
    },
    {
      number: "06",
      title: "SUPPORT TECHNIQUE",
      description: "Maintenance proactive, mises à jour continues, support technique d'élite pour votre tranquillité d'esprit.",
      tech: ["24/7", "MONITORING", "BACKUP", "SECURITY"],
      position: "right"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const handleCardInteraction = (index: number) => {
    triggerScan(index);
  };

  return (
    <>
      <ServicesSection id="services" ref={ref}>
        <SectionTitle
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          SERVICES
        </SectionTitle>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              $position={service.position}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              data-cursor="hover"
              onMouseEnter={() => handleCardInteraction(index)}
              onClick={() => handleCardInteraction(index)}
            >
              <ServiceNumber className="service-number">
                {service.number}
              </ServiceNumber>
              <ServiceTitle className="text-fragmented">
                {service.title}
              </ServiceTitle>
              <ServiceDescription>
                {service.description}
              </ServiceDescription>
              <ServiceTech>
                {service.tech.map((tech, techIndex) => (
                  <TechTag key={techIndex}>
                    {tech}
                  </TechTag>
                ))}
              </ServiceTech>
              
              {/* Effets de scan cinématique */}
              <ScanContainer>
                <AnimatePresence>
                  {activeScan && activeScan.cardIndex === index && (
                    <>
                      {/* Scan principal vertical comme dans l'intro */}
                      <ScanLine
                        initial={{ x: '-10px' }}
                        animate={{ x: '100%' }}
                        exit={{ x: '110%' }}
                        transition={{ 
                          duration: 1.2,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Grille de scan subtile */}
                      <ScanGrid
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.3,
                          delay: 0.2
                        }}
                      />
                      
                      {/* Lignes horizontales de scan */}
                      {[0, 1, 2, 3, 4].map((line) => (
                        <HorizontalScan
                          key={line}
                          $delay={line * 0.1}
                          style={{ top: `${20 + line * 15}%` }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ 
                            scaleX: [0, 1, 0],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{ 
                            duration: 0.6,
                            delay: line * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                      
                      {/* Zones de révélation par étapes */}
                      {[0, 1, 2, 3].map((zone) => (
                        <RevealZone
                          key={zone}
                          $zone={zone}
                          initial={{ translateX: '-100%' }}
                          animate={{ translateX: '100%' }}
                          transition={{ 
                            duration: 0.8,
                            delay: zone * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </ScanContainer>
            </ServiceCard>
          ))}

          <ManifestoCard
            ref={manifestoRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <AnimatedText 
                text="NOUS NE CRÉONS PAS DES SITES WEB." 
                isVisible={isManifestoInView}
                lineDelay={0}
                isBold={true}
              />
              <br />
              <AnimatedText 
                text="NOUS FORGEONS DES EXPÉRIENCES NUMÉRIQUES" 
                isVisible={isManifestoInView}
                lineDelay={1.5}
                isBold={false}
              />
              <br />
              <AnimatedText 
                text="QUI MARQUENT LES ESPRITS." 
                isVisible={isManifestoInView}
                lineDelay={3}
                isBold={false}
              />
            </div>
          </ManifestoCard>
        </ServicesGrid>
      </ServicesSection>

      {/* === SECTION CLIENTS === */}
      <ClientsSection id="clients" ref={clientsRef}>
        <LogoCarouselSection>
          <LogoCarouselTrack
            animate={{
              x: [0, -100 * clients.length * 0.8] // Animation infinie
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // 30 secondes pour un tour complet
                ease: "linear",
              },
            }}
          >
            {/* Première série de logos */}
            {clients.map((client, index) => (
              <LogoItem key={`first-${index}`}>
                <LogoBranded $brand={client.name}>
                  {client.name}
                </LogoBranded>
              </LogoItem>
            ))}
            
            {/* Deuxième série pour l'effet infini */}
            {clients.map((client, index) => (
              <LogoItem key={`second-${index}`}>
                <LogoBranded $brand={client.name}>
                  {client.name}
                </LogoBranded>
              </LogoItem>
            ))}
            
            {/* Troisième série pour garantir la continuité */}
            {clients.map((client, index) => (
              <LogoItem key={`third-${index}`}>
                <LogoBranded $brand={client.name}>
                  {client.name}
                </LogoBranded>
              </LogoItem>
            ))}
          </LogoCarouselTrack>
        </LogoCarouselSection>
      </ClientsSection>
    </>
  );
};

export default Services; 