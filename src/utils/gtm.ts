// Google Tag Manager utility functions

// Configuration GTM
const GTM_ID = 'GTM-KV8Q2ZXG';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    google_tag_manager?: any;
  }
}

// Initialize GTM dataLayer if it doesn't exist (minimal version)
export const initGTM = () => {
  // GTM s'initialise automatiquement via le script dans index.html
  // On s'assure juste que dataLayer existe
  window.dataLayer = window.dataLayer || [];
};

// Push events to GTM dataLayer
export const gtmPushEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Specific event functions for common actions
export const gtmEvents = {
  // Page view tracking
  pageView: (pageName: string, pageUrl?: string) => {
    gtmPushEvent('page_view', {
      page_title: pageName,
      page_location: pageUrl || window.location.href,
    });
  },

  // Contact form events
  contactFormStart: () => {
    gtmPushEvent('contact_form_start');
  },

  contactFormSubmit: (formData?: Record<string, any>) => {
    gtmPushEvent('contact_form_submit', {
      ...formData,
    });
  },

  // Project interactions
  projectView: (projectName: string) => {
    gtmPushEvent('project_view', {
      project_name: projectName,
    });
  },

  // Service interactions
  serviceView: (serviceName: string) => {
    gtmPushEvent('service_view', {
      service_name: serviceName,
    });
  },

  // Download/CTA events
  downloadPortfolio: () => {
    gtmPushEvent('download_portfolio');
  },

  ctaClick: (ctaName: string, location: string) => {
    gtmPushEvent('cta_click', {
      cta_name: ctaName,
      cta_location: location,
    });
  },

  // Navigation events
  menuClick: (menuItem: string) => {
    gtmPushEvent('menu_click', {
      menu_item: menuItem,
    });
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    gtmPushEvent('scroll_depth', {
      scroll_percentage: percentage,
    });
  },

  // Legal pages
  legalPageView: (pageType: 'legal-notice' | 'privacy-policy' | 'terms-of-service') => {
    gtmPushEvent('legal_page_view', {
      page_type: pageType,
    });
  },
};

// Fonction de diagnostic GTM
export const diagnosticGTM = () => {
  const checks = {
    dataLayerExists: !!window.dataLayer,
    dataLayerIsArray: Array.isArray(window.dataLayer),
    gtmScriptLoaded: !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'),
    gtmContainerDetected: !!window.google_tag_manager,
    dataLayerHasData: window.dataLayer && window.dataLayer.length > 0
  };
  
  console.group('🔍 GTM Diagnostic');
  console.log('GTM ID:', GTM_ID);
  console.log('Checks:', checks);
  console.log('DataLayer content:', window.dataLayer);
  
  if (window.google_tag_manager) {
    console.log('GTM Container:', Object.keys(window.google_tag_manager));
  }
  
  console.groupEnd();
  
  return checks;
};

// Fonction pour forcer le rechargement GTM si nécessaire
export const reloadGTM = () => {
  // Supprimer l'ancien script
  const oldScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
  if (oldScript) {
    oldScript.remove();
  }
  
  // Recharger GTM
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
  
  console.log('🔄 GTM script reloaded');
}; 