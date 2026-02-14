import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Manufacturer } from '../types';
import { 
  loadManufacturers, 
  addManufacturer, 
  updateManufacturer, 
  deleteManufacturer, 
  manufacturerExists,
  seedDefaultManufacturers,
  deleteAllManufacturers
} from '../utils/manufacturerManager';
import UPCScanner from './UPCScanner';
import './ManufacturerManager.css';

const ManufacturerManager = () => {
  const { t } = useLanguage();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null);
  const [formData, setFormData] = useState<Partial<Manufacturer>>({
    name: '',
    logoUrl: '',
    upc: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [showUPCScanner, setShowUPCScanner] = useState(false);
  const [logoSearchResults, setLogoSearchResults] = useState<Array<{url: string, source: string}>>([]);
  const [loadingLogoSearch, setLoadingLogoSearch] = useState(false);

  useEffect(() => {
    loadManufacturersData();
  }, []);

  const loadManufacturersData = async () => {
    setLoading(true);
    try {
      const manufacturersData = await loadManufacturers();
      setManufacturers(manufacturersData);
    } catch (error) {
      console.error('Error loading manufacturers:', error);
      // Don't show alert since loadManufacturers returns empty array on error
      setManufacturers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingManufacturer(null);
    setFormData({
      name: '',
      logoUrl: '',
      upc: ''
    });
    setLogoSearchResults([]);
    setShowForm(true);
  };

  const handleEdit = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer);
    setFormData({
      name: manufacturer.name,
      logoUrl: manufacturer.logoUrl || '',
      upc: manufacturer.upc || ''
    });
    setLogoSearchResults([]);
    setShowForm(true);
  };

  const handleDelete = async (manufacturer: Manufacturer) => {
    if (!manufacturer.id) return;
    
    if (window.confirm(t('admin.manufacturers.confirmDelete').replace('{{name}}', manufacturer.name))) {
      try {
        await deleteManufacturer(manufacturer.id);
        await loadManufacturersData();
        alert(t('admin.manufacturers.deleteSuccess'));
      } catch (error) {
        alert(t('admin.manufacturers.deleteError'));
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(t('admin.manufacturers.invalidFileType'));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('admin.manufacturers.fileTooLarge'));
      return;
    }

    setUploadingLogo(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setFormData(prev => ({ ...prev, logoUrl: base64 }));
        setUploadingLogo(false);
      };
      reader.onerror = () => {
        alert(t('admin.manufacturers.uploadError'));
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert(t('admin.manufacturers.uploadError'));
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
  };

  const handleUPCScan = (upc: string) => {
    setFormData(prev => ({ ...prev, upc }));
    setShowUPCScanner(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      alert(t('admin.manufacturers.nameRequired'));
      return;
    }

    // Check for duplicate names
    const exists = await manufacturerExists(formData.name, editingManufacturer?.id);
    if (exists) {
      alert(t('admin.manufacturers.nameExists'));
      return;
    }

    try {
      if (editingManufacturer?.id) {
        await updateManufacturer(editingManufacturer.id, formData);
        alert(t('admin.manufacturers.updateSuccess'));
      } else {
        await addManufacturer(formData as Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>);
        alert(t('admin.manufacturers.addSuccess'));
      }
      
      setShowForm(false);
      setEditingManufacturer(null);
      setFormData({ name: '', logoUrl: '', upc: '' });
      await loadManufacturersData();
    } catch (error) {
      alert(editingManufacturer ? t('admin.manufacturers.updateError') : t('admin.manufacturers.addError'));
    }
  };

  const handleSeedDefaults = async () => {
    if (window.confirm(t('admin.manufacturers.confirmSeed'))) {
      try {
        const addedCount = await seedDefaultManufacturers();
        await loadManufacturersData();
        
        if (addedCount === 0) {
          alert(t('admin.manufacturers.allExist') || 'All default manufacturers already exist or there was an error. Check console for details.');
        } else {
          alert(t('admin.manufacturers.seedSuccess').replace('{{count}}', addedCount.toString()));
        }
      } catch (error) {
        console.error('Seed defaults error:', error);
        alert(t('admin.manufacturers.seedError'));
      }
    }
  };

  const handleDeleteAll = async () => {
    if (manufacturers.length === 0) {
      alert(t('admin.manufacturers.noManufacturersToDelete') || 'No manufacturers to delete.');
      return;
    }

    const confirmMessage = t('admin.manufacturers.confirmDeleteAll', { count: manufacturers.length });
    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        const deletedCount = await deleteAllManufacturers();
        await loadManufacturersData();
        alert(t('admin.manufacturers.deleteAllSuccess', { count: deletedCount }));
      } catch (error) {
        console.error('Delete all error:', error);
        alert(t('admin.manufacturers.deleteAllError'));
      } finally {
        setLoading(false);
      }
    }
  };

  const testImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };

  const handleSearchLogos = async () => {
    if (!formData.name?.trim()) {
      alert(t('admin.manufacturers.logoSearchNameRequired') || 'Please enter a manufacturer name first.');
      return;
    }

    setLoadingLogoSearch(true);
    setLogoSearchResults([]);

    const manufacturerName = formData.name.trim();
    
    // Generate multiple URL patterns
    const generateUrls = (name: string) => {
      const normalized = name.toLowerCase();
      const withHyphens = normalized.replace(/\s+/g, '-');
      const withUnderscores = normalized.replace(/\s+/g, '_');
      const noSpaces = normalized.replace(/\s+/g, '');
      const firstWord = normalized.split(/\s+/)[0];

      const urls: Array<{url: string, source: string}> = [];

      // VectorLogoZone patterns
      urls.push({ url: `https://www.vectorlogo.zone/logos/${withHyphens}/${withHyphens}-ar21.svg`, source: 'VectorLogoZone' });
      urls.push({ url: `https://www.vectorlogo.zone/logos/${withUnderscores}/${withUnderscores}-ar21.svg`, source: 'VectorLogoZone' });
      urls.push({ url: `https://www.vectorlogo.zone/logos/${noSpaces}/${noSpaces}-ar21.svg`, source: 'VectorLogoZone' });
      urls.push({ url: `https://www.vectorlogo.zone/logos/${firstWord}/${firstWord}-ar21.svg`, source: 'VectorLogoZone' });
      
      // WorldVectorLogo patterns
      urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${withHyphens}.svg`, source: 'WorldVectorLogo' });
      urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${withHyphens}-logo.svg`, source: 'WorldVectorLogo' });
      urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${noSpaces}.svg`, source: 'WorldVectorLogo' });
      urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${firstWord}.svg`, source: 'WorldVectorLogo' });

      // Numbered variations (1-10) for VectorLogoZone
      for (let i = 1; i <= 10; i++) {
        urls.push({ url: `https://www.vectorlogo.zone/logos/${withHyphens}-${i}/${withHyphens}-${i}-ar21.svg`, source: 'VectorLogoZone' });
      }

      // Numbered variations (1-10) for WorldVectorLogo
      for (let i = 1; i <= 10; i++) {
        urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${withHyphens}-${i}.svg`, source: 'WorldVectorLogo' });
        urls.push({ url: `https://cdn.worldvectorlogo.com/logos/${withHyphens}-${i}-logo.svg`, source: 'WorldVectorLogo' });
      }

      return urls;
    };

    const urlsToTest = generateUrls(manufacturerName);
    
    try {
      // Test all URLs in parallel
      const results = await Promise.all(
        urlsToTest.map(async ({url, source}) => {
          const exists = await testImageUrl(url);
          return exists ? {url, source} : null;
        })
      );

      // Filter out nulls and remove duplicates
      const foundLogos = results.filter((r): r is {url: string, source: string} => r !== null);
      const uniqueLogos = foundLogos.filter((logo, index, self) => 
        index === self.findIndex(l => l.url === logo.url)
      );

      setLogoSearchResults(uniqueLogos);

      if (uniqueLogos.length === 0) {
        alert(t('admin.manufacturers.logoSearchNotFound') || `No logos found for "${manufacturerName}". Try adjusting the manufacturer name.`);
      }
    } catch (error) {
      console.error('Logo search error:', error);
      alert(t('admin.manufacturers.logoSearchError') || 'Error searching for logos. Please try again.');
    } finally {
      setLoadingLogoSearch(false);
    }
  };

  const handleUseLogoUrl = (url: string) => {
    setFormData({ ...formData, logoUrl: url });
    setLogoSearchResults([]);
    alert(t('admin.manufacturers.logoAdded') || 'Logo added successfully!');
  };

  const filteredManufacturers = manufacturers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.upc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-message">{t('collection.loading')}</div>;
  }

  return (
    <div className="manufacturer-manager">
      <div className="manager-header">
        <div className="header-actions">
          <input
            type="text"
            className="search-input"
            placeholder={t('admin.manufacturers.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {manufacturers.length === 0 && (
            <button onClick={handleSeedDefaults} className="btn-secondary">
              🌱 {t('admin.manufacturers.seedDefaults')}
            </button>
          )}
          <button onClick={handleDeleteAll} className="btn-danger" disabled={manufacturers.length === 0}>
            🗑️ {t('admin.manufacturers.deleteAll')}
          </button>
          <button onClick={handleAddNew} className="btn-primary">
            ➕ {t('admin.manufacturers.addNew')}
          </button>
        </div>
        {manufacturers.length > 0 && (
          <p className="manufacturer-count">
            {t('admin.manufacturers.totalManufacturers').replace('{{count}}', filteredManufacturers.length.toString())}
          </p>
        )}
      </div>

      {showForm && (
        <div className="manufacturer-form-overlay">
          <div className="manufacturer-form-container">
            <h3>{editingManufacturer ? t('admin.manufacturers.editManufacturer') : t('admin.manufacturers.addNew')}</h3>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-field">
                <label>{t('admin.manufacturers.manufacturerName')} *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Hot Wheels"
                  required
                  autoFocus
                />
              </div>

              {/* Logo Upload Field */}
              <div className="form-field">
                <label>{t('admin.manufacturers.logoUpload')}</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    id="logo-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="logo-upload" className="btn-upload">
                    📁 {uploadingLogo ? t('admin.manufacturers.uploading') : t('admin.manufacturers.browse')}
                  </label>
                  <span className="field-hint">{t('admin.manufacturers.logoHint')}</span>
                </div>
                {formData.logoUrl && (
                  <div className="logo-preview">
                    <img src={formData.logoUrl} alt="Logo preview" />
                    <button
                      type="button"
                      className="btn-remove-logo"
                      onClick={handleRemoveLogo}
                      title={t('admin.manufacturers.removeLogo')}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {/* Logo Search */}
                <div className="logo-search-container">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleSearchLogos}
                    disabled={loadingLogoSearch || !formData.name?.trim()}
                  >
                    {loadingLogoSearch ? '🔍 ' + (t('admin.manufacturers.logoSearching') || 'Searching...') : '🔍 ' + (t('admin.manufacturers.logoSearch') || 'Search Logo Databases')}
                  </button>
                  
                  {logoSearchResults.length > 0 && (
                    <div className="logo-search-results">
                      <div className="results-header">
                        <strong>{t('admin.manufacturers.logoSearchResults') || 'Found Logos:'} ({logoSearchResults.length})</strong>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setLogoSearchResults([])}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="results-grid">
                        {logoSearchResults.map((result, index) => (
                          <div key={index} className="logo-result-card">
                            <div className="logo-result-preview">
                              <img src={result.url} alt={`${formData.name} logo`} />
                            </div>
                            <div className="logo-result-info">
                              <span className="logo-source">{result.source}</span>
                              <button
                                type="button"
                                className="btn-primary btn-sm"
                                onClick={() => handleUseLogoUrl(result.url)}
                              >
                                ✅ {t('admin.manufacturers.logoUse') || 'Use This'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* UPC Field with Scanner */}
              <div className="form-field">
                <label>{t('admin.manufacturers.upc')}</label>
                <div className="input-with-scanner-btn">
                  <input
                    type="text"
                    value={formData.upc || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, upc: e.target.value }))}
                    placeholder="e.g., 887961707212"
                  />
                  <button
                    type="button"
                    className="btn-scanner-icon"
                    onClick={() => setShowUPCScanner(true)}
                    title={t('admin.manufacturers.scanUPC')}
                  >
                    📦 {t('admin.manufacturers.scan')}
                  </button>
                </div>
                <span className="field-hint">{t('admin.manufacturers.upcHint')}</span>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  {t('scanner.cancel')}
                </button>
                <button type="submit" className="btn-primary">
                  {editingManufacturer ? t('admin.manufacturers.update') : t('admin.manufacturers.add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUPCScanner && (
        <UPCScanner
          onBarcodeDetected={handleUPCScan}
          onCancel={() => setShowUPCScanner(false)}
        />
      )}

      {manufacturers.length === 0 && !showForm && (
        <div className="manufacturers-grid">
          <div className="empty-state">
            <p>{t('admin.manufacturers.noManufacturers')}</p>
            <div className="empty-actions">
              <button onClick={handleAddNew} className="btn-primary">
                ➕ {t('admin.manufacturers.addFirst')}
              </button>
              <button onClick={handleSeedDefaults} className="btn-primary">
                🌱 {t('admin.manufacturers.seedDefaults')}
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredManufacturers.length > 0 && (
        <div className="manufacturers-grid">
          {filteredManufacturers.map((manufacturer) => (
            <div key={manufacturer.id} className="manufacturer-card">
              <div className="manufacturer-header">
                <div className="manufacturer-info">
                  {manufacturer.logoUrl ? (
                    <img 
                      src={manufacturer.logoUrl} 
                      alt={manufacturer.name}
                      className="manufacturer-logo"
                    />
                  ) : (
                    <div className="manufacturer-logo-fallback">
                      {manufacturer.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4>{manufacturer.name}</h4>
                    {manufacturer.upc && (
                      <p className="manufacturer-upc">📦 {manufacturer.upc}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="manufacturer-actions">
                <button 
                  onClick={() => handleEdit(manufacturer)}
                  className="btn-edit"
                >
                  ✏️ {t('collection.actions.edit')}
                </button>
                <button 
                  onClick={() => handleDelete(manufacturer)}
                  className="btn-delete"
                >
                  🗑️ {t('collection.actions.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredManufacturers.length === 0 && manufacturers.length > 0 && (
        <div className="manufacturers-grid">
          <div className="empty-state">
            <p>{t('admin.manufacturers.noResults')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerManager;
