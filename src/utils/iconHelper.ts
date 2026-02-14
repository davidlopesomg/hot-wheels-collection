import * as simpleIcons from 'simple-icons';

/**
 * Common car brands available in simple-icons
 * Maps brand names to their simple-icons slug
 */
export const CAR_BRAND_ICONS: Record<string, string> = {
  // Luxury/Sports Brands
  'Ferrari': 'ferrari',
  'Lamborghini': 'lamborghini',
  'Porsche': 'porsche',
  'Maserati': 'maserati',
  'Aston Martin': 'astonmartin',
  'Bugatti': 'bugatti',
  'McLaren': 'mclaren',
  'Rolls-Royce': 'rollsroyce',
  'Bentley': 'bentley',
  
  // German Brands
  'BMW': 'bmw',
  'Mercedes': 'mercedes',
  'Mercedes-Benz': 'mercedes',
  'Audi': 'audi',
  'Volkswagen': 'volkswagen',
  'VW': 'volkswagen',
  'Opel': 'opel',
  
  // Japanese Brands
  'Toyota': 'toyota',
  'Honda': 'honda',
  'Nissan': 'nissan',
  'Mazda': 'mazda',
  'Mitsubishi': 'mitsubishi',
  'Suzuki': 'suzuki',
  'Subaru': 'subaru',
  'Lexus': 'lexus',
  'Infiniti': 'infiniti',
  'Acura': 'acura',
  
  // American Brands
  'Ford': 'ford',
  'Chevrolet': 'chevrolet',
  'Dodge': 'dodge',
  'Tesla': 'tesla',
  'Cadillac': 'cadillac',
  'Jeep': 'jeep',
  'Chrysler': 'chrysler',
  
  // Korean Brands
  'Hyundai': 'hyundai',
  'Kia': 'kia',
  
  // French Brands
  'Peugeot': 'peugeot',
  'Renault': 'renault',
  'Citroën': 'citroen',
  'Citroen': 'citroen',
  
  // British Brands
  'Jaguar': 'jaguar',
  'Land Rover': 'landrover',
  'MINI': 'mini',
  'Mini': 'mini',
  
  // Italian Brands
  'Alfa Romeo': 'alfaromeo',
  'Fiat': 'fiat',
  
  // Swedish Brands
  'Volvo': 'volvo',
  
  // Czech Brands
  'Skoda': 'skoda',
  'Škoda': 'skoda',
  
  // Spanish Brands
  'SEAT': 'seat',
  
  // Romanian Brands  
  'Dacia': 'dacia',
  
  // Racing Series / Motorsport
  'Formula 1': 'f1',
  'F1': 'f1',
  'Formula E': 'formulae',
  
  // Note: The following brands don't have icons in simple-icons:
  // Buick, Lincoln, Lancia, RAM, Shelby, Rimac, McMurtry
};

/**
 * Get icon slug for a brand name (case-insensitive)
 */
export const getIconSlug = (brandName: string): string | undefined => {
  const normalized = brandName.trim();
  
  // Direct match
  if (CAR_BRAND_ICONS[normalized]) {
    return CAR_BRAND_ICONS[normalized];
  }
  
  // Case-insensitive match
  const lowerName = normalized.toLowerCase();
  for (const [key, value] of Object.entries(CAR_BRAND_ICONS)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  return undefined;
};

/**
 * Get simple-icons icon data by slug
 */
export const getIconData = (slug: string) => {
  try {
    // Simple-icons exports icons with prefixed names like 'siFerrari'
    const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
    const icon = (simpleIcons as any)[iconKey];
    return icon || null;
  } catch (error) {
    console.error(`Icon ${slug} not found:`, error);
    return null;
  }
};

/**
 * Get SVG string for an icon slug
 */
export const getIconSvg = (slug: string): string | null => {
  const icon = getIconData(slug);
  if (!icon) return null;
  
  return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>${icon.title}</title>
    <path d="${icon.path}" fill="currentColor"/>
  </svg>`;
};

/**
 * Get all available car brand icon options for dropdown
 */
export const getAvailableCarIcons = (): Array<{ name: string; slug: string }> => {
  const uniqueSlugs = new Set(Object.values(CAR_BRAND_ICONS));
  const options: Array<{ name: string; slug: string }> = [];
  
  for (const [name, slug] of Object.entries(CAR_BRAND_ICONS)) {
    if (uniqueSlugs.has(slug)) {
      options.push({ name, slug });
      uniqueSlugs.delete(slug); // Only add first occurrence
    }
  }
  
  return options.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Check if a slug is available in simple-icons
 */
export const isIconAvailable = (slug: string): boolean => {
  return getIconData(slug) !== null;
};

/**
 * Get all available icons from simple-icons
 * Returns array of { slug, title, hex } objects
 */
export const getAllSimpleIcons = (): Array<{ slug: string; title: string; hex: string }> => {
  const icons: Array<{ slug: string; title: string; hex: string }> = [];
  
  try {
    // Iterate through all exports from simple-icons
    for (const [key, value] of Object.entries(simpleIcons)) {
      // Icons are prefixed with 'si' (e.g., siFerrari)
      if (key.startsWith('si') && typeof value === 'object' && value !== null) {
        const icon = value as { title: string; slug: string; hex: string; path: string };
        if (icon.slug && icon.title) {
          icons.push({
            slug: icon.slug,
            title: icon.title,
            hex: icon.hex
          });
        }
      }
    }
  } catch (error) {
    console.error('Error getting all simple icons:', error);
  }
  
  return icons.sort((a, b) => a.title.localeCompare(b.title));
};
