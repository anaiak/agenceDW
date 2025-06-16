import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const IntroContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// Film grain subtil
const FilmGrain = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.005) 1px,
      rgba(255, 255, 255, 0.005) 2px
    );
  opacity: 0.3;
  pointer-events: none;
`;

// Container central
const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

// Container pour les lettres
const LettersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(6rem, 15vw, 16rem);
  font-weight: 100;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 0.85;
  text-transform: uppercase;
  margin: 0;
  height: 200px;
`;

// Chaque lettre animée
const AnimatedLetter = styled(motion.div)`
  display: inline-block;
  opacity: 0;
`;

// Sous-titre élégant
const ElegantSubtitle = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  text-transform: lowercase;
  letter-spacing: 0.4em;
  margin-top: 4rem;
  text-align: center;
`;

// Ligne minimaliste
const MinimalLine = styled(motion.div)`
  width: 1px;
  height: 80px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  margin: 3rem auto;
`;

// Indicateur de progression
const ProgressIndicator = styled(motion.div)`
  position: absolute;
  bottom: 8vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

// Pourcentage basé sur les lettres
const LetterPercentage = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.2em;
`;

// Barre de progression des lettres
const ProgressBar = styled.div`
  width: 300px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), #ffffff);
  width: 0%;
`;

// Status des lettres
const LetterStatus = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  text-transform: lowercase;
  letter-spacing: 0.3em;
  font-weight: 300;
`;

// Fade overlay pour transition
const FadeOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 1;
`;

const CinematicIntro: React.FC = () => {
  const [revealedLetters, setRevealedLetters] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const word = "DREAMWEAVER";
  const letters = word.split('');

  useEffect(() => {
    // Créer un ordre aléatoire pour révéler les lettres
    const indices = Array.from({ length: letters.length }, (_, i) => i);
    const randomOrder = indices.sort(() => Math.random() - 0.5);
    
    // Révéler chaque lettre avec un délai
    randomOrder.forEach((index, orderIndex) => {
      setTimeout(() => {
        setRevealedLetters(prev => [...prev, index]);
        
        // Si c'est la dernière lettre
        if (orderIndex === randomOrder.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
          }, 800); // Temps d'attente après la dernière lettre : 800ms
        }
      }, orderIndex * 200 + 500); // 200ms entre chaque lettre + 500ms de délai initial
    });
  }, [letters.length]);

  const progress = (revealedLetters.length / letters.length) * 100;

  const statusMessages = [
    "initializing framework",
    "parsing creative data", 
    "assembling letters",
    "compiling imagination",
    "rendering dreams",
    "finalizing vision",
    "dreamweaver ready"
  ];

  const currentStatusIndex = Math.min(
    Math.floor((revealedLetters.length / letters.length) * (statusMessages.length - 1)),
    statusMessages.length - 1
  );

  return (
    <AnimatePresence>
      <IntroContainer
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 0.95,
          filter: "blur(8px)"
        }}
        transition={{ 
          duration: 2.0, 
          ease: [0.19, 1, 0.22, 1] // Même easing que la transition push
        }}
      >
        {/* Film grain */}
        <FilmGrain
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8 }}
        />

        <CentralContainer>
          {/* Titre avec lettres animées */}
          <LettersContainer>
            {letters.map((letter, index) => {
              // Générer une position de départ complètement aléatoire
              const generateRandomStart = () => {
                const side = Math.floor(Math.random() * 8); // 8 directions possibles
                const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
                const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
                
                switch(side) {
                  case 0: // Haut gauche
                    return { x: -screenWidth/2, y: -screenHeight/2 };
                  case 1: // Haut centre
                    return { x: Math.random() * 200 - 100, y: -screenHeight/2 };
                  case 2: // Haut droite
                    return { x: screenWidth/2, y: -screenHeight/2 };
                  case 3: // Droite centre
                    return { x: screenWidth/2, y: Math.random() * 200 - 100 };
                  case 4: // Bas droite
                    return { x: screenWidth/2, y: screenHeight/2 };
                  case 5: // Bas centre
                    return { x: Math.random() * 200 - 100, y: screenHeight/2 };
                  case 6: // Bas gauche
                    return { x: -screenWidth/2, y: screenHeight/2 };
                  case 7: // Gauche centre
                    return { x: -screenWidth/2, y: Math.random() * 200 - 100 };
                  default:
                    return { x: Math.random() * screenWidth - screenWidth/2, y: Math.random() * screenHeight - screenHeight/2 };
                }
              };

              const startPos = generateRandomStart();
              
              return (
                <AnimatedLetter
                  key={index}
                  initial={{ 
                    opacity: 0,
                    x: startPos.x,
                    y: startPos.y,
                    rotate: Math.random() * 720 - 360, // Rotation plus folle
                    scale: Math.random() * 0.5 + 0.2, // Échelle variée
                    filter: "blur(10px)"
                  }}
                  animate={{
                    opacity: revealedLetters.includes(index) ? 1 : 0,
                    x: revealedLetters.includes(index) ? 0 : startPos.x,
                    y: revealedLetters.includes(index) ? 0 : startPos.y,
                    rotate: revealedLetters.includes(index) ? 0 : Math.random() * 720 - 360,
                    scale: revealedLetters.includes(index) ? 1 : Math.random() * 0.5 + 0.2,
                    filter: revealedLetters.includes(index) ? "blur(0px)" : "blur(10px)"
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                >
                  {letter}
                </AnimatedLetter>
              );
            })}
          </LettersContainer>

          {/* Ligne décorative */}
          <MinimalLine
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: progress > 50 ? 1 : 0,
              opacity: progress > 50 ? 1 : 0
            }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
          />

          {/* Sous-titre */}
          <ElegantSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: progress > 70 ? 1 : 0,
              y: progress > 70 ? 0 : 30
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            digital creativity unleashed
          </ElegantSubtitle>
        </CentralContainer>

        {/* Indicateur de progression basé sur les lettres */}
        <ProgressIndicator
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: progress > 10 ? 1 : 0,
            y: progress > 10 ? 0 : 30
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <LetterPercentage>
            {Math.round(progress).toString().padStart(2, '0')}%
          </LetterPercentage>

          <ProgressBar>
            <ProgressFill
              animate={{ width: `${progress}%` }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            />
          </ProgressBar>

          <LetterStatus>
            {statusMessages[currentStatusIndex]}
          </LetterStatus>
        </ProgressIndicator>

        {/* Fade overlay final */}
        <FadeOverlay
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isComplete ? 1 : 0
          }}
          transition={{ 
            delay: 0.3,
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1] // Transition fluide vers le fade final
          }}
        />
      </IntroContainer>
    </AnimatePresence>
  );
};

export default CinematicIntro; 