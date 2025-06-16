import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import BackgroundAnimations from './BackgroundAnimations.tsx';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  position: relative;
`;

const PrivacyContent = styled.main`
  padding: 8rem 5vw 4rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 6rem 4vw 3rem;
  }
`;

const PrivacyTitle = styled(motion.h1)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 100;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4rem;
  text-align: center;
  
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 2px;
    background: #ffffff;
    margin: 2rem auto 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    
    &::after {
      width: 80px;
    }
  }
`;

const PrivacySection = styled(motion.section)`
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '//';
    color: rgba(255, 255, 255, 0.3);
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

const PrivacyText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.7;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin: 2rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-left: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const InfoLine = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 0.8rem;
  
  strong {
    color: #ffffff;
    font-weight: 700;
    display: inline-block;
    min-width: 120px;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    
    strong {
      min-width: 100px;
    }
  }
`;

const PrivacyList = styled.ul`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  padding-left: 2rem;
  margin: 1rem 0;
  
  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
    
    &::marker {
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding-left: 1.5rem;
  }
`;

const HighlightBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #ffffff;
  padding: 1.5rem;
  margin: 2rem 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

const PrivacyLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

const BackToHome = styled(motion.button)`
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  margin: 3rem auto 0;
  display: block;
  
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.8rem 1.5rem;
  }
`;

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <PrivacyContainer>
      <BackgroundAnimations />
      <Header />
      
      <PrivacyContent>
        <PrivacyTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Confidentialité
        </PrivacyTitle>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>Introduction</SectionTitle>
          
          <PrivacyText>
            DreamWeaver Studio SARL s'engage à protéger la vie privée de ses utilisateurs. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, 
            stockons et protégeons vos données personnelles lorsque vous visitez notre site 
            web ou utilisez nos services.
          </PrivacyText>

          <HighlightBox>
            Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) 
            et à la loi française "Informatique et Libertés" modifiée.
          </HighlightBox>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>Responsable du Traitement</SectionTitle>
          
          <ContactInfo>
            <InfoLine><strong>Société :</strong> DreamWeaver Studio SARL</InfoLine>
            <InfoLine><strong>Adresse :</strong> 42 Avenue des Entrepreneurs, 69000 Lyon, France</InfoLine>
            <InfoLine><strong>SIRET :</strong> 851 234 567 00019</InfoLine>
            <InfoLine><strong>Email DPO :</strong> dpo@dreamweaver-studio.fr</InfoLine>
            <InfoLine><strong>Téléphone :</strong> +33 (0)4 78 45 67 89</InfoLine>
          </ContactInfo>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Données Collectées</SectionTitle>
          
          <PrivacyText>
            <strong>Données collectées automatiquement :</strong>
          </PrivacyText>

          <PrivacyList>
            <li>Adresse IP et données de connexion</li>
            <li>Type de navigateur et version</li>
            <li>Système d'exploitation</li>
            <li>Pages visitées et temps passé sur le site</li>
            <li>Date et heure des visites</li>
            <li>Site web de référence</li>
          </PrivacyList>

          <PrivacyText>
            <strong>Données collectées via les formulaires :</strong>
          </PrivacyText>

          <PrivacyList>
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Nom de l'entreprise</li>
            <li>Message et description du projet</li>
            <li>Budget prévu pour le projet</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SectionTitle>Finalités du Traitement</SectionTitle>
          
          <PrivacyText>
            Vos données personnelles sont utilisées pour :
          </PrivacyText>

          <PrivacyList>
            <li>Répondre à vos demandes de contact et établir des devis</li>
            <li>Gérer la relation client et assurer le suivi des projets</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Analyser l'audience et les performances du site</li>
            <li>Envoyer des newsletters (avec votre consentement explicite)</li>
            <li>Respecter nos obligations légales et comptables</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <SectionTitle>Base Légale du Traitement</SectionTitle>
          
          <PrivacyList>
            <li><strong>Consentement :</strong> Pour l'envoi de newsletters et communications marketing</li>
            <li><strong>Exécution d'un contrat :</strong> Pour la gestion des projets clients</li>
            <li><strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et l'analyse d'audience</li>
            <li><strong>Obligation légale :</strong> Pour la conservation des documents comptables</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SectionTitle>Partage des Données</SectionTitle>
          
          <PrivacyText>
            Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées 
            uniquement dans les cas suivants :
          </PrivacyText>

          <PrivacyList>
            <li>Prestataires techniques (hébergement, analytics) sous contrat de confidentialité</li>
            <li>Partenaires nécessaires à la réalisation de votre projet (avec votre accord)</li>
            <li>Autorités légales en cas d'obligation légale</li>
          </PrivacyList>

          <PrivacyText>
            <strong>Prestataires principaux :</strong>
          </PrivacyText>

          <PrivacyList>
            <li>OVH (hébergement web) - France</li>
            <li>Google Analytics (analyse d'audience) - Données anonymisées</li>
            <li>Mailchimp (newsletters) - Avec consentement explicite</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <SectionTitle>Durée de Conservation</SectionTitle>
          
          <PrivacyList>
            <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
            <li><strong>Données clients :</strong> 10 ans pour les obligations comptables</li>
            <li><strong>Données de navigation :</strong> 25 mois maximum</li>
            <li><strong>Newsletters :</strong> Jusqu'au désabonnement</li>
            <li><strong>Cookies :</strong> 13 mois maximum</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <SectionTitle>Vos Droits</SectionTitle>
          
          <PrivacyText>
            Conformément au RGPD, vous disposez des droits suivants :
          </PrivacyText>

          <PrivacyList>
            <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> Supprimer vos données (droit à l'oubli)</li>
            <li><strong>Droit à la limitation :</strong> Restreindre le traitement</li>
            <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement</li>
            <li><strong>Droit de retrait du consentement :</strong> À tout moment</li>
          </PrivacyList>

          <HighlightBox>
            Pour exercer vos droits, contactez-nous à : <strong>dpo@dreamweaver-studio.fr</strong>
            <br />Délai de réponse : 1 mois maximum
          </HighlightBox>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <SectionTitle>Cookies et Technologies Similaires</SectionTitle>
          
          <PrivacyText>
            Notre site utilise des cookies pour améliorer votre expérience :
          </PrivacyText>

          <PrivacyList>
            <li><strong>Cookies essentiels :</strong> Fonctionnement du site (session, sécurité)</li>
            <li><strong>Cookies analytiques :</strong> Google Analytics pour mesurer l'audience</li>
            <li><strong>Cookies de préférences :</strong> Sauvegarde de vos choix</li>
          </PrivacyList>

          <PrivacyText>
            Vous pouvez gérer vos préférences cookies via les paramètres de votre navigateur 
            ou notre bandeau de consentement.
          </PrivacyText>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <SectionTitle>Sécurité des Données</SectionTitle>
          
          <PrivacyText>
            Nous mettons en œuvre des mesures de sécurité appropriées :
          </PrivacyText>

          <PrivacyList>
            <li>Chiffrement SSL/TLS pour toutes les communications</li>
            <li>Accès restreint aux données par mot de passe</li>
            <li>Sauvegardes régulières et sécurisées</li>
            <li>Mise à jour régulière des systèmes de sécurité</li>
            <li>Formation du personnel à la protection des données</li>
          </PrivacyList>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <SectionTitle>Réclamations</SectionTitle>
          
          <PrivacyText>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez :
          </PrivacyText>

          <PrivacyList>
            <li>Nous contacter directement : dpo@dreamweaver-studio.fr</li>
            <li>Saisir la CNIL : <PrivacyLink href="https://www.cnil.fr" target="_blank">www.cnil.fr</PrivacyLink></li>
          </PrivacyList>

          <ContactInfo>
            <InfoLine><strong>CNIL :</strong> Commission Nationale de l'Informatique et des Libertés</InfoLine>
            <InfoLine><strong>Adresse :</strong> 3 Place de Fontenoy, 75007 Paris</InfoLine>
            <InfoLine><strong>Téléphone :</strong> +33 (0)1 53 73 22 22</InfoLine>
          </ContactInfo>
        </PrivacySection>

        <PrivacySection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <HighlightBox>
            <strong>Dernière mise à jour :</strong> 15 décembre 2024<br />
            Cette politique peut être modifiée. Nous vous informerons de tout changement significatif.
          </HighlightBox>
        </PrivacySection>

        <BackToHome
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToHome}
        >
          Retour à l'accueil
        </BackToHome>
      </PrivacyContent>

      <Footer />
    </PrivacyContainer>
  );
};

export default PrivacyPolicy; 