import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000000;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    min-height: 100vh;
    min-height: 100dvh;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    justify-content: center;
    align-items: center;
  }
`;

// Container principal pour le contenu
const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
    min-height: 80vh;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
    min-height: 85vh;
    justify-content: center;
  }
`;

// Titre principal minimaliste
const StudioTitle = styled(motion.div)`
  font-size: clamp(0.7rem, 2vw, 1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  margin-bottom: 4rem;
  position: relative;
  width: 100%;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 1024px) {
    margin-bottom: 3rem;
    letter-spacing: 0.4em;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    letter-spacing: 0.3em;
    font-size: clamp(0.6rem, 1.8vw, 0.9rem);
    
    &::after {
      width: 40px;
      bottom: -0.8rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    letter-spacing: 0.2em;
    
    &::after {
      width: 30px;
      bottom: -0.6rem;
    }
  }
`;

// Message principal - la phrase poétique
const MainMessage = styled(motion.h1)`
  font-size: clamp(1.5rem, 6vw, 4rem);
  font-weight: 100;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
  text-align: center;
  position: relative;
  width: 100%;
  margin-top: 8vh;
  
  /* Effet de battement sur le texte */
  animation: heartbeat 4s ease-in-out infinite;
  
  @keyframes heartbeat {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.02);
      opacity: 0.95;
    }
  }

  @media (max-width: 1024px) {
    font-size: clamp(1.4rem, 5.5vw, 3.5rem);
    line-height: 1.25;
    margin-top: 6vh;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 4.5vw, 2.2rem);
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 4vh auto 0;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    font-size: clamp(1rem, 4vw, 1.8rem);
    line-height: 1.35;
    letter-spacing: 0;
    max-width: 100%;
    padding: 0 0.5rem;
    margin-top: 3vh;
  }

  @media (max-width: 360px) {
    font-size: clamp(0.9rem, 3.5vw, 1.5rem);
    line-height: 1.4;
    padding: 0 0.25rem;
    margin-top: 2vh;
  }
`;

// Électrocardiogramme élégant
const ECGLine = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  height: 120px;
  margin: 6rem auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    margin: 5rem auto;
    height: 110px;
    max-width: 95%;
  }

  @media (max-width: 768px) {
    margin: 4rem auto;
    height: 80px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    margin: 3rem auto;
    height: 60px;
    max-width: 95%;
  }

  @media (max-width: 360px) {
    margin: 2.5rem auto;
    height: 50px;
  }
`;

const ECGSvg = styled.svg`
  width: 100%;
  height: 100%;
  
  .ecg-line {
    fill: none;
    stroke: url(#ecgGradient);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.9;
  }

  .ecg-pulse {
    stroke-dasharray: 1200;
    animation: ecgPulse 4s ease-in-out infinite;
  }

  @keyframes ecgPulse {
    0% {
      stroke-dashoffset: 1200;
      opacity: 0.4;
    }
    15% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: -1200;
      opacity: 0.4;
    }
  }

  @media (max-width: 1024px) {
    .ecg-line {
      stroke-width: 1.8;
    }
  }

  @media (max-width: 768px) {
    .ecg-line {
      stroke-width: 1.5;
    }
  }

  @media (max-width: 480px) {
    .ecg-line {
      stroke-width: 1.2;
    }
  }
`;

// Sous-titre descriptif
const Subtitle = styled(motion.div)`
  font-size: clamp(0.7rem, 2vw, 1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-align: center;
  margin-bottom: 4rem;
  width: 100%;

  @media (max-width: 1024px) {
    margin-bottom: 3rem;
    letter-spacing: 0.15em;
    font-size: clamp(0.65rem, 1.8vw, 0.9rem);
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    letter-spacing: 0.1em;
    font-size: clamp(0.6rem, 1.6vw, 0.8rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
    font-size: clamp(0.55rem, 1.4vw, 0.7rem);
  }
`;

// Particules minimalistes
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

// Grille de fond minimaliste avec pulsation
const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite, gridPulse 4s ease-in-out infinite;
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  @keyframes gridPulse {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.15; }
  }

  @media (max-width: 1024px) {
    background-size: 40px 40px;
    
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(40px, 40px); }
    }
  }

  @media (max-width: 768px) {
    background-size: 30px 30px;
    
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(30px, 30px); }
    }
  }

  @media (max-width: 480px) {
    background-size: 25px 25px;
    opacity: 0.06;
    
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(25px, 25px); }
    }
  }
`;

// Pulsations lumineuses discrètes
const HeartbeatGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%);
  animation: heartbeatGlow 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;

  @keyframes heartbeatGlow {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0.4;
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.4);
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

// Ondulations subtiles aux coins
const CornerPulse = styled.div<{ $corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 70%);
  animation: cornerPulse 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;

  ${props => {
    switch(props.$corner) {
      case 'top-left':
        return `top: -50px; left: -50px; animation-delay: 0s;`;
      case 'top-right':
        return `top: -50px; right: -50px; animation-delay: 1s;`;
      case 'bottom-left':
        return `bottom: -50px; left: -50px; animation-delay: 2s;`;
      case 'bottom-right':
        return `bottom: -50px; right: -50px; animation-delay: 3s;`;
    }
  }}

  @keyframes cornerPulse {
    0%, 100% { 
      transform: scale(0.3);
      opacity: 0.3;
    }
    50% { 
      transform: scale(1.8);
      opacity: 0.8;
    }
  }

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    
    ${props => {
      switch(props.$corner) {
        case 'top-left':
          return `top: -30px; left: -30px;`;
        case 'top-right':
          return `top: -30px; right: -30px;`;
        case 'bottom-left':
          return `bottom: -30px; left: -30px;`;
        case 'bottom-right':
          return `bottom: -30px; right: -30px;`;
      }
    }}
  }
