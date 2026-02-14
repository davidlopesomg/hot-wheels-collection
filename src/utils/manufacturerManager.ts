import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Manufacturer } from '../types';
import { MANUFACTURERS } from '../constants/formOptions';

const COLLECTION_NAME = 'custom_manufacturers';

/**
 * Load all manufacturers from Firestore
 */
export async function loadManufacturers(): Promise<Manufacturer[]> {
  try {
    const manufacturersRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(manufacturersRef);
    
    const manufacturers: Manufacturer[] = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      manufacturers.push({
        id: docSnapshot.id,
        name: data.name,
        logoUrl: data.logoUrl,
        upc: data.upc,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });
    
    // Sort by name client-side
    return manufacturers.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error loading manufacturers:', error);
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
}

/**
 * Add a new manufacturer to Firestore
 */
export async function addManufacturer(manufacturer: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...manufacturer,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding manufacturer:', error);
    throw error;
  }
}

/**
 * Update an existing manufacturer in Firestore
 */
export async function updateManufacturer(id: string, manufacturer: Partial<Manufacturer>): Promise<void> {
  try {
    const manufacturerRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(manufacturerRef, {
      ...manufacturer,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating manufacturer:', error);
    throw error;
  }
}

/**
 * Delete a manufacturer from Firestore
 */
export async function deleteManufacturer(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting manufacturer:', error);
    throw error;
  }
}

/**
 * Delete all manufacturers from Firestore
 */
export async function deleteAllManufacturers(): Promise<number> {
  try {
    const manufacturers = await loadManufacturers();
    let deletedCount = 0;
    const errors: string[] = [];

    console.log(`Deleting ${manufacturers.length} manufacturers...`);

    for (const manufacturer of manufacturers) {
      if (manufacturer.id) {
        try {
          await deleteManufacturer(manufacturer.id);
          deletedCount++;
          console.log(`Deleted manufacturer: ${manufacturer.name}`);
        } catch (error) {
          console.error(`Error deleting manufacturer ${manufacturer.name}:`, error);
          errors.push(manufacturer.name);
        }
      }
    }

    console.log(`✅ Deleted ${deletedCount} manufacturers`);
    
    if (errors.length > 0) {
      console.warn(`Failed to delete ${errors.length} manufacturers:`, errors);
    }

    return deletedCount;
  } catch (error) {
    console.error('Error deleting all manufacturers:', error);
    throw error;
  }
}

/**
 * Check if a manufacturer with the given name already exists
 */
export async function manufacturerExists(name: string, excludeId?: string): Promise<boolean> {
  try {
    const manufacturers = await loadManufacturers();
    return manufacturers.some(m => 
      m.name.toLowerCase() === name.toLowerCase() && m.id !== excludeId
    );
  } catch (error) {
    console.error('Error checking manufacturer existence:', error);
    return false;
  }
}

/**
 * Get manufacturer names for dropdown
 */
export async function getManufacturerNames(): Promise<string[]> {
  try {
    const manufacturers = await loadManufacturers();
    return manufacturers.map(m => m.name);
  } catch (error) {
    console.error('Error getting manufacturer names:', error);
    return [];
  }
}

/**
 * Seed default manufacturers from MANUFACTURERS constant
 */
export async function seedDefaultManufacturers(): Promise<number> {
  try {
    const existingManufacturers = await loadManufacturers();
    let addedCount = 0;
    const errors: string[] = [];

    for (const manufacturerName of MANUFACTURERS) {
      try {
        // Check if manufacturer already exists
        const exists = existingManufacturers.some(
          m => m.name.toLowerCase() === manufacturerName.toLowerCase()
        );

        if (!exists) {
          await addManufacturer({
            name: manufacturerName
          });
          addedCount++;
          console.log(`Added manufacturer: ${manufacturerName}`);
        } else {
          console.log(`Skipped existing manufacturer: ${manufacturerName}`);
        }
      } catch (error) {
        console.error(`Error adding manufacturer ${manufacturerName}:`, error);
        errors.push(manufacturerName);
        // Continue with next manufacturer even if this one fails
      }
    }

    if (errors.length > 0) {
      console.warn(`Failed to add ${errors.length} manufacturers:`, errors);
    }

    return addedCount;
  } catch (error) {
    console.error('Error seeding default manufacturers:', error);
    // Return 0 instead of throwing to allow UI to show partial success
    return 0;
  }
}
