export interface HotWheelsCar {
  marca: string;           // Brand
  modelo: string;          // Model
  anoModelo: string;       // Model Year
  corPrincipal: string;    // Primary Color
  coresSecundarias: string; // Secondary Colors
  codigo: string;          // Code/SKU
  fabricante: string;      // Manufacturer
  notasTema: string;       // Notes/Theme
}

export interface CollectionStats {
  total: number;
  byBrand: Record<string, number>;
  byManufacturer: Record<string, number>;
  byYear: Record<string, number>;
  byColor: Record<string, number>;
}
