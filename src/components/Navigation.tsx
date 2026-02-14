import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navigation.css';

const Navigation = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <img 
            src="/assets/img/hot-wheels-text-logo.svg" 
            alt="Hot Wheels" 
            className="nav-logo"
            onError={(e) => {
              console.error('Logo failed to load from:', e.currentTarget.src);
              e.currentTarget.style.display = 'none';
              const text = e.currentTarget.nextElementSibling;
              if (text) (text as HTMLElement).style.display = 'block';
            }}
          />
          <span className="nav-brand-text">{t('nav.brand')}</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">📊</span>
            <span>{t('nav.dashboard')}</span>
          </NavLink>
          <NavLink to="/collection" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">🚗</span>
            <span>{t('nav.collection')}</span>
          </NavLink>
          <NavLink to="/scanner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">📷</span>
            <span>{t('nav.scanner')}</span>
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">⚙️</span>
            <span>{t('nav.admin')}</span>
          </NavLink>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navigation;
