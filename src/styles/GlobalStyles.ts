import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    background: #000000;
    min-height: 100vh;
    overflow-x: hidden;
    color: #ffffff;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #ffffff;
  }

  .mono {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-weight: 400;
  }

  .giant-text {
    font-size: clamp(4rem, 15vw, 20rem);
    font-weight: 100;
    line-height: 0.8;
    letter-spacing: -0.05em;
  }

  .glitch {
    position: relative;
    color: #ffffff;
    
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      animation: glitch-1 0.5s infinite;
      color: #ffffff;
      z-index: -1;
    }

    &::after {
      animation: glitch-2 0.5s infinite;
      color: #ffffff;
      z-index: -2;
    }
  }

  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }

  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(2px, 0); }
    40% { transform: translate(-2px, 0); }
    60% { transform: translate(0, 2px); }
    80% { transform: translate(0, -2px); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fracture {
    display: inline-block;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .fracture:hover {
    transform: translateX(5px) skew(2deg);
  }

  .invert-button {
    background: #ffffff;
    color: #000000;
    border: none;
    padding: 1rem 2rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #000000;
      color: #ffffff;
      box-shadow: inset 0 0 0 2px #ffffff;
    }
  }

  .grid-asymmetric {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .negative-space {
    height: 15vh;
  }

  @keyframes sweep {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100vw); }
  }

  .sweep-light {
    position: fixed;
    top: 0;
    left: 0;
    width: 2px;
    height: 100vh;
    background: linear-gradient(90deg, transparent, #ffffff, transparent);
    animation: sweep 2s ease-in-out;
    z-index: 10000;
  }

  .morphing-text {
    font-variation-settings: 'wght' 100;
    transition: font-variation-settings 0.3s ease;
  }

  .morphing-text:hover {
    font-variation-settings: 'wght' 900;
  }

  .accent-micro {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -10px;
      width: 4px;
      height: 4px;
      background: #ffffff;
      opacity: 0;
      animation: blink 0.1s ease-in-out;
    }
    
    &:hover::after {
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  .brutal-border {
    border: 2px solid #ffffff;
    border-radius: 0;
  }

  .text-fragmented {
    display: inline-block;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .text-fragmented:hover {
    transform: translate(2px, -2px);
    text-shadow: -2px 2px 0 #ffffff;
  }
`; 