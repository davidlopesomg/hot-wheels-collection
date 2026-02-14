import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <img 
            src="/assets/img/hot-wheels-logo.svg" 
            alt="Hot Wheels" 
            className="nav-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const text = e.currentTarget.nextElementSibling;
              if (text) (text as HTMLElement).style.display = 'block';
            }}
          />
          <span className="nav-brand-text">Hot Wheels Collection</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/collection" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">🚗</span>
            <span>Coleção</span>
          </NavLink>
          <NavLink to="/scanner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">📷</span>
            <span>Scanner</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
