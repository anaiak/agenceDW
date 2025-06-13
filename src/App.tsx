import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import CinematicIntro from './components/CinematicIntro.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import BackgroundAnimations from './components/BackgroundAnimations.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import SiteTypes from './components/SiteTypes.tsx';
import WebDesignTrends from './components/ArtisticStyles.tsx';
import Portfolio from './components/Portfolio.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ProjectDetail from './components/ProjectDetail.tsx';
import ContactFloatingButton from './components/ContactFloatingButton.tsx';

// Container pour la transition push
const PushContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  height: auto; /* Permettre au contenu de s'étendre */
  overflow: hidden; /* Seulement pendant la transition */
`;

// Intro qui sera poussée vers le haut
const IntroContainer = styled(motion.div)`
  position: fixed; /* Fixed pour rester en place pendant l'animation */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
`;

// Site principal qui pousse depuis le bas
const MainSiteContainer = styled(motion.div)`
  position: relative; /* Relative pour permettre le scroll normal */
  width: 100%;
  min-height: 100vh;
  background: #000000;
`;

// Composant pour la page d'accueil
const HomePage: React.FC<{ showIntro: boolean; pushTransition: boolean }> = ({ showIntro, pushTransition }) => (
  <PushContainer>
    {/* Site principal qui pousse depuis le bas */}
    <MainSiteContainer
      initial={{ y: "100vh" }} /* Utiliser vh au lieu de % */
      animate={{ 
        y: pushTransition ? "0vh" : "100vh"
      }}
      transition={{ 
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <SiteTypes />
        <WebDesignTrends />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </MainSiteContainer>

    {/* Intro qui est poussée vers le haut */}
    {showIntro && (
      <IntroContainer
        initial={{ y: "0vh" }}
        animate={{ 
          y: pushTransition ? "-100vh" : "0vh"
        }}
        transition={{ 
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <CinematicIntro />
      </IntroContainer>
    )}
  </PushContainer>
);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [pushTransition, setPushTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPushTransition(true);
      // Délai pour que la transition push se termine avant de masquer l'intro
      setTimeout(() => {
        setShowIntro(false);
        // Permettre le scroll après la transition
        document.body.style.overflow = 'auto';
      }, 1500);
    }, 2000); // Intro de 2 secondes

    // Bloquer le scroll pendant l'intro
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <CustomCursor />
      <BackgroundAnimations />
      
      <Routes>
        <Route 
          path="/" 
          element={<HomePage showIntro={showIntro} pushTransition={pushTransition} />} 
        />
        <Route 
          path="/project/:slug" 
          element={<ProjectDetail />} 
        />
      </Routes>
      <ContactFloatingButton />
    </Router>
  );
};

export default App; 