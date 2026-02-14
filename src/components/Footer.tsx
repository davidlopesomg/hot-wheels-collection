import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const manufacturers = [
    { name: 'Hot Wheels', logo: '🏎️' },
    { name: 'Majorette', logo: '🚗' },
    { name: 'Matchbox', logo: '🚙' },
    { name: 'Tomica', logo: '🚕' },
    { name: 'MiniGT', logo: '🏁' }
  ];

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section manufacturers">
          <h3>{t('footer.supportedBrands')}</h3>
          <div className="manufacturer-logos">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer.name} className="manufacturer-item" title={manufacturer.name}>
                <span className="manufacturer-icon">{manufacturer.logo}</span>
                <span className="manufacturer-name">{manufacturer.name}</span>
              </div>
            ))}
            <span className="more-manufacturers">+24 {t('footer.more')}</span>
          </div>
        </div>

        <div className="footer-section credits">
          <p className="developed-by">
            {t('footer.developedBy')} 
            <strong> GitHub Copilot</strong> 
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
