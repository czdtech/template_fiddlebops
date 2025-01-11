/**
 * 可访问性工具函数
 * @description 提供一系列用于增强 Web 应用可访问性的工具函数
 */

// 键盘导航相关的键码
export type KeyCodeType = (typeof KeyCode)[keyof typeof KeyCode];
export const KeyCode = {
  TAB: "Tab",
  RETURN: "Enter",
  ESC: "Escape",
  SPACE: " ",
  PAGEUP: "PageUp",
  PAGEDOWN: "PageDown",
  END: "End",
  HOME: "Home",
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
} as const;

// ARIA角色
export type RoleType = (typeof Roles)[keyof typeof Roles];
export const Roles = {
  ALERT: "alert",
  ALERTDIALOG: "alertdialog",
  BUTTON: "button",
  CHECKBOX: "checkbox",
  DIALOG: "dialog",
  GRIDCELL: "gridcell",
  LINK: "link",
  LISTBOX: "listbox",
  MENU: "menu",
  MENUITEM: "menuitem",
  MENUITEMCHECKBOX: "menuitemcheckbox",
  MENUITEMRADIO: "menuitemradio",
  OPTION: "option",
  PROGRESSBAR: "progressbar",
  RADIO: "radio",
  RADIOGROUP: "radiogroup",
  SCROLLBAR: "scrollbar",
  SLIDER: "slider",
  SPINBUTTON: "spinbutton",
  STATUS: "status",
  TAB: "tab",
  TABLIST: "tablist",
  TABPANEL: "tabpanel",
  TEXTBOX: "textbox",
  TIMER: "timer",
  TOOLBAR: "toolbar",
  TOOLTIP: "tooltip",
  TREE: "tree",
  TREEGRID: "treegrid",
  TREEITEM: "treeitem",
} as const;

// 可聚焦元素选择器
const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * 验证 HTML 元素
 * @param element - 要验证的元素
 * @throws {Error} 如果元素为空或不是 HTMLElement
 */
function validateElement(
  element: HTMLElement | null
): asserts element is HTMLElement {
  if (!element) {
    throw new Error("元素不能为空");
  }
  if (!(element instanceof HTMLElement)) {
    throw new Error("无效的 HTML 元素");
  }
}

/**
 * 焦点管理
 * @description 提供焦点陷阱和焦点管理功能
 * @param element - 要管理焦点的容器元素
 * @returns 焦点管理对象
 */
export function manageFocus(element: HTMLElement) {
  validateElement(element);

  const focusableElements = element.querySelectorAll(FOCUSABLE_ELEMENTS);
  if (focusableElements.length === 0) {
    throw new Error("容器内没有可聚焦的元素");
  }

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  return {
    /** 第一个可聚焦元素 */
    firstFocusable,
    /** 最后一个可聚焦元素 */
    lastFocusable,
    /** 焦点陷阱处理函数 */
    trapFocus: (e: KeyboardEvent) => {
      if (e.key !== KeyCode.TAB) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    },
    /** 设置初始焦点 */
    setInitialFocus: () => {
      firstFocusable.focus();
    },
  };
}

/**
 * 可见性管理
 * @description 提供元素可见性和 ARIA 隐藏状态管理
 * @param element - 要管理可见性的元素
 * @returns 可见性管理对象
 */
export function manageVisibility(element: HTMLElement) {
  validateElement(element);

  return {
    /** 隐藏元素 */
    hide: () => {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    },
    /** 显示元素 */
    show: () => {
      element.setAttribute("aria-hidden", "false");
      element.style.display = "";
    },
    /** 切换元素可见性 */
    toggle: () => {
      const isHidden = element.getAttribute("aria-hidden") === "true";
      if (isHidden) {
        element.setAttribute("aria-hidden", "false");
        element.style.display = "";
      } else {
        element.setAttribute("aria-hidden", "true");
        element.style.display = "none";
      }
    },
    /** 检查元素是否隐藏 */
    isHidden: () => element.getAttribute("aria-hidden") === "true",
  };
}

/**
 * 实时区域管理
 * @description 提供 ARIA 实时区域管理，用于屏幕阅读器通知
 * @param element - 要管理的实时区域元素
 * @returns 实时区域管理对象
 */
