import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  padding: 15vh 5vw;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 100;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 10vh;
  line-height: 0.8;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #000000;
    margin-top: 2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ManifestoSection = styled.div`
  position: relative;
`;

const ManifestoText = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 300;
  color: #000000;
  line-height: 1.8;
  margin-bottom: 3rem;
  
  strong {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const PhilosophyCard = styled(motion.div)`
  border: 2px solid #000000;
  padding: 3rem;
  margin-bottom: 4rem;
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
`;

const PhilosophyTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const PhilosophyText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  color: #000000;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  position: sticky;
  top: 20vh;
`;

const StatCard = styled(motion.div)`
  background: #000000;
  color: #ffffff;
  padding: 2rem;
  margin-bottom: 2rem;
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
`;

const StatNumber = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 8vh;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  border: 1px solid #000000;
  padding: 2rem;
  
  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const MemberAvatar = styled.div`
  width: 80px;
  height: 80px;
  background: #000000;
  color: #ffffff;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1rem;
`;

const MemberName = styled.h4`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "2021", label: "FONDATION" },
    { number: "∞", label: "CRÉATIVITÉ" },
    { number: "100", label: "% PASSION" },
    { number: "0", label: "COMPROMIS" }
  ];

  const team = [
    { name: "ALEX", role: "CREATIVE DIRECTOR", avatar: "A" },
    { name: "MAYA", role: "TECH LEAD", avatar: "M" },
    { name: "ZARA", role: "UX ARCHITECT", avatar: "Z" },
    { name: "JULES", role: "BRAND STRATEGIST", avatar: "J" }
  ];

  return (
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

          <PhilosophyCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <PhilosophyTitle>TECHNICAL APPROACH</PhilosophyTitle>
            <PhilosophyText>
              Code propre, architecture pensée, performances ultimes. 
              Chaque ligne de code est un vers dans notre poème 
              algorithmique dédié à l'excellence technique.
            </PhilosophyText>
          </PhilosophyCard>

          <PhilosophyCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <PhilosophyTitle>CREATIVE PROCESS</PhilosophyTitle>
            <PhilosophyText>
              Nous commençons par détruire les conventions, puis nous 
              reconstruisons à partir de l'essence même du message. 
              Chaque projet est une révolution silencieuse.
            </PhilosophyText>
          </PhilosophyCard>
        </ManifestoSection>

        <StatsSection>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              data-cursor="hover"
            >
              <StatNumber className="accent-micro">{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsSection>
      </ContentGrid>

      <TeamGrid>
        {team.map((member, index) => (
          <TeamMember
            key={member.name}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            data-cursor="hover"
          >
            <MemberAvatar>{member.avatar}</MemberAvatar>
            <MemberName className="text-fragmented">{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </TeamMember>
        ))}
      </TeamGrid>
    </AboutSection>
  );
};

export default About; 