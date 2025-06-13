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
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 90vw;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(8rem, 25vw, 30rem);
  font-weight: 100;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  line-height: 0.7;
  letter-spacing: -0.1em;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    font-size: clamp(4rem, 20vw, 8rem);
  }
`;

const TitleLine = styled(motion.div)`
  position: relative;
  overflow: visible;
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
`;

const Subtitle = styled(motion.div)`
  position: absolute;
  bottom: 10vh;
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
    bottom: 15vh;
    right: 50%;
    transform: translateX(50%);
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
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const words = ['DIGITAL', 'BRUTALISM'];

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
            duration: 6 + particle.id * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <HeroContent>
        <MainTitle>
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
                
                {/* Serpents simplifiés pour chaque lettre */}
                {word.split('').map((letter, letterIndex) => (
                  <LetterSerpent 
                    key={`${word}-${letterIndex}`} 
                    $letterIndex={letterIndex}
                  />
                ))}
              </motion.div>
            </TitleLine>
          ))}
        </MainTitle>
      </HeroContent>

      {/* 3D Element */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        opacity: 0.1,
      }}>
        <Canvas>
          <Abstract3D />
        </Canvas>
      </div>

      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="accent-micro"
      >
        STUDIO DE CRÉATION WEB
        <br />
        AVANT-GARDISTE
      </Subtitle>

      <CTAButton
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        data-cursor="hover"
      >
        COMMENCER
      </CTAButton>
    </HeroSection>
  );
};

export default Hero; 