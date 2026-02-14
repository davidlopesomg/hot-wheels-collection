/**
 * Utility functions for parsing Hot Wheels base codes
 * 
 * Base code location: Back of packaging at the top
 * 
 * Base code format:
 * - Top line: SERIES-COLLECTOR_NUMBER (e.g., "JJJ26-N521")
 * - Bottom line: PRODUCTION_YEAR + FACTORY_CODE (e.g., "21A")
 * 
 * Components:
 * - Series Code: Identifies the collection/series (e.g., "JJJ26")
 * - Collector Number: Unique casting identifier (e.g., "N521") - Most important for identification
 * - Production Year: 2-digit year (e.g., "21" for 2021)
 * - Factory Code: Letter indicating manufacturing location (e.g., "A")
 */

export interface ParsedCode {
  fullCode: string;
  seriesCode?: string;
  collectorNumber?: string;
  productionYear?: string;
  factoryCode?: string;
}

/**
 * Parses a Hot Wheels base code from OCR scan
 * Handles various formats:
 * - "JJJ26-N521" (top line only)
 * - "JJJ26-N521\n21A" (both lines)
 * - "JJJ26-N521 21A" (space separated)
 * 
 * @param ocrText - Raw text from OCR scan
 * @returns ParsedCode object with extracted components
 */
export function parseBaseCode(ocrText: string): ParsedCode {
  const result: ParsedCode = {
    fullCode: ocrText.trim()
  };

  // Clean up the text
  const cleaned = ocrText.trim().toUpperCase();

  // Pattern 1: Extract top line code (SERIES-COLLECTOR_NUMBER)
  // Matches formats like: JJJ26-N521, ABC12-D345, etc.
  const topLineMatch = cleaned.match(/([A-Z]{3}\d{2})-([A-Z]\d{3,4})/);
  
  if (topLineMatch) {
    result.seriesCode = topLineMatch[1];      // e.g., "JJJ26"
    result.collectorNumber = topLineMatch[2]; // e.g., "N521"
  }

  // Pattern 2: Extract bottom line code (PRODUCTION_YEAR + FACTORY_CODE)
  // Matches formats like: 21A, 25B, 26C, etc.
  const bottomLineMatch = cleaned.match(/\b(\d{2})([A-Z])\b/);
  
  if (bottomLineMatch) {
    result.productionYear = bottomLineMatch[1];  // e.g., "21"
    result.factoryCode = bottomLineMatch[2];     // e.g., "A"
  }

  return result;
}

/**
 * Validates if a string appears to be a valid Hot Wheels base code
 * @param code - Code to validate
 * @returns true if code matches expected pattern
 */
export function isValidBaseCode(code: string): boolean {
  const cleaned = code.trim().toUpperCase();
  
  // Must contain at least the series-collector pattern
  const hasTopLine = /[A-Z]{3}\d{2}-[A-Z]\d{3,4}/.test(cleaned);
  
  return hasTopLine;
}

/**
 * Formats a full production year from 2-digit year
 * @param twoDigitYear - 2-digit year string (e.g., "21")
 * @returns Full year string (e.g., "2021")
 */
export function formatProductionYear(twoDigitYear: string): string {
  if (!twoDigitYear || twoDigitYear.length !== 2) {
    return '';
  }
  
  const year = parseInt(twoDigitYear, 10);
  
  // Assume 2000s for years 00-99
  // Hot Wheels started in 1968, but modern codes use 20XX format
  const fullYear = 2000 + year;
  
  return fullYear.toString();
}

/**
 * Extracts just the collector number from a full code
 * This is the most important identifier for matching duplicates
 * @param code - Full base code
 * @returns Collector number or empty string
 */
export function extractCollectorNumber(code: string): string {
  const parsed = parseBaseCode(code);
  return parsed.collectorNumber || '';
}

/**
 * Generates a display-friendly code format
 * @param parsed - ParsedCode object
 * @returns Formatted string for display
 */
export function formatCodeForDisplay(parsed: ParsedCode): string {
  const parts: string[] = [];
  
  if (parsed.seriesCode && parsed.collectorNumber) {
    parts.push(`${parsed.seriesCode}-${parsed.collectorNumber}`);
  }
  
  if (parsed.productionYear && parsed.factoryCode) {
    parts.push(`${parsed.productionYear}${parsed.factoryCode}`);
  }
  
  return parts.join(' ') || parsed.fullCode;
}
