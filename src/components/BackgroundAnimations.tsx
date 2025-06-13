import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// Hook personnalisé pour la taille de l'écran
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

// Breakpoints responsive
const mobile = '@media (max-width: 767px)';
const tablet = '@media (min-width: 768px) and (max-width: 1023px)';
const desktop = '@media (min-width: 1024px)';

// Animation de lignes qui traversent l'écran - responsive
const scanLine = keyframes`
  0% { transform: translateY(-100vh); opacity: 0; }
  50% { opacity: 0.1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const ScanLine = styled.div<{ $delay: number; $isMobile: boolean }>`
  position: absolute;
  width: 1px;
  height: 2px;
  background: #ffffff;
  left: ${props => Math.random() * 100}%;
  animation: ${scanLine} ${props => 8 + Math.random() * 4}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: ${props => props.$isMobile ? 0.02 : 0.05};
  
  ${mobile} {
    opacity: 0.02;
  }
`;

// Grille subtile qui pulse - responsive
const gridPulse = keyframes`
  0%, 100% { opacity: 0.01; }
  50% { opacity: 0.03; }
`;

const GridOverlay = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: ${props => props.$isMobile ? '30px 30px' : '50px 50px'};
  animation: ${gridPulse} 6s ease-in-out infinite;
  
  ${mobile} {
    background-size: 25px 25px;
    opacity: 0.7;
  }
  
  ${tablet} {
    background-size: 35px 35px;
  }
`;

// Particules flottantes responsive
const FloatingDot = styled(motion.div)<{ $size: number; $isMobile: boolean }>`
  position: absolute;
  width: ${props => props.$isMobile ? props.$size * 0.7 : props.$size}px;
  height: ${props => props.$isMobile ? props.$size * 0.7 : props.$size}px;
  background: rgba(255, 255, 255, ${props => props.$isMobile ? 0.05 : 0.1});
  border-radius: 50%;
  
  ${mobile} {
    opacity: 0.7;
  }
`;

// Lignes de scan horizontales responsive
const horizontalScan = keyframes`
  0% { transform: translateX(-100vw); opacity: 0; }
  50% { opacity: 0.05; }
  100% { transform: translateX(100vw); opacity: 0; }
`;

const HorizontalScanLine = styled.div<{ $delay: number; $top: number; $isMobile: boolean }>`
  position: absolute;
  width: ${props => props.$isMobile ? '1px' : '2px'};
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  top: ${props => props.$top}%;
  animation: ${horizontalScan} ${props => 12 + Math.random() * 6}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: ${props => props.$isMobile ? 0.015 : 0.03};
`;

// Effet de bruit digital adaptatif
const DigitalNoise = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${props => props.$isMobile ? '0.7' : '0.9'}' numOctaves='${props => props.$isMobile ? '2' : '4'}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: ${props => props.$isMobile ? 0.004 : 0.008};
  animation: ${gridPulse} 4s ease-in-out infinite reverse;
`;

// Curseur fantôme responsive
const ghostCursor = keyframes`
  0% { transform: translate(10vw, 10vh); }
  25% { transform: translate(80vw, 30vh); }
  50% { transform: translate(60vw, 70vh); }
  75% { transform: translate(20vw, 60vh); }
  100% { transform: translate(10vw, 10vh); }
`;

const GhostCursor = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  width: ${props => props.$isMobile ? '2px' : '3px'};
  height: ${props => props.$isMobile ? '2px' : '3px'};
  background: rgba(255, 255, 255, ${props => props.$isMobile ? 0.05 : 0.1});
  border-radius: 50%;
  animation: ${ghostCursor} 45s ease-in-out infinite;
  display: ${props => props.$isMobile ? 'none' : 'block'};
  
  &::after {
    content: '';
    position: absolute;
    width: ${props => props.$isMobile ? '6px' : '8px'};
    height: ${props => props.$isMobile ? '6px' : '8px'};
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: ${props => props.$isMobile ? '-2px' : '-2.5px'};
    left: ${props => props.$isMobile ? '-2px' : '-2.5px'};
  }
  
  ${mobile} {
    display: none;
  }
`;

// Lignes de code responsives
const codeScroll = keyframes`
  0% { transform: translateY(100vh); opacity: 0; }
  10% { opacity: 0.02; }
  90% { opacity: 0.02; }
  100% { transform: translateY(-100vh); opacity: 0; }
`;

