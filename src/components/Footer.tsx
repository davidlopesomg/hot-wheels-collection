import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadManufacturers } from '../utils/manufacturerManager';
import { Manufacturer } from '../types';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadManufacturersData();
  }, []);

  const loadManufacturersData = async () => {
    try {
      const data = await loadManufacturers();
      // Store total count
      setTotalCount(data.length);
      
      // Filter manufacturers that have logos
      const withLogos = data.filter(m => m.logoUrl);
      
      // Priority order for featured manufacturers
      const priorityOrder = ['Hot Wheels', 'Matchbox', 'Bburago', 'Majorette'];
      
      // Sort manufacturers: priority ones first, then alphabetically
      const sorted = withLogos.sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a.name);
        const bIndex = priorityOrder.indexOf(b.name);
        
        // If both are in priority list, sort by priority order
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        
        // If only a is in priority list, it comes first
        if (aIndex !== -1) return -1;
        
        // If only b is in priority list, it comes first
        if (bIndex !== -1) return 1;
        
        // Otherwise, sort alphabetically
        return a.name.localeCompare(b.name);
      });
      
      setManufacturers(sorted);
    } catch (error) {
      console.error('Error loading manufacturers for footer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show first 5 manufacturers with logos
  const displayedManufacturers = manufacturers.slice(0, 5);
  const remainingCount = totalCount > displayedManufacturers.length ? totalCount - displayedManufacturers.length : 0;

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section manufacturers">
          <h3>{t('footer.supportedBrands')}</h3>
          <div className="manufacturer-logos">
            {loading ? (
              <span className="loading-text">{t('collection.loading')}...</span>
            ) : displayedManufacturers.length > 0 ? (
              <>
                {displayedManufacturers.map((manufacturer) => (
                  <div key={manufacturer.id} className="manufacturer-item" title={manufacturer.name}>
                    <img 
                      src={manufacturer.logoUrl} 
                      alt={manufacturer.name}
                      className="manufacturer-logo"
                      onError={(e) => {
                        // Fallback to first letter if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('logo-error');
                      }}
                    />
                    <span className="manufacturer-name">{manufacturer.name}</span>
                  </div>
                ))}
                {remainingCount > 0 && (
                  <span className="more-manufacturers">+{remainingCount} {t('footer.more')}</span>
                )}
              </>
            ) : (
              <span className="no-manufacturers">{t('footer.noManufacturers')}</span>
            )}
          </div>
        </div>

        <div className="footer-section credits">
          <p className="developed-by">
            {t('footer.developedBy')} 
            <strong> GitHub Copilot <small>(Claude Sonnet 4.5)</small> </strong> 
            {t('footer.withAssistance')} 
            <strong> David Lopes</strong>
          </p>
          <p className="copyright">
            © {currentYear} Hot Wheels Collection Manager
          </p>
        </div>

        <div className="footer-section links">
          <a href="https://github.com/davidlopesomg/hot-wheels-collection" target="_blank" rel="noopener noreferrer">
            <span className="link-icon">⭐</span> GitHub
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Version 2.0.0'); }}>
            <span className="link-icon">ℹ️</span> {t('footer.version')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
