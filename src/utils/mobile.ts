/**
 * 移动设备工具函数
 * @description 提供设备检测、屏幕方向管理和设备特性检查的工具函数
 */

// 设备类型
export const DeviceType = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

// 屏幕方向
export const ScreenOrientation = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape",
} as const;

export type ScreenOrientation =
  (typeof ScreenOrientation)[keyof typeof ScreenOrientation];

// 屏幕锁定方向
export const LockOrientation = {
  PORTRAIT: "portrait-primary",
  LANDSCAPE: "landscape-primary",
} as const;

export type LockOrientation =
  (typeof LockOrientation)[keyof typeof LockOrientation];

/**
 * 检测是否为移动设备
 * @description 通过 User Agent 检测是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

/**
 * 检测设备方向
 * @description 通过窗口尺寸检测设备方向
 * @returns {ScreenOrientation} 设备方向
 */
export const getDeviceOrientation = (): ScreenOrientation => {
  if (typeof window === "undefined") return ScreenOrientation.PORTRAIT;
  return window.innerWidth > window.innerHeight
    ? ScreenOrientation.LANDSCAPE
    : ScreenOrientation.PORTRAIT;
};

/**
 * 锁定屏幕方向
 * @description 尝试锁定屏幕到指定方向
 * @param {ScreenOrientation} orientation - 目标方向
 * @returns {Promise<boolean>} 是否成功锁定
 * @throws {Error} 如果设备不支持或权限被拒绝
 */
export const lockScreenOrientation = async (
  orientation: ScreenOrientation
): Promise<boolean> => {
  if (typeof window === "undefined") {
    throw new Error("仅在浏览器环境中可用");
  }

  try {
    if (!("screen" in window) || !("orientation" in (window.screen as any))) {
      throw new Error("设备不支持屏幕方向锁定");
    }

    const screenOrientation = window.screen as any;
    if (!screenOrientation.orientation?.lock) {
      throw new Error("设备不支持屏幕方向锁定");
    }

    await screenOrientation.orientation.lock(
      orientation === ScreenOrientation.PORTRAIT
        ? LockOrientation.PORTRAIT
        : LockOrientation.LANDSCAPE
    );
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`屏幕方向锁定失败: ${error.message}`);
    } else {
      console.warn("屏幕方向锁定失败或权限被拒绝");
    }
    return false;
  }
};

/**
 * 监听屏幕方向变化
 * @description 添加屏幕方向变化的事件监听
 * @param {function} callback - 方向变化时的回调函数
 * @returns {function} 清理函数
 */
export const onOrientationChange = (
  callback: (orientation: ScreenOrientation) => void
): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    callback(getDeviceOrientation());
  };

  // 同时监听 resize 和 orientationchange 事件
  window.addEventListener("resize", handler);
  window.addEventListener("orientationchange", handler);

  return () => {
    window.removeEventListener("resize", handler);
    window.removeEventListener("orientationchange", handler);
  };
};

/**
 * 获取设备类型
 * @description 通过 User Agent 检测设备类型
 * @returns {DeviceType} 设备类型
 */
export const getDeviceType = (): DeviceType => {
  if (typeof window === "undefined") return DeviceType.DESKTOP;

  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return DeviceType.TABLET;
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return DeviceType.MOBILE;
  }
  return DeviceType.DESKTOP;
};

/**
 * 检查是否支持触摸
 * @description 检测设备是否支持触摸输入
 * @returns {boolean} 是否支持触摸
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - 某些浏览器支持
    (window.DocumentTouch && document instanceof DocumentTouch)
  );
};

/**
 * 获取设备像素比
 * @description 获取设备的物理像素与CSS像素的比值
 * @returns {number} 设备像素比
 */
export const getDevicePixelRatio = (): number => {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
};

/**
 * 检查是否支持某个特定的触摸事件
 * @description 检测设备是否支持指定的触摸事件
 * @param {string} eventName - 事件名称
 * @returns {boolean} 是否支持该事件
 */
export const isTouchEventSupported = (eventName: string): boolean => {
  if (typeof window === "undefined") return false;
  return eventName in window;
};

/**
 * 获取设备内存大小
 * @description 获取设备的内存容量（如果可用）
 * @returns {number} 内存大小（GB），如果不可用则返回 undefined
 */
export const getDeviceMemory = (): number | undefined => {
  if (typeof window === "undefined") return undefined;
  // @ts-ignore - 某些浏览器支持
  return navigator.deviceMemory;
};

/**
 * 检查是否支持某个特定的硬件特性
 * @description 检测设备是否支持指定的硬件特性（如陀螺仪、加速度计等）
 * @param {string} feature - 特性名称
 * @returns {Promise<boolean>} 是否支持该特性
 */
export const isHardwareFeatureSupported = async (
  feature: string
): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  if (!("permissions" in navigator)) return false;

  try {
    const permission = await navigator.permissions.query({
      name: feature as PermissionName,
    });
    return permission.state !== "denied";
  } catch {
    return false;
  }
};
