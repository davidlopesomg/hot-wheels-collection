import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, sortCars, filterCars, parseCSV, saveCollection } from '../utils/dataManager';
import { HotWheelsCar } from '../types';
import './Collection.css';

const Collection = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState<HotWheelsCar[]>([]);
  const [filteredCars, setFilteredCars] = useState<HotWheelsCar[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof HotWheelsCar>('marca');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const loadedCars = loadCollection();
    setCars(loadedCars);
    setFilteredCars(loadedCars);
  }, []);

  useEffect(() => {
    let result = filterCars(cars, searchTerm);
    result = sortCars(result, sortField, sortDirection);
    setFilteredCars(result);
  }, [cars, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof HotWheelsCar) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedCars = await parseCSV(file);
        setCars(parsedCars);
        saveCollection(parsedCars);
        alert(t('collection.alerts.importSuccess', { count: parsedCars.length }));
      } catch (error) {
        alert(t('collection.alerts.importError'));
        console.error(error);
      }
    }
  };

  const getSortIcon = (field: keyof HotWheelsCar) => {
    if (sortField !== field) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="collection">
      <header className="collection-header">
        <h1>{t('collection.title')}</h1>
        <div className="collection-tools">
          <input
            type="text"
            placeholder={t('collection.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label className="file-upload-btn">
            {t('collection.importCSV')}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <p className="result-count">
          {t('collection.resultsCount', { filtered: filteredCars.length, total: cars.length })}
        </p>
      </header>

      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('marca')}>
                {t('collection.headers.brand')} {getSortIcon('marca')}
              </th>
              <th onClick={() => handleSort('modelo')}>
                {t('collection.headers.model')} {getSortIcon('modelo')}
              </th>
              <th onClick={() => handleSort('anoModelo')}>
                {t('collection.headers.year')} {getSortIcon('anoModelo')}
              </th>
              <th onClick={() => handleSort('corPrincipal')}>
                {t('collection.headers.primaryColor')} {getSortIcon('corPrincipal')}
              </th>
              <th onClick={() => handleSort('coresSecundarias')}>
                {t('collection.headers.secondaryColors')} {getSortIcon('coresSecundarias')}
              </th>
              <th onClick={() => handleSort('codigo')}>
                {t('collection.headers.code')} {getSortIcon('codigo')}
              </th>
              <th onClick={() => handleSort('fabricante')}>
                {t('collection.headers.manufacturer')} {getSortIcon('fabricante')}
              </th>
              <th onClick={() => handleSort('notasTema')}>
                {t('collection.headers.notesTheme')} {getSortIcon('notasTema')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car, index) => (
              <tr key={index}>
                <td>{car.marca}</td>
                <td>{car.modelo}</td>
                <td>{car.anoModelo}</td>
                <td>{car.corPrincipal}</td>
                <td>{car.coresSecundarias}</td>
                <td>{car.codigo}</td>
                <td>{car.fabricante}</td>
                <td>{car.notasTema}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCars.length === 0 && (
        <div className="empty-state">
          <p>{t('collection.empty.noResults')}</p>
          {cars.length === 0 && (
            <p>{t('collection.empty.noData')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
