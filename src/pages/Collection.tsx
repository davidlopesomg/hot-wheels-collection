import { useEffect, useState } from 'react';
import { loadCollection, sortCars, filterCars, parseCSV, saveCollection } from '../utils/dataManager';
import { HotWheelsCar } from '../types';
import './Collection.css';

const Collection = () => {
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
        alert(`${parsedCars.length} carros carregados com sucesso!`);
      } catch (error) {
        alert('Erro ao carregar o arquivo CSV');
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
        <h1>Coleção Completa</h1>
        <div className="collection-tools">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label className="file-upload-btn">
            Importar CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <p className="result-count">{filteredCars.length} de {cars.length} carros</p>
      </header>

      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('marca')}>
                Marca {getSortIcon('marca')}
              </th>
              <th onClick={() => handleSort('modelo')}>
                Modelo {getSortIcon('modelo')}
              </th>
              <th onClick={() => handleSort('anoModelo')}>
                Ano {getSortIcon('anoModelo')}
              </th>
              <th onClick={() => handleSort('corPrincipal')}>
                Cor Principal {getSortIcon('corPrincipal')}
              </th>
              <th onClick={() => handleSort('coresSecundarias')}>
                Cores Secundárias {getSortIcon('coresSecundarias')}
              </th>
              <th onClick={() => handleSort('codigo')}>
                Código {getSortIcon('codigo')}
              </th>
              <th onClick={() => handleSort('fabricante')}>
                Fabricante {getSortIcon('fabricante')}
              </th>
              <th onClick={() => handleSort('notasTema')}>
                Notas/Tema {getSortIcon('notasTema')}
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
          <p>Nenhum carro encontrado.</p>
          {cars.length === 0 && (
            <p>Carregue um arquivo CSV para começar!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
