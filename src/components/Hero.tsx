import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000000;

  @media (max-width: 768px) {
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile */
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 90vw;

  @media (max-width: 768px) {
    max-width: 95vw;
    padding: 0 1rem;
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(12rem, 35vw, 45rem); /* Increased size significantly */
  font-weight: 100;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  line-height: 0.6; /* Tighter line height for vertical stacking */
  letter-spacing: -0.1em;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column; /* Stack words vertically */
  align-items: center;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 18vw, 6rem); /* Adjusted for vertical letters */
    line-height: 0.8; /* More breathing room for vertical letters */
    letter-spacing: 0.1em; /* Positive spacing for vertical layout */
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row; /* Horizontal layout for mobile */
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 2rem; /* Space between words */
  }
`;

const TitleLine = styled(motion.div)`
  position: relative;
  overflow: visible;
  width: 100%; /* Full width for each line */
  text-align: center; /* Center each word */

  @media (max-width: 768px) {
    writing-mode: vertical-lr; /* Vertical writing for mobile */
    text-orientation: upright; /* Keep letters upright */
    height: 50vh; /* Fixed height for vertical text */
    width: auto;
    margin: 0; /* Remove margin */
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Animation plus simple pour les serpents
const serpentWave = keyframes`
  0% { transform: translateX(0) scaleX(1); }
  25% { transform: translateX(10px) scaleX(1.1); }
  50% { transform: translateX(0) scaleX(1); }
  75% { transform: translateX(-10px) scaleX(0.9); }
  100% { transform: translateX(0) scaleX(1); }
`;

const serpentFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(2deg); }
  66% { transform: translateY(20px) rotate(-2deg); }
`;

// Container pour tous les serpents
const SerpentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    opacity: 0.3; /* Reduce serpent visibility on mobile for better performance */
  }
`;

// Serpent horizontal avec position fixe
const HorizontalSerpent = styled.div<{ $delay: number; $top: number }>`
  position: absolute;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  top: ${props => props.$top}%;
  left: -200px;
  animation: ${serpentWave} ${props => 4 + props.$delay}s ease-in-out infinite,
             moveHorizontal ${props => 8 + props.$delay * 2}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.6;
  
  @keyframes moveHorizontal {
    from { left: -200px; }
    to { left: 100vw; }
  }

  @media (max-width: 768px) {
    width: 150px; /* Smaller serpents on mobile */
    height: 1px;
    opacity: 0.4;
  }
`;

// Serpent vertical avec position fixe
const VerticalSerpent = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  width: 2px;
  height: 200px;
  background: linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  left: ${props => props.$left}%;
  top: -200px;
  animation: ${serpentFloat} ${props => 6 + props.$delay}s ease-in-out infinite,
             moveVertical ${props => 10 + props.$delay * 2}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.6;
  
  @keyframes moveVertical {
    from { top: -200px; }
    to { top: 100vh; }
  }

  @media (max-width: 768px) {
    width: 1px;
    height: 150px;
    opacity: 0.4;
  }
`;

// Serpents ondulés avec SVG simplifié
const WavySerpent = styled.svg<{ $delay: number; $top: number }>`
  position: absolute;
  width: 100%;
  height: 100px;
  top: ${props => props.$top}%;
  left: 0;
  opacity: 0.2;
  
  path {
    fill: none;
    stroke: #ffffff;
    stroke-width: 1;
    stroke-linecap: round;
    animation: drawSerpent ${props => 8 + props.$delay}s ease-in-out infinite;
  }
  
  @keyframes drawSerpent {
    0% { stroke-dasharray: 0, 1000; }
    50% { stroke-dasharray: 500, 500; }
    100% { stroke-dasharray: 1000, 0; }
  }

  @media (max-width: 768px) {
    height: 60px;
    opacity: 0.1;
    
    path {
      stroke-width: 0.5;
    }
  }
`;

// Serpents spéciaux autour des lettres - Version simplifiée
const LetterSerpent = styled.div<{ $letterIndex: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.$letterIndex * 8}%;
  width: 150px;
  height: 100px;
  pointer-events: none;
  transform: translateY(-50%);
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    top: 20%;
    left: 0;
    animation: letterWave${props => props.$letterIndex % 8} 3s ease-in-out infinite;
    animation-delay: ${props => props.$letterIndex * 0.2}s;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    bottom: 20%;
    left: 0;
    animation: letterWave${props => props.$letterIndex % 8} 3s ease-in-out infinite reverse;
    animation-delay: ${props => props.$letterIndex * 0.3}s;
  }

  @media (max-width: 768px) {
    display: none; /* Hide complex letter animations on mobile for performance */
  }
  
  @keyframes letterWave0 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(1.2) translateY(-5px); }
  }
  
  @keyframes letterWave1 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(0.8) translateY(5px); }
  }
  
  @keyframes letterWave2 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(1.3) translateY(-8px); }
  }
  
  @keyframes letterWave3 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(0.7) translateY(8px); }
  }
  
  @keyframes letterWave4 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(1.1) translateY(-3px); }
  }
  
  @keyframes letterWave5 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(0.9) translateY(3px); }
  }
  
  @keyframes letterWave6 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(1.4) translateY(-10px); }
  }
  
  @keyframes letterWave7 {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(0.6) translateY(10px); }
  }
`;

