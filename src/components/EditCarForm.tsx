import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HotWheelsCar } from '../types';
import { getUniqueBrands } from '../utils/dataManager';
import { MANUFACTURERS, COLORS, getColorName, generateYearOptions } from '../constants/formOptions';
import './AddCarForm.css';

interface EditCarFormProps {
  car: HotWheelsCar;
  onSave: (car: HotWheelsCar) => void;
  onCancel: () => void;
}

const EditCarForm = ({ car, onSave, onCancel }: EditCarFormProps) => {
  const { t, language } = useLanguage();
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false);
  const [isAddingCustomColor, setIsAddingCustomColor] = useState(false);
  const [isAddingCustomSecondaryColor, setIsAddingCustomSecondaryColor] = useState(false);
  const yearOptions = generateYearOptions();
  
  const [formData, setFormData] = useState<HotWheelsCar>(car);

  useEffect(() => {
    loadBrands();
    // Check if current values are custom (not in predefined lists)
    if (car.marca && !availableBrands.includes(car.marca)) {
      setIsAddingNewBrand(true);
    }
    if (car.corPrincipal && !COLORS.includes(car.corPrincipal as any)) {
      setIsAddingCustomColor(true);
    }
    if (car.coresSecundarias && !COLORS.includes(car.coresSecundarias as any)) {
      setIsAddingCustomSecondaryColor(true);
    }
  }, []);

  const loadBrands = async () => {
    const brands = await getUniqueBrands();
    setAvailableBrands(brands);
  };

  const handleBrandChange = (value: string) => {
    if (value === '__add_new__') {
      setIsAddingNewBrand(true);
      handleChange('marca', '');
    } else {
      setIsAddingNewBrand(false);
      handleChange('marca', value);
    }
  };

  const handleColorChange = (value: string, field: 'corPrincipal' | 'coresSecundarias') => {
    if (value === '__custom__') {
      if (field === 'corPrincipal') {
        setIsAddingCustomColor(true);
      } else {
        setIsAddingCustomSecondaryColor(true);
      }
      handleChange(field, '');
    } else {
      if (field === 'corPrincipal') {
        setIsAddingCustomColor(false);
      } else {
        setIsAddingCustomSecondaryColor(false);
      }
      handleChange(field, value);
    }
  };

  const handleChange = (field: keyof HotWheelsCar, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="add-car-overlay">
      <div className="add-car-form">
        <div className="form-header">
          <h2>{t('collection.edit.title')}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Brand Field */}
            <div className="form-field">
              <label>{t('collection.headers.brand')} *</label>
              {!isAddingNewBrand ? (
                <select
                  value={formData.marca}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  required
                >
                  <option value="">{t('scanner.addCar.selectBrand')}</option>
                  {availableBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                  <option value="__add_new__">➕ {t('scanner.addCar.addNewBrand')}</option>
                </select>
              ) : (
                <div className="input-with-button">
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    placeholder={t('scanner.addCar.placeholders.brand')}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn-back"
                    onClick={() => {
                      setIsAddingNewBrand(false);
                      handleChange('marca', '');
                    }}
                  >
                    ← {t('scanner.addCar.backToList')}
                  </button>
                </div>
              )}
            </div>

            {/* Model Field */}
            <div className="form-field">
              <label>{t('collection.headers.model')} *</label>
              <input
                type="text"
                value={formData.modelo}
                onChange={(e) => handleChange('modelo', e.target.value)}
                placeholder={t('scanner.addCar.placeholders.model')}
                required
              />
            </div>

            {/* Year Field */}
            <div className="form-field">
              <label>{t('collection.headers.year')}</label>
              <select
                value={formData.anoModelo}
                onChange={(e) => handleChange('anoModelo', e.target.value)}
              >
                <option value="">{t('scanner.addCar.selectYear')}</option>
                {yearOptions.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>

            {/* Primary Color Field */}
            <div className="form-field">
              <label>{t('collection.headers.primaryColor')} *</label>
              {!isAddingCustomColor ? (
                <select
                  value={formData.corPrincipal}
                  onChange={(e) => handleColorChange(e.target.value, 'corPrincipal')}
                  required
                >
                  <option value="">{t('scanner.addCar.selectColor')}</option>
                  {COLORS.map(color => (
                    <option key={color} value={color}>
                      {getColorName(color, language)}
                    </option>
                  ))}
                  <option value="__custom__">➕ {t('scanner.addCar.customColor')}</option>
                </select>
              ) : (
                <div className="input-with-button">
                  <input
                    type="text"
                    value={formData.corPrincipal}
                    onChange={(e) => handleChange('corPrincipal', e.target.value)}
                    placeholder={t('scanner.addCar.placeholders.primaryColor')}
                    required
                  />
                  <button
                    type="button"
                    className="btn-back"
                    onClick={() => {
                      setIsAddingCustomColor(false);
                      handleChange('corPrincipal', '');
                    }}
                  >
                    ← {t('scanner.addCar.backToList')}
                  </button>
                </div>
              )}
            </div>

            {/* Secondary Colors Field */}
            <div className="form-field">
              <label>{t('collection.headers.secondaryColors')}</label>
              {!isAddingCustomSecondaryColor ? (
                <select
                  value={formData.coresSecundarias}
                  onChange={(e) => handleColorChange(e.target.value, 'coresSecundarias')}
                >
                  <option value="">{t('scanner.addCar.selectColor')}</option>
                  {COLORS.map(color => (
                    <option key={color} value={color}>
                      {getColorName(color, language)}
                    </option>
                  ))}
                  <option value="__custom__">➕ {t('scanner.addCar.customColor')}</option>
                </select>
              ) : (
                <div className="input-with-button">
                  <input
                    type="text"
                    value={formData.coresSecundarias}
                    onChange={(e) => handleChange('coresSecundarias', e.target.value)}
                    placeholder={t('scanner.addCar.placeholders.secondaryColors')}
                  />
                  <button
                    type="button"
                    className="btn-back"
                    onClick={() => {
                      setIsAddingCustomSecondaryColor(false);
                      handleChange('coresSecundarias', '');
                    }}
                  >
                    ← {t('scanner.addCar.backToList')}
                  </button>
                </div>
              )}
            </div>

            {/* Code Field */}
            <div className="form-field">
              <label>{t('collection.headers.code')} *</label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => handleChange('codigo', e.target.value)}
                placeholder={t('scanner.addCar.placeholders.code')}
                required
              />
            </div>

            {/* Manufacturer Field */}
            <div className="form-field">
              <label>{t('collection.headers.manufacturer')}</label>
              <select
                value={formData.fabricante}
                onChange={(e) => handleChange('fabricante', e.target.value)}
              >
                {MANUFACTURERS.map(manufacturer => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>

            {/* Notes/Theme Field */}
            <div className="form-field full-width">
              <label>{t('collection.headers.notesTheme')}</label>
              <textarea
                value={formData.notasTema}
                onChange={(e) => handleChange('notasTema', e.target.value)}
                placeholder={t('scanner.addCar.placeholders.notes')}
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              {t('scanner.cancel')}
            </button>
            <button type="submit" className="btn-primary">
              {t('collection.edit.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarForm;
