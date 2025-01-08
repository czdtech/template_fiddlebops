import { getImage } from "astro:assets";

export interface ImageOptimizationOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  format?: "avif" | "webp" | "png" | "jpg";
  quality?: number;
}

export async function optimizeImage({
  src,
  alt,
  width,
  height,
  format = "webp",
  quality = 80,
}: ImageOptimizationOptions) {
  try {
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
        loading: "lazy",
        decoding: "async",
      },
    };
  } catch (error) {
    console.error("图片优化失败:", error);
    // 返回原始图片作为后备方案
    return {
      src,
      attributes: {
        alt,
        width,
        height,
        loading: "lazy",
        decoding: "async",
      },
    };
  }
}

export function generateSrcSet(
  src: string,
  sizes: number[],
  format: "avif" | "webp" = "webp"
) {
  return sizes
    .map((size) => `${src}?w=${size}&format=${format} ${size}w`)
    .join(", ");
}

export function generateSizes(breakpoints: { [key: string]: number }) {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}px) ${size}px`)
    .join(", ");
}
