import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(t('login.errors.required'));
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/admin'); // Redirect to admin page after successful login
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide user-friendly error messages
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError(t('login.errors.invalidCredentials'));
      } else if (err.code === 'auth/user-not-found') {
        setError(t('login.errors.userNotFound'));
      } else if (err.code === 'auth/invalid-email') {
        setError(t('login.errors.invalidEmail'));
      } else if (err.code === 'auth/too-many-requests') {
        setError(t('login.errors.tooManyRequests'));
      } else {
        setError(t('login.errors.generic'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🔐 Admin Login</h1>
        <p className="login-subtitle">
          {t('login.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              {t('login.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              {t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {t('login.signingIn')}
              </>
            ) : (
              t('login.signIn')
            )}
          </button>
        </form>

        <div className="login-guest-notice">
          <p>
            <strong>{t('login.guestNotice')}</strong> {' '}
            {t('login.guestMessage')}
          </p>
          <button 
            className="btn-back-home"
            onClick={() => navigate('/')}
          >
            {t('login.backToCollection')}
          </button>
        </div>
      </div>
    </div>
  );
}
