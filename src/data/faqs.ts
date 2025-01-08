import type { FAQ } from "./types";

export const getFaqs = (t: (key: string) => string): FAQ[] => [
  {
    question: t("faq.q1"),
    answer: t("faq.a1"),
  },
  {
    question: t("faq.q2"),
    answer: t("faq.a2"),
  },
  {
    question: t("faq.q3"),
    answer: t("faq.a3"),
  },
  {
    question: t("faq.q4"),
    answer: t("faq.a4"),
  },
  {
    question: t("faq.q5"),
    answer: t("faq.a5"),
  },
  {
    question: t("faq.q6"),
    answer: t("faq.a6"),
  },
  {
    question: t("faq.q7"),
    answer: t("faq.a7"),
  },
  {
    question: t("faq.q8"),
    answer: t("faq.a8"),
  },
];
