import { useEffect, useRef, useState } from "react";

interface LanguageSelectorProps {
  currentLang: string;
  languages: Record<string, string>;
  translations: {
    changeLanguage: string;
    languageMenu: string;
  };
  paths: Record<string, string>;
}

export default function LanguageSelectorClient({
  currentLang,
  languages,
  translations,
  paths,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div ref={containerRef} className="language-selector" data-open={isOpen}>
      <button
        ref={buttonRef}
        className="language-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="language-dropdown"
        aria-label={translations.changeLanguage}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{languages[currentLang]}</span>
        <svg
          className="arrow"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      <div
        id="language-dropdown"
        className="language-dropdown"
        role="menu"
        aria-label={translations.languageMenu}
      >
        {Object.entries(languages).map(([code, label]) => (
          <a
            key={code}
            href={paths[code]}
            className={`language-link ${code === currentLang ? "active" : ""}`}
            role="menuitem"
            aria-current={code === currentLang ? "true" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