`;

// Effet de respiration sur tout l'écran
const ScreenBreathing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%);
  animation: screenBreathe 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;

  @keyframes screenBreathe {
    0%, 100% { 
      transform: scale(0.95);
      opacity: 0.5;
    }
    50% { 
      transform: scale(1.08);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    @keyframes screenBreathe {
      0%, 100% { 
        transform: scale(0.98);
        opacity: 0.4;
      }
      50% { 
        transform: scale(1.05);
        opacity: 0.8;
      }
    }
  }
`;

// Ajout d'un effet de vague pour plus de visibilité
const PulseWave = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: pulseWave 4s ease-out infinite;
  pointer-events: none;
  z-index: 1;

  @keyframes pulseWave {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    animation: pulseWave 4s ease-out infinite 2s;
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
    
    &::before {
      width: 125px;
      height: 125px;
    }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    
    &::before {
      width: 100px;
      height: 100px;
    }
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border-width: 1px;
    
    &::before {
      width: 75px;
      height: 75px;
    }
  }
`;

// Particules avec battement synchronisé
const Particle = styled(motion.div)<{ $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 2px;
    background: #ffffff;
    border-radius: 50%;
    animation: sparkle 4s ease-in-out infinite, particleHeartbeat 4s ease-in-out infinite;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes particleHeartbeat {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.5);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 768px) {
    width: ${props => props.$size * 0.7}px;
    height: ${props => props.$size * 0.7}px;
    
    &::before {
      width: 1.5px;
      height: 1.5px;
    }
  }

  @media (max-width: 480px) {
    width: ${props => props.$size * 0.5}px;
    height: ${props => props.$size * 0.5}px;
    
    &::before {
      width: 1px;
      height: 1px;
    }
    
    @keyframes particleHeartbeat {
      0%, 100% { 
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      }
      50% { 
        transform: translate(-50%, -50%) scale(1.2);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
      }
    }
  }
`;

// Indicateur d'urgence/rareté - style brutal
const UrgencyBanner = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  backdrop-filter: blur(10px);
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: #ffffff;
    animation: urgencyPulse 2s ease-in-out infinite;
  }
  
  @keyframes urgencyPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @media (max-width: 1024px) {
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.7rem 1.2rem;
    font-size: 0.65rem;
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.6rem 1rem;
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    /* Repositionner en bas à droite pour éviter les conflits */
    top: auto;
    bottom: 8rem;
    right: 1rem;
    padding: 0.5rem 0.8rem;
    font-size: 0.55rem;
    letter-spacing: 0.05em;
    
    &::before {
      width: 2px;
    }
  }

  @media (max-width: 360px) {
    /* Masquer sur très petits écrans pour éviter l'encombrement */
    display: none;
  }
`;

// Badge de social proof - minimaliste
const SocialProofBadge = styled(motion.div)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  z-index: 10;
  
  .number {
    font-size: 1.2rem;
  font-weight: 700;
    color: #ffffff;
    display: block;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 1024px) {
    top: 1.5rem;
    left: 1.5rem;
    font-size: 0.65rem;
    
    .number {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    font-size: 0.6rem;
    
    .number {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    /* Repositionner en bas à gauche pour éviter les conflits */
    top: auto;
    bottom: 8rem;
    left: 1rem;
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    
    .number {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 360px) {
    /* Masquer sur très petits écrans pour éviter l'encombrement */
    display: none;
  }
`;

