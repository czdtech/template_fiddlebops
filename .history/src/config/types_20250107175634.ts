export interface NavItem {
  href: string;
  text: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
    discord: string;
  }
} 