import type { Feature, FeatureKey } from "./types";
import { isValidFeature } from "./types";
import { VALID_FEATURE_ICONS } from "@/config/constants";

/**
 * 游戏特性数据
 * 包含游戏的主要特点和描述
 */
const featuresData = [
  {
    title: "features.gameplay.title" as FeatureKey,
    description: "features.gameplay.description" as FeatureKey,
    icon: VALID_FEATURE_ICONS.GAMEPLAY,
  },
  {
    title: "features.music.title" as FeatureKey,
    description: "features.music.description" as FeatureKey,
    icon: VALID_FEATURE_ICONS.MUSIC,
  },
  {
    title: "features.feedback.title" as FeatureKey,
    description: "features.feedback.description" as FeatureKey,
    icon: VALID_FEATURE_ICONS.FEEDBACK,
  },
  {
    title: "features.difficulty.title" as FeatureKey,
    description: "features.difficulty.description" as FeatureKey,
    icon: VALID_FEATURE_ICONS.DIFFICULTY,
  },
] as const;

// 验证特性数据
try {
  featuresData.forEach((feature, index) => {
    try {
      isValidFeature(feature);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(
          `Feature validation failed at index ${index}:\n${err.message}`
        );
      }
      throw err;
    }
  });
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Features validation error:", err.message);
  }
  throw err;
}

/**
 * 导出特性数据
 * @constant
 * @type {readonly Feature[]}
 */
export const features: readonly Feature[] = featuresData;
