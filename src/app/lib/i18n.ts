import en from '../locales/en.json';
import hi from '../locales/hi.json';
import te from '../locales/tel.json'; // Telugu (ISO code "te")
import ar from '../locales/ar.json';
import it from '../locales/it.json';
import el from '../locales/el.json';

export type LocaleCode = 'en' | 'hi' | 'te' | 'ar' | 'it' | 'el';

export interface LocaleMeta {
  code: LocaleCode;
  /** Native name shown in the language menu */
  label: string;
  /** Short code shown on the switcher button */
  short: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी', short: 'HI', dir: 'ltr' },
  { code: 'te', label: 'తెలుగు', short: 'TE', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'it', label: 'Italiano', short: 'IT', dir: 'ltr' },
  { code: 'el', label: 'Ελληνικά', short: 'EL', dir: 'ltr' },
];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const MESSAGES: Record<LocaleCode, Record<string, string>> = { en, hi, te, ar, it, el };

/** Scripts that need looser line-height and no negative letter-spacing */
export const COMPLEX_SCRIPTS: LocaleCode[] = ['hi', 'te', 'ar'];

const STORAGE_KEY = 'portfolio-locale';

const isLocale = (v: unknown): v is LocaleCode => LOCALES.some((l) => l.code === v);

/** Saved choice first, then the browser language, then English. */
export function getInitialLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const browser = (typeof navigator !== 'undefined' ? navigator.language : 'en').slice(0, 2).toLowerCase();
  return isLocale(browser) ? browser : DEFAULT_LOCALE;
}

export function saveLocale(code: LocaleCode) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage unavailable */
  }
}