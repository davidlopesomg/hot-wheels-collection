import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
        aria-label="Mudar para Português"
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;
