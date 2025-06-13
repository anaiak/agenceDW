import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const StylesSection = styled.section`
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
  max-width: 800px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    margin-bottom: 4rem;
    padding: 0 1rem;
  }
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const StyleCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  padding: 2rem;
  height: 500px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
    padding: 1.5rem;
  }
`;

const StyleName = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StyleDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  @media (max-width: 768px) {
    min-height: 150px;
    gap: 0.8rem;
  }
`;

// 1. Dark Mode Button
const DarkModeButton = styled(motion.button)`
  background: linear-gradient(145deg, #1a1a1a, #000000);
  border: 1px solid #333333;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &::before {
    content: '🌙';
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  &:hover {
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// 2. Material You Button
const MaterialButton = styled(motion.button)`
  background: linear-gradient(135deg, #6750A4, #A855F7);
  border: none;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(167, 85, 247, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #7C3AED, #C084FC);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(167, 85, 247, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// 3. Gradient Aurora Button
const GradientButton = styled(motion.button)`
  background: linear-gradient(45deg, #FF006E, #FB5607, #FFBE0B, #8338EC, #3A86FF);
  background-size: 300% 300%;
  border: none;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  animation: gradient-animation 3s ease infinite;
  
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &:hover {
    animation-duration: 1s;
    transform: scale(1.05);
  }
`;

// 4. 3D WebGL Button
const WebGLButton = styled(motion.button)`
  background: linear-gradient(145deg, #1e293b, #334155);
  border: 1px solid #64748b;
  color: #e2e8f0;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: rotateX(15deg) rotateY(15deg);
    box-shadow: 
      0 10px 20px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(59, 130, 246, 0.5);
    
    &::before {
      opacity: 1;
    }
  }
`;

// 5. Brutalist Button
const BrutalistButton = styled(motion.button)`
  background: #ffffff;
  border: 4px solid #000000;
  color: #000000;
  padding: 1.5rem 2rem;
  border-radius: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 8px 8px 0px #000000;
  transition: all 0.1s ease;
  
  &:hover {
    transform: translate(4px, 4px);
    box-shadow: 4px 4px 0px #000000;
  }
  
  &:active {
    transform: translate(8px, 8px);
    box-shadow: 0px 0px 0px #000000;
  }
`;

// 6. Neumorphism Button
const NeumorphButton = styled(motion.button)`
  background: #e0e5ec;
  border: none;
  color: #4a5568;
  padding: 1rem 2rem;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 
    9px 9px 16px rgba(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 
      inset 9px 9px 16px rgba(163, 177, 198, 0.6),
      inset -9px -9px 16px rgba(255, 255, 255, 0.5);
    transform: scale(0.98);
  }
`;

const WebDesignTrends: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const trends = [
    {
      id: 'darkmode',
      name: 'Dark Mode Universel',
      description: 'Désormais proposé par la majorité des CMS, frameworks et navigateurs ; 82 % des mobinautes déclarent le préférer, et les marques ciblant la Gen Z le considèrent comme le "nouveau réglage par défaut".',
      component: (
        <ButtonContainer>
          <DarkModeButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dark Mode Interface
          </DarkModeButton>
          <DarkModeButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: '0.9rem', padding: '0.8rem 1.5rem' }}
          >
            Toggle Theme
          </DarkModeButton>
        </ButtonContainer>
      )
    },
    {
      id: 'material',
      name: 'Material You / Material 3',
      description: 'Google pousse son système MD3 Expressive sur Android 16 ; la personnalisation dynamique des couleurs gagne les PWA et les SaaS qui reprennent ses composants pour assurer cohérence mobile-web.',
      component: (
        <ButtonContainer>
          <MaterialButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Material Design
          </MaterialButton>
          <MaterialButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '30px', padding: '0.8rem 1.5rem' }}
          >
            Dynamic Color
          </MaterialButton>
        </ButtonContainer>
      )
    },
    {
      id: 'gradients',
      name: 'Dégradés Vifs & Blocs Couleur',
      description: 'Les gradients "aurora" et les panneaux contrastés (type bento grid Canva) sont partout : ils donnent du relief sans lourdeur et s\'adaptent facilement au mode sombre.',
      component: (
        <ButtonContainer>
          <GradientButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Aurora Gradient
          </GradientButton>
          <GradientButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '25px', padding: '0.8rem 1.5rem' }}
          >
            Bento Grid
          </GradientButton>
        </ButtonContainer>
      )
    },
    {
      id: 'webgl',
      name: '3D Interactive / WebGL',
      description: 'Scroll immersif, modèles produit tournables, WebXR : la 3D est devenue abordable (Spline, Three.js) et booste les taux de conversion sur les sites e-commerce et portfolios.',
      component: (
        <ButtonContainer>
          <WebGLButton
            whileHover={{ 
              rotateX: 15, 
              rotateY: 15,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            3D Interactive
          </WebGLButton>
          <WebGLButton
            whileHover={{ 
              rotateX: -10, 
              rotateY: -10,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '0.8rem 1.5rem' }}
          >
            WebXR Ready
          </WebGLButton>
        </ButtonContainer>
      )
    },
    {
      id: 'brutalism',
      name: 'Brutalisme & Neubrutalisme',
      description: 'Contre-pied à la "propreté" corporate : typos XXL, grilles cassées, aplats bruts. Très présent dans les landing pages de start-up et les médias culturels pour affirmer une personnalité forte.',
      component: (
        <ButtonContainer>
          <BrutalistButton
            whileHover={{ 
              x: 4, 
              y: 4,
              boxShadow: "4px 4px 0px #000000"
            }}
            whileTap={{ 
              x: 8, 
              y: 8,
              boxShadow: "0px 0px 0px #000000"
            }}
          >
            BRUTAL UI
          </BrutalistButton>
          <BrutalistButton
            whileHover={{ 
              x: 4, 
              y: 4,
              boxShadow: "4px 4px 0px #000000"
            }}
            whileTap={{ 
              x: 8, 
              y: 8,
              boxShadow: "0px 0px 0px #000000"
            }}
            style={{ fontSize: '1rem', padding: '1rem 1.5rem' }}
          >
            RAW DESIGN
          </BrutalistButton>
        </ButtonContainer>
      )
    },
    {
      id: 'neumorphism',
      name: 'Neumorphism (Soft UI)',
      description: 'Le "relief doux" revient, épuré et mieux contrasté ; adopté dans les fintechs & dashboards où l\'on veut matérialiser boutons/cartes sans surcharge graphique.',
      component: (
        <ButtonContainer>
          <NeumorphButton
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
          >
            Soft Interface
          </NeumorphButton>
          <NeumorphButton
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '15px', padding: '0.8rem 1.5rem' }}
          >
            Depth UI
          </NeumorphButton>
        </ButtonContainer>
      )
    }
  ];

  return (
    <StylesSection>
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Tendances Web 2024
      </SectionTitle>
      
      <SectionSubtitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Découvrez les 6 tendances design qui définissent l'expérience web moderne — 
        Chaque style influence la façon dont nous interagissons avec le digital.
      </SectionSubtitle>

      <StylesGrid>
        {trends.map((trend, index) => (
          <StyleCard
            key={trend.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={() => setHoveredCard(trend.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <StyleName>{trend.name}</StyleName>
            <StyleDescription>{trend.description}</StyleDescription>
            
            <AnimatePresence>
              {trend.component}
            </AnimatePresence>
          </StyleCard>
        ))}
      </StylesGrid>
    </StylesSection>
  );
};

export default WebDesignTrends; 