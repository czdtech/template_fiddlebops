import type { SiteConfig } from "../config/types";

interface SchemaOrgGame {
  "@context": "https://schema.org";
  "@type": "VideoGame";
  name: string;
  description: string;
  url: string;
  image: string;
  genre: string[];
  gamePlatform: string[];
  applicationCategory: string;
  operatingSystem: string[];
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  author: {
    "@type": "Organization";
    name: string;
    description: string;
    email: string;
    location: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  gameItem: Array<{
    "@type": "Thing";
    name: string;
    description: string;
  }>;
  review?: {
    "@type": "Review";
    reviewRating: {
      "@type": "Rating";
      ratingValue: string;
      bestRating: string;
      worstRating: string;
    };
    author: {
      "@type": "Person";
      name: string;
    };
    reviewBody: string;
  };
}

export function generateGameSchema(
  site: SiteConfig,
  canonicalURL: URL
): SchemaOrgGame {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: site.name,
    description: site.description,
    url: canonicalURL.toString(),
    image: site.ogImage,
    genre: ["Music", "Rhythm", "Casual", "Educational", "Browser Game"],
    gamePlatform: ["Web Browser", "PC", "Mobile", "Tablet"],
    applicationCategory: "Game",
    operatingSystem: ["Windows", "macOS", "Linux", "Android", "iOS"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalURL.toString(),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: site.creator.name,
      description: site.creator.description,
      email: site.creator.email,
      location: site.creator.location,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    gameItem: site.game.features.map((feature) => ({
      "@type": "Thing",
      name: feature.title,
      description: feature.description,
    })),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: "音乐游戏评测",
      },
      reviewBody:
        "FiddleBops是一款极具创新性的音乐节奏游戏，它完美地将音乐创作与游戏娱乐相结合。游戏的操作简单直观，但又蕴含着丰富的音乐理论知识，非常适合所有热爱音乐的玩家。",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.game.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.creator.description,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    email: site.creator.email,
    location: site.creator.location,
    sameAs: [site.links.twitter, site.links.github, site.links.discord],
  };
}
