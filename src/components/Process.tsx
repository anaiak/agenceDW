import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ProcessSection = styled.section`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  padding: 15vh 5vw;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 8vh 4vw 6vh 4vw;
    min-height: auto;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 100;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 5vh;
  line-height: 0.8;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #000000;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 10vw, 4rem);
    margin-bottom: 4vh;
    text-align: center;
    
    &::after {
      width: 60px;
      margin: 1.5rem auto 0 auto;
    }
  }
`;

const ProcessIntro = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto 10vh auto;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 6vh;
  }
`;

const IntroText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 300;
  color: #000000;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  strong {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.95rem, 4vw, 1.1rem);
    line-height: 1.5;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;

const ProcessTimeline = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
  }
`;

const TimelineConnector = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #000000;
  transform: translateX(-50%);
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProcessStep = styled(motion.div)<{ $isLeft: boolean }>`
  display: flex;
  justify-content: ${props => props.$isLeft ? 'flex-end' : 'flex-start'};
  margin-bottom: 8rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 3rem;
    padding: 0;
  }
`;

const StepCard = styled(motion.div)<{ $isLeft: boolean }>`
  width: 45%;
  background: #ffffff;
  border: 2px solid #000000;
  padding: 3rem;
  position: relative;
  margin-${props => props.$isLeft ? 'right' : 'left'}: 5%;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.$isLeft ? 'right: -12px' : 'left: -12px'};
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: #000000;
    border-radius: 50%;
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.$isLeft ? 'right: -8px' : 'left: -8px'};
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 3;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 2rem 1.5rem;
    
    &::before,
    &::after {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 30px;
    height: 1px;
    background: #000000;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0.8rem;
    
    &::after {
      width: 25px;
    }
  }
`;

const StepTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 5vw, 1.5rem);
    margin-bottom: 1rem;
    line-height: 1.1;
  }
`;

const StepDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const StepDuration = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  span {
    background: #000000;
    color: #ffffff;
    padding: 0.2rem 0.8rem;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
    
    span {
      padding: 0.15rem 0.6rem;
      font-size: 0.75rem;
    }
  }
`;

const StepDeliverables = styled.div`
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const DeliverablesTitle = styled.h4`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.8rem;
  }
`;

const DeliverablesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DeliverableItem = styled.li`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #000000;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: #000000;
    font-size: 0.7rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
    padding-left: 1.2rem;
    line-height: 1.4;
    
    &::before {
      font-size: 0.6rem;
    }
  }
`;

const ProcessCTA = styled(motion.div)`
  text-align: center;
  margin-top: 8rem;
  padding: 4rem 2rem;
  border: 2px solid #000000;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #000000;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #000000;
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    padding: 2.5rem 1.5rem;
    
    &::before,
    &::after {
      width: 15px;
      height: 15px;
    }
    
    &::before {
      top: -8px;
      left: -8px;
    }
    
    &::after {
      bottom: -8px;
      right: -8px;
    }
  }
`;

const CTATitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: clamp(1.3rem, 6vw, 1.8rem);
    margin-bottom: 1rem;
  }
`;

const CTAText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  color: #000000;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: #000000;
  color: #ffffff;
  border: 2px solid #000000;
  padding: 1rem 3rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffffff;
    color: #000000;
  }

  /* Mobile touch styles */
  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 0.85rem;
    cursor: pointer; /* Allow cursor on mobile */
    
    /* Touch feedback */
    &:active {
      background: #ffffff;
      color: #000000;
      transform: scale(0.98);
    }
  }
