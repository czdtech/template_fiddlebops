/// <reference types="astro/client" />

interface KeyboardNav extends HTMLElement {
  items: HTMLElement[];
  handleKeyDown(event: KeyboardEvent): void;
}

interface ScreenReaderAnnouncer extends HTMLElement {
  announce(message: string, priority?: "polite" | "assertive"): void;
  clear(priority?: "polite" | "assertive"): void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "keyboard-nav": JSX.IntrinsicElements["nav"];
      "screen-reader-announcer": JSX.IntrinsicElements["div"];
    }
  }
}
