import type { TranslationObject } from "../types";

/**
 * English translations
 * @description All UI text in English
 */
export const en: TranslationObject = {
  // Site
  "site.title": "FiddleBops - An Innovative Music Rhythm Game",
  "site.description":
    "Explore endless possibilities in music creation with this unique rhythm game. Simple and intuitive controls, rich musical elements, discover the magic of music through gameplay.",

  // Navigation
  "nav.home": "Home",
  "nav.game": "Game",
  "nav.features": "Features",
  "nav.faq": "FAQ",
  "nav.startGame": "Start Game",
  "nav.mainNavigation": "Main Navigation",
  "nav.actions": "Actions",
  "nav.changeLanguage": "Change Language",
  "nav.languageMenu": "Language Menu",
  "nav.currentLanguage": "Current Language",
  "nav.toggleMenu": "Toggle Menu",

  // Hero Section
  "hero.title": "Explore the Magic of Rhythm in Music",
  "hero.description":
    "FiddleBops is an innovative rhythm game that lets you discover endless possibilities in music. Experience the joy of music creation through simple and intuitive controls.",
  "hero.startGame": "Start Game",
  "hero.learnMore": "Learn More",
  "hero.actions": "Hero Actions",
  "hero.startGameDescription": "Click to start playing the game",
  "hero.learnMoreDescription": "Learn more about game features",

  // Features Section
  "features.title": "Game Features",
  "features.subtitle": "Explore the unique gaming experience of FiddleBops",
  "features.gameplay.title": "Intuitive Gameplay",
  "features.gameplay.description":
    "Simple and easy-to-learn controls let you focus on the joy of music creation.",
  "features.music.title": "Rich Musical Elements",
  "features.music.description":
    "Diverse musical materials and rhythm combinations to inspire your creativity.",
  "features.feedback.title": "Real-time Feedback",
  "features.feedback.description":
    "Instant visual and auditory feedback helps you better understand musical rhythm.",
  "features.difficulty.title": "Progressive Difficulty",
  "features.difficulty.description":
    "Level design from simple to complex helps you improve your skills gradually.",

  // FAQ Section
  "faq.title": "FAQ",
  "faq.subtitle": "Learn more about FiddleBops",
  "faq.q1": "How do I start playing?",
  "faq.a1":
    "Simply click the Start Game button, and the game will load directly in your browser. No download or installation required.",
  "faq.q2": "What devices are supported?",
  "faq.a2":
    "FiddleBops supports all modern browsers, including desktop, tablet, and mobile. We recommend using the latest version of Chrome, Firefox, or Safari.",
  "faq.q3": "How do I control the game?",
  "faq.a3":
    "The game controls will be shown in-game. Follow the on-screen instructions to learn how to play.",
  "faq.q4": "Do I need musical background?",
  "faq.a4":
    "No! FiddleBops is designed for everyone, whether you're a music novice or a professional.",
  "faq.q5": "Is the game multiplayer?",
  "faq.a5":
    "Currently, the game supports single-player mode. Multiplayer mode is under development. Future versions will support online battles and cooperative modes.",
  "faq.q6": "Is the game paid?",
  "faq.a6":
    "FiddleBops is a completely free game. We believe that the charm of music should be experienced by more people. There are no paid contents or ads in the game.",
  "faq.q7": "How do I save game progress?",
  "faq.a7":
    "The game automatically saves your progress, including unlocked levels, achievements, and highest scores. You can close the game at any time and continue playing next time.",
  "faq.q8": "How do I get help if I encounter problems?",
  "faq.a8":
    "You can get support from the help center in the game or join our Discord community for help. Our development team and community members are happy to answer your questions.",
  "faq.expanded": "Question expanded, press Enter to collapse",
  "faq.collapsed": "Question collapsed, press Enter to expand",
  "faq.navigate": "Use arrow keys to navigate between questions",
  "faq.list": "Frequently Asked Questions List",
  "faq.press_enter": "Press Enter to toggle answer",

  // Footer Section
  "footer.explore": "Explore the infinite possibilities",
  "footer.game": "Game",
  "footer.features": "Features",
  "footer.faq": "FAQ",
  "footer.community": "Community",
  "footer.support": "Support",
  "footer.helpCenter": "Help Center",
  "footer.contact": "Contact Us",
  "footer.feedback": "Feedback",
  "footer.copyright": "© {year} FiddleBops. All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",

  // Game Section
  "game.loading": "Loading FiddleBops...",
  "game.frameTitle": "FiddleBops - A Musical Creation Game",
  "game.frameDescription":
    "Interactive music creation interface based on Incredibox",
  "game.controls": "Game Controls",
  "game.skipGame": "Skip Game Section",
  "game.instructions.title": "Game Instructions",
  "game.instructions.drag": "Drag and drop sound icons onto characters",
  "game.instructions.mix":
    "Mix different sound categories: Beats, Effects, Melodies, and Voices",
  "game.instructions.create": "Create your unique musical compositions",
  "game.instructions.unlock":
    "Discover special combinations to unlock animations",
  "game.instructions.desktop": "Use mouse to drag and drop on desktop",
  "game.instructions.mobile": "Use touch to drag and drop on mobile devices",
  "game.category.beats": "Beats",
  "game.category.effects": "Effects",
  "game.category.melodies": "Melodies",
  "game.category.voices": "Voices",
  "game.error": "Failed to load the game",
  "game.retry": "Retry",

  // Orientation Section
  "orientation.title": "Rotate your device for a better gaming experience",
  "orientation.rotate": "Rotate Screen",
  "orientation.continue": "Continue in Current Orientation",
  "orientation.remember": "Remember my choice",
  "game.instructions.createTitle": "🎮 How to Create",
  "game.instructions.soundTitle": "🎼 Sound Categories",
  "game.instructions.controlTitle": "💫 Controls",

  // Accessibility
  "a11y.skipToContent": "Skip to main content",

  // Error Pages
  error: {
    "404": {
      title: "Page Not Found",
      description: "Sorry, the page you are looking for does not exist.",
      message: "Sorry, the page you are looking for does not exist",
      help: "The page may have been moved or deleted. Let's get you back to the homepage!",
      home: "Back to Homepage",
    },
  },
} as const;
