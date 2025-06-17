import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { diagnosticGTM, reloadGTM, gtmPushEvent } from '../utils/gtm.ts';

const DiagnosticContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  z-index: 10000;
  max-width: 400px;
  border: 1px solid #333;
`;

const DiagnosticTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #00ff88;
  font-size: 14px;
`;

const DiagnosticItem = styled.div<{ $status: 'success' | 'error' | 'warning' }>`
  margin: 8px 0;
  padding: 5px;
  border-radius: 4px;
  background: ${props => 
    props.$status === 'success' ? 'rgba(0, 255, 136, 0.1)' :
    props.$status === 'error' ? 'rgba(255, 0, 0, 0.1)' :
    'rgba(255, 165, 0, 0.1)'
  };
  color: ${props => 
    props.$status === 'success' ? '#00ff88' :
    props.$status === 'error' ? '#ff0000' :
    '#ffa500'
  };
`;

const Button = styled.button`
  background: #00ff88;
  color: #000;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  cursor: pointer;
  margin: 5px 5px 5px 0;
  
  &:hover {
    background: #00cc6a;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: #ffffff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  
  &:hover {
    color: #ff0000;
  }
`;

const GTMDiagnostic: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const runDiagnostic = () => {
    const result = diagnosticGTM();
    setDiagnostic(result);
  };

  const testEvent = () => {
    gtmPushEvent('diagnostic_test', {
      test_timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    });
    console.log('🧪 Événement de test envoyé à GTM');
  };

  useEffect(() => {
    // Vérifier les paramètres URL pour activer le diagnostic
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gtm_debug') === 'true') {
      setIsVisible(true);
      runDiagnostic();
    }

    // Écouter les touches du clavier pour afficher/masquer
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        setIsVisible(!isVisible);
        if (!isVisible) {
          runDiagnostic();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh && isVisible) {
      interval = setInterval(runDiagnostic, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, isVisible]);

  if (!isVisible) return null;

  return (
    <DiagnosticContainer
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <CloseButton onClick={() => setIsVisible(false)}>×</CloseButton>
      
      <DiagnosticTitle>🔍 GTM Diagnostic</DiagnosticTitle>
      
      {diagnostic && (
        <>
          <DiagnosticItem $status={diagnostic.dataLayerExists ? 'success' : 'error'}>
            DataLayer existe: {diagnostic.dataLayerExists ? '✅' : '❌'}
          </DiagnosticItem>
          
          <DiagnosticItem $status={diagnostic.dataLayerIsArray ? 'success' : 'error'}>
            DataLayer est un Array: {diagnostic.dataLayerIsArray ? '✅' : '❌'}
          </DiagnosticItem>
          
          <DiagnosticItem $status={diagnostic.gtmScriptLoaded ? 'success' : 'error'}>
            Script GTM chargé: {diagnostic.gtmScriptLoaded ? '✅' : '❌'}
          </DiagnosticItem>
          
          <DiagnosticItem $status={diagnostic.gtmContainerDetected ? 'success' : 'error'}>
            Container GTM détecté: {diagnostic.gtmContainerDetected ? '✅' : '❌'}
          </DiagnosticItem>
          
          <DiagnosticItem $status={diagnostic.dataLayerHasData ? 'success' : 'warning'}>
            DataLayer a des données: {diagnostic.dataLayerHasData ? '✅' : '⚠️'}
          </DiagnosticItem>
          
          <div style={{ marginTop: '15px', fontSize: '11px' }}>
            <strong>DataLayer items:</strong> {window.dataLayer?.length || 0}
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <Button onClick={runDiagnostic}>🔄 Actualiser</Button>
            <Button onClick={testEvent}>🧪 Test Event</Button>
            <Button onClick={reloadGTM}>🚀 Recharger GTM</Button>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '11px' }}>
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Auto-refresh (2s)
            </label>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#888' }}>
            Ctrl+Shift+G pour afficher/masquer
            <br />
            Ou ajoutez ?gtm_debug=true à l'URL
          </div>
        </>
      )}
    </DiagnosticContainer>
  );
};

export default GTMDiagnostic; 