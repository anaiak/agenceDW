// Google Tag Manager utility functions
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize GTM dataLayer if it doesn't exist
export const initGTM = () => {
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