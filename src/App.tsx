import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import CinematicIntro from './components/CinematicIntro.tsx';
import BackgroundAnimations from './components/BackgroundAnimations.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import Process from './components/Process.tsx';
import SiteTypes from './components/SiteTypes.tsx';
import WebDesignTrends from './components/ArtisticStyles.tsx';
import Portfolio from './components/Portfolio.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ProjectDetail from './components/ProjectDetail.tsx';
import ContactFloatingButton from './components/ContactFloatingButton.tsx';
import LegalNotice from './components/LegalNotice.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import TermsOfService from './components/TermsOfService.tsx';

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
        duration: 2.0,
        ease: [0.19, 1, 0.22, 1] // Easing plus fluide (easeOutExpo)
      }}
      onAnimationComplete={() => {
        // Quand l'animation se termine, s'assurer qu'on est en haut
        if (pushTransition) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }}
    >
      <Header />
      <main>
        <Hero />
        <SiteTypes />
        <Process />
        <Services />
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
          duration: 2.0,
          ease: [0.19, 1, 0.22, 1] // Easing plus fluide (easeOutExpo)
        }}
      >
        <CinematicIntro />
      </IntroContainer>
    )}
  </PushContainer>
);

// Composant principal de l'application
const AppContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [pushTransition, setPushTransition] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Handle intro timing
  useEffect(() => {
    if (location.pathname === '/') {
      // L'intro disparaît seulement APRÈS la transition push complète
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 5500); // 3.5s (début push) + 2s (durée push) = 5.5s total

      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 6000); // Un peu après la fin de l'intro

      return () => {
        clearTimeout(timer);
        clearTimeout(loadingTimer);
      };
    } else {
      // For non-home pages, skip intro immediately
      setShowIntro(false);
      setIsLoading(false);
    }
  }, [location.pathname]);

  // Handle intro push transition
  useEffect(() => {
    // Ne déclencher l'intro que sur la page d'accueil
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setPushTransition(true);
        // Délai pour que la transition push se termine avant de masquer l'intro
        setTimeout(() => {
          setShowIntro(false);
          // Permettre le scroll après la transition et forcer le scroll en haut
          document.body.style.overflow = 'auto';
          window.scrollTo(0, 0); // Forcer le scroll en haut de la page
        }, 2000); // Ajusté pour correspondre à la nouvelle durée de transition
      }, 3500); // Intro de 3.5 secondes exactement

      // Bloquer le scroll pendant l'intro
      document.body.style.overflow = 'hidden';
      
      // S'assurer qu'on est en haut de la page au début
      window.scrollTo(0, 0);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    } else {
      // Sur les autres pages, s'assurer que le scroll est autorisé immédiatement
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <GlobalStyles />
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
        <Route 
          path="/legal-notice" 
          element={<LegalNotice />} 
        />
        <Route 
          path="/privacy-policy" 
          element={<PrivacyPolicy />} 
        />
        <Route 
          path="/terms-of-service" 
          element={<TermsOfService />} 
        />
      </Routes>
      <ContactFloatingButton />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 