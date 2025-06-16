import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  background: #000000;
  padding: 15vh 5vw;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10vh 4vw;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 100;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 10vh;
  line-height: 0.8;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #ffffff;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: 6vh;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
  }

  @media (max-width: 768px) {
    gap: 4rem;
  }
`;

const ManifestoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ManifestoText = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  letter-spacing: 0.02em;
  
  strong {
    font-weight: 700;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.3rem);
  }
`;

const PhilosophyCard = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
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
    padding: 2rem;
  }
`;

const PhilosophyTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PhilosophyText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const StatNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TeamTitle = styled(motion.h3)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.2em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TeamDescription = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MemberRole = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const MemberName = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MemberDescription = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ExpertiseList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ExpertiseItem = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Section FAQ pour traiter les objections
const FAQSection = styled.section`
  background: #000000;
  padding: 8rem 5vw;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 6rem 4vw;
  }
`;

const FAQTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 100;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const FAQContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 2rem;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '+';
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  &.active::after {
    transform: translateY(-50%) rotate(45deg);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;

    &::after {
      right: 1.5rem;
    }
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 2rem 2rem 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 300;

  .guarantee {
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 1rem;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem 1.5rem;
    font-size: 0.85rem;
  }
`;

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Et si le résultat ne me plaît pas ?",
      answer: "Révisions illimitées jusqu'à satisfaction totale. Nous ne considérons pas un projet terminé tant que vous n'êtes pas 100% conquis. C'est notre signature.",
      guarantee: "Garantie satisfaction ou remboursement intégral"
    },
    {
      question: "Les délais seront-ils respectés ?",
      answer: "Livraison garantie en 6-8 semaines ou pénalités contractuelles. Notre planning militaire et notre équipe dédiée assurent un respect scrupuleux des échéances.",
      guarantee: "Pénalités -10% par semaine de retard"
    },
    {
      question: "Le prix est-il justifié ?",
      answer: "Nos clients voient des résultats concrets dès les premières semaines. Sites 3x plus rapides, conversions qui explosent, clients qui reviennent. C'est un investissement qui se ressent immédiatement sur votre business.",
      guarantee: "Devis personnalisé gratuit sous 24h"
    },
    {
      question: "Que se passe-t-il après la livraison ?",
      answer: "Support technique 1 an inclus + formation complète de votre équipe. Nous restons vos partenaires long terme, pas juste des prestataires.",
      guarantee: "Hotline prioritaire 24h/7j incluse"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <AboutSection id="about" ref={ref}>
        <SectionTitle
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          MANIFESTO
        </SectionTitle>

        <ContentGrid>
          <ManifestoSection>
            <ManifestoText
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <strong>Nous ne suivons pas les tendances.</strong> 
              Nous les créons. Dans un monde saturé de similitudes, 
              nous revendiquons la différence radicale. Chaque pixel, 
              chaque interaction, chaque animation est pensée pour 
              <strong> choquer, surprendre, émouvoir</strong>.
            </ManifestoText>

            <PhilosophyCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <PhilosophyTitle>DESIGN PHILOSOPHY</PhilosophyTitle>
              <PhilosophyText>
                Le minimalisme comme arme de destruction massive contre 
                la médiocrité. Nous supprimons tout ce qui n'est pas 
                essentiel pour révéler la beauté brute de l'idée pure.
              </PhilosophyText>
            </PhilosophyCard>

            <StatsGrid
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <StatItem>
                <StatNumber>9/10</StatNumber>
                <StatLabel>CLIENTS SATISFAITS</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>47+</StatNumber>
                <StatLabel>PROJETS LIVRÉS</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>98/100</StatNumber>
                <StatLabel>SCORE LIGHTHOUSE</StatLabel>
              </StatItem>
            </StatsGrid>
          </ManifestoSection>

          <TeamSection>
            <TeamTitle
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            >
              CREATIVE MINDS
            </TeamTitle>

            <TeamDescription
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1 }}
            >
              Une équipe d'obsédés du détail, de perfectionnistes 
              techniques et de visionnaires créatifs. Nous ne 
              cherchons pas à plaire à tout le monde, nous 
              créons pour marquer les esprits.
            </TeamDescription>

            <TeamGrid
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <TeamMember
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <MemberRole>CREATIVE DIRECTOR</MemberRole>
                <MemberName>ALEX MOREAU</MemberName>
                <MemberDescription>
                  Vision artistique et direction créative.
                </MemberDescription>
              </TeamMember>

              <TeamMember
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <MemberRole>LEAD DEVELOPER</MemberRole>
                <MemberName>SARAH CHEN</MemberName>
                <MemberDescription>
                  Architecture technique et performance.
                </MemberDescription>
              </TeamMember>

              <TeamMember
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <MemberRole>UX/UI DESIGNER</MemberRole>
                <MemberName>JULES MARTIN</MemberName>
                <MemberDescription>
                  Interface et expérience utilisateur.
                </MemberDescription>
              </TeamMember>

              <TeamMember
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <MemberRole>MOTION DESIGNER</MemberRole>
                <MemberName>MAYA DUBOIS</MemberName>
                <MemberDescription>
                  Animation et storytelling visuel.
                </MemberDescription>
              </TeamMember>
            </TeamGrid>

            <ExpertiseList
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <ExpertiseItem>Design Radical</ExpertiseItem>
              <ExpertiseItem>Code Obsessionnel</ExpertiseItem>
              <ExpertiseItem>Performance Extrême</ExpertiseItem>
              <ExpertiseItem>Innovation Continue</ExpertiseItem>
            </ExpertiseList>
          </TeamSection>
        </ContentGrid>
      </AboutSection>

      {/* Section FAQ pour les objections */}
      <FAQSection>
        <FAQTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          QUESTIONS FRÉQUENTES
        </FAQTitle>

        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQQuestion
                onClick={() => toggleFAQ(index)}
                className={openFAQ === index ? 'active' : ''}
              >
                {faq.question}
              </FAQQuestion>
              
              <FAQAnswer
                initial={{ height: 0 }}
                animate={{ 
                  height: openFAQ === index ? 'auto' : 0,
                  opacity: openFAQ === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {openFAQ === index && (
                  <>
                    {faq.answer}
                    <span className="guarantee">{faq.guarantee}</span>
                  </>
                )}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </FAQSection>
    </>
  );
};

export default About; 