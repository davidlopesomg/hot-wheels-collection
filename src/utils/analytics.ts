import ReactGA from 'react-ga4';
import { measurementId } from '../config/firebase';

let isInitialized = false;

// Initialize Google Analytics
export const initGA = () => {
  if (measurementId && !isInitialized) {
    ReactGA.initialize(measurementId);
    isInitialized = true;
    console.log('Google Analytics initialized');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path, title });
  }
};

// Track custom events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  }
};

// Track CSV imports
export const trackCSVImport = (carCount: number) => {
  trackEvent('Collection', 'Import CSV', 'Car Count', carCount);
};

// Track barcode scans
export const trackBarcodeScan = (found: boolean) => {
  trackEvent('Scanner', 'Scan', found ? 'Car Found' : 'Car Not Found');
};

// Track language changes
export const trackLanguageChange = (language: string) => {
  trackEvent('Settings', 'Change Language', language);
};

// Track adding a car
export const trackCarAdd = (method: 'scan' | 'manual') => {
  trackEvent('Collection', 'Add Car', method === 'scan' ? 'From Scan' : 'Manual Entry');
};
