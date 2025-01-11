export type Language = "en" | "zh";

export type LanguageConfig = {
  [key in Language]: {
    name: string;
    code: Language;
    locale: string;
  };
};

export type TranslationValue =
  | string
  | {
      [key: string]: TranslationValue;
    };

export type TranslationObject = {
  [key: string]: TranslationValue;
};
