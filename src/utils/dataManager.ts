import Papa from 'papaparse';
import { HotWheelsCar, CollectionStats } from '../types';
import { db } from '../config/firebase';
import { normalizeColorToEnglish, MANUFACTURERS } from '../constants/formOptions';
import { 
  collection, 
  getDocs, 
  doc,
  writeBatch,
  query,
  orderBy,
  QueryDocumentSnapshot,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const STORAGE_KEY = 'hotwheels_collection';
const COLLECTION_NAME = 'cars';

interface CSVValidationError {
  row: number;
  field: string;
  message: string;
}

export const validateCSVStructure = (file: File): Promise<{ valid: boolean; errors: CSVValidationError[] }> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      preview: 0, // Parse all rows for validation
      complete: (results) => {
        const errors: CSVValidationError[] = [];
        const requiredColumns = ['Marca', 'Modelo', 'Código', 'Fabricante'];
        
        // Check if required columns exist
        const headers = results.meta.fields || [];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          errors.push({
            row: 0,
            field: 'headers',
            message: `Missing required columns: ${missingColumns.join(', ')}`
          });
          resolve({ valid: false, errors });
          return;
        }
        
        // Validate each row
        results.data.forEach((row: any, index: number) => {
          const rowNumber = index + 2; // +2 because CSV has header row and is 1-indexed
          
          // Check required fields
          if (!row['Marca'] || row['Marca'].trim() === '') {
            errors.push({ row: rowNumber, field: 'Marca', message: 'Brand is required' });
          }
          
          if (!row['Modelo'] || row['Modelo'].trim() === '') {
            errors.push({ row: rowNumber, field: 'Modelo', message: 'Model is required' });
          }
          
          if (!row['Código'] || row['Código'].trim() === '') {
            errors.push({ row: rowNumber, field: 'Código', message: 'Code is required' });
          }
          
          // Validate manufacturer against known list
          const fabricante = row['Fabricante'] || '';
          if (fabricante && !MANUFACTURERS.includes(fabricante)) {
            errors.push({ 
              row: rowNumber, 
              field: 'Fabricante', 
              message: `Invalid manufacturer: "${fabricante}". Must be one of: ${MANUFACTURERS.slice(0, 5).join(', ')}...` 
            });
          }
        });
        
        resolve({ valid: errors.length === 0, errors });
      },
      error: (error) => {
        resolve({ 
          valid: false, 
          errors: [{ row: 0, field: 'file', message: `File parsing error: ${error.message}` }] 
        });
      }
    });
  });
};