export function manageLiveRegion(element: HTMLElement) {
  validateElement(element);

  return {
    /** 发布通知 */
    announce: (
      message: string,
      priority: "polite" | "assertive" = "polite"
    ) => {
      if (!message) {
        throw new Error("通知消息不能为空");
      }
      element.setAttribute("aria-live", priority);
      element.textContent = message;
    },
    /** 清除通知 */
    clear: () => {
      element.textContent = "";
    },
    /** 设置通知优先级 */
    setPriority: (priority: "polite" | "assertive") => {
      element.setAttribute("aria-live", priority);
    },
  };
}

/**
 * 标签和描述管理
 * @description 提供 ARIA 标签和描述管理
 * @param element - 要管理标签的元素
 * @returns 标签管理对象
 */
export function manageLabels(element: HTMLElement) {
  validateElement(element);

  return {
    /** 设置 ARIA 标签 */
    setLabel: (label: string) => {
      if (!label) {
        throw new Error("标签文本不能为空");
      }
      element.setAttribute("aria-label", label);
    },
    /** 设置标签引用 */
    setLabelledBy: (id: string) => {
      if (!id) {
        throw new Error("标签 ID 不能为空");
      }
      element.setAttribute("aria-labelledby", id);
    },
    /** 设置 ARIA 描述 */
    setDescription: (description: string) => {
      if (!description) {
        throw new Error("描述文本不能为空");
      }
      element.setAttribute("aria-description", description);
    },
    /** 设置描述引用 */
    setDescribedBy: (id: string) => {
      if (!id) {
        throw new Error("描述 ID 不能为空");
      }
      element.setAttribute("aria-describedby", id);
    },
    /** 移除标签 */
    removeLabel: () => {
      element.removeAttribute("aria-label");
      element.removeAttribute("aria-labelledby");
    },
    /** 移除描述 */
    removeDescription: () => {
      element.removeAttribute("aria-description");
      element.removeAttribute("aria-describedby");
    },
  };
}

/**
 * 状态管理
 * @description 提供 ARIA 状态管理
 * @param element - 要管理状态的元素
 * @returns 状态管理对象
 */
export function manageState(element: HTMLElement) {
  validateElement(element);

  return {
    /** 设置展开状态 */
    setExpanded: (expanded: boolean) => {
      element.setAttribute("aria-expanded", expanded.toString());
    },
    /** 设置选中状态 */
    setSelected: (selected: boolean) => {
      element.setAttribute("aria-selected", selected.toString());
    },
    /** 设置勾选状态 */
    setChecked: (checked: boolean) => {
      element.setAttribute("aria-checked", checked.toString());
    },
    /** 设置禁用状态 */
    setDisabled: (disabled: boolean) => {
      element.setAttribute("aria-disabled", disabled.toString());
      if (disabled) {
        element.setAttribute("tabindex", "-1");
      } else {
        element.removeAttribute("tabindex");
      }
    },
    /** 设置忙碌状态 */
    setBusy: (busy: boolean) => {
      element.setAttribute("aria-busy", busy.toString());
    },
    /** 获取展开状态 */
    isExpanded: () => element.getAttribute("aria-expanded") === "true",
    /** 获取选中状态 */
    isSelected: () => element.getAttribute("aria-selected") === "true",
    /** 获取勾选状态 */
    isChecked: () => element.getAttribute("aria-checked") === "true",
    /** 获取禁用状态 */
    isDisabled: () => element.getAttribute("aria-disabled") === "true",
    /** 获取忙碌状态 */
    isBusy: () => element.getAttribute("aria-busy") === "true",
  };
}

/**
 * 快捷键管理
 * @description 提供键盘快捷键管理
 * @param shortcuts - 快捷键配置对象
 * @returns 快捷键处理函数
 */
export function manageShortcuts(shortcuts: Record<KeyCodeType, () => void>) {
  if (!shortcuts || Object.keys(shortcuts).length === 0) {
    throw new Error("快捷键配置不能为空");
  }

  return (event: KeyboardEvent) => {
    const handler = shortcuts[event.key as KeyCodeType];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };
}
