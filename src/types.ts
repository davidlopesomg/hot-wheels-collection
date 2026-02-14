export interface HotWheelsCar {
  id?: string;             // Firestore document ID
  marca: string;           // Brand
  modelo: string;          // Model
  anoModelo: string;       // Model Year
  corPrincipal: string;    // Primary Color
  coresSecundarias: string; // Secondary Colors
  codigo: string;          // Full Base Code (e.g., "JJJ26-N521")
  seriesCode?: string;     // Series Code from base (e.g., "JJJ26")
  collectorNumber?: string; // Collector Number from base (e.g., "N521") - Primary identifier
  productionYear?: string;  // Production Year from base (e.g., "21" for 2021)
  factoryCode?: string;     // Factory Code from base (e.g., "A")
  upc?: string;            // UPC Barcode - Moving to Manufacturer onboarding
  fabricante: string;      // Manufacturer
  notasTema: string;       // Notes/Theme
}

export interface Brand {
  id?: string;             // Firestore document ID
  name: string;            // Brand name (e.g., "Ferrari", "Porsche", "Hot Wheels Custom")
  iconSlug?: string;       // simple-icons slug (e.g., "ferrari", "porsche", "bmw")
  logoUrl?: string;        // URL to brand logo image (fallback if no iconSlug)
  countryCode?: string;    // ISO country code (e.g., "IT", "DE", "US")
  description?: string;    // Optional description
  createdAt?: Date;        // Creation timestamp
  updatedAt?: Date;        // Last update timestamp
}

export interface Manufacturer {
  id?: string;             // Firestore document ID
  name: string;            // Manufacturer name (e.g., "Hot Wheels", "Matchbox", "Majorette")
  logoUrl?: string;        // URL to manufacturer logo image (base64 or storage URL)
  upc?: string;            // UPC Barcode (e.g., "07429905785")
  createdAt?: Date;        // Creation timestamp
  updatedAt?: Date;        // Last update timestamp
}

export interface CollectionStats {
  total: number;
  byBrand: Record<string, number>;
  byManufacturer: Record<string, number>;
  byYear: Record<string, number>;
  byColor: Record<string, number>;
  byModel: Record<string, number>;
}
