import Papa from 'papaparse';
import { HotWheelsCar, CollectionStats } from '../types';

const STORAGE_KEY = 'hotwheels_collection';

export const parseCSV = (file: File): Promise<HotWheelsCar[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cars: HotWheelsCar[] = results.data.map((row: any) => ({
          marca: row['Marca'] || '',
          modelo: row['Modelo'] || '',
          anoModelo: row['Ano do Modelo'] || '',
          corPrincipal: row['Cor Principal'] || '',
          coresSecundarias: row['Cor(es) Segundária(s)'] || '',
          codigo: row['Código'] || '',
          fabricante: row['Fabricante'] || '',
          notasTema: row['Notas/Tema'] || ''
        }));
        resolve(cars);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const saveCollection = (cars: HotWheelsCar[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

export const loadCollection = (): HotWheelsCar[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};

export const searchCar = (cars: HotWheelsCar[], query: string): HotWheelsCar | null => {
  const lowerQuery = query.toLowerCase().trim();
  return cars.find(
    car =>
      car.codigo.toLowerCase().includes(lowerQuery) ||
      car.modelo.toLowerCase().includes(lowerQuery) ||
      car.marca.toLowerCase().includes(lowerQuery)
  ) || null;
};

export const calculateStats = (cars: HotWheelsCar[]): CollectionStats => {
  const stats: CollectionStats = {
    total: cars.length,
    byBrand: {},
    byManufacturer: {},
    byYear: {},
    byColor: {}
  };

  cars.forEach(car => {
    // By Brand
    stats.byBrand[car.marca] = (stats.byBrand[car.marca] || 0) + 1;

    // By Manufacturer
    stats.byManufacturer[car.fabricante] = (stats.byManufacturer[car.fabricante] || 0) + 1;

    // By Year
    if (car.anoModelo) {
      stats.byYear[car.anoModelo] = (stats.byYear[car.anoModelo] || 0) + 1;
    }

    // By Primary Color
    if (car.corPrincipal) {
      stats.byColor[car.corPrincipal] = (stats.byColor[car.corPrincipal] || 0) + 1;
    }
  });

  return stats;
};

export const sortCars = (
  cars: HotWheelsCar[],
  field: keyof HotWheelsCar,
  direction: 'asc' | 'desc'
): HotWheelsCar[] => {
  return [...cars].sort((a, b) => {
    const aVal = a[field].toLowerCase();
    const bVal = b[field].toLowerCase();
    if (direction === 'asc') {
      return aVal.localeCompare(bVal);
    }
    return bVal.localeCompare(aVal);
  });
};

export const filterCars = (cars: HotWheelsCar[], searchTerm: string): HotWheelsCar[] => {
  if (!searchTerm) return cars;
  
  const lowerSearch = searchTerm.toLowerCase();
  return cars.filter(car =>
    car.marca.toLowerCase().includes(lowerSearch) ||
    car.modelo.toLowerCase().includes(lowerSearch) ||
    car.codigo.toLowerCase().includes(lowerSearch) ||
    car.fabricante.toLowerCase().includes(lowerSearch) ||
    car.corPrincipal.toLowerCase().includes(lowerSearch) ||
    car.notasTema.toLowerCase().includes(lowerSearch)
  );
};
