import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 2rem;
  background: transparent;
  mix-blend-mode: difference;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Logo = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: none;
  
  &:hover {
    text-shadow: 2px 2px 0 #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const MenuLines = styled(motion.div)<{ $isOpen: boolean }>`
  position: relative;
  width: 20px;
  height: 15px;
  
  span {
    display: block;
    width: 100%;
    height: 2px;
    background: #ffffff;
    margin: 3px 0;
    transition: all 0.3s ease;
    
    &:first-child {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }
    
    &:last-child {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
    }
  }
`;

const NavMenu = styled(motion.div)<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: #000000;
  border: 1px solid #ffffff;
  min-width: 200px;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    min-width: 180px;
    right: -1rem;
  }
`;

const NavLink = styled(motion.a)`
  display: block;
  padding: 1rem 1.5rem;
  color: #ffffff;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: none;
  position: relative;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #ffffff;
    color: #000000;
    transform: translateX(-5px);
  }
  
  &::before {
    content: '>';
    position: absolute;
    left: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.8rem;
  }
`;

const Pictogram = styled(motion.div)`
  width: 20px;
  height: 20px;
  position: relative;
  cursor: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #ffffff;
    transition: all 0.3s ease;
  }
  
  &.work::before {
    width: 8px;
    height: 8px;
    border: 2px solid #ffffff;
    background: transparent;
    top: 0;
    left: 0;
  }
  
  &.work::after {
    width: 8px;
    height: 8px;
    border: 2px solid #ffffff;
    background: transparent;
    bottom: 0;
    right: 0;
  }
  
  &.about::before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  &.about::after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  
  &.contact::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
  }
  
  &.contact::after {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    bottom: 2px;
    right: 2px;
  }
  
  &:hover {
    transform: rotate(45deg);
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#portfolio', icon: 'work' },
    { name: 'About', href: '#about', icon: 'about' },
    { name: 'Contact', href: '#contact', icon: 'contact' }
  ];

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Nav>
        <Logo
          whileHover={{ scale: 1.1 }}
          className="morphing-text accent-micro"
        >
          DW.STUDIO
        </Logo>

        <NavContainer>
          <MenuLines
            $isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            data-cursor="hover"
          >
            <span></span>
            <span></span>
            <span></span>
          </MenuLines>

          <NavMenu $isOpen={isMenuOpen}>
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: -5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                data-cursor="hover"
              >
                <Pictogram className={item.icon} />
                {item.name}
              </NavLink>
            ))}
          </NavMenu>
        </NavContainer>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 