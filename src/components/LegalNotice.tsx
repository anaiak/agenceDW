import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import BackgroundAnimations from './BackgroundAnimations.tsx';

const LegalContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  position: relative;
`;

const LegalContent = styled.main`
  padding: 8rem 5vw 4rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 6rem 4vw 3rem;
  }
`;

const LegalTitle = styled(motion.h1)`
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

const LegalSection = styled(motion.section)`
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

const LegalText = styled.p`
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

const LegalList = styled.ul`
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

const LegalLink = styled.a`
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

const LegalNotice: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <LegalContainer>
      <BackgroundAnimations />
      <Header />
      
      <LegalContent>
        <LegalTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Mentions Légales
        </LegalTitle>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>Informations Générales</SectionTitle>
          
          <ContactInfo>
            <InfoLine><strong>Raison sociale :</strong> DreamWeaver Studio SARL</InfoLine>
            <InfoLine><strong>Siège social :</strong> 42 Avenue des Entrepreneurs, 69000 Lyon, France</InfoLine>
            <InfoLine><strong>SIRET :</strong> 851 234 567 00019</InfoLine>
            <InfoLine><strong>APE/NAF :</strong> 6201Z (Programmation informatique)</InfoLine>
            <InfoLine><strong>TVA :</strong> FR32851234567</InfoLine>
            <InfoLine><strong>Capital social :</strong> 10 000 €</InfoLine>
            <InfoLine><strong>Téléphone :</strong> +33 (0)4 78 45 67 89</InfoLine>
            <InfoLine><strong>Email :</strong> contact@dreamweaver-studio.fr</InfoLine>
          </ContactInfo>

          <LegalText>
            Le site web <strong>dreamweaver-studio.fr</strong> est édité par DreamWeaver Studio SARL, 
            société à responsabilité limitée au capital de 10 000 euros, immatriculée au 
            Registre du Commerce et des Sociétés de Lyon sous le numéro 851 234 567.
          </LegalText>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>Direction de la Publication</SectionTitle>
          
          <LegalText>
            <strong>Directeur de la publication :</strong> Alexandre Moreau, Gérant de DreamWeaver Studio SARL
          </LegalText>
          
          <LegalText>
            <strong>Responsable éditorial :</strong> Sarah Dubois, Directrice Créative
          </LegalText>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Hébergement</SectionTitle>
          
          <ContactInfo>
            <InfoLine><strong>Hébergeur :</strong> OVH SAS</InfoLine>
            <InfoLine><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</InfoLine>
            <InfoLine><strong>Téléphone :</strong> +33 (0)9 72 10 10 07</InfoLine>
            <InfoLine><strong>Site web :</strong> <LegalLink href="https://www.ovh.com" target="_blank">www.ovh.com</LegalLink></InfoLine>
          </ContactInfo>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SectionTitle>Propriété Intellectuelle</SectionTitle>
          
          <LegalText>
            L'ensemble du contenu de ce site web (textes, images, vidéos, logos, icônes, sons, 
            logiciels, etc.) est protégé par les dispositions du Code de la propriété intellectuelle 
            et notamment par les droits d'auteur.
          </LegalText>
          
          <LegalText>
            Tous les éléments de ce site sont la propriété exclusive de DreamWeaver Studio SARL ou 
            font l'objet d'une autorisation d'utilisation. Toute reproduction, représentation, 
            modification, publication, adaptation de tout ou partie des éléments du site, quel que 
            soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
          </LegalText>

          <HighlightBox>
            Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient 
            sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux 
            dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
          </HighlightBox>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <SectionTitle>Protection des Données Personnelles</SectionTitle>
          
          <LegalText>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
            "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, 
            de rectification, de suppression et de portabilité des données vous concernant.
          </LegalText>

          <LegalText>
            <strong>Responsable du traitement :</strong> DreamWeaver Studio SARL
          </LegalText>

          <LegalText>
            <strong>Finalités du traitement :</strong>
          </LegalText>

          <LegalList>
            <li>Gestion des demandes de contact et de devis</li>
            <li>Envoi de newsletters et communications commerciales (avec consentement)</li>
            <li>Amélioration de l'expérience utilisateur sur le site</li>
            <li>Respect des obligations légales et comptables</li>
          </LegalList>

          <LegalText>
            <strong>Durée de conservation :</strong> Les données sont conservées pendant la durée 
            nécessaire à l'accomplissement des finalités pour lesquelles elles sont collectées, 
            et dans le respect des durées légales de conservation.
          </LegalText>

          <LegalText>
            Pour exercer vos droits, vous pouvez nous contacter à l'adresse : 
            <strong> dpo@dreamweaver-studio.fr</strong> ou par courrier postal à l'adresse du siège social.
          </LegalText>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SectionTitle>Cookies</SectionTitle>
          
          <LegalText>
            Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser 
            l'utilisation du site. Les cookies sont de petits fichiers stockés sur votre terminal 
            lorsque vous visitez un site web.
          </LegalText>

          <LegalText>
            <strong>Types de cookies utilisés :</strong>
          </LegalText>

          <LegalList>
            <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies analytiques :</strong> Google Analytics (anonymisés)</li>
            <li><strong>Cookies de préférences :</strong> Sauvegarde de vos choix de navigation</li>
          </LegalList>

          <LegalText>
            Vous pouvez à tout moment configurer ou désactiver les cookies dans les paramètres 
            de votre navigateur. La désactivation des cookies peut cependant limiter certaines 
            fonctionnalités du site.
          </LegalText>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <SectionTitle>Limitation de Responsabilité</SectionTitle>
          
          <LegalText>
            DreamWeaver Studio SARL s'efforce de fournir des informations exactes et à jour sur ce site. 
            Cependant, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
            mises à disposition.
          </LegalText>

          <LegalText>
            L'utilisation des informations et contenus disponibles sur l'ensemble du site ne saurait 
            en aucun cas engager la responsabilité de DreamWeaver Studio SARL, à l'exception des 
            dispositions prévues par la loi.
          </LegalText>

          <HighlightBox>
            DreamWeaver Studio SARL ne pourra être tenue responsable des dommages directs et indirects 
            causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de 
            l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, 
            soit de l'apparition d'un bug ou d'une incompatibilité.
          </HighlightBox>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <SectionTitle>Droit Applicable</SectionTitle>
          
          <LegalText>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, 
            et à défaut de résolution amiable, les tribunaux de Lyon seront seuls compétents.
          </LegalText>

          <LegalText>
            <strong>Médiation :</strong> Conformément aux dispositions du Code de la consommation 
            concernant le règlement amiable des litiges, DreamWeaver Studio SARL adhère au Service 
            du Médiateur du e-commerce de la FEVAD (Fédération du e-commerce et de la vente à distance) 
            dont les coordonnées sont les suivantes : <LegalLink href="https://www.mediateurfevad.fr" target="_blank">www.mediateurfevad.fr</LegalLink>
          </LegalText>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <SectionTitle>Contact</SectionTitle>
          
          <LegalText>
            Pour toute question concernant ces mentions légales ou l'utilisation de ce site, 
            vous pouvez nous contacter :
          </LegalText>

          <ContactInfo>
            <InfoLine><strong>Par email :</strong> legal@dreamweaver-studio.fr</InfoLine>
            <InfoLine><strong>Par téléphone :</strong> +33 (0)4 78 45 67 89</InfoLine>
            <InfoLine><strong>Par courrier :</strong> DreamWeaver Studio SARL<br />
              Service Juridique<br />
              42 Avenue des Entrepreneurs<br />
              69000 Lyon, France
            </InfoLine>
          </ContactInfo>
        </LegalSection>

        <LegalSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <HighlightBox>
            <strong>Dernière mise à jour :</strong> 15 décembre 2024<br />
            Ces mentions légales peuvent être modifiées à tout moment. Il est conseillé de les consulter régulièrement.
          </HighlightBox>
        </LegalSection>

        <BackToHome
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToHome}
        >
          Retour à l'accueil
        </BackToHome>
      </LegalContent>

      <Footer />
    </LegalContainer>
  );
};

export default LegalNotice; 