export const parseCSV = (file: File): Promise<HotWheelsCar[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cars: HotWheelsCar[] = results.data.map((row: any) => {
          const primaryColor = row['Cor Principal'] || '';
          const secondaryColors = row['Cor(es) Segundária(s)'] || '';
          
          return {
            marca: row['Marca'] || '',
            modelo: row['Modelo'] || '',
            anoModelo: row['Ano do Modelo'] || '',
            corPrincipal: normalizeColorToEnglish(primaryColor),
            coresSecundarias: secondaryColors ? 
              secondaryColors.split(',').map((c: string) => normalizeColorToEnglish(c.trim())).join(', ') : 
              '',
            codigo: row['Código'] || '',
            fabricante: row['Fabricante'] || '',
            notasTema: row['Notas/Tema'] || ''
          };
        });
        resolve(cars);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const saveCollection = async (cars: HotWheelsCar[]): Promise<void> => {
  try {
    // Save to Firestore
    const batch = writeBatch(db);
    const collectionRef = collection(db, COLLECTION_NAME);
    
    // Clear existing data and add new
    const existingDocs = await getDocs(collectionRef);
    existingDocs.forEach((docSnapshot: QueryDocumentSnapshot) => {
      batch.delete(docSnapshot.ref);
    });
    
    // Add new cars
    for (const car of cars) {
      const docRef = doc(collectionRef);
      batch.set(docRef, car);
    }
    
    await batch.commit();
    
    // Also save to localStorage as backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  } catch (error) {
    console.error('Error saving to Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }
};

export const loadCollection = async (): Promise<HotWheelsCar[]> => {
  try {
    // Try loading from Firestore first
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(collectionRef, orderBy('marca'));
    const querySnapshot = await getDocs(q);
    
    const cars: HotWheelsCar[] = [];
    querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot) => {
      cars.push({ 
        id: docSnapshot.id,
        ...docSnapshot.data() 
      } as HotWheelsCar);
    });
    
    // If we got data from Firestore, also save to localStorage as cache
    if (cars.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
      return cars;
    }
    
    // If Firestore is empty, try localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    return [];
  } catch (error) {
    console.error('Error loading from Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  }
};

export const searchCar = (cars: HotWheelsCar[], query: string): HotWheelsCar | null => {
  const lowerQuery = query.toLowerCase().trim();
  return cars.find(
    car =>
      car.codigo.toLowerCase().includes(lowerQuery) ||
      car.modelo.toLowerCase().includes(lowerQuery) ||
      car.marca.toLowerCase().includes(lowerQuery) ||
      (car.upc && car.upc.includes(lowerQuery))
  ) || null;
};

export const calculateStats = (cars: HotWheelsCar[]): CollectionStats => {
  const stats: CollectionStats = {
    total: cars.length,
    byBrand: {},
    byManufacturer: {},
    byYear: {},
    byColor: {},
    byModel: {}
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

    // By Model
    if (car.modelo) {
      stats.byModel[car.modelo] = (stats.byModel[car.modelo] || 0) + 1;
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
    const aVal = (a[field] || '').toString().toLowerCase();
    const bVal = (b[field] || '').toString().toLowerCase();
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

export const addCar = async (car: HotWheelsCar): Promise<void> => {
  try {
    // Add to Firestore
    const collectionRef = collection(db, COLLECTION_NAME);
    await addDoc(collectionRef, car);
    
    // Update localStorage cache
    const existingCars = await loadCollection();
    existingCars.push(car);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingCars));
  } catch (error) {
    console.error('Error adding car to Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    const stored = localStorage.getItem(STORAGE_KEY);
    const cars: HotWheelsCar[] = stored ? JSON.parse(stored) : [];
    cars.push(car);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }
};

export const getUniqueBrands = async (): Promise<string[]> => {
  try {
    const cars = await loadCollection();
    const brands = new Set<string>();
    cars.forEach(car => {
      if (car.marca && car.marca.trim()) {
        brands.add(car.marca);
      }
    });
    return Array.from(brands).sort();
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
  }
};

export const updateCar = async (carId: string, updatedCar: HotWheelsCar): Promise<void> => {
  try {
    // Remove the id field from the data to update
    const { id, ...carData } = updatedCar;
    
    // Update in Firestore
    const carRef = doc(db, COLLECTION_NAME, carId);
    await updateDoc(carRef, carData);
    
    // Update localStorage cache
    const existingCars = await loadCollection();
    const updatedCars = existingCars.map(car => 
      car.id === carId ? { ...updatedCar, id: carId } : car
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  } catch (error) {
    console.error('Error updating car in Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    const stored = localStorage.getItem(STORAGE_KEY);
    const cars: HotWheelsCar[] = stored ? JSON.parse(stored) : [];
    const updatedCars = cars.map(car => 
      car.id === carId ? { ...updatedCar, id: carId } : car
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  }
};

export const deleteCar = async (carId: string): Promise<void> => {
  try {
    // Delete from Firestore
    const carRef = doc(db, COLLECTION_NAME, carId);
    await deleteDoc(carRef);
    
    // Update localStorage cache
    const existingCars = await loadCollection();
    const updatedCars = existingCars.filter(car => car.id !== carId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  } catch (error) {
    console.error('Error deleting car from Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    const stored = localStorage.getItem(STORAGE_KEY);
    const cars: HotWheelsCar[] = stored ? JSON.parse(stored) : [];
    const updatedCars = cars.filter(car => car.id !== carId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  }
};

export const deleteCarsInBulk = async (carIds: string[]): Promise<void> => {
  try {
    // Delete from Firestore using batch
    const batch = writeBatch(db);
    carIds.forEach(carId => {
      const carRef = doc(db, COLLECTION_NAME, carId);
      batch.delete(carRef);
    });
    await batch.commit();
    
    // Update localStorage cache
    const existingCars = await loadCollection();
    const updatedCars = existingCars.filter(car => !carIds.includes(car.id || ''));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  } catch (error) {
    console.error('Error deleting cars from Firestore, using localStorage:', error);
    // Fallback to localStorage if Firestore fails
    const stored = localStorage.getItem(STORAGE_KEY);
    const cars: HotWheelsCar[] = stored ? JSON.parse(stored) : [];
    const updatedCars = cars.filter(car => !carIds.includes(car.id || ''));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  }
};
