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
import { initGTM, gtmEvents, diagnosticGTM } from './utils/gtm.ts';

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

  // Initialize GTM on app start
  useEffect(() => {
    initGTM();
    
    // Diagnostic GTM après un délai pour laisser le temps au script de charger
    setTimeout(() => {
      diagnosticGTM();
    }, 2000);
  }, []);

  // Track page changes
  useEffect(() => {
    // Track page views for GTM
    const getPageName = (pathname: string) => {
      switch (pathname) {
        case '/': return 'Accueil';
        case '/legal-notice': return 'Mentions Légales';
        case '/privacy-policy': return 'Politique de Confidentialité';
        case '/terms-of-service': return 'Conditions Générales de Vente';
        default:
          if (pathname.startsWith('/project/')) {
            return 'Détail Projet';
          }
          return 'Page Inconnue';
      }
    };

    // Send page view to GTM
    gtmEvents.pageView(getPageName(location.pathname));

    // Track legal pages specifically
    if (location.pathname === '/legal-notice') {
      gtmEvents.legalPageView('legal-notice');
    } else if (location.pathname === '/privacy-policy') {
      gtmEvents.legalPageView('privacy-policy');
    } else if (location.pathname === '/terms-of-service') {
      gtmEvents.legalPageView('terms-of-service');
    }

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