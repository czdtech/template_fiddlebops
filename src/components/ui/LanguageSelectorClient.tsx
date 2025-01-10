import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Language } from "@/i18n/types";

interface LanguageOption {
  langCode: Language;
  name: string;
  locale: string;
}

interface LanguageSelectorProps {
  currentLang: Language;
  languages: Record<
    Language,
    {
      name: string;
      code: Language;
      locale: string;
    }
  >;
  translations: {
    changeLanguage: string;
    languageMenu: string;
    currentLanguage: string;
  };
  paths: Record<Language, string>;
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
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 缓存语言选项列表
  const languageOptions = useMemo<LanguageOption[]>(() => {
    return Object.entries(languages).map(([langCode, langInfo]) => ({
      langCode: langCode as Language,
      name: langInfo.name,
      locale: langInfo.locale,
    }));
  }, [languages]);

  // 处理点击外部关闭
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }, []);

  // 处理 ESC 键关闭
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      buttonRef.current?.focus();
    }
  }, []);

  // 处理键盘导航
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
        return;
      }

      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev < languageOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : languageOptions.length - 1
          );
          break;
        case "Home":
          event.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          event.preventDefault();
          setActiveIndex(languageOptions.length - 1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (activeIndex >= 0 && activeIndex < languageOptions.length) {
            const option = languageOptions[activeIndex];
            if (option && option.langCode) {
              window.location.href = paths[option.langCode];
            }
          }
          break;
      }
    },
    [isOpen, languageOptions, paths]
  );

  // 设置事件监听
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isOpen, handleClickOutside, handleEscKey]);

  // 焦点管理
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
      if (menuItems && menuItems[activeIndex]) {
        (menuItems[activeIndex] as HTMLElement).focus();
      }
    }
  }, [isOpen, activeIndex]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    setActiveIndex(-1);
  }, []);

  return (
    <div
      ref={containerRef}
      className="language-selector"
      data-open={isOpen}
      role="navigation"
      aria-label={translations.languageMenu}
    >
      <button
        ref={buttonRef}
        className="language-button"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="language-menu"
        aria-label={translations.changeLanguage}
      >
        <span>{languages[currentLang].name}</span>
        <span className="arrow" aria-hidden="true">
          ▼
        </span>
      </button>

      <div
        id="language-menu"
        ref={menuRef}
        className="language-dropdown"
        role="menu"
        aria-label={translations.languageMenu}
        onKeyDown={handleKeyDown}
      >
        {languageOptions.map((lang, index) => (
          <a
            key={lang.langCode}
            href={paths[lang.langCode]}
            className={`language-link ${
              lang.langCode === currentLang ? "active" : ""
            }`}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            aria-current={lang.langCode === currentLang ? "page" : undefined}
            aria-selected={index === activeIndex}
          >
            {lang.name}
            {lang.langCode === currentLang && (
              <span className="sr-only">({translations.currentLanguage})</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
