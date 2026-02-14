import { useLanguage } from '../contexts/LanguageContext';
import ReactCountryFlag from 'react-country-flag';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        title="English"
      >
        <ReactCountryFlag 
          countryCode="GB" 
          svg 
          style={{
            width: '1.5em',
            height: '1.5em',
          }}
        />
        <span className="lang-text">EN</span>
      </button>
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
        aria-label="Mudar para Português"
        title="Português"
      >
        <ReactCountryFlag 
          countryCode="PT" 
          svg 
          style={{
            width: '1.5em',
            height: '1.5em',
          }}
        />
        <span className="lang-text">PT</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
