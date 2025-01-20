import { languages } from './config';

export type Language = keyof typeof languages;

export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationMessages {
  [locale: string]: Translation;
}