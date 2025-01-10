type FeatureKey =
  | "features.gameplay.title"
  | "features.gameplay.description"
  | "features.music.title"
  | "features.music.description"
  | "features.feedback.title"
  | "features.feedback.description"
  | "features.difficulty.title"
  | "features.difficulty.description";

type FAQKey =
  | "faq.q1"
  | "faq.q2"
  | "faq.q3"
  | "faq.q4"
  | "faq.q5"
  | "faq.q6"
  | "faq.q7"
  | "faq.q8"
  | "faq.a1"
  | "faq.a2"
  | "faq.a3"
  | "faq.a4"
  | "faq.a5"
  | "faq.a6"
  | "faq.a7"
  | "faq.a8";

export interface Feature {
  icon: string;
  title: FeatureKey;
  description: FeatureKey;
}

export interface FAQ {
  question: FAQKey;
  answer: FAQKey;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}
