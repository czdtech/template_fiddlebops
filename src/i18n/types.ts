export type Language = "en" | "zh";

export type LanguageConfig = {
  [key in Language]: {
    name: string;
    code: Language;
    locale: string;
  };
};
