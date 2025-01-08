// 键盘导航相关的键码
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

// 焦点管理
export function manageFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  return {
    firstFocusable,
    lastFocusable,
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
  };
}

// 可见性管理
export function manageVisibility(element: HTMLElement) {
  return {
    hide: () => {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    },
    show: () => {
      element.setAttribute("aria-hidden", "false");
      element.style.display = "";
    },
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
  };
}

// 实时区域管理
export function manageLiveRegion(element: HTMLElement) {
  return {
    announce: (
      message: string,
      priority: "polite" | "assertive" = "polite"
    ) => {
      element.setAttribute("aria-live", priority);
      element.textContent = message;
    },
    clear: () => {
      element.textContent = "";
    },
  };
}

// 标签和描述管理
export function manageLabels(element: HTMLElement) {
  return {
    setLabel: (label: string) => {
      element.setAttribute("aria-label", label);
    },
    setLabelledBy: (id: string) => {
      element.setAttribute("aria-labelledby", id);
    },
    setDescription: (description: string) => {
      element.setAttribute("aria-description", description);
    },
    setDescribedBy: (id: string) => {
      element.setAttribute("aria-describedby", id);
    },
  };
}

// 状态管理
export function manageState(element: HTMLElement) {
  return {
    setExpanded: (expanded: boolean) => {
      element.setAttribute("aria-expanded", expanded.toString());
    },
    setSelected: (selected: boolean) => {
      element.setAttribute("aria-selected", selected.toString());
    },
    setChecked: (checked: boolean) => {
      element.setAttribute("aria-checked", checked.toString());
    },
    setDisabled: (disabled: boolean) => {
      element.setAttribute("aria-disabled", disabled.toString());
      if (disabled) {
        element.setAttribute("tabindex", "-1");
      } else {
        element.removeAttribute("tabindex");
      }
    },
    setBusy: (busy: boolean) => {
      element.setAttribute("aria-busy", busy.toString());
    },
  };
}

// 快捷键管理
export function manageShortcuts(shortcuts: Record<string, () => void>) {
  return (event: KeyboardEvent) => {
    const handler = shortcuts[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };
}
