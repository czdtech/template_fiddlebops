// 性能指标类型定义
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputDelay extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LargestContentfulPaint extends PerformanceEntry {
  startTime: number;
  size: number;
  id: string;
  url: string;
  loadTime: number;
  renderTime: number;
  element?: Element;
}

// 核心性能指标类型
interface WebVitals {
  CLS: number; // Cumulative Layout Shift
  FID: number; // First Input Delay
  LCP: number; // Largest Contentful Paint
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
  INP: number; // Interaction to Next Paint
}

// 性能指标阈值
const PERFORMANCE_THRESHOLDS = {
  CLS: 0.1, // 好: 0-0.1, 需要改进: 0.1-0.25, 差: > 0.25
  FID: 100, // 好: 0-100ms, 需要改进: 100-300ms, 差: > 300ms
  LCP: 2500, // 好: 0-2.5s, 需要改进: 2.5-4s, 差: > 4s
  FCP: 1800, // 好: 0-1.8s, 需要改进: 1.8-3s, 差: > 3s
  TTFB: 800, // 好: 0-800ms, 需要改进: 800-1800ms, 差: > 1800ms
  INP: 200, // 好: 0-200ms, 需要改进: 200-500ms, 差: > 500ms
} as const;

// 性能评分等级
type PerformanceGrade = "good" | "needsImprovement" | "poor";

// 获取性能评分
function getPerformanceGrade(
  metric: keyof WebVitals,
  value: number
): PerformanceGrade {
  const threshold = PERFORMANCE_THRESHOLDS[metric];

  if (metric === "CLS") {
    if (value <= 0.1) return "good";
    if (value <= 0.25) return "needsImprovement";
    return "poor";
  }

  if (value <= threshold) return "good";
  if (value <= threshold * 2) return "needsImprovement";
  return "poor";
}

// 收集性能指标
export async function collectPerformanceMetrics(): Promise<Partial<WebVitals>> {
  if (typeof window === "undefined") return {};

  const metrics: Partial<WebVitals> = {};

  try {
    // 使用 Performance Observer API 收集指标
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const metricName = entry.name;
        let value: number;

        // 根据不同的性能指标类型获取对应的值
        if (entry.entryType === "layout-shift") {
          value = (entry as LayoutShift).value;
        } else if (entry.entryType === "first-input") {
          value =
            (entry as FirstInputDelay).processingStart -
            (entry as FirstInputDelay).startTime;
        } else if (entry.entryType === "largest-contentful-paint") {
          value = (entry as LargestContentfulPaint).startTime;
        } else if (entry.entryType === "paint") {
          value = entry.startTime;
        } else {
          value = entry.duration;
        }

        switch (metricName) {
          case "CLS":
            metrics.CLS = value;
            break;
          case "FID":
            metrics.FID = value;
            break;
          case "LCP":
            metrics.LCP = value;
            break;
          case "FCP":
            metrics.FCP = value;
            break;
          case "TTFB":
            metrics.TTFB = value;
            break;
          case "INP":
            metrics.INP = value;
            break;
        }
      });
    });

    // 观察所有性能指标
    observer.observe({
      entryTypes: [
        "paint",
        "largest-contentful-paint",
        "first-input",
        "layout-shift",
      ],
    });

    // 等待一段时间以收集数据
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return metrics;
  } catch (error) {
    console.error("性能指标收集失败:", error);
    return metrics;
  }
}

// 分析性能指标
export function analyzePerformance(metrics: Partial<WebVitals>): {
  scores: Record<keyof WebVitals, PerformanceGrade | undefined>;
  suggestions: string[];
} {
  const scores: Record<keyof WebVitals, PerformanceGrade | undefined> = {
    CLS: undefined,
    FID: undefined,
    LCP: undefined,
    FCP: undefined,
    TTFB: undefined,
    INP: undefined,
  };

  const suggestions: string[] = [];

  // 分析每个指标
  Object.entries(metrics).forEach(([metric, value]) => {
    const metricKey = metric as keyof WebVitals;
    const grade = getPerformanceGrade(metricKey, value);
    scores[metricKey] = grade;

    if (grade === "needsImprovement" || grade === "poor") {
      suggestions.push(getPerformanceSuggestion(metricKey, value));
    }
  });

  return { scores, suggestions };
}

// 获取性能改进建议
function getPerformanceSuggestion(
  metric: keyof WebVitals,
  value: number
): string {
  switch (metric) {
    case "CLS":
      return "建议优化页面布局稳定性，避免内容跳动。";
    case "FID":
      return "建议优化页面交互响应速度，减少主线程阻塞。";
    case "LCP":
      return "建议优化最大内容渲染时间，可以考虑使用图片懒加载和资源预加载。";
    case "FCP":
      return "建议优化首次内容渲染时间，可以考虑减小初始包大小和使用服务端渲染。";
    case "TTFB":
      return "建议优化服务器响应时间，可以考虑使用CDN和优化服务器配置。";
    case "INP":
      return "建议优化页面交互性能，减少复杂计算和DOM操作。";
    default:
      return "建议进行全面的性能优化。";
  }
}
