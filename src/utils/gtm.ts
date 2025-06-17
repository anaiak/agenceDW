// Google Tag Manager utility functions

// Configuration GTM et Google Analytics
const GTM_ID = 'GTM-KV8Q2ZXG';
const GA_ID = 'G-52NCFQBPEH';

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

// Google Analytics gtag function wrapper
export const gtagEvent = (action: string, category: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      ...parameters,
    });
  }
};

// Send page view to Google Analytics
export const gtagPageView = (pageTitle: string, pageLocation?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_ID, {
      page_title: pageTitle,
      page_location: pageLocation || window.location.href,
    });
  }
};

// Specific event functions for common actions
export const gtmEvents = {
  // Page view tracking
  pageView: (pageName: string, pageUrl?: string) => {
    const url = pageUrl || window.location.href;
    // Envoyer vers GTM
    gtmPushEvent('page_view', {
      page_title: pageName,
      page_location: url,
    });
    // Envoyer vers Google Analytics
    gtagPageView(pageName, url);
  },

  // Contact form events
  contactFormStart: () => {
    gtmPushEvent('contact_form_start');
    gtagEvent('form_start', 'engagement', { form_name: 'contact' });
  },

  contactFormSubmit: (formData?: Record<string, any>) => {
    gtmPushEvent('contact_form_submit', {
      ...formData,
    });
    gtagEvent('form_submit', 'conversion', {
      form_name: 'contact',
      ...formData,
    });
  },

  // Project interactions
  projectView: (projectName: string) => {
    gtmPushEvent('project_view', {
      project_name: projectName,
    });
    gtagEvent('view_item', 'engagement', {
      item_name: projectName,
      content_type: 'project',
    });
  },

  // Service interactions
  serviceView: (serviceName: string) => {
    gtmPushEvent('service_view', {
      service_name: serviceName,
    });
    gtagEvent('view_item', 'engagement', {
      item_name: serviceName,
      content_type: 'service',
    });
  },

  // Download/CTA events
  downloadPortfolio: () => {
    gtmPushEvent('download_portfolio');
    gtagEvent('file_download', 'engagement', {
      file_name: 'portfolio',
    });
  },

  ctaClick: (ctaName: string, location: string) => {
    gtmPushEvent('cta_click', {
      cta_name: ctaName,
      cta_location: location,
    });
    gtagEvent('click', 'engagement', {
      click_text: ctaName,
      click_location: location,
    });
  },

  // Navigation events
  menuClick: (menuItem: string) => {
    gtmPushEvent('menu_click', {
      menu_item: menuItem,
    });
    gtagEvent('click', 'navigation', {
      click_text: menuItem,
      content_type: 'menu',
    });
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    gtmPushEvent('scroll_depth', {
      scroll_percentage: percentage,
    });
    gtagEvent('scroll', 'engagement', {
      scroll_depth: percentage,
    });
  },

  // Legal pages
  legalPageView: (pageType: 'legal-notice' | 'privacy-policy' | 'terms-of-service') => {
    gtmPushEvent('legal_page_view', {
      page_type: pageType,
    });
    gtagEvent('page_view', 'legal', {
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