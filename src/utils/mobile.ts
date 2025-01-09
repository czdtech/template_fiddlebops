// 检测是否为移动设备
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

// 检测设备方向
export const getDeviceOrientation = (): "portrait" | "landscape" => {
  if (typeof window === "undefined") return "portrait";
  return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
};

// 锁定屏幕方向
export const lockScreenOrientation = async (
  orientation: "portrait" | "landscape"
): Promise<boolean> => {
  try {
    if ("screen" in window && "orientation" in window.screen) {
      const screenOrientation = window.screen as any;
      if (screenOrientation.orientation && screenOrientation.orientation.lock) {
        await screenOrientation.orientation.lock(
          orientation === "portrait" ? "portrait-primary" : "landscape-primary"
        );
        return true;
      }
    }
    return false;
  } catch (error) {
    console.warn("Screen orientation lock not supported or permission denied");
    return false;
  }
};

// 监听屏幕方向变化
export const onOrientationChange = (
  callback: (orientation: "portrait" | "landscape") => void
): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    callback(getDeviceOrientation());
  };

  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
};

// 获取设备类型
export const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

// 检查是否支持触摸
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// 获取设备像素比
export const getDevicePixelRatio = (): number => {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
};
