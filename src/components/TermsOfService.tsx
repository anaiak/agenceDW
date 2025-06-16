import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import BackgroundAnimations from './BackgroundAnimations.tsx';

const TermsContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  position: relative;
`;

const TermsContent = styled.main`
  padding: 8rem 5vw 4rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 6rem 4vw 3rem;
  }
`;

const TermsTitle = styled(motion.h1)`
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

const TermsSection = styled(motion.section)`
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

const TermsText = styled.p`
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

const TermsList = styled.ul`
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

const PriceTable = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin: 2rem 0;
  font-family: 'JetBrains Mono', monospace;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.85rem;
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

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <TermsContainer>
      <BackgroundAnimations />
      <Header />
      
      <TermsContent>
        <TermsTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Conditions Générales
        </TermsTitle>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>Préambule</SectionTitle>
          
          <TermsText>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
            entre DreamWeaver Studio SARL et ses clients dans le cadre de la fourniture de services 
            de création web, développement et conception numérique.
          </TermsText>

          <HighlightBox>
            Toute commande implique l'acceptation pleine et entière des présentes CGV qui prévalent 
            sur toutes autres conditions générales ou particulières du client.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>Identité du Prestataire</SectionTitle>
          
          <ContactInfo>
            <InfoLine><strong>Société :</strong> DreamWeaver Studio SARL</InfoLine>
            <InfoLine><strong>Adresse :</strong> 42 Avenue des Entrepreneurs, 69000 Lyon, France</InfoLine>
            <InfoLine><strong>SIRET :</strong> 851 234 567 00019</InfoLine>
            <InfoLine><strong>APE/NAF :</strong> 6201Z (Programmation informatique)</InfoLine>
            <InfoLine><strong>TVA :</strong> FR32851234567</InfoLine>
            <InfoLine><strong>Capital :</strong> 10 000 €</InfoLine>
            <InfoLine><strong>Email :</strong> contact@dreamweaver-studio.fr</InfoLine>
          </ContactInfo>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Services Proposés</SectionTitle>
          
          <TermsText>
            DreamWeaver Studio propose les services suivants :
          </TermsText>

          <TermsList>
            <li>Conception et développement de sites web sur mesure</li>
            <li>Applications web et plateformes numériques</li>
            <li>Design d'interfaces utilisateur (UI/UX)</li>
            <li>Intégration de systèmes e-commerce</li>
            <li>Optimisation SEO et performances web</li>
            <li>Maintenance et support technique</li>
            <li>Formation et accompagnement</li>
          </TermsList>

          <TermsText>
            Chaque prestation fait l'objet d'un devis détaillé et personnalisé, établi après 
            analyse des besoins spécifiques du client.
          </TermsText>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SectionTitle>Commandes et Devis</SectionTitle>
          
          <TermsText>
            <strong>Processus de commande :</strong>
          </TermsText>

          <TermsList>
            <li>Prise de contact et analyse des besoins</li>
            <li>Établissement d'un devis détaillé gratuit</li>
            <li>Validation du devis par le client</li>
            <li>Signature du contrat et versement de l'acompte</li>
            <li>Lancement du projet selon planning défini</li>
          </TermsList>

          <TermsText>
            Les devis sont valables 30 jours à compter de leur émission. Au-delà, 
            les prix et disponibilités peuvent être révisés.
          </TermsText>

          <HighlightBox>
            Tout projet commence uniquement après réception de l'acompte et des éléments 
            nécessaires à sa réalisation (contenus, visuels, accès, etc.).
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <SectionTitle>Tarifs et Paiement</SectionTitle>
          
          <TermsText>
            <strong>Structure tarifaire :</strong>
          </TermsText>

          <PriceTable>
            <PriceRow>
              <span>Site Vitrine (1-5 pages)</span>
              <span>À partir de 2 500 € HT</span>
            </PriceRow>
            <PriceRow>
              <span>Site Corporate (6-15 pages)</span>
              <span>À partir de 5 000 € HT</span>
            </PriceRow>
            <PriceRow>
              <span>E-commerce</span>
              <span>À partir de 8 000 € HT</span>
            </PriceRow>
            <PriceRow>
              <span>Application Web</span>
              <span>À partir de 15 000 € HT</span>
            </PriceRow>
            <PriceRow>
              <span>Maintenance mensuelle</span>
              <span>À partir de 200 € HT/mois</span>
            </PriceRow>
          </PriceTable>

          <TermsText>
            <strong>Modalités de paiement :</strong>
          </TermsText>

          <TermsList>
            <li>Acompte de 50% à la commande</li>
            <li>30% à la validation des maquettes</li>
            <li>Solde de 20% à la livraison</li>
            <li>Paiement par virement bancaire sous 30 jours</li>
            <li>Possibilité de paiement en 3 fois sans frais (projets &gt; 5 000€)</li>
          </TermsList>

          <HighlightBox>
            Tout retard de paiement entraîne des pénalités de 3 fois le taux légal 
            et une indemnité forfaitaire de 40€ pour frais de recouvrement.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SectionTitle>Délais et Livraison</SectionTitle>
          
          <TermsText>
            Les délais de réalisation sont définis dans chaque devis et commencent à courir 
            après réception de l'acompte et de tous les éléments nécessaires.
          </TermsText>

          <TermsList>
            <li>Site vitrine : 4 à 6 semaines</li>
            <li>Site corporate : 6 à 10 semaines</li>
            <li>E-commerce : 8 à 12 semaines</li>
            <li>Application web : 12 à 24 semaines</li>
          </TermsList>

          <TermsText>
            Ces délais sont donnés à titre indicatif et peuvent varier selon la complexité 
            du projet et la réactivité du client pour les validations.
          </TermsText>

          <HighlightBox>
            La livraison s'effectue par mise en ligne du site et transmission des accès. 
            Le client dispose de 15 jours pour faire ses remarques.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <SectionTitle>Propriété Intellectuelle</SectionTitle>
          
          <TermsText>
            <strong>Droits du client :</strong>
          </TermsText>

          <TermsList>
            <li>Propriété du contenu fourni (textes, images, logos)</li>
            <li>Cession des droits d'exploitation du site après paiement intégral</li>
            <li>Droit d'usage des développements spécifiques réalisés</li>
          </TermsList>

          <TermsText>
            <strong>Droits de DreamWeaver Studio :</strong>
          </TermsText>

          <TermsList>
            <li>Propriété des méthodes et savoir-faire développés</li>
            <li>Droit de signature discrète sur le site (footer)</li>
            <li>Droit d'utilisation à des fins de référence et portfolio</li>
            <li>Propriété des codes sources génériques et frameworks</li>
          </TermsList>

          <HighlightBox>
            Le client s'engage à respecter les droits d'auteur des éléments tiers intégrés 
            (polices, images, plugins) et à acquérir les licences nécessaires.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <SectionTitle>Garanties et Maintenance</SectionTitle>
          
          <TermsText>
            <strong>Garantie de conformité :</strong> 6 mois sur les fonctionnalités développées
          </TermsText>

          <TermsList>
            <li>Correction gratuite des dysfonctionnements</li>
            <li>Mise à jour de sécurité critique</li>
            <li>Support technique par email</li>
          </TermsList>

          <TermsText>
            <strong>Services de maintenance (optionnels) :</strong>
          </TermsText>

          <TermsList>
            <li>Mises à jour régulières du système</li>
            <li>Sauvegardes automatiques</li>
            <li>Monitoring et surveillance</li>
            <li>Support prioritaire</li>
            <li>Modifications mineures incluses</li>
          </TermsList>

          <TermsText>
            La maintenance ne couvre pas les modifications fonctionnelles, 
            les évolutions créatives ou les dysfonctionnements dus à des interventions tierces.
          </TermsText>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <SectionTitle>Obligations du Client</SectionTitle>
          
          <TermsList>
            <li>Fournir tous les éléments nécessaires dans les délais convenus</li>
            <li>Valider les étapes dans les délais impartis (7 jours par défaut)</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Effectuer les paiements aux échéances prévues</li>
            <li>Maintenir la confidentialité des accès fournis</li>
            <li>Signaler tout dysfonctionnement dans les meilleurs délais</li>
          </TermsList>

          <HighlightBox>
            Tout retard imputable au client dans la fourniture d'éléments ou validation 
            peut entraîner un report des délais de livraison.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <SectionTitle>Résiliation et Annulation</SectionTitle>
          
          <TermsText>
            <strong>Résiliation par le client :</strong>
          </TermsText>

          <TermsList>
            <li>Possible à tout moment moyennant préavis de 15 jours</li>
            <li>Paiement des prestations réalisées jusqu'à la date d'arrêt</li>
            <li>Facturation forfaitaire de 20% du montant restant (frais de dossier)</li>
            <li>Livraison des éléments réalisés dans l'état</li>
          </TermsList>

          <TermsText>
            <strong>Résiliation par DreamWeaver Studio :</strong>
          </TermsText>

          <TermsList>
            <li>En cas de non-paiement après mise en demeure</li>
            <li>En cas de non-fourniture des éléments après relance</li>
            <li>En cas de manquement grave aux obligations contractuelles</li>
          </TermsList>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <SectionTitle>Responsabilités et Limitations</SectionTitle>
          
          <TermsText>
            <strong>Responsabilité de DreamWeaver Studio :</strong>
          </TermsText>

          <TermsList>
            <li>Limitée au montant du contrat</li>
            <li>Exclue en cas de force majeure</li>
            <li>Couvre uniquement les dommages directs</li>
            <li>Exclue les pertes d'exploitation ou gains manqués</li>
          </TermsList>

          <TermsText>
            <strong>Responsabilité du client :</strong>
          </TermsText>

          <TermsList>
            <li>Contenu publié sur le site</li>
            <li>Respect de la législation en vigueur</li>
            <li>Conformité RGPD de ses traitements</li>
            <li>Sauvegardes de ses données</li>
          </TermsList>

          <HighlightBox>
            Le client garantit DreamWeaver Studio contre tout recours de tiers concernant 
            les contenus qu'il fournit ou publie.
          </HighlightBox>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <SectionTitle>Litiges et Droit Applicable</SectionTitle>
          
          <TermsText>
            Les présentes CGV sont régies par le droit français. En cas de litige, 
            les parties s'engagent à rechercher une solution amiable.
          </TermsText>

          <TermsText>
            À défaut d'accord amiable, les tribunaux de Lyon seront seuls compétents, 
            même en cas de pluralité de défendeurs ou d'appel en garantie.
          </TermsText>

          <TermsText>
            <strong>Médiation :</strong> En cas de litige de consommation, le client peut 
            recourir gratuitement au médiateur de la FEVAD : 
            <a href="https://www.mediateurfevad.fr" target="_blank" style={{color: '#ffffff', textDecoration: 'underline'}}>www.mediateurfevad.fr</a>
          </TermsText>
        </TermsSection>

        <TermsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <HighlightBox>
            <strong>Version :</strong> CGV v2.1 - Dernière mise à jour : 15 décembre 2024<br />
            Ces conditions peuvent être modifiées à tout moment. La version applicable 
            est celle en vigueur à la date de signature du contrat.
          </HighlightBox>
        </TermsSection>

        <BackToHome
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToHome}
        >
          Retour à l'accueil
        </BackToHome>
      </TermsContent>

      <Footer />
    </TermsContainer>
  );
};

export default TermsOfService; 