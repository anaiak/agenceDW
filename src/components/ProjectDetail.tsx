import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const ProjectDetailSection = styled.section`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  position: relative;
  overflow-x: hidden;
`;

const HeaderSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const BackButton = styled(motion(Link))`
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 1rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  backdrop-filter: blur(10px);
  cursor: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.8rem 1.2rem;
    font-size: 0.7rem;
  }
`;

const ProjectTitle = styled(motion.h1)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.8;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: 1.5rem;
  }
`;

const ProjectSubtitle = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 300;
  text-align: center;
  opacity: 0.7;
  margin-bottom: 3rem;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`;

const ProjectMeta = styled(motion.div)`
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const MetaItem = styled.div`
  text-align: center;
`;

const MetaLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const MetaValue = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 500;
  color: #ffffff;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;

  @media (max-width: 768px) {
    padding: 6rem 1.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100px;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 3rem);
    margin-bottom: 2rem;
  }
`;

const TextContent = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: #ffffff;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 4rem;
  }
`;

const ProcessStep = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StepNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StepTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StepDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-bottom: 3rem;
  }
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.75rem;
  }
`;

const ImageShowcase = styled(motion.div)<{ $bgImage?: string }>`
  width: 100%;
  height: 600px;
  background: ${props => props.$bgImage ? `url(${props.$bgImage})` : 'rgba(255, 255, 255, 0.05)'};
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: shimmer 3s infinite;
    z-index: 2;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @media (max-width: 768px) {
    height: 400px;
    margin-bottom: 3rem;
  }
`;

const ShowcaseOverlay = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 3;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
  }
`;

const ShowcaseTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ShowcaseDescription = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const DetailedContent = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  
  h4 {
    color: #ffffff;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: #ffffff;
    font-weight: 600;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
      list-style: none;
      position: relative;
      
      &::before {
        content: '→';
        position: absolute;
        left: -1.5rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 3rem;

    h4 {
      font-size: 1.1rem;
      margin: 1.5rem 0 0.8rem 0;
    }
  }
`;

const ChallengeBox = styled(motion.div)`
  background: rgba(255, 0, 0, 0.05);
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const SolutionBox = styled(motion.div)`
  background: rgba(0, 255, 0, 0.05);
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const InspirationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 1rem;
    margin: 1.5rem 0;
  }
`;

const InspirationCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const InspirationTitle = styled.h5`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InspirationText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 4rem;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StatNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  tech: string[];
  image?: string;
  strategy: string;
  detailedStrategy: string;
  process: Array<{
    number: string;
    title: string;
    description: string;
    details?: string;
  }>;
  inspirations: Array<{
    title: string;
    description: string;
  }>;
  challenges: string[];
  solutions: string[];
  results: Array<{
    number: string;
    label: string;
  }>;
  description: string;
}

