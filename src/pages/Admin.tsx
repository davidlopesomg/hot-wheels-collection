import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import BrandManager from '../components/BrandManager';
import ManufacturerManager from '../components/ManufacturerManager';
import { parseCSV, validateCSVStructure, saveCollection } from '../utils/dataManager';
import { trackCSVImport } from '../utils/analytics';
import './Admin.css';

const Admin = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'brands' | 'manufacturers' | 'colors' | 'import'>('brands');
  const [importing, setImporting] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      // First validate the CSV structure
      const validation = await validateCSVStructure(file);
      
      if (!validation.valid) {
        const errorMessages = validation.errors.map(err => 
          err.row === 0 
            ? `${err.message}` 
            : `Row ${err.row}, Field "${err.field}": ${err.message}`
        ).join('\n');
        
        alert(`${t('collection.alerts.validationError') || 'Validation Error'}\n\n${errorMessages}`);
        setImporting(false);
        return;
      }
      
      // If valid, proceed with import
      const parsedCars = await parseCSV(file);
      await saveCollection(parsedCars);
      trackCSVImport(parsedCars.length);
      alert(t('collection.alerts.importSuccess', { count: parsedCars.length }) || `Successfully imported ${parsedCars.length} cars!`);
    } catch (error) {
      alert(t('collection.alerts.importError') || 'Error importing CSV file. Please check the format and try again.');
      console.error('CSV Import Error:', error);
    } finally {
      setImporting(false);
      // Reset the input so the same file can be uploaded again
      event.target.value = '';
    }
  };

  const downloadTemplate = () => {
    const headers = [
      'Marca / Brand',
      'Modelo / Model',
      'Código / Code',
      'Fabricante / Manufacturer',
      'Ano do Modelo / Model Year',
      'Cor Principal / Primary Color',
      'Cor(es) Segundária(s) / Secondary Color(s)',
      'Notas/Tema / Notes/Theme'
    ];

    const exampleRow = [
      'Porsche 911 GT3',
      '911 GT3 RS',
      'ABC12-X123',
      'Hot Wheels',
      '2023',
      'Red',
      'Black, White',
      '50th Anniversary Edition'
    ];

    const csvContent = [
      headers.join(','),
      exampleRow.join(','),
      // Add empty rows for user to fill in
      Array(5).fill('').map(() => headers.map(() => '').join(',')).join('\n')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'hot-wheels-collection-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <BrandManager />
          </div>
        )}

        {activeTab === 'manufacturers' && (
          <div className="admin-section">
            <h2>{t('admin.manufacturers.title')}</h2>
            <p className="section-description">{t('admin.manufacturers.description')}</p>
            <ManufacturerManager />
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
                  onChange={handleFileUpload}
                  disabled={importing}
                  style={{ display: 'none' }}
                />
                <label htmlFor="csv-upload" className={`btn-primary ${importing ? 'disabled' : ''}`}>
                  {importing ? (t('collection.loading') || 'Loading...') : t('admin.import.selectFile')}
                </label>
              </div>

              <div className="tool-card">
                <h3>📄 {t('admin.import.downloadTemplate')}</h3>
                <p>{t('admin.import.templateDescription')}</p>
                <button className="btn-secondary" onClick={downloadTemplate}>
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