// CTA optimisé avec bénéfice
const CTAButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 1rem 3rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  margin-top: 2rem;
  align-self: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #ffffff;
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: #000000;
    
    &::before {
      width: 100%;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }

  .cta-main {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }
  
  .cta-sub {
    display: block;
    font-size: 0.6rem;
    opacity: 0.8;
    font-weight: 400;
  }

  @media (max-width: 1024px) {
    padding: 0.9rem 2.5rem;
    font-size: 0.75rem;
    margin-top: 1.5rem;
    
    .cta-main {
      font-size: 0.85rem;
    }
    
    .cta-sub {
      font-size: 0.58rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 0.7rem;
    margin-top: 1.5rem;
    
    .cta-main {
      font-size: 0.8rem;
    }
    
    .cta-sub {
      font-size: 0.55rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    margin-top: 1rem;
    border-width: 1.5px;
    width: auto;
    max-width: 90%;
    
    .cta-main {
    font-size: 0.75rem;
      margin-bottom: 0.1rem;
    }
    
    .cta-sub {
      font-size: 0.5rem;
    }
  }

  @media (max-width: 360px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.6rem;
    max-width: 95%;
    
    .cta-main {
      font-size: 0.7rem;
    }
    
    .cta-sub {
      font-size: 0.45rem;
    }
  }
`;

// Indicateur de scroll
const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  z-index: 10;
  
  &::after {
    content: '';
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
    margin-top: 1rem;
    animation: scrollPulse 2s ease-in-out infinite;
  }
  
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @media (max-width: 1024px) {
    bottom: 1.5rem;
    font-size: 0.65rem;
    
    &::after {
      height: 25px;
    }
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    font-size: 0.6rem;
    
    &::after {
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    bottom: 1rem;
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    
    &::after {
      height: 15px;
      margin-top: 0.8rem;
    }
  }

  @media (max-width: 360px) {
    bottom: 0.8rem;
    font-size: 0.5rem;
    
    &::after {
      height: 12px;
    }
  }
`;

const Hero: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      let particleCount;
      const screenWidth = window.innerWidth;
      
      // Adaptation du nombre de particules selon la taille d'écran
      if (screenWidth <= 360) {
        particleCount = 8;
      } else if (screenWidth <= 480) {
        particleCount = 10;
      } else if (screenWidth <= 768) {
        particleCount = 12;
      } else if (screenWidth <= 1024) {
        particleCount = 16;
      } else {
        particleCount = 20;
      }
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (screenWidth <= 768 ? 6 : 8) + (screenWidth <= 480 ? 3 : 4),
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <BackgroundGrid />
      <ScreenBreathing />
      
      {/* Éléments de conversion psychologique */}
      <UrgencyBanner
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        Places limitées — 3 projets par mois
      </UrgencyBanner>
      
      <SocialProofBadge
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <span className="number">47+</span>
        Entreprises conquises
      </SocialProofBadge>
      
      {/* Éléments de battement subtils */}
      <HeartbeatGlow />
      <PulseWave />
      <CornerPulse $corner="top-left" />
      <CornerPulse $corner="top-right" />
      <CornerPulse $corner="bottom-left" />
      <CornerPulse $corner="bottom-right" />
      
      <ParticleContainer>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            $size={particle.size}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (particle.id % 4) * 1,
            }}
          />
        ))}
      </ParticleContainer>

      <HeroContent>
        <StudioTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          DW.STUDIO
        </StudioTitle>

        <MainMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Chaque projet porte un battement.
          <br />
          Nous le faisons résonner.
        </MainMessage>

        <ECGLine
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <ECGSvg viewBox="0 0 900 120">
            <defs>
              {/* Gradient pour le tracé principal avec fondu aux extrémités */}
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="10%" stopColor="rgba(255, 255, 255, 0.8)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="90%" stopColor="rgba(255, 255, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
            </defs>
            
            {/* Tracé ECG principal */}
            <path 
              className="ecg-line ecg-pulse"
              d="M0,60 L120,60 L130,60 L135,45 L140,75 L145,25 L150,95 L155,60 L180,60 L300,60 L310,60 L315,45 L320,75 L325,25 L330,95 L335,60 L360,60 L480,60 L490,60 L495,45 L500,75 L505,25 L510,95 L515,60 L540,60 L660,60 L670,60 L675,45 L680,75 L685,25 L690,95 L695,60 L720,60 L900,60"
            />
          </ECGSvg>
        </ECGLine>

      <Subtitle
          initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
      >
          Digital Brutalism Studio
      </Subtitle>

      <CTAButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        onClick={handleCTAClick}
        data-cursor="hover"
      >
          <span className="cta-main">Obtenir mon devis gratuit</span>
          <span className="cta-sub">Réponse sous 24h garantie</span>
      </CTAButton>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        Scroll
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 