`;

const Process: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const processSteps = [
    {
      number: "ÉTAPE 01",
      title: "DÉCOUVERTE & STRATÉGIE",
      description: "Immersion totale dans votre univers. Nous analysons vos objectifs, votre marché, vos utilisateurs pour définir une stratégie digitale disruptive.",
      duration: "1-2 SEMAINES",
      deliverables: [
        "Audit complet de l'existant",
        "Analyse concurrentielle approfondie",
        "Définition des personas utilisateurs",
        "Stratégie UX et architecture de l'information",
        "Wireframes et user flows",
        "Brief créatif validé"
      ]
    },
    {
      number: "ÉTAPE 02",
      title: "CONCEPTION & DESIGN",
      description: "Création de l'identité visuelle et design des interfaces. Chaque pixel est pensé pour créer une expérience utilisateur mémorable et efficace.",
      duration: "2-3 SEMAINES",
      deliverables: [
        "Moodboard et direction artistique",
        "Système de design complet",
        "Maquettes desktop, tablet, mobile",
        "Prototypes interactifs Figma",
        "Guide de style et composants",
        "Assets graphiques optimisés"
      ]
    },
    {
      number: "ÉTAPE 03",
      title: "DÉVELOPPEMENT",
      description: "Développement avec les technologies les plus avancées. Code propre, architecture scalable, performances optimales pour une expérience fluide.",
      duration: "3-6 SEMAINES",
      deliverables: [
        "Développement frontend React/Next.js",
        "Intégration CMS headless",
        "APIs et services backend",
        "Optimisations Core Web Vitals",
        "Tests automatisés et QA",
        "Environnement de recette"
      ]
    },
    {
      number: "ÉTAPE 04",
      title: "TESTS & OPTIMISATION",
      description: "Tests rigoureux sur tous les devices et navigateurs. Optimisation des performances, accessibilité, et SEO pour un lancement parfait.",
      duration: "1 SEMAINE",
      deliverables: [
        "Tests cross-browser complets",
        "Audit de performance Lighthouse",
        "Optimisation SEO technique",
        "Tests d'accessibilité WCAG",
        "Configuration analytics",
        "Recette client et corrections"
      ]
    },
    {
      number: "ÉTAPE 05",
      title: "DÉPLOIEMENT & SUIVI",
      description: "Mise en ligne sécurisée et accompagnement. Formation, documentation, et suivi des performances pour garantir le succès de votre projet.",
      duration: "1 SEMAINE",
      deliverables: [
        "Déploiement en production",
        "Configuration DNS et SSL",
        "Formation à l'administration",
        "Documentation technique",
        "Monitoring et alertes",
        "Support post-lancement 30 jours"
      ]
    }
  ];

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Reduced delay for mobile
        duration: 0.6, // Faster animation
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProcessSection id="process" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        PROCESSUS
      </SectionTitle>

      <ProcessIntro
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <IntroText>
          <strong>Méthodologie éprouvée</strong> pour transformer votre vision en 
          réalité digitale d'exception. Chaque étape est pensée pour maximiser 
          l'impact et garantir un résultat qui dépasse vos attentes.
        </IntroText>
      </ProcessIntro>

      <ProcessTimeline>
        <TimelineConnector />
        
        {processSteps.map((step, index) => (
          <ProcessStep
            key={index}
            $isLeft={index % 2 === 0}
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stepVariants}
          >
            <StepCard
              $isLeft={index % 2 === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }} // Touch feedback
              data-cursor="hover"
            >
              <StepNumber>{step.number}</StepNumber>
              <StepTitle className="text-fragmented">
                {step.title}
              </StepTitle>
              <StepDuration>
                <span>DURÉE</span>
                {step.duration}
              </StepDuration>
              <StepDescription>
                {step.description}
              </StepDescription>
              
              <StepDeliverables>
                <DeliverablesTitle>LIVRABLES</DeliverablesTitle>
                <DeliverablesList>
                  {step.deliverables.map((deliverable, idx) => (
                    <DeliverableItem key={idx}>
                      {deliverable}
                    </DeliverableItem>
                  ))}
                </DeliverablesList>
              </StepDeliverables>
            </StepCard>
          </ProcessStep>
        ))}
      </ProcessTimeline>

      <ProcessCTA
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <CTATitle>PRÊT À DÉMARRER ?</CTATitle>
        <CTAText>
          Chaque projet est unique. Discutons de votre vision pour définir 
          ensemble la stratégie qui révolutionnera votre présence digitale.
        </CTAText>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContactClick}
          data-cursor="hover"
        >
          LANCER LE PROJET
        </CTAButton>
      </ProcessCTA>
    </ProcessSection>
  );
};

export default Process; 