// Particules serpentines visibles
const SerpentParticle = styled(motion.div)<{ $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    width: ${props => props.$size * 0.7}px; /* Smaller particles on mobile */
    height: ${props => props.$size * 0.7}px;
    opacity: 0.6;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

const Subtitle = styled(motion.div)`
  position: absolute;
  bottom: 8vh; /* Moved higher due to larger title */
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 2rem;
    background: #ffffff;
  }

  @media (max-width: 768px) {
    bottom: 25vh; /* Lower position to accommodate vertical text */
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    padding: 0 2rem;
    line-height: 1.4;
    writing-mode: horizontal-tb; /* Ensure subtitle stays horizontal */
    
    &::before {
      top: -0.8rem;
      height: 1.5rem;
      width: 1px;
    }
  }
`;

const CTAButton = styled(motion.button)`
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #000000;
    color: #ffffff;
    box-shadow: inset 0 0 0 2px #ffffff;
    transform: translate(-5px, -5px);
  }

  @media (max-width: 768px) {
    bottom: 8vh; /* Higher position for better thumb reach */
    right: 50%;
    transform: translateX(50%);
    padding: 0.8rem 1.5rem;
    font-size: 0.75rem;
    cursor: pointer; /* Enable cursor on mobile */
    border: 2px solid #000000;
    
    /* Touch feedback */
    &:hover {
      transform: translateX(50%); /* Override desktop hover transform */
    }
    
    &:active {
      background: #000000;
      color: #ffffff;
      transform: translateX(50%) scale(0.95);
    }
  }
`;

// 3D Element container avec optimisations mobile
const Abstract3DContainer = styled.div`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  opacity: 0.1;

  @media (max-width: 768px) {
    display: none; /* Hide 3D element on mobile for performance */
  }
`;

const Abstract3D = () => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial wireframe color="#ffffff" />
    </mesh>
  );
};

// Suppression du MobileTitleContainer car on utilise directement MainTitle
const MobileTitleContainer = styled.div`
  display: contents; /* This makes the container transparent */
  
  @media (max-width: 768px) {
    display: contents; /* Transparent container */
  }
`;

const Hero: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [horizontalSerpents] = useState(() => 
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      top: Math.random() * 80 + 10
    }))
  );
  const [verticalSerpents] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i * 2,
      left: Math.random() * 80 + 10
    }))
  );
  const [wavySerpents] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i,
      top: Math.random() * 80 + 10,
      curve: 20 + i * 10
    }))
  );
  
  useEffect(() => {
    const generateParticles = () => {
      // Reduce particles on mobile for better performance
      const particleCount = window.innerWidth <= 768 ? 4 : 8;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Re-generate on resize
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const titleVariants = {
    hidden: { y: 150, opacity: 0, scale: 0.8 }, // Increased initial offset for larger text
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.3, // Slightly longer delay between words for dramatic effect
        duration: 1, // Slightly longer duration for larger text
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const words = ['DIGITAL', 'BRUTALISM'];

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      {/* Serpents simplifiés et visibles */}
      <SerpentContainer>
        {/* Serpents horizontaux */}
        {horizontalSerpents.map((serpent) => (
          <HorizontalSerpent 
            key={`h-${serpent.id}`}
            $delay={serpent.delay} 
            $top={serpent.top}
          />
        ))}
        
        {/* Serpents verticaux */}
        {verticalSerpents.map((serpent) => (
          <VerticalSerpent 
            key={`v-${serpent.id}`}
            $delay={serpent.delay} 
            $left={serpent.left}
          />
        ))}
        
        {/* Serpents ondulés SVG */}
        {wavySerpents.map((serpent) => (
          <WavySerpent 
            key={`wave-${serpent.id}`} 
            $delay={serpent.delay}
            $top={serpent.top}
            viewBox="0 0 1200 100"
          >
            <path d={`M0,50 Q150,${serpent.curve} 300,50 T600,50 T900,50 T1200,50`} />
          </WavySerpent>
        ))}
      </SerpentContainer>

      {/* Particules visibles */}
      {particles.map((particle) => (
        <SerpentParticle
          key={particle.id}
          $size={particle.size}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -30, 30, 0],
            opacity: [0.5, 1, 0.5, 0.5],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: window.innerWidth <= 768 ? 4 + particle.id * 0.3 : 6 + particle.id * 0.5, // Faster on mobile
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <HeroContent>
        <MainTitle>
          <MobileTitleContainer>
            {words.map((word, wordIndex) => (
              <TitleLine key={word}>
                <motion.div
                  custom={wordIndex}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className="fracture"
                  style={{ position: 'relative' }}
                >
                  {word}
                  
                  {/* Serpents simplifiés pour chaque lettre - Hidden on mobile due to vertical text */}
                  {word.split('').map((letter, letterIndex) => (
                    <LetterSerpent 
                      key={`${word}-${letterIndex}`} 
                      $letterIndex={letterIndex}
                    />
                  ))}
                </motion.div>
              </TitleLine>
            ))}
          </MobileTitleContainer>
        </MainTitle>
      </HeroContent>

      {/* 3D Element */}
      <Abstract3DContainer>
        <Canvas>
          <Abstract3D />
        </Canvas>
      </Abstract3DContainer>

      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }} // Faster subtitle appearance
        className="accent-micro"
      >
        STUDIO DE CRÉATION WEB
        <br />
        AVANT-GARDISTE
      </Subtitle>

      <CTAButton
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }} // Earlier CTA appearance
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }} // Touch feedback
        onClick={handleCTAClick}
        data-cursor="hover"
      >
        COMMENCER
      </CTAButton>
    </HeroSection>
  );
};

export default Hero; 