const projectsData: Record<string, ProjectData> = {
  'bistrot-moderne': {
    id: 'bistrot-moderne',
    title: 'Bistrot Moderne',
    subtitle: 'Site vitrine élégant pour restaurant gastronomique parisien',
    category: 'Site Vitrine',
    year: '2024',
    client: 'Le Moderne - Restaurant',
    tech: ['Next.js', 'Sanity CMS', 'Stripe Payment', 'Google Maps', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Créer une présence digitale sophistiquée qui reflète l\'excellence culinaire du restaurant. L\'objectif était d\'attirer une clientèle haut de gamme tout en facilitant les réservations et commandes en ligne.',
    detailedStrategy: `
      <h4>Positionnement Premium</h4>
      <p>Le client souhaitait se démarquer dans un marché ultra-concurrentiel parisien. Nous avons développé une identité visuelle qui sublime la gastronomie française moderne, avec des photographies haute qualité et une typographie raffinée qui évoque l'élégance sans ostentation.</p>
      
      <h4>Expérience Client Seamless</h4>
      <p>L'enjeu était de créer un parcours utilisateur fluide : découverte du restaurant → consultation du menu → réservation/commande → fidélisation. Chaque étape a été optimisée pour maximiser les conversions.</p>
      
      <h4>Performance & SEO Local</h4>
      <ul>
        <li>Optimisation pour "restaurant Paris" et requêtes géolocalisées</li>
        <li>Intégration Google My Business et avis clients</li>
        <li>Temps de chargement < 2s pour l'experience mobile</li>
        <li>Schema markup pour rich snippets (horaires, avis, menu)</li>
        <li>Photos optimisées WebP avec lazy loading</li>
      </ul>
      
      <h4>Monétisation Digitale</h4>
      <p>Au-delà de la vitrine, nous avons intégré des fonctionnalités e-commerce : commande de plats à emporter, vente de bons cadeaux, et réservation d'événements privés. ROI mesuré sur l'augmentation du CA digital.</p>
    `,
    process: [
      {
        number: '01',
        title: 'Audit & Benchmark',
        description: 'Analyse de la concurrence parisienne et audit de l\'existant. Définition du persona client et parcours utilisateur optimal.',
        details: `Étude de 25 restaurants similaires dans Paris, analyse de leurs sites web, stratégies digitales et points de friction. Entretiens avec 15 clients réguliers pour comprendre leurs attentes. Audit technique de l'ancien site : 73% de taux de rebond, 8 secondes de temps de chargement, 0% de conversions mobiles.`
      },
      {
        number: '02',
        title: 'Design & Identité',
        description: 'Création de l\'identité visuelle et maquettage des interfaces. Focus sur l\'émotion et l\'appétence culinaire.',
        details: `Session photo professionnelle de 2 jours avec chef cuisinier, shooting d'ambiance restaurant, création de 40+ visuels haute qualité. Développement d'une palette couleur sophistiquée (noir profond, or champagne, blanc crème). Typographie custom basée sur "Playfair Display" pour les titres et "Source Sans Pro" pour le corps.`
      },
      {
        number: '03',
        title: 'Développement & Intégrations',
        description: 'Développement Next.js avec CMS headless et intégrations payment/booking. Architecture scalable et performante.',
        details: `Architecture JAMstack avec Next.js pour le frontend, Sanity comme CMS headless pour la gestion du menu et actualités. Intégration Stripe Connect pour les paiements, API TableCheck pour les réservations, Google Maps pour géolocalisation. Déploiement sur Vercel avec CDN global et optimisation Core Web Vitals.`
      },
      {
        number: '04',
        title: 'Lancement & Optimisation',
        description: 'Mise en ligne, formation équipe, et optimisation continue basée sur analytics et feedback utilisateurs.',
        details: `Formation de 3h à l'équipe sur Sanity CMS, mise en place Google Analytics 4 et Google Search Console, création de 20 pages optimisées SEO local. Suivi mensuel des performances : +340% de réservations en ligne, +125% de commandes click & collect, temps de chargement moyen 1.8s.`
      }
    ],
    inspirations: [
      { title: 'Gastronomie Française', description: 'Codes visuels de la haute cuisine, sobriété élégante' },
      { title: 'Luxe Accessible', description: 'Brands comme Hermès : sophistication sans prétention' },
      { title: 'Digital Fine Dining', description: 'Sites de restaurants étoilés : Eleven Madison Park, Le Bernardin' },
      { title: 'Editorial Design', description: 'Magazines culinaires haut de gamme, mise en page respirante' }
    ],
    challenges: [
      'Équilibrer sophistication et accessibilité pour la clientèle diverse',
      'Optimiser les photos haute qualité sans impacter les performances',
      'Intégrer les réservations avec le système existant du restaurant',
      'Gérer les pics de trafic lors des périodes festives'
    ],
    solutions: [
      'A/B test sur tonalité : version "chic" vs "conviviale" → hybrid approach',
      'Images responsive avec format WebP + fallback, compression intelligente',
      'API custom synchronisant Sanity + TableCheck + système interne',
      'Infrastructure auto-scalable sur Vercel avec monitoring en temps réel'
    ],
    results: [
      { number: '+340%', label: 'Réservations Online' },
      { number: '1.8s', label: 'Temps Chargement' },
      { number: '+125%', label: 'Commandes Emporter' },
      { number: '4.8/5', label: 'Satisfaction Client' }
    ],
    description: 'Une vitrine digitale qui a transformé la présence en ligne du restaurant. L\'alliance entre esthétique raffinée et fonctionnalités pratiques a permis d\'augmenter significativement le chiffre d\'affaires digital tout en renforçant l\'image de marque premium.'
  },
  'startup-fintech': {
    id: 'startup-fintech',
    title: 'Startup Fintech',
    subtitle: 'Application de gestion financière pour PME et indépendants',
    category: 'Application Métier',
    year: '2024',
    client: 'MoneyFlow - Fintech',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Chart.js', 'JWT Auth'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Développer une solution SaaS intuitive qui simplifie la gestion financière pour les entrepreneurs. L\'enjeu était de rendre accessible des fonctionnalités bancaires complexes à travers une interface moderne et sécurisée.',
    detailedStrategy: `
      <h4>Démocratisation de la Finance</h4>
      <p>Notre mission était de créer un <strong>"Notion pour la finance"</strong> : une application puissante mais accessible, qui permet aux entrepreneurs de gérer facilement leur trésorerie, facturation, et projections financières sans expertise comptable.</p>
      
      <h4>UX Data-Driven</h4>
      <p>Chaque élément d'interface a été conçu en analysant les comportements utilisateurs. Dashboard modulaire, visualisations intelligentes, et workflows optimisés pour réduire le temps passé sur les tâches administratives de 70%.</p>
      
      <h4>Sécurité Bancaire</h4>
      <ul>
        <li>Chiffrement AES-256 bout-en-bout pour toutes les données</li>
        <li>Authentification multi-facteurs obligatoire</li>
        <li>Conformité PCI DSS et RGPD intégrée</li>
        <li>Audit de sécurité mensuel par société tierce</li>
        <li>Sauvegarde géo-distribuée en temps réel</li>
      </ul>
      
      <h4>Scalabilité Technique</h4>
      <p>Architecture microservices pensée pour supporter 100k+ utilisateurs. API-first design permettant l'intégration avec les outils existants des clients (Stripe, PayPal, banques, comptabilité).</p>
    `,
    process: [
      {
        number: '01',
        title: 'Research Utilisateur',
        description: 'Interviews avec 50+ entrepreneurs pour comprendre leurs pain points financiers. Analyse des outils existants et opportunités.',
        details: `6 semaines d'immersion dans l'écosystème startup français : entretiens avec fondateurs, DAF, experts-comptables. Insights clés : 85% passent 10h+/semaine sur l'admin financier, 67% utilisent Excel pour la trésorerie, 91% veulent des projections automatiques. Mapping des 12 workflows critiques à optimiser.`
      },
      {
        number: '02',
        title: 'MVP & Prototypage',
        description: 'Développement d\'un MVP focalisé sur les 3 fonctionnalités essentielles : dashboard, facturation, et suivi trésorerie.',
        details: `Approche Lean Startup : 4 semaines pour le MVP avec dashboard en temps réel, module facturation, et tracking des flux. 15 bêta-testeurs sur 2 mois, 200+ feedbacks intégrés. Pivot majeur : ajout des projections de cash-flow après demande unanime des testeurs. Validation Product-Market Fit atteinte.`
      },
      {
        number: '03',
        title: 'Scale & Sécurisation',
        description: 'Passage à l\'échelle avec architecture distribuée, sécurisation niveau bancaire, et conformité réglementaire.',
        details: `Migration vers microservices sur AWS avec auto-scaling, implémentation de l'authentification OAuth2 + biométrie, audit de sécurité par CyberSecure (certification A+). Intégration APIs bancaires via DSP2, conformité GDPR avec Right to be Forgotten automatisé. Load testing jusqu'à 50k utilisateurs simultanés.`
      },
      {
        number: '04',
        title: 'Go-to-Market',
        description: 'Lancement commercial avec stratégie freemium, onboarding optimisé, et customer success proactif.',
        details: `Stratégie de lancement en 3 phases : bêta fermée (100 users), early access (1k users), public launch. Onboarding en 3 clics avec import automatique des données bancaires, tutoriels interactifs, et support chat 24/7. Metrics de succès : 73% d'activation J+7, 89% de rétention M+1, NPS de 67.`
      }
    ],
    inspirations: [
      { title: 'Notion', description: 'Interface modulaire, blocks système, simplicité puissante' },
      { title: 'Stripe Dashboard', description: 'Clarté des données financières, design système cohérent' },
      { title: 'Linear', description: 'Performance, animations subtiles, expérience développeur' },
      { title: 'Monzo/Revolut', description: 'UX banking mobile-first, transparence financière' }
    ],
    challenges: [
      'Simplifier des concepts financiers complexes pour des non-experts',
      'Garantir la sécurité niveau bancaire avec une UX fluide',
      'Intégrer 20+ APIs bancaires avec des standards différents',
      'Scalabilité : de 0 à 10k utilisateurs en 6 mois'
    ],
    solutions: [
      'Design system avec composants "explained" : tooltips, guides contextuels',
      'Authentification progressive : simple au début, renforcée selon l\'usage',
      'Couche d\'abstraction unifiant toutes les APIs bancaires',
      'Architecture serverless auto-scalable + monitoring prédictif'
    ],
    results: [
      { number: '10,000+', label: 'Utilisateurs Actifs' },
      { number: '70%', label: 'Gain Temps Admin' },
      { number: '€2.5M', label: 'Transactions Traitées' },
      { number: '89%', label: 'Rétention M+1' }
    ],
    description: 'Une success story fintech française qui a révolutionné la gestion financière pour 10,000+ entrepreneurs. L\'application combine simplicité d\'usage et sophistication technique, prouvant qu\'innovation et conformité bancaire peuvent coexister.'
  },
  'ecommerce-mode': {
    id: 'ecommerce-mode',
    title: 'E-commerce Mode',
    subtitle: 'Boutique en ligne premium avec essayage virtuel AR',
    category: 'E-commerce',
    year: '2024',
    client: 'Atelier Noir - Fashion Brand',
    tech: ['Shopify Plus', 'WebGL', 'AR.js', 'Klaviyo', 'Algolia', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Révolutionner l\'expérience d\'achat en ligne de mode féminine haut de gamme en intégrant des technologies immersives. L\'objectif était de recréer l\'expérience boutique physique dans le digital.',
    detailedStrategy: `
      <h4>Fashion Tech Innovation</h4>
      <p>Pionnier de l'<strong>essayage virtuel AR</strong> en France, nous avons développé une solution propriétaire permettant d'essayer virtuellement les vêtements via la caméra smartphone. Cette innovation a réduit le taux de retour de 45% tout en augmentant la confiance d'achat.</p>
      
      <h4>Personnalisation IA</h4>
      <p>Algorithme de recommandation basé sur morphologie, historique d'achat, et tendances de mode. Chaque cliente bénéficie d'une expérience sur-mesure avec stylist virtuel et looks personnalisés.</p>
      
      <h4>Omnicanal Premium</h4>
      <ul>
        <li>Synchronisation stock temps réel boutique/online</li>
        <li>Click & Collect avec réservation d'essayage en boutique</li>
        <li>Personal shopper en visio pour conseils styling</li>
        <li>Programme fidélité unifié multi-canaux</li>
        <li>Retours gratuits sous 30 jours avec suivi personnalisé</li>
      </ul>
      
      <h4>Performance & Conversion</h4>
      <p>Architecture optimisée pour la vitesse : Core Web Vitals parfaits, images ultra-optimisées, checkout en 2 clics. Chaque micro-interaction est pensée pour guider vers l'achat impulsif tout en respectant l'élégance de la marque.</p>
    `,
    process: [
      {
        number: '01',
        title: 'User Journey Mapping',
        description: 'Analyse comportementale des acheteuses de mode premium. Identification des points de friction et opportunités d\'innovation.',
        details: `Étude ethnographique de 3 mois : observation dans 15 boutiques parisiennes, interviews avec 200+ clientes, analyse des parcours d'achat sur 10 sites concurrents. Insights : 78% abandonnent par doute sur la taille, 65% veulent voir le produit porté, 89% consultent les avis avant achat. Création de 6 personas détaillées.`
      },
      {
        number: '02',
        title: 'AR Development',
        description: 'Développement de la technologie d\'essayage virtuel. R&D sur reconnaissance morphologique et rendu réaliste.',
        details: `6 mois de R&D avec l'équipe Computer Vision de Télécom Paris. Développement d'un algorithme propriétaire de body tracking, calibration sur 5000+ morphologies féminines, rendu WebGL optimisé mobile. 94% de précision sur l'estimation des tailles, 87% de satisfaction utilisateur sur le réalisme. Brevet déposé sur la technologie.`
      },
      {
        number: '03',
        title: 'Platform & Integration',
        description: 'Développement Shopify Plus custom avec modules propriétaires. Intégrations CRM, email marketing, et analytics avancés.',
        details: `Architecture Shopify Plus avec 15+ apps custom développées : module AR, IA de recommandation, system de sizing intelligent. Intégration Klaviyo pour email marketing comportemental, Algolia pour search avancée, Gorgias pour customer service. 99.9% d'uptime garanti, temps de réponse < 1.5s mondial.`
      },
      {
        number: '04',
        title: 'Launch & Exposition',
        description: 'Mise en ligne coordonnée avec stratégie de promotion artistique. Acquisition de collectionneurs et galeristes.',
        details: `Lancement lors du vernissage physique avec QR codes pour expérience augmentée, campagne Instagram ciblée collectionneurs d'art contemporain, soumission aux awards de design digital. Partenariats avec 5 galeries parisiennes pour référencement croisé. Résultat : 15k visiteurs uniques en 3 mois, 8 commissions directes.`
      }
    ],
    inspirations: [
      { title: 'Apple Store', description: 'Excellence UX, attention aux détails, innovation tech' },
      { title: 'Net-a-Porter', description: 'Luxe digital, editorial content, service premium' },
      { title: 'Zara AR App', description: 'Pionnier mode + réalité augmentée, adoption mobile' },
      { title: 'Sephora Virtual Artist', description: 'Essayage virtuel beauty, engagement utilisateur' }
    ],
    challenges: [
      'Développer une AR précise sur la diversité des morphologies',
      'Maintenir l\'élégance de marque avec des innovations tech',
      'Gérer les pics de trafic lors des collections/soldes',
      'Éduquer les utilisatrices à l\'usage de nouvelles technologies'
    ],
    solutions: [
      'Dataset de 5000+ morphologies, ML training sur diversité corporelle',
      'Design system premium : tech invisible, elegance préservée',
      'CDN spécialisé + compression intelligente préservant les détails',
      'Boutique intégrée avec esthétique galerie haut de gamme'
    ],
    results: [
      { number: '+240%', label: 'Conversion Rate' },
      { number: '-45%', label: 'Taux de Retour' },
      { number: '€2.3M', label: 'CA Annuel' },
      { number: '4.6/5', label: 'Satisfaction' }
    ],
    description: 'Une révolution dans l\'e-commerce mode française qui a redéfini l\'expérience d\'achat en ligne. L\'intégration d\'innovations AR avec un design premium a créé un nouveau standard dans le secteur du luxe accessible.'
  },
  'cabinet-dentaire': {
    id: 'cabinet-dentaire',
    title: 'Cabinet Dentaire',
    subtitle: 'Site professionnel moderne avec prise de rendez-vous intelligente',
    category: 'Site Professionnel',
    year: '2024',
    client: 'Dr. Martin Dubois - Dentiste',
    tech: ['WordPress', 'Calendly API', 'Google My Business', 'RGPD', 'SEO Local'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Moderniser la présence digitale d\'un cabinet dentaire traditionnel pour attirer de nouveaux patients et optimiser la gestion des rendez-vous. Focus sur la réassurance et la proximité humaine.',
    detailedStrategy: `
      <h4>Humanisation de la Médecine</h4>
      <p>Le secteur dentaire souffre d'une image anxiogène. Notre stratégie était de <strong>rassurer avant de convaincre</strong> : présentation de l'équipe, témoignages patients, visite virtuelle du cabinet, et explications pédagogiques des soins pour démystifier la dentisterie.</p>
      
      <h4>Patient Journey Optimisé</h4>
      <p>De la recherche Google au fauteuil : chaque touchpoint digital a été pensé pour guider le patient. SEO local hyper-ciblé, prise de RDV simplifiée, rappels automatiques, et suivi post-consultation pour fidéliser.</p>
      
      <h4>Efficacité Opérationnelle</h4>
      <ul>
        <li>Calendrier intelligent avec créneaux spécialisés par type de soins</li>
        <li>Questionnaire médical pré-visite pour optimiser le temps de consultation</li>
        <li>Rappels SMS automatiques (-60% de no-show)</li>
        <li>Gestion des urgences avec créneaux dédiés en temps réel</li>
        <li>Interface praticien pour modifier disponibilités à distance</li>
      </ul>
      
      <h4>Conformité & Sécurité</h4>
      <p>Respect strict du secret médical et RGPD. Hébergement de données de santé certifié HDS, consentements explicites, et droit à l'oubli automatisé. Confiance = pilier de la relation patient-praticien.</p>
    `,
    process: [
      {
        number: '01',
        title: 'Audit & Stratégie',
        description: 'Analyse de la concurrence locale, audit de l\'existant, et définition de la stratégie de positionnement digital.',
        details: `Analyse de 30 cabinets dentaires dans un rayon de 10km, étude de leurs stratégies digitales et points de différenciation. Audit de l'ancien site : 0 nouveau patient/mois via le web, 15 secondes de temps de session, invisible sur Google. Définition du persona : familles 25-45 ans, recherche de praticien de confiance, anxiété modérée.`
      },
      {
        number: '02',
        title: 'Design & Contenu',
        description: 'Création de l\'identité visuelle rassurante et développement d\'un contenu pédagogique de qualité.',
        details: `Shooting photo professionnel : équipe souriante, cabinet lumineux, matériel moderne. Création de 25 fiches explicatives illustrées pour chaque soin, vidéos pédagogiques de 2mn avec Dr. Dubois expliquant les procédures. Palette couleur apaisante (bleu confidence + blanc médical), typographie claire et accessible.`
      },
      {
        number: '03',
        title: 'Développement & Intégrations',
        description: 'Développement WordPress optimisé avec système de réservation intelligent et conformité médicale.',
        details: `WordPress sur hébergement HDS avec certificat SSL médical, intégration Calendly Pro avec règles métier (30mn détartrage, 1h soins, urgences le jour même). Module de questionnaire médical avec envoi automatique 48h avant RDV. Conformité RGPD avec consentements granulaires et audit mensuel par DPO certifié.`
      },
      {
        number: '04',
        title: 'SEO Local & Acquisition',
        description: 'Optimisation pour le référencement local et mise en place d\'une stratégie d\'acquisition de patients.',
        details: `Optimisation pour 50+ mots-clés locaux ("dentiste Paris 15ème", "urgence dentaire", etc.), création de 15 pages de services optimisées SEO, campagne Google My Business avec photos/avis/FAQ. Résultat : position 1-3 sur 80% des requêtes cibles, +340% de visibilité locale, 25 nouveaux patients/mois via le digital.`
      }
    ],
    inspirations: [
      { title: 'Doctolib UX', description: 'Simplicité de réservation, interface patient claire' },
      { title: 'Apple Health', description: 'Design rassurant, informations médicales accessibles' },
      { title: 'Cabinets Nordiques', description: 'Esthétique épurée, approche humaine de la médecine' },
      { title: 'Mayo Clinic', description: 'Contenu éducatif de qualité, autorité médicale' }
    ],
    challenges: [
      'Rassurer les patients anxieux vis-à-vis des soins dentaires',
      'Respecter les contraintes réglementaires strictes du secteur médical',
      'Optimiser l\'agenda sans créer de conflits avec le logiciel métier',
      'Se démarquer dans un marché local très concurrentiel'
    ],
    solutions: [
      'Storytelling patient-centric : témoignages vidéo, visite virtuelle 360°',
      'Audit juridique mensuel + formation RGPD de l\'équipe cabinet',
      'API bidirectionnelle avec logiciel métier existant (Dentibase)',
      'Contenu unique : 50+ articles santé dentaire + expertise locale'
    ],
    results: [
      { number: '+340%', label: 'Visibilité Google' },
      { number: '25', label: 'Nouveaux Patients/Mois' },
      { number: '-60%', label: 'Taux No-Show' },
      { number: '4.9/5', label: 'Avis Google' }
    ],
    description: 'Une transformation digitale qui a modernisé un cabinet dentaire traditionnel. L\'alliance entre technologie et approche humaine a permis de tripler l\'acquisition de nouveaux patients tout en optimisant l\'efficacité opérationnelle.'
  },
  'agence-immobiliere': {
    id: 'agence-immobiliere',
    title: 'Agence Immobilière',
    subtitle: 'Plateforme digitale innovante pour l\'immobilier de prestige',
    category: 'Site Vitrine',
    year: '2024',
    client: 'Prestige Immobilier - Agence',
    tech: ['Nuxt.js', 'Mapbox', 'CRM Integration', 'Virtual Tours', 'Lead Scoring'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Révolutionner l\'expérience de recherche immobilière en combinant technologies immersives et expertise humaine. Positionnement sur le segment prestige avec un service ultra-personnalisé.',
    detailedStrategy: `
      <h4>Immobilier Phygital</h4>
      <p>Notre vision était de créer le <strong>"Netflix de l'immobilier de prestige"</strong> : découverte intelligente, visites virtuelles cinématographiques, et matching algorithmique entre biens d'exception et acquéreurs qualifiés. L'objectif : transformer la recherche immobilière en expérience inspirante.</p>
      
      <h4>Technology Stack Premium</h4>
      <p>Visites virtuelles 8K avec navigation fluide, cartes interactives avec données hyper-locales (écoles, transports, commerces), et modélisation 3D des biens permettant l'ameublement virtuel. Chaque bien devient une expérience immersive.</p>
      
      <h4>Intelligence Commerciale</h4>
      <ul>
        <li>Lead scoring automatique basé sur comportement de navigation</li>
        <li>Matching IA entre profils acquéreurs et biens disponibles</li>
        <li>Alertes personnalisées avec critères géographiques et financiers</li>
        <li>CRM intégré avec suivi commercial automatisé</li>
        <li>Analytics prédictives sur les tendances de marché local</li>
      </ul>
      
      <h4>Service Concierge Digital</h4>
      <p>Chat expert en temps réel, RDV visites sur agenda partagé, dossiers de financement pré-qualifiés, et accompagnement juridique intégré. Le digital amplifie l'expertise humaine au lieu de la remplacer.</p>
    `,
    process: [
      {
        number: '01',
        title: 'Market Research',
        description: 'Analyse du marché immobilier local et étude comportementale des acquéreurs de prestige. Benchmark des innovations sectorielles.',
        details: `Étude sur 18 mois du marché immobilier parisien (segments 500k€+), interviews avec 100+ acquéreurs récents, analyse de 25 agences concurrentes. Insights clés : 73% recherchent en ligne avant contact, 89% veulent des visites virtuelles, 67% abandonnent par manque d'infos quartier. Identification de 12 pain points à résoudre.`
      },
      {
        number: '02',
        title: 'Tech & UX Design',
        description: 'Développement des technologies immersives et design de l\'expérience utilisateur. Focus sur l\'émotion et la découverte.',
        details: `Partenariat avec studio de photographie 360° pour captures 8K, développement d'un player de visite virtuelle custom avec navigation tactile intuitive. Design inspiré des apps de luxe (NetJets, Sotheby's) : interface épurée, visuels premium, micro-interactions sophistiquées. 40+ wireframes testés avec 15 beta-users.`
      },
      {
        number: '03',
        title: 'Platform Development',
        description: 'Développement Nuxt.js avec architecture scalable. Intégrations CRM et outils métier existants.',
        details: `Architecture JAMstack avec Nuxt.js SSG pour SEO optimal, Mapbox pour cartographie custom avec layers (prix/m², écoles, transports), intégration bidirectionnelle avec CRM Century21. Module de lead scoring propriétaire avec 25+ critères comportementaux. Performance : 1.2s de chargement moyen, 98% d'uptime garanti.`
      },
      {
        number: '04',
        title: 'Digital Marketing',
        description: 'Stratégie d\'acquisition omnicanale et optimisation conversion. SEO local et campagnes premium.',
        details: `SEO hyper-local sur 200+ requêtes ("appartement vente Paris 7ème", "investissement immobilier prestige"), campagnes Facebook/LinkedIn ciblées sur CSP+, partenariats avec blogs architecture/déco. Content marketing : 80+ articles quartiers parisiens, guides investissement. Résultat : 300% d'augmentation du trafic qualifié.`
      }
    ],
    inspirations: [
      { title: 'Sotheby\'s Realty', description: 'Luxe international, photographie d\'art, service premium' },
      { title: 'Zillow Innovation', description: 'Technologies immersives, données géolocalisées' },
      { title: 'Airbnb UX', description: 'Découverte inspirante, storytelling des lieux' },
      { title: 'Tesla Digital', description: 'Configuration interactive, expérience sans friction' }
    ],
    challenges: [
      'Différenciation dans un marché ultra-concurrentiel et traditionnel',
      'Intégration avec les outils métier existants des agents',
      'Qualification des leads pour éviter la perte de temps commercial',
      'ROI mesurable sur les innovations technologiques coûteuses'
    ],
    solutions: [
      'Positionnement "tech + humain" : innovation au service de l\'expertise',
      'APIs custom pour synchronisation temps réel avec outils existants',
      'Scoring automatique : seuls les leads chauds arrivent aux agents',
      'Tracking précis : attribution des ventes aux canaux digitaux'
    ],
    results: [
      { number: '+300%', label: 'Trafic Qualifié' },
      { number: '€12M', label: 'CA Généré' },
      { number: '+85%', label: 'Taux Conversion' },
      { number: '67%', label: 'Leads Digitaux' }
    ],
    description: 'Une révolution digitale dans l\'immobilier traditionnel français. La combinaison d\'innovations technologiques et d\'expertise humaine a permis de multiplier par 3 les performances commerciales tout en repositionnant l\'agence comme leader local de l\'innovation.'
  },
  'artiste-portfolio': {
    id: 'artiste-portfolio',
    title: 'Portfolio Artiste',
    subtitle: 'Galerie numérique immersive pour plasticienne contemporaine',
    category: 'Portfolio Créatif',
    year: '2024',
    client: 'Clara Moreau - Artiste Plasticienne',
    tech: ['Gatsby', 'Three.js', 'Sanity CMS', 'WebGL', 'GSAP', 'PWA'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=600&fit=crop&auto=format',
    strategy: 'Créer une expérience digitale qui transcende le portfolio traditionnel pour devenir une œuvre d\'art en soi. Chaque visite devient une exploration sensuelle de l\'univers artistique de Clara.',
    detailedStrategy: `
      <h4>Art Génératif & Interactif</h4>
      <p>Le portfolio ne montre pas seulement les œuvres : il les <strong>fait vivre</strong>. Chaque pièce artistique est accompagnée d'une interprétation générative qui réagit aux mouvements de la souris, créant une synergie unique entre art physique et digital.</p>
      
      <h4>Narrative Immersive</h4>
      <p>L'utilisateur embarque dans un voyage à travers l'univers créatif de Clara : de ses inspirations à ses techniques, en passant par son processus créatif. Storytelling non-linéaire où chaque visiteur construit son propre chemin de découverte.</p>
      
      <h4>Performance Artistique</h4>
      <ul>
        <li>Images haute définition avec zoom détail jusqu'à la texture de peinture</li>
        <li>Animations WebGL custom pour chaque série d'œuvres</li>
        <li>Sound design ambiant réactif aux interactions</li>
        <li>Mode exposition : plein écran avec contrôles minimaux</li>
        <li>PWA pour expérience native mobile optimisée</li>
      </ul>
      
      <h4>Monétisation Artistique</h4>
      <p>Au-delà de la vitrine : boutique d'art intégrée, réservation d'ateliers privés, vente de reproductions limitées, et commissions personnalisées. Le portfolio génère des revenus directs pour l'artiste.</p>
    `,
    process: [
      {
        number: '01',
        title: 'Immersion Artistique',
        description: 'Découverte de l\'univers créatif de Clara, ses inspirations, processus, et vision. Co-création de l\'identité digitale.',
        details: `6 semaines d'immersion dans l'atelier de Clara : observation du processus créatif, interviews sur ses inspirations (Rothko, Agnes Martin, art textile africain), analyse de 200+ œuvres. Sessions de brainstorming créatif pour transposer sa gestuelle artistique en interactions digitales. Définition de 5 "émotions visuelles" à reproduire en ligne.`
      },
      {
        number: '02',
        title: 'Conception Interactive',
        description: 'Design des interactions et développement de l\'identité visuelle digitale. Prototypage des animations WebGL.',
        details: `Création de 15+ prototypes d'interactions : parallax émotionnel, morphing de formes, particules réactives. Développement d'une identité digitale qui complète sans concurrencer les œuvres : typographie minimaliste, palette neutre, animations subtiles. Tests utilisateur avec 20+ visiteurs de galeries pour valider l'expérience.`
      },
      {
        number: '03',
        title: 'Développement Technique',
        description: 'Développement Gatsby avec CMS headless et intégrations créatives avancées. Performance et SEO artistique.',
        details: `Stack technique premium : Gatsby pour performance, Three.js pour WebGL, Sanity CMS pour gestion autonome des œuvres. Optimisation images avec lazy loading intelligent, compression sans perte pour préserver la qualité artistique. SEO spécialisé art contemporain : schema markup Museum, rich snippets pour œuvres.`
      },
      {
        number: '04',
        title: 'Lancement & Exposition',
        description: 'Mise en ligne coordonnée avec stratégie de promotion artistique. Acquisition de collectionneurs et galeristes.',
        details: `Lancement lors du vernissage physique avec QR codes pour expérience augmentée, campagne Instagram ciblée collectionneurs d'art contemporain, soumission aux awards de design digital. Partenariats avec 5 galeries parisiennes pour référencement croisé. Résultat : 15k visiteurs uniques en 3 mois, 8 commissions directes.`
      }
    ],
    inspirations: [
      { title: 'David Hockney Digital', description: 'Pionnier art + technologie, expérimentation constante' },
      { title: 'TeamLab Exhibitions', description: 'Art immersif, interactions poétiques, beauté technologique' },
      { title: 'Zaha Hadid Site', description: 'Architecture fluide traduite en expérience web' },
      { title: 'Rafael Lozano-Hemmer', description: 'Art génératif, installations interactives' }
    ],
    challenges: [
      'Respecter l\'intégrité artistique tout en innovant technologiquement',
      'Équilibrer immersion et accessibilité pour tous publics',
      'Maintenir performance avec contenus visuels très lourds',
      'Monétiser sans vulgariser l\'approche artistique'
    ],
    solutions: [
      'Co-création permanente : chaque feature validée par l\'artiste',
      'Double navigation : mode "discovery" et mode "expert"',
      'CDN spécialisé + compression intelligente préservant les détails',
      'Boutique intégrée avec esthétique galerie haut de gamme'
    ],
    results: [
      { number: '15,000', label: 'Visiteurs Uniques' },
      { number: '8', label: 'Commissions Directes' },
      { number: '12min', label: 'Temps Session Moyen' },
      { number: '95%', label: 'Satisfaction Artiste' }
    ],
    description: 'Un portfolio qui redéfinit la présentation d\'art contemporain en ligne. L\'fusion entre créativité artistique et innovation technique a créé une expérience unique qui a positionné Clara comme artiste digitale pionnière de sa génération.'
  }
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (slug && projectsData[slug]) {
      setProject(projectsData[slug]);
    }
  }, [slug]);

  if (!project) {
    return (
      <ProjectDetailSection>
        <HeaderSection>
          <BackButton to="/#portfolio">← Retour Portfolio</BackButton>
          <ProjectTitle>Projet Introuvable</ProjectTitle>
          <ProjectSubtitle>Ce projet n'existe pas ou a été supprimé.</ProjectSubtitle>
        </HeaderSection>
      </ProjectDetailSection>
    );
  }

  return (
    <ProjectDetailSection ref={ref}>
      <BackButton 
        to="/#portfolio"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Portfolio
      </BackButton>

      <HeaderSection>
        <ProjectTitle
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {project.title}
        </ProjectTitle>
        
        <ProjectSubtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {project.subtitle}
        </ProjectSubtitle>

        <ProjectMeta
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <MetaItem>
            <MetaLabel>Catégorie</MetaLabel>
            <MetaValue>{project.category}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Année</MetaLabel>
            <MetaValue>{project.year}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Client</MetaLabel>
            <MetaValue>{project.client}</MetaValue>
          </MetaItem>
        </ProjectMeta>

        <TechStack>
          {project.tech.map((tech, index) => (
            <TechTag
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </TechTag>
          ))}
        </TechStack>
      </HeaderSection>

      <ContentSection>
        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Stratégie
        </SectionTitle>

        <TextContent
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>{project.strategy}</p>
          <p><strong>{project.description}</strong></p>
        </TextContent>

        <ImageShowcase
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          $bgImage={project.image}
        >
          <ShowcaseOverlay>
            <ShowcaseTitle>{project.title}</ShowcaseTitle>
            <ShowcaseDescription>{project.subtitle}</ShowcaseDescription>
          </ShowcaseOverlay>
        </ImageShowcase>

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Processus
        </SectionTitle>

        <ProcessGrid>
          {project.process.map((step, index) => (
            <ProcessStep
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
              {step.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: 'italic'
                  }}
                >
                  {step.details}
                </motion.div>
              )}
            </ProcessStep>
          ))}
        </ProcessGrid>

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Résultats
        </SectionTitle>

        <StatsGrid>
          {project.results.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Détails de la Stratégie
        </SectionTitle>

        <DetailedContent
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{ __html: project.detailedStrategy }}
        />

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Inspirations
        </SectionTitle>

        <InspirationGrid>
          {project.inspirations.map((inspiration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                textAlign: 'center' as const
              }}
            >
              <InspirationTitle>{inspiration.title}</InspirationTitle>
              <InspirationText>{inspiration.description}</InspirationText>
            </motion.div>
          ))}
        </InspirationGrid>

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Défis
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 0, 0, 0.05)',
            borderLeft: '3px solid rgba(255, 255, 255, 0.3)',
            padding: '2rem',
            margin: '2rem 0',
            borderRadius: '0 8px 8px 0'
          }}
        >
          {project.challenges.map((challenge, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>{challenge}</p>
          ))}
        </motion.div>

        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Solutions
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(0, 255, 0, 0.05)',
            borderLeft: '3px solid rgba(255, 255, 255, 0.3)',
            padding: '2rem',
            margin: '2rem 0',
            borderRadius: '0 8px 8px 0'
          }}
        >
          {project.solutions.map((solution, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>{solution}</p>
          ))}
        </motion.div>
      </ContentSection>
    </ProjectDetailSection>
  );
};

export default ProjectDetail; 