const CodeLine = styled.div<{ $delay: number; $left: number; $isMobile: boolean }>`
  position: absolute;
  left: ${props => props.$left}%;
  font-family: 'JetBrains Mono', monospace;
  font-size: ${props => props.$isMobile ? '0.4rem' : '0.6rem'};
  color: rgba(255, 255, 255, ${props => props.$isMobile ? 0.015 : 0.03});
  white-space: nowrap;
  animation: ${codeScroll} 25s linear infinite;
  animation-delay: ${props => props.$delay}s;
  user-select: none;
  
  ${mobile} {
    font-size: 0.35rem;
    opacity: 0.5;
  }
  
  ${tablet} {
    font-size: 0.5rem;
  }
`;

const BackgroundAnimations: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const { width, height, isMobile, isTablet } = useWindowSize();
  
  // Animation Canvas optimisée pour mobile
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = width;
    canvas.height = height;
    
    // Moins de points sur mobile pour les performances
    const pointCount = isMobile ? 8 : isTablet ? 12 : 15;
    const connectionDistance = isMobile ? 150 : 200;
    
    const points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2),
      vy: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2)
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(255, 255, 255, ${isMobile ? 0.01 : 0.02})`;
      ctx.lineWidth = isMobile ? 0.3 : 0.5;
      
      // Mettre à jour et dessiner les points
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        
        // Rebond sur les bords
        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;
        
        // Dessiner les connexions (moins fréquent sur mobile)
        if (!isMobile || Math.random() > 0.7) {
          points.forEach(otherPoint => {
            const distance = Math.sqrt(
              Math.pow(point.x - otherPoint.x, 2) + 
              Math.pow(point.y - otherPoint.y, 2)
            );
            
            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.stroke();
            }
          });
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  }, [width, height, isMobile, isTablet]);
  
  useEffect(() => {
    setupCanvas();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setupCanvas]);

  // Génération responsive des éléments animés
  const scanLineCount = isMobile ? 4 : isTablet ? 6 : 8;
  const horizontalScanCount = isMobile ? 2 : isTablet ? 3 : 5;
  const floatingDotCount = isMobile ? 6 : isTablet ? 9 : 12;
  
  const scanLines = Array.from({ length: scanLineCount }, (_, i) => (
    <ScanLine key={`scan-${i}`} $delay={i * 2} $isMobile={isMobile} />
  ));
  
  const horizontalScans = Array.from({ length: horizontalScanCount }, (_, i) => (
    <HorizontalScanLine 
      key={`hscan-${i}`} 
      $delay={i * 3} 
      $top={Math.random() * 100}
      $isMobile={isMobile}
    />
  ));
  
  const floatingDots = Array.from({ length: floatingDotCount }, (_, i) => (
    <FloatingDot
      key={`dot-${i}`}
      $size={Math.random() * 2 + 1}
      $isMobile={isMobile}
      animate={{
        x: [
          Math.random() * width,
          Math.random() * width,
          Math.random() * width
        ],
        y: [
          Math.random() * height,
          Math.random() * height,
          Math.random() * height
        ],
        opacity: [0.05, isMobile ? 0.1 : 0.15, 0.05]
      }}
      transition={{
        duration: isMobile ? 15 : 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%'
      }}
    />
  ));
  
  // Messages de code adaptés au mobile
  const codeMessages = isMobile ? [
    "const dream = ()=>art;",
    "// BRUTAL BEAUTY",
    "export minimal;"
  ] : [
    "const dream = await createReality();",
    "export { innovation, creativity };",
    "// BRUTAL BEAUTY IN PROGRESS",
    "function transcend() { return art; }",
    "let revolution = true;",
    "npm install rebellion --save"
  ];
  
  const codeLines = codeMessages.map((code, i) => (
    <CodeLine 
      key={`code-${i}`}
      $delay={i * 4}
      $left={Math.random() * 80 + 10}
      $isMobile={isMobile}
    >
      {code}
    </CodeLine>
  ));

  return (
    <BackgroundContainer>
      {/* Grille pulsante */}
      <GridOverlay $isMobile={isMobile} />
      
      {/* Bruit digital */}
      <DigitalNoise $isMobile={isMobile} />
      
      {/* Lignes de scan */}
      {scanLines}
      {horizontalScans}
      
      {/* Points flottants */}
      {floatingDots}
      
      {/* Curseur fantôme (desktop uniquement) */}
      <GhostCursor $isMobile={isMobile} />
      
      {/* Lignes de code */}
      {codeLines}
      
      {/* Canvas pour connexions entre points */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isMobile ? 0.015 : 0.03
        }}
      />
    </BackgroundContainer>
  );
};

export default BackgroundAnimations; 