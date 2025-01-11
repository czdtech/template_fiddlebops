/**
 * 图片处理工具函数
 * @description 提供图片优化、srcset生成和响应式尺寸计算的工具函数
 */

import { getImage } from "astro:assets";
import type {
  ValidImageFormat,
  ImageQuality,
  BreakpointConfig,
} from "@/config/types";
import { isValidImageQuality } from "@/config/types";

// 图片格式
export const ImageFormat = {
  AVIF: "avif",
  WEBP: "webp",
  PNG: "png",
  JPG: "jpg",
} as const satisfies Record<string, ValidImageFormat>;

export type ImageFormat = (typeof ImageFormat)[keyof typeof ImageFormat];

// 图片加载策略
export const LoadingStrategy = {
  LAZY: "lazy",
  EAGER: "eager",
} as const;

export type LoadingStrategy =
  (typeof LoadingStrategy)[keyof typeof LoadingStrategy];

// 图片解码策略
export const DecodingStrategy = {
  ASYNC: "async",
  SYNC: "sync",
  AUTO: "auto",
} as const;

export type DecodingStrategy =
  (typeof DecodingStrategy)[keyof typeof DecodingStrategy];

export interface ImageOptimizationOptions {
  /** 图片源路径 */
  src: string;
  /** 图片替代文本 */
  alt: string;
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
  /** 输出格式 */
  format?: ImageFormat;
  /** 图片质量 (1-100) */
  quality?: number;
  /** 加载策略 */
  loading?: LoadingStrategy;
  /** 解码策略 */
  decoding?: DecodingStrategy;
}

/**
 * 验证图片优化选项
 * @throws {Error} 如果选项无效
 */
function validateOptions(options: ImageOptimizationOptions): void {
  if (!options.src) {
    throw new Error("图片源路径不能为空");
  }
  if (!options.alt) {
    throw new Error("图片替代文本不能为空");
  }
  if (options.width && options.width <= 0) {
    throw new Error("图片宽度必须大于0");
  }
  if (options.height && options.height <= 0) {
    throw new Error("图片高度必须大于0");
  }
  if (options.quality && !isValidImageQuality(options.quality)) {
    throw new Error("图片质量必须在1-100之间");
  }
}

/**
 * 优化图片
 * @description 使用 Astro 的图片优化功能处理图片
 * @throws {Error} 如果图片优化失败
 */
export async function optimizeImage({
  src,
  alt,
  width,
  height,
  format = ImageFormat.WEBP,
  quality = 80,
  loading = LoadingStrategy.LAZY,
  decoding = DecodingStrategy.ASYNC,
}: ImageOptimizationOptions) {
  try {
    validateOptions({ src, alt, width, height, format, quality });

    const optimizedImage = await getImage({
      src,
      width,
      height,
      format,
      quality,
    });

    return {
      src: optimizedImage.src,
      attributes: {
        alt,
        width: optimizedImage.attributes.width,
        height: optimizedImage.attributes.height,
        loading,
        decoding,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`图片优化失败: ${error.message}`);
    } else {
      console.error("图片优化失败:", error);
    }
    // 返回原始图片作为后备方案
    return {
      src,
      attributes: {
        alt,
        width,
        height,
        loading,
        decoding,
      },
    };
  }
}

/**
 * 生成 srcset 属性
 * @description 为响应式图片生成 srcset 属性值
 * @throws {Error} 如果参数无效
 */
export function generateSrcSet(
  src: string,
  sizes: number[],
  format: ImageFormat = ImageFormat.WEBP
): string {
  if (!src) {
    throw new Error("图片源路径不能为空");
  }
  if (!sizes.length) {
    throw new Error("尺寸数组不能为空");
  }
  if (sizes.some((size) => size <= 0)) {
    throw new Error("所有尺寸必须大于0");
  }

  return sizes
    .map((size) => `${src}?w=${size}&format=${format} ${size}w`)
    .join(", ");
}

/**
 * 生成 sizes 属性
 * @description 为响应式图片生成 sizes 属性值
 * @throws {Error} 如果断点配置无效
 */
export function generateSizes(breakpoints: BreakpointConfig): string {
  if (!breakpoints || Object.keys(breakpoints).length === 0) {
    throw new Error("断点配置不能为空");
  }

  const entries = Object.entries(breakpoints);
  if (entries.some(([_, size]) => typeof size !== "number" || size <= 0)) {
    throw new Error("所有尺寸必须大于0");
  }

  return entries
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}px) ${size}px`)
    .join(", ");
}
