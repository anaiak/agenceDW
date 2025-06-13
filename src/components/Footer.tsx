import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.footer`
  background: #ffffff;
  color: #000000;
  padding: 5vh 5vw 3vh;
  border-top: 2px solid #000000;
  position: relative;

  @media (max-width: 768px) {
    padding: 4vh 4vw 2vh;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled.div`
  position: relative;
`;

const FooterLogo = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  cursor: none;
  
  &:hover {
    text-shadow: 3px 3px 0 #000000;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const FooterTagline = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
`;

const FooterManifesto = styled.div`
  border: 1px solid #000000;
  padding: 1.5rem;
  background: transparent;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 10px;
    height: 10px;
    background: #ffffff;
    border: 1px solid #000000;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 10px;
    height: 10px;
    background: #ffffff;
    border: 1px solid #000000;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const ManifestoText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const FooterColumn = styled.div`
  position: relative;
`;

const ColumnTitle = styled.h4`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 1px;
    background: #000000;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled(motion.li)`
  margin-bottom: 0.8rem;
`;

const Link = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: none;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    color: #000000;
    transform: translateX(5px);
    font-weight: 700;
  }
  
  &::before {
    content: '>';
    opacity: 0;
    margin-right: 0.5rem;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
`;

const ContactLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const ContactValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const SocialSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
`;

const SocialLink = styled(motion.a)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid #000000;
  padding: 0.5rem 0.8rem;
  cursor: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LegalLink = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: none;
  
  &:hover {
    color: #000000;
    font-weight: 700;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'SERVICES', href: '#services' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'MANIFESTO', href: '#about' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const resources = [
    { name: 'PROCESS', href: '#' },
    { name: 'BLOG', href: '#' },
    { name: 'CASE STUDIES', href: '#' },
    { name: 'RESOURCES', href: '#' }
  ];

  const socialLinks = [
    { name: 'GH', href: '#' },
    { name: 'LI', href: '#' },
    { name: 'TW', href: '#' },
    { name: 'IG', href: '#' }
  ];

  return (
    <FooterSection>
      <FooterGrid>
        <BrandSection>
          <FooterLogo
            whileHover={{ scale: 1.05 }}
            className="accent-micro"
          >
            DREAMWEAVER
          </FooterLogo>
          
          <FooterTagline>
            STUDIO DE CRÉATION WEB AVANT-GARDISTE
            <br />
            MINIMALISME RADICAL • POÉSIE ALGORITHMIQUE
          </FooterTagline>

          <FooterManifesto>
            <ManifestoText>
              "NOUS NE CRÉONS PAS DES SITES WEB,
              <br />
              NOUS FORGEONS L'AVENIR NUMÉRIQUE"
            </ManifestoText>
          </FooterManifesto>

          <ContactInfo>
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>contact@dreamweaver.studio</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Location</ContactLabel>
              <ContactValue>Paris, France</ContactValue>
            </ContactItem>
          </ContactInfo>

          <SocialSection>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                data-cursor="hover"
              >
                {social.name}
              </SocialLink>
            ))}
          </SocialSection>
        </BrandSection>

        <FooterColumn>
          <ColumnTitle className="text-fragmented">NAVIGATION</ColumnTitle>
          <FooterLinks>
            {quickLinks.map((link, index) => (
              <FooterLink
                key={link.name}
                whileHover={{ x: 5 }}
                data-cursor="hover"
              >
                <Link href={link.href}>{link.name}</Link>
              </FooterLink>
            ))}
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle className="text-fragmented">RESSOURCES</ColumnTitle>
          <FooterLinks>
            {resources.map((resource, index) => (
              <FooterLink
                key={resource.name}
                whileHover={{ x: 5 }}
                data-cursor="hover"
              >
                <Link href={resource.href}>{resource.name}</Link>
              </FooterLink>
            ))}
          </FooterLinks>
        </FooterColumn>
      </FooterGrid>

      <FooterBottom>
        <Copyright>
          © {currentYear} DREAMWEAVER STUDIO. ALL RIGHTS RESERVED.
        </Copyright>
        
        <LegalLinks>
          <LegalLink href="#" data-cursor="hover">MENTIONS LÉGALES</LegalLink>
          <LegalLink href="#" data-cursor="hover">CONFIDENTIALITÉ</LegalLink>
          <LegalLink href="#" data-cursor="hover">CGV</LegalLink>
        </LegalLinks>
      </FooterBottom>
    </FooterSection>
  );
};

export default Footer; 