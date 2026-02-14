// Manufacturer list for the dropdown
export const MANUFACTURERS = [
  'Hot Wheels',
  'Majorette',
  'Matchbox',
  'Tomica',
  'MiniGT',
  'Para64',
  'Tarmac Works',
  'Maisto',
  'Johnny Lightning',
  'Greenlight',
  'Auto World',
  'Jada',
  'M2 Machines',
  'Kyosho',
  'Racing Champions',
  'Bburago',
  'Siku',
  'Diecast Masters',
  'Welly',
  'Norev',
  'Ertl',
  'Corgi',
  'Dinky Toys',
  'Spark',
  'Exoto',
  'Autoart',
  'Inno64',
  'Schuco',
  'IXO'
] as const;

// Common Hot Wheels colors (in English)
export const COLORS = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Black',
  'White',
  'Silver',
  'Gold',
  'Gray',
  'Brown',
  'Teal',
  'Turquoise',
  'Lime',
  'Magenta',
  'Violet',
  'Copper',
  'Bronze',
  'Chrome',
  'Pearl White',
  'Metallic Blue',
  'Metallic Red',
  'Metallic Green',
  'Matte Black',
  'Dark Blue',
  'Light Blue',
  'Dark Green',
  'Light Green'
] as const;

// Color translations
export const COLOR_TRANSLATIONS: Record<string, { en: string; pt: string }> = {
  'Red': { en: 'Red', pt: 'Vermelho' },
  'Blue': { en: 'Blue', pt: 'Azul' },
  'Green': { en: 'Green', pt: 'Verde' },
  'Yellow': { en: 'Yellow', pt: 'Amarelo' },
  'Orange': { en: 'Orange', pt: 'Laranja' },
  'Purple': { en: 'Purple', pt: 'Roxo' },
  'Pink': { en: 'Pink', pt: 'Rosa' },
  'Black': { en: 'Black', pt: 'Preto' },
  'White': { en: 'White', pt: 'Branco' },
  'Silver': { en: 'Silver', pt: 'Prata' },
  'Gold': { en: 'Gold', pt: 'Dourado' },
  'Gray': { en: 'Gray', pt: 'Cinzento' },
  'Brown': { en: 'Brown', pt: 'Castanho' },
  'Teal': { en: 'Teal', pt: 'Azul-petróleo' },
  'Turquoise': { en: 'Turquoise', pt: 'Turquesa' },
  'Lime': { en: 'Lime', pt: 'Lima' },
  'Magenta': { en: 'Magenta', pt: 'Magenta' },
  'Violet': { en: 'Violet', pt: 'Violeta' },
  'Copper': { en: 'Copper', pt: 'Cobre' },
  'Bronze': { en: 'Bronze', pt: 'Bronze' },
  'Chrome': { en: 'Chrome', pt: 'Cromado' },
  'Pearl White': { en: 'Pearl White', pt: 'Branco Pérola' },
  'Metallic Blue': { en: 'Metallic Blue', pt: 'Azul Metálico' },
  'Metallic Red': { en: 'Metallic Red', pt: 'Vermelho Metálico' },
  'Metallic Green': { en: 'Metallic Green', pt: 'Verde Metálico' },
  'Matte Black': { en: 'Matte Black', pt: 'Preto Fosco' },
  'Dark Blue': { en: 'Dark Blue', pt: 'Azul Escuro' },
  'Light Blue': { en: 'Light Blue', pt: 'Azul Claro' },
  'Dark Green': { en: 'Dark Green', pt: 'Verde Escuro' },
  'Light Green': { en: 'Light Green', pt: 'Verde Claro' }
};

// Helper function to get translated color name
export const getColorName = (colorKey: string, language: 'en' | 'pt'): string => {
  const translation = COLOR_TRANSLATIONS[colorKey];
  return translation ? translation[language] : colorKey;
};

// Helper function to normalize color names (convert Portuguese to English)
export const normalizeColorToEnglish = (colorName: string): string => {
  if (!colorName) return colorName;
  
  const trimmedColor = colorName.trim();
  
  // Check if it's already in English (direct match)
  const directMatch = COLORS.find(c => c.toLowerCase() === trimmedColor.toLowerCase());
  if (directMatch) return directMatch;
  
  // Search in translations for Portuguese match
  for (const [englishKey, translations] of Object.entries(COLOR_TRANSLATIONS)) {
    if (translations.pt.toLowerCase() === trimmedColor.toLowerCase()) {
      return englishKey;
    }
  }
  
  // Common Portuguese color variations not in the main list
  const commonMappings: Record<string, string> = {
    'vermelho': 'Red',
    'azul': 'Blue',
    'verde': 'Green',
    'amarelo': 'Yellow',
    'laranja': 'Orange',
    'roxo': 'Purple',
    'rosa': 'Pink',
    'preto': 'Black',
    'branco': 'White',
    'prata': 'Silver',
    'dourado': 'Gold',
    'cinzento': 'Gray',
    'cinza': 'Gray',
    'castanho': 'Brown',
    'marrom': 'Brown',
    'azul-petróleo': 'Teal',
    'turquesa': 'Turquoise',
    'lima': 'Lime',
    'magenta': 'Magenta',
    'violeta': 'Violet',
    'cobre': 'Copper',
    'bronze': 'Bronze',
    'cromado': 'Chrome',
    'branco pérola': 'Pearl White',
    'azul metálico': 'Metallic Blue',
    'vermelho metálico': 'Metallic Red',
    'verde metálico': 'Metallic Green',
    'preto fosco': 'Matte Black',
    'azul escuro': 'Dark Blue',
    'azul claro': 'Light Blue',
    'verde escuro': 'Dark Green',
    'verde claro': 'Light Green'
  };
  
  const lowerColor = trimmedColor.toLowerCase();
  if (commonMappings[lowerColor]) {
    return commonMappings[lowerColor];
  }
  
  // Return original if no match found
  return trimmedColor;
};

// Helper function to generate year options (from 1968 to current year + 1)
export const generateYearOptions = (): number[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 1968; // Hot Wheels was founded in 1968
  const years: number[] = [];
  
  for (let year = currentYear + 1; year >= startYear; year--) {
    years.push(year);
  }
  
  return years;
};
