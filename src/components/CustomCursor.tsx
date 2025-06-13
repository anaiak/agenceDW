import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorDot = styled(motion.div)<{ $isHovering: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$isHovering ? '40px' : '20px'};
  height: ${props => props.$isHovering ? '40px' : '20px'};
  background: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transition: width 0.2s ease, height 0.2s ease;
`;

const CursorTrail = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
`;

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update trail
      setTrailPositions(prev => {
        const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 5)];
        return newTrail;
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [data-cursor="hover"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <CursorDot
        $isHovering={isHovering}
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 20 : 10),
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Trail */}
      {trailPositions.map((pos, index) => (
        <CursorTrail
          key={index}
          animate={{
            x: pos.x - 4,
            y: pos.y - 4,
            opacity: 1 - (index * 0.2),
            scale: 1 - (index * 0.1),
          }}
          transition={{
            type: "spring",
            stiffness: 500 - (index * 100),
            damping: 30 + (index * 5),
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 