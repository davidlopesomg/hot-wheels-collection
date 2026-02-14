import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Admin.css';

const Admin = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'brands' | 'manufacturers' | 'colors' | 'import'>('brands');

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>🔧 {t('admin.title')}</h1>
        <p className="subtitle">{t('admin.subtitle')}</p>
      </header>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'brands' ? 'active' : ''}`}
          onClick={() => setActiveTab('brands')}
        >
          🏷️ {t('admin.tabs.brands')}
        </button>
        <button 
          className={`admin-tab ${activeTab === 'manufacturers' ? 'active' : ''}`}
          onClick={() => setActiveTab('manufacturers')}
        >
          🏭 {t('admin.tabs.manufacturers')}
        </button>
        <button 
          className={`admin-tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          🎨 {t('admin.tabs.colors')}
        </button>
        <button 
          className={`admin-tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          📥 {t('admin.tabs.import')}
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'brands' && (
          <div className="admin-section">
            <h2>{t('admin.brands.title')}</h2>
            <p className="section-description">{t('admin.brands.description')}</p>
            <div className="coming-soon">
              <h3>🚧 {t('admin.comingSoon')}</h3>
              <p>{t('admin.brands.comingSoonDetails')}</p>
            </div>
          </div>
        )}

        {activeTab === 'manufacturers' && (
          <div className="admin-section">
            <h2>{t('admin.manufacturers.title')}</h2>
            <p className="section-description">{t('admin.manufacturers.description')}</p>
            <div className="coming-soon">
              <h3>🚧 {t('admin.comingSoon')}</h3>
              <p>{t('admin.manufacturers.comingSoonDetails')}</p>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="admin-section">
            <h2>{t('admin.colors.title')}</h2>
            <p className="section-description">{t('admin.colors.description')}</p>
            <div className="coming-soon">
              <h3>🚧 {t('admin.comingSoon')}</h3>
              <p>{t('admin.colors.comingSoonDetails')}</p>
            </div>
          </div>
        )}

        {activeTab === 'import' && (
          <div className="admin-section">
            <h2>{t('admin.import.title')}</h2>
            <p className="section-description">{t('admin.import.description')}</p>
            
            <div className="import-tools">
              <div className="tool-card">
                <h3>📥 {t('admin.import.uploadCSV')}</h3>
                <p>{t('admin.import.uploadDescription')}</p>
                <input
                  type="file"
                  accept=".csv"
                  id="csv-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="csv-upload" className="btn-primary">
                  {t('admin.import.selectFile')}
                </label>
              </div>

              <div className="tool-card">
                <h3>📄 {t('admin.import.downloadTemplate')}</h3>
                <p>{t('admin.import.templateDescription')}</p>
                <button className="btn-secondary">
                  {t('admin.import.downloadButton')}
                </button>
              </div>

              <div className="tool-card full-width">
                <h3>ℹ️ {t('admin.import.requiredColumns')}</h3>
                <p className="info-text">{t('admin.import.bilingualSupport')}</p>
                <ul className="column-list">
                  <li><strong>Marca / Brand</strong> - {t('admin.import.brandColumn')}</li>
                  <li><strong>Modelo / Model</strong> - {t('admin.import.modelColumn')}</li>
                  <li><strong>Código / Code</strong> - {t('admin.import.codeColumn')}</li>
                  <li><strong>Fabricante / Manufacturer</strong> - {t('admin.import.manufacturerColumn')}</li>
                  <li><strong>Ano do Modelo / Model Year</strong> - {t('admin.import.yearColumn')}</li>
                  <li><strong>Cor Principal / Primary Color</strong> - {t('admin.import.primaryColorColumn')}</li>
                  <li><strong>Cor(es) Segundária(s) / Secondary Color(s)</strong> - {t('admin.import.secondaryColorsColumn')}</li>
                  <li><strong>Notas/Tema / Notes/Theme</strong> - {t('admin.import.notesColumn')}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
