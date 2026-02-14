import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, sortCars, filterCars, parseCSV, validateCSVStructure, saveCollection, addCar, updateCar, deleteCar, deleteCarsInBulk } from '../utils/dataManager';
import { trackCSVImport } from '../utils/analytics';
import { HotWheelsCar } from '../types';
import AddCarForm from '../components/AddCarForm';
import EditCarForm from '../components/EditCarForm';
import './Collection.css';

const Collection = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState<HotWheelsCar[]>([]);
  const [filteredCars, setFilteredCars] = useState<HotWheelsCar[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof HotWheelsCar>('marca');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [carToEdit, setCarToEdit] = useState<HotWheelsCar | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedCars = await loadCollection();
        setCars(loadedCars);
        setFilteredCars(loadedCars);
      } catch (error) {
        console.error('Error loading collection:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
      setLoading(true);
      try {
        // First validate the CSV structure
        const validation = await validateCSVStructure(file);
        
        if (!validation.valid) {
          const errorMessages = validation.errors.map(err => 
            err.row === 0 
              ? `${err.message}` 
              : `Row ${err.row}, Field "${err.field}": ${err.message}`
          ).join('\n');
          
          alert(`${t('collection.alerts.validationError')}\n\n${errorMessages}`);
          setLoading(false);
          return;
        }
        
        // If valid, proceed with import
        const parsedCars = await parseCSV(file);
        await saveCollection(parsedCars);
        setCars(parsedCars);
        trackCSVImport(parsedCars.length);
        alert(t('collection.alerts.importSuccess', { count: parsedCars.length }));
      } catch (error) {
        alert(t('collection.alerts.importError'));
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedCarIds.length === filteredCars.length) {
      setSelectedCarIds([]);
    } else {
      setSelectedCarIds(filteredCars.map(car => car.id || '').filter(id => id));
    }
  };

  const handleSelectCar = (carId: string) => {
    if (selectedCarIds.includes(carId)) {
      setSelectedCarIds(selectedCarIds.filter(id => id !== carId));
    } else {
      setSelectedCarIds([...selectedCarIds, carId]);
    }
  };

  const handleAddCar = async (car: HotWheelsCar) => {
    try {
      setLoading(true);
      await addCar(car);
      const updatedCars = await loadCollection();
      setCars(updatedCars);
      setShowAddForm(false);
      alert(t('collection.add.success'));
    } catch (error) {
      console.error('Error adding car:', error);
      alert(t('collection.add.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (car: HotWheelsCar) => {
    setCarToEdit(car);
    setShowEditForm(true);
  };

  const handleEditCar = async (updatedCar: HotWheelsCar) => {
    if (!updatedCar.id) return;
    
    try {
      setLoading(true);
      await updateCar(updatedCar.id, updatedCar);
      const updatedCars = await loadCollection();
      setCars(updatedCars);
      setShowEditForm(false);
      setCarToEdit(null);
      alert(t('collection.edit.success'));
    } catch (error) {
      console.error('Error updating car:', error);
      alert(t('collection.edit.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    // Find the car to show details in confirmation
    const carToDelete = cars.find(car => car.id === carId);
    if (!carToDelete) return;
    
    const confirmMessage = `Delete your ${carToDelete.corPrincipal} ${carToDelete.anoModelo} ${carToDelete.marca} ${carToDelete.modelo}?`;
    if (!confirm(confirmMessage)) return;
    
    try {
      setLoading(true);
      await deleteCar(carId);
      const updatedCars = await loadCollection();
      setCars(updatedCars);
      alert(t('collection.delete.success'));
    } catch (error) {
      console.error('Error deleting car:', error);
      alert(t('collection.delete.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCarIds.length === 0) return;
    
    const confirmMessage = 'Are you sure you want to delete all these cars?';
    if (!confirm(confirmMessage)) return;
    
    try {
      setLoading(true);
      await deleteCarsInBulk(selectedCarIds);
      const updatedCars = await loadCollection();
      setCars(updatedCars);
      setSelectedCarIds([]);
      alert(t('collection.bulkDelete.success', { count: selectedCarIds.length }));
    } catch (error) {
      console.error('Error deleting cars:', error);
      alert(t('collection.bulkDelete.error'));
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <button 
            className="add-car-btn"
            onClick={() => setShowAddForm(true)}
            disabled={loading}
          >
            ➕ {t('collection.addCar')}
          </button>
          <label className={`file-upload-btn ${loading ? 'disabled' : ''}`}>
            {loading ? t('collection.loading') || 'Loading...' : t('collection.importCSV')}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={loading}
            />
          </label>
          {selectedCarIds.length > 0 && (
            <button 
              className="bulk-delete-btn"
              onClick={handleBulkDelete}
              disabled={loading}
            >
              🗑️ {t('collection.deleteSelected')} ({selectedCarIds.length})
            </button>
          )}
        </div>
      </header>

      <div className="table-container">
        <p className="results-count">
          {t('collection.resultsCount', { filtered: filteredCars.length, total: cars.length })}
        </p>

        <table className="cars-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedCarIds.length === filteredCars.length && filteredCars.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
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
              <th className="actions-col">{t('collection.headers.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id} className={selectedCarIds.includes(car.id || '') ? 'selected' : ''}>
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedCarIds.includes(car.id || '')}
                    onChange={() => handleSelectCar(car.id || '')}
                  />
                </td>
                <td>{car.marca}</td>
                <td>{car.modelo}</td>
                <td>{car.anoModelo}</td>
                <td>{car.corPrincipal}</td>
                <td>{car.coresSecundarias}</td>
                <td>{car.codigo}</td>
                <td>{car.fabricante}</td>
                <td>{car.notasTema}</td>
                <td className="actions-col">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEditClick(car)}
                    title={t('collection.actions.edit')}
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteCar(car.id || '')}
                    title={t('collection.actions.delete')}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCars.length === 0 && (
          <div className="empty-state">
            <p>{t('collection.empty.noResults')}</p>
            {cars.length === 0 && (
              <p>{t('collection.empty.noData')}</p>
            )}
          </div>
        )}
      </div>

      {showAddForm && (
        <AddCarForm
          onSave={handleAddCar}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && carToEdit && (
        <EditCarForm
          car={carToEdit}
          onSave={handleEditCar}
          onCancel={() => {
            setShowEditForm(false);
            setCarToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default Collection;
