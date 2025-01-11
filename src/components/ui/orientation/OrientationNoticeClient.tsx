import type { ChangeEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import {
  onOrientationChange,
  getDeviceOrientation,
  lockScreenOrientation,
} from "@/utils/mobile";

const ORIENTATION_PREFERENCE_KEY = "game-orientation-preference";
const REMEMBER_PREFERENCE_KEY = "remember-orientation-choice";

interface OrientationTranslations {
  title: string;
  rotateAction: string;
  continueAction: string;
  rememberChoice: string;
}

interface OrientationNoticeProps {
  translations: OrientationTranslations;
}

export default function OrientationNoticeClient({
  translations,
}: OrientationNoticeProps): ReactElement | null {
  const [isVisible, setIsVisible] = useState(true);
  const [rememberChoice, setRememberChoice] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem(ORIENTATION_PREFERENCE_KEY);
    const shouldRemember =
      localStorage.getItem(REMEMBER_PREFERENCE_KEY) === "true";

    if (shouldRemember && savedPreference === "continue") {
      setIsVisible(false);
    }

    const updateOrientation = () => {
      const currentOrientation = getDeviceOrientation();
      if (shouldRemember && savedPreference === "continue") {
        return;
      }
      setIsVisible(currentOrientation === "portrait");
    };

    updateOrientation();
    return onOrientationChange(updateOrientation);
  }, []);

  const handleRotate = async () => {
    if (rememberChoice) {
      localStorage.setItem(ORIENTATION_PREFERENCE_KEY, "rotate");
      localStorage.setItem(REMEMBER_PREFERENCE_KEY, "true");
    }
    await lockScreenOrientation("landscape");
    setIsVisible(false);
  };

  const handleContinue = () => {
    if (rememberChoice) {
      localStorage.setItem(ORIENTATION_PREFERENCE_KEY, "continue");
      localStorage.setItem(REMEMBER_PREFERENCE_KEY, "true");
    }
    setIsVisible(false);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberChoice(e.target.checked);
  };

  if (!isVisible) return null;

  return (
    <div
      className="orientation-notice"
      data-orientation="portrait"
      role="alertdialog"
      aria-modal="true"
      aria-label={translations.title}
      aria-describedby="orientation-description"
    >
      <div className="notice-content">
        <svg
          className="rotate-icon"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"
          />
        </svg>
        <p id="orientation-description">{translations.title}</p>
        <div className="notice-actions">
          <button
            className="action-button rotate-action"
            onClick={handleRotate}
            aria-label={translations.rotateAction}
          >
            {translations.rotateAction}
          </button>
          <button
            className="action-button continue-action"
            onClick={handleContinue}
            aria-label={translations.continueAction}
          >
            {translations.continueAction}
          </button>
        </div>
        <label className="remember-choice">
          <input
            type="checkbox"
            className="remember-checkbox"
            checked={rememberChoice}
            onChange={handleRememberChange}
            aria-label={translations.rememberChoice}
          />
          <span>{translations.rememberChoice}</span>
        </label>
      </div>
    </div>
  );
}
