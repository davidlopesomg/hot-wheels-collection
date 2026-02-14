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

export interface CollectionStats {
  total: number;
  byBrand: Record<string, number>;
  byManufacturer: Record<string, number>;
  byYear: Record<string, number>;
  byColor: Record<string, number>;
  byModel: Record<string, number>;
}
