import { en } from './en';
import { pt } from './pt';

export type Language = 'en' | 'pt';

export type TranslationKeys = typeof en;

export const translations: Record<Language, TranslationKeys> = {
  en,
  pt
};

export const getNestedTranslation = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

export const interpolate = (template: string, values: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
};
