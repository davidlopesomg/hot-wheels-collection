import { Brand } from '../types';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';

const BRANDS_COLLECTION = 'custom_brands';

/**
 * Load all brands from Firestore
 */
export const loadBrands = async (): Promise<Brand[]> => {
  try {
    const brandsRef = collection(db, BRANDS_COLLECTION);
    const q = query(brandsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    const brands: Brand[] = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      brands.push({
        id: docSnapshot.id,
        name: data.name,
        iconSlug: data.iconSlug,
        logoUrl: data.logoUrl,
        countryCode: data.countryCode,
        description: data.description,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });
    
    return brands;
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
  }
};

/**
 * Add a new brand to Firestore
 */
export const addBrand = async (brand: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const brandsRef = collection(db, BRANDS_COLLECTION);
    const now = Timestamp.now();
    
    const docRef = await addDoc(brandsRef, {
      name: brand.name,
      iconSlug: brand.iconSlug || '',
      logoUrl: brand.logoUrl || '',
      countryCode: brand.countryCode || '',
      description: brand.description || '',
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding brand:', error);
    throw error;
  }
};

/**
 * Update an existing brand in Firestore
 */
export const updateBrand = async (brandId: string, updates: Partial<Brand>): Promise<void> => {
  try {
    const brandRef = doc(db, BRANDS_COLLECTION, brandId);
    const now = Timestamp.now();
    
    const updateData: any = {
      ...updates,
      updatedAt: now
    };
    
    // Remove fields that shouldn't be updated
    delete updateData.id;
    delete updateData.createdAt;
    
    await updateDoc(brandRef, updateData);
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

/**
 * Delete a brand from Firestore
 */
export const deleteBrand = async (brandId: string): Promise<void> => {
  try {
    const brandRef = doc(db, BRANDS_COLLECTION, brandId);
    await deleteDoc(brandRef);
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};

/**
 * Delete all brands from Firestore
 */
export const deleteAllBrands = async (): Promise<number> => {
  try {
    const brands = await loadBrands();
    let deletedCount = 0;
    const errors: string[] = [];

    console.log(`Deleting ${brands.length} brands...`);

    for (const brand of brands) {
      if (brand.id) {
        try {
          await deleteBrand(brand.id);
          deletedCount++;
          console.log(`Deleted brand: ${brand.name}`);
        } catch (error) {
          console.error(`Error deleting brand ${brand.name}:`, error);
          errors.push(brand.name);
        }
      }
    }

    console.log(`✅ Deleted ${deletedCount} brands`);
    
    if (errors.length > 0) {
      console.warn(`Failed to delete ${errors.length} brands:`, errors);
    }

    return deletedCount;
  } catch (error) {
    console.error('Error deleting all brands:', error);
    throw error;
  }
};

/**
 * Check if a brand name already exists
 */
export const brandExists = async (brandName: string, excludeId?: string): Promise<boolean> => {
  try {
    const brands = await loadBrands();
    return brands.some(brand => 
      brand.name.toLowerCase() === brandName.toLowerCase() && brand.id !== excludeId
    );
  } catch (error) {
    console.error('Error checking brand existence:', error);
    return false;
  }
};

/**
 * Get brand names for dropdown (lightweight)
 */
export const getBrandNames = async (): Promise<string[]> => {
  try {
    const brands = await loadBrands();
    return brands.map(brand => brand.name).sort();
  } catch (error) {
    console.error('Error loading brand names:', error);
    return [];
  }
};

/**
 * Curated list of automotive brands and entertainment properties available in simple-icons
 */
const DEFAULT_BRANDS: Array<{ name: string; iconSlug: string; countryCode?: string; category: 'automotive' | 'entertainment' }> = [
  // Italian Automotive Brands
  { name: 'Ferrari', iconSlug: 'ferrari', countryCode: 'IT', category: 'automotive' },
  { name: 'Lamborghini', iconSlug: 'lamborghini', countryCode: 'IT', category: 'automotive' },
  { name: 'Maserati', iconSlug: 'maserati', countryCode: 'IT', category: 'automotive' },
  { name: 'Alfa Romeo', iconSlug: 'alfaromeo', countryCode: 'IT', category: 'automotive' },
  { name: 'Fiat', iconSlug: 'fiat', countryCode: 'IT', category: 'automotive' },
  
  // German Automotive Brands
  { name: 'Porsche', iconSlug: 'porsche', countryCode: 'DE', category: 'automotive' },
  { name: 'BMW', iconSlug: 'bmw', countryCode: 'DE', category: 'automotive' },
  { name: 'Mercedes-Benz', iconSlug: 'mercedes', countryCode: 'DE', category: 'automotive' },
  { name: 'Audi', iconSlug: 'audi', countryCode: 'DE', category: 'automotive' },
  { name: 'Volkswagen', iconSlug: 'volkswagen', countryCode: 'DE', category: 'automotive' },
  { name: 'Opel', iconSlug: 'opel', countryCode: 'DE', category: 'automotive' },
  
  // American Automotive Brands
  { name: 'Ford', iconSlug: 'ford', countryCode: 'US', category: 'automotive' },
  { name: 'Chevrolet', iconSlug: 'chevrolet', countryCode: 'US', category: 'automotive' },
  { name: 'Dodge', iconSlug: 'dodge', countryCode: 'US', category: 'automotive' },
  { name: 'Tesla', iconSlug: 'tesla', countryCode: 'US', category: 'automotive' },
  { name: 'Jeep', iconSlug: 'jeep', countryCode: 'US', category: 'automotive' },
  { name: 'Cadillac', iconSlug: 'cadillac', countryCode: 'US', category: 'automotive' },
  { name: 'Chrysler', iconSlug: 'chrysler', countryCode: 'US', category: 'automotive' },
  { name: 'GMC', iconSlug: 'gmc', countryCode: 'US', category: 'automotive' },
  
  // Japanese Automotive Brands
  { name: 'Toyota', iconSlug: 'toyota', countryCode: 'JP', category: 'automotive' },
  { name: 'Honda', iconSlug: 'honda', countryCode: 'JP', category: 'automotive' },
  { name: 'Nissan', iconSlug: 'nissan', countryCode: 'JP', category: 'automotive' },
  { name: 'Mazda', iconSlug: 'mazda', countryCode: 'JP', category: 'automotive' },
  { name: 'Subaru', iconSlug: 'subaru', countryCode: 'JP', category: 'automotive' },
  { name: 'Mitsubishi', iconSlug: 'mitsubishi', countryCode: 'JP', category: 'automotive' },
  { name: 'Suzuki', iconSlug: 'suzuki', countryCode: 'JP', category: 'automotive' },
  { name: 'Lexus', iconSlug: 'lexus', countryCode: 'JP', category: 'automotive' },
  { name: 'Infiniti', iconSlug: 'infiniti', countryCode: 'JP', category: 'automotive' },
  { name: 'Acura', iconSlug: 'acura', countryCode: 'JP', category: 'automotive' },
  
  // Korean Automotive Brands
  { name: 'Hyundai', iconSlug: 'hyundai', countryCode: 'KR', category: 'automotive' },
  { name: 'Kia', iconSlug: 'kia', countryCode: 'KR', category: 'automotive' },
  { name: 'Genesis', iconSlug: 'genesis', countryCode: 'KR', category: 'automotive' },
  
  // British Automotive Brands
  { name: 'Jaguar', iconSlug: 'jaguar', countryCode: 'GB', category: 'automotive' },
  { name: 'Land Rover', iconSlug: 'landrover', countryCode: 'GB', category: 'automotive' },
  { name: 'Rolls-Royce', iconSlug: 'rollsroyce', countryCode: 'GB', category: 'automotive' },
  { name: 'Bentley', iconSlug: 'bentley', countryCode: 'GB', category: 'automotive' },
  { name: 'Aston Martin', iconSlug: 'astonmartin', countryCode: 'GB', category: 'automotive' },
  { name: 'MINI', iconSlug: 'mini', countryCode: 'GB', category: 'automotive' },
  { name: 'McLaren', iconSlug: 'mclaren', countryCode: 'GB', category: 'automotive' },
  
  // French Automotive Brands
  { name: 'Renault', iconSlug: 'renault', countryCode: 'FR', category: 'automotive' },
  { name: 'Peugeot', iconSlug: 'peugeot', countryCode: 'FR', category: 'automotive' },
  { name: 'Citroën', iconSlug: 'citroen', countryCode: 'FR', category: 'automotive' },
  { name: 'Bugatti', iconSlug: 'bugatti', countryCode: 'FR', category: 'automotive' },
  { name: 'Alpine', iconSlug: 'alpine', countryCode: 'FR', category: 'automotive' },
  
  // Swedish Automotive Brands
  { name: 'Volvo', iconSlug: 'volvo', countryCode: 'SE', category: 'automotive' },
  { name: 'Polestar', iconSlug: 'polestar', countryCode: 'SE', category: 'automotive' },
  
  // Czech Automotive Brands
  { name: 'Škoda', iconSlug: 'skoda', countryCode: 'CZ', category: 'automotive' },
  
  // Spanish Automotive Brands
  { name: 'SEAT', iconSlug: 'seat', countryCode: 'ES', category: 'automotive' },
  { name: 'Cupra', iconSlug: 'cupra', countryCode: 'ES', category: 'automotive' },
  
  // Romanian Automotive Brands
  { name: 'Dacia', iconSlug: 'dacia', countryCode: 'RO', category: 'automotive' },
  
  // Chinese Automotive Brands
  { name: 'BYD', iconSlug: 'byd', countryCode: 'CN', category: 'automotive' },
  
  // Racing Series / Motorsport
  { name: 'Formula 1', iconSlug: 'f1', category: 'automotive' },
  { name: 'Formula E', iconSlug: 'formulae', category: 'automotive' },
  
  // Entertainment/Licensing Brands (if available in simple-icons)
  { name: 'Marvel', iconSlug: 'marvel', category: 'entertainment' },
  // Note: Batman, D.C., Monopoly, Knight Rider, Transformers, Fast and Furious, Jurassic Park,
  // Shelby, Rimac, McMurtry are not available in simple-icons library.
  // Users can add these manually with custom logos.
];

/**
 * Seed curated automotive and entertainment brands from simple-icons
 * Updates existing brands if icon slug has changed
 */
export const seedDefaultBrands = async (): Promise<number> => {
  try {
    const existingBrands = await loadBrands();
    let addedCount = 0;
    let updatedCount = 0;
    const errors: string[] = [];

    console.log(`Seeding ${DEFAULT_BRANDS.length} curated brands...`);

    for (const brandData of DEFAULT_BRANDS) {
      try {
        // Check if brand already exists by name
        const existingBrand = existingBrands.find(
          b => b.name.toLowerCase() === brandData.name.toLowerCase()
        );

        if (existingBrand) {
          // Brand exists - check if icon needs updating
          if (existingBrand.iconSlug !== brandData.iconSlug) {
            // Update the brand with new icon and other info
            await updateBrand(existingBrand.id!, {
              iconSlug: brandData.iconSlug,
              countryCode: brandData.countryCode,
              description: brandData.category === 'automotive' 
                ? `${brandData.name} automotive brand`
                : `${brandData.name} entertainment brand`
            });
            updatedCount++;
            console.log(`Updated brand: ${brandData.name} (icon: ${existingBrand.iconSlug} → ${brandData.iconSlug})`);
          } else {
            console.log(`Skipped existing brand: ${brandData.name} (already has correct icon)`);
          }
        } else {
          // Brand doesn't exist - add it
          await addBrand({
            name: brandData.name,
            iconSlug: brandData.iconSlug,
            countryCode: brandData.countryCode,
            description: brandData.category === 'automotive' 
              ? `${brandData.name} automotive brand`
              : `${brandData.name} entertainment brand`
          });
          addedCount++;
          console.log(`Added brand: ${brandData.name} (${brandData.iconSlug})`);
        }
      } catch (error) {
        console.error(`Error processing brand ${brandData.name}:`, error);
        errors.push(brandData.name);
        // Continue with next brand even if this one fails
      }
    }

    const totalChanges = addedCount + updatedCount;
    console.log(`✅ Completed: Added ${addedCount} new brands, updated ${updatedCount} existing brands`);
    
    if (errors.length > 0) {
      console.warn(`Failed to process ${errors.length} brands:`, errors);
    }

    return totalChanges;
  } catch (error) {
    console.error('Error seeding default brands:', error);
    // Return 0 instead of throwing to allow UI to show partial success
    return 0;
  }
};
