import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Brand } from '../types';
import { loadBrands, addBrand, updateBrand, deleteBrand, brandExists, seedDefaultBrands, deleteAllBrands } from '../utils/brandManager';
import { getAvailableCarIcons, getIconSlug, getIconData } from '../utils/iconHelper';
import './BrandManager.css';

// BrandIcon component - renders simple-icon SVG
interface BrandIconProps {
  iconSlug?: string;
  logoUrl?: string;
  brandName?: string;
  size?: number;
}

const BrandIcon = ({ iconSlug, logoUrl, brandName, size = 48 }: BrandIconProps) => {
  if (iconSlug) {
    const iconData = getIconData(iconSlug);
    if (iconData) {
      return (
        <div 
          className="brand-icon" 
          style={{ width: size, height: size }}
          dangerouslySetInnerHTML={{
            __html: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <title>${iconData.title}</title>
              <path d="${iconData.path}"/>
            </svg>`
          }}
        />
      );
    }
  }
  
  if (logoUrl) {
    return <img src={logoUrl} alt={brandName || 'Brand'} className="brand-logo" style={{ width: size, height: size }} />;
  }
  
  // Fallback: first letter
  return (
    <div className="brand-icon-fallback" style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {brandName?.charAt(0) || '?'}
    </div>
  );
};

const BrandManager = () => {
  const { t } = useLanguage();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    iconSlug: '',
    logoUrl: '',
    countryCode: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [availableIcons] = useState(getAvailableCarIcons());
  const [logoSearchResults, setLogoSearchResults] = useState<Array<{url: string, source: string}>>([]);
  const [loadingLogoSearch, setLoadingLogoSearch] = useState(false);

  useEffect(() => {
    loadBrandsData();
  }, []);

  const loadBrandsData = async () => {
    setLoading(true);
    try {
      const brandsData = await loadBrands();
      setBrands(brandsData);
    } catch (error) {
      alert(t('admin.brands.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDefaults = async () => {
    if (window.confirm(t('admin.brands.confirmSeed'))) {
      try {
        const addedCount = await seedDefaultBrands();
        await loadBrandsData();
        
        if (addedCount === 0) {
          alert(t('admin.brands.allExist') || 'All default brands already exist or there was an error. Check console for details.');
        } else {
          alert(t('admin.brands.seedSuccess').replace('{{count}}', addedCount.toString()));
        }
      } catch (error) {
        console.error('Seed defaults error:', error);
        alert(t('admin.brands.seedError'));
      }
    }
  };

  const handleDeleteAll = async () => {
    if (brands.length === 0) {
      alert(t('admin.brands.noBrandsToDelete') || 'No brands to delete.');
      return;
    }

    const confirmMessage = t('admin.brands.confirmDeleteAll', { count: brands.length });
    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        const deletedCount = await deleteAllBrands();
        await loadBrandsData();
        alert(t('admin.brands.deleteAllSuccess', { count: deletedCount }));
      } catch (error) {
        console.error('Delete all error:', error);
        alert(t('admin.brands.deleteAllError'));
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
      alert(t('admin.brands.logoSearchNameRequired') || 'Please enter a brand name first.');
      return;
    }

    setLoadingLogoSearch(true);
    setLogoSearchResults([]);

    const brandName = formData.name.trim();
    
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

    const urlsToTest = generateUrls(brandName);
    
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
        alert(t('admin.brands.logoSearchNotFound') || `No logos found for "${brandName}". Try adjusting the brand name.`);
      }
    } catch (error) {
      console.error('Logo search error:', error);
      alert(t('admin.brands.logoSearchError') || 'Error searching for logos. Please try again.');
    } finally {
      setLoadingLogoSearch(false);
    }
  };

  const handleUseLogoUrl = (url: string) => {
    setFormData({ ...formData, logoUrl: url });
    setLogoSearchResults([]);
    alert(t('admin.brands.logoAdded') || 'Logo added successfully!');
  };

  const handleAddNew = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      iconSlug: '',
      logoUrl: '',
      countryCode: '',
      description: ''
    });
    setLogoSearchResults([]);
    setShowForm(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      iconSlug: brand.iconSlug || '',
      logoUrl: brand.logoUrl || '',
      countryCode: brand.countryCode || '',
      description: brand.description || ''
    });
    setLogoSearchResults([]);
    setShowForm(true);
  };

  const handleDelete = async (brand: Brand) => {
    if (!brand.id) return;
    
    const confirmMessage = t('admin.brands.confirmDelete', { name: brand.name });
    if (!window.confirm(confirmMessage)) return;

    try {
      setLoading(true);
      await deleteBrand(brand.id);
      await loadBrandsData();
      alert(t('admin.brands.deleteSuccess'));
    } catch (error) {
      alert(t('admin.brands.deleteError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
      alert(t('admin.brands.nameRequired'));
      return;
    }

    try {
      setLoading(true);

      // Check if brand name already exists
      const exists = await brandExists(formData.name, editingBrand?.id);
      if (exists) {
        alert(t('admin.brands.nameExists'));
        setLoading(false);
        return;
      }

      if (editingBrand && editingBrand.id) {
        // Update existing brand
        await updateBrand(editingBrand.id, formData);
        alert(t('admin.brands.updateSuccess'));
      } else {
        // Add new brand
        await addBrand(formData as Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>);
        alert(t('admin.brands.addSuccess'));
      }

      await loadBrandsData();
      setShowForm(false);
      setEditingBrand(null);
      setFormData({
        name: '',
        iconSlug: '',
        logoUrl: '',
        countryCode: '',
        description: ''
      });
    } catch (error) {
      alert(editingBrand ? t('admin.brands.updateError') : t('admin.brands.addError'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      iconSlug: '',
      logoUrl: '',
      countryCode: '',
      description: ''
    });
    setLogoSearchResults([]);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && brands.length === 0) {
    return <div className="loading-message">{t('collection.loading')}</div>;
  }

  return (
    <div className="brand-manager">
      <div className="manager-header">
        <div className="header-actions">
          <input
            type="text"
            placeholder={t('admin.brands.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-secondary" onClick={handleSeedDefaults}>
            🌱 {t('admin.brands.seedDefaults')}
          </button>
          <button className="btn-danger" onClick={handleDeleteAll} disabled={brands.length === 0}>
            🗑️ {t('admin.brands.deleteAll')}
          </button>
          <button className="btn-primary" onClick={handleAddNew}>
            ➕ {t('admin.brands.addNew')}
          </button>
        </div>
        <p className="brand-count">
          {t('admin.brands.totalBrands', { count: brands.length })}
        </p>
      </div>

      {showForm && (
        <div className="brand-form-overlay">
          <div className="brand-form-container">
            <h3>{editingBrand ? t('admin.brands.editBrand') : t('admin.brands.addNew')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>{t('admin.brands.brandName')} *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setFormData({ ...formData, name: newName });
                    // Auto-suggest icon slug
                    if (!editingBrand && newName && !formData.iconSlug) {
                      const suggestedSlug = getIconSlug(newName);
                      if (suggestedSlug) {
                        setFormData(prev => ({ ...prev, iconSlug: suggestedSlug }));
                      }
                    }
                  }}
                  placeholder={t('admin.brands.brandNamePlaceholder')}
                  required
                  autoFocus
                />
              </div>

              <div className="form-field">
                <label>{t('admin.brands.iconSelect')}</label>
                <select
                  value={formData.iconSlug}
                  onChange={(e) => setFormData({ ...formData, iconSlug: e.target.value })}
                >
                  <option value="">{t('admin.brands.noIcon')}</option>
                  {availableIcons.map(icon => (
                    <option key={icon.slug} value={icon.slug}>
                      {icon.name}
                    </option>
                  ))}
                </select>
                {formData.iconSlug && (
                  <div className="icon-preview">
                    <BrandIcon iconSlug={formData.iconSlug} size={32} />
                    <span>{formData.iconSlug}</span>
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>{t('admin.brands.logoUrl')}</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder={t('admin.brands.logoUrlPlaceholder')}
                />
                <small className="field-hint">{t('admin.brands.logoUrlHint')}</small>
                
                {/* Logo Search */}
                <div className="logo-search-container">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleSearchLogos}
                    disabled={loadingLogoSearch || !formData.name?.trim()}
                  >
                    {loadingLogoSearch ? '🔍 ' + (t('admin.brands.logoSearching') || 'Searching...') : '🔍 ' + (t('admin.brands.logoSearch') || 'Search Logo Databases')}
                  </button>
                  
                  {logoSearchResults.length > 0 && (
                    <div className="logo-search-results">
                      <div className="results-header">
                        <strong>{t('admin.brands.logoSearchResults') || 'Found Logos:'} ({logoSearchResults.length})</strong>
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
                                ✅ {t('admin.brands.logoUse') || 'Use This'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>{t('admin.brands.countryCode')}</label>
                <input
                  type="text"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.toUpperCase() })}
                  placeholder={t('admin.brands.countryCodePlaceholder')}
                  maxLength={2}
                />
              </div>

              <div className="form-field">
                <label>{t('admin.brands.brandDescription')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t('admin.brands.descriptionPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  {t('scanner.cancel')}
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {editingBrand ? t('admin.brands.update') : t('admin.brands.add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="brands-grid">
        {filteredBrands.length === 0 ? (
          <div className="empty-state">
            <p>{searchTerm ? t('admin.brands.noResults') : t('admin.brands.noBrands')}</p>
            {!searchTerm && (
              <div className="empty-state-actions">
                <button className="btn-secondary" onClick={handleSeedDefaults}>
                  🌱 {t('admin.brands.seedDefaults')}
                </button>
                <button className="btn-primary" onClick={handleAddNew}>
                  ➕ {t('admin.brands.addFirst')}
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredBrands.map(brand => (
            <div key={brand.id} className="brand-card">
              <div className="brand-header">
                <div className="brand-info">
                  <BrandIcon 
                    iconSlug={brand.iconSlug}
                    logoUrl={brand.logoUrl}
                    brandName={brand.name}
                    size={48}
                  />
                  <div>
                    <h4>{brand.name}</h4>
                    {brand.countryCode && (
                      <span className="country-flag">🌍 {brand.countryCode}</span>
                    )}
                  </div>
                </div>
              </div>
              
              {brand.description && (
                <p className="brand-description">{brand.description}</p>
              )}
              
              <div className="brand-actions">
                <button className="btn-edit" onClick={() => handleEdit(brand)}>
                  ✏️ {t('collection.actions.edit')}
                </button>
                <button className="btn-delete" onClick={() => handleDelete(brand)}>
                  🗑️ {t('collection.actions.delete')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrandManager;
