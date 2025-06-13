import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
`;

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 2rem 1.1rem 1.5rem;
  background: #fff;
  border: 2px solid #000;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
  border-radius: 2.5rem;
  color: #000;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: box-shadow 0.2s, border 0.2s, background 0.2s, color 0.2s;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    background: #000;
    color: #fff;
    border: 2px solid #000;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.12);
  }

  @media (max-width: 600px) {
    left: 50%;
    right: auto;
    bottom: 1rem;
    transform: translateX(-50%);
    padding: 0.7rem 1.2rem 0.7rem 1rem;
    font-size: 0.85rem;
    border-radius: 2rem;
    min-width: 0;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #000;
  color: #000;
  font-size: 1.1rem;
  margin-right: 0.2rem;
  transition: background 0.2s, color 0.2s;

  ${FloatingButton}:hover & {
    background: #000;
    color: #fff;
    border: 2px solid #fff;
  }

  @media (max-width: 600px) {
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.9rem;
    margin-right: 0.15rem;
  }
`;

const ContactFloatingButton: React.FC = () => {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FloatingButton
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      aria-label="Nous contacter"
    >
      <Icon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5"/><polyline points="17 8 21 12 17 16"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </Icon>
      Nous contacter
    </FloatingButton>
  );
};

export default ContactFloatingButton; 