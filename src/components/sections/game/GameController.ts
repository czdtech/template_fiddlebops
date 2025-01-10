import { defaultGameConfig, gameSelectors } from "@/config/game";

export class GameController {
  private wrapper: HTMLDivElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private error: HTMLDivElement | null = null;
  private cover: HTMLDivElement | null = null;
  private startButton: HTMLButtonElement | null = null;
  private retryCount = 0;
  private timeoutId: number | null = null;

  constructor() {
    this.init();
  }

  private init() {
    const wrapper = document.querySelector(
      gameSelectors.wrapper
    ) as HTMLDivElement | null;
    if (!wrapper) throw new Error("Game wrapper not found");
    this.wrapper = wrapper;

    const iframe = wrapper.querySelector(
      gameSelectors.iframe
    ) as HTMLIFrameElement | null;
    if (!iframe) throw new Error("Game iframe not found");
    this.iframe = iframe;

    const error = wrapper.querySelector(
      gameSelectors.error
    ) as HTMLDivElement | null;
    if (!error) throw new Error("Error message element not found");
    this.error = error;

    const cover = document.querySelector(
      gameSelectors.cover
    ) as HTMLDivElement | null;
    if (!cover) throw new Error("Game cover not found");
    this.cover = cover;

    const startButton = document.querySelector(
      gameSelectors.startButton
    ) as HTMLButtonElement | null;
    if (!startButton) throw new Error("Start button not found");
    this.startButton = startButton;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.startButton || !this.iframe || !this.cover) return;

    this.startButton.addEventListener("click", () => {
      this.startGame();
    });

    this.iframe.addEventListener("load", () => {
      this.handleGameLoad();
    });

    this.iframe.addEventListener("error", () => {
      this.handleError(defaultGameConfig.error.messages.generic);
    });
  }

  private startGame() {
    if (!this.iframe || !this.cover) return;

    // 显示游戏框架
    this.iframe.style.visibility = "visible";
    this.iframe.src = defaultGameConfig.url;

    // 隐藏封面
    this.cover.dataset.visible = "false";

    // 设置加载超时
    this.timeoutId = window.setTimeout(() => {
      this.handleError(defaultGameConfig.error.messages.timeout);
    }, defaultGameConfig.loading.timeout);
  }

  private handleGameLoad() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // 重置重试计数
    this.retryCount = 0;

    // 隐藏错误消息
    if (this.error) {
      this.error.style.display = "none";
    }
  }

  private handleError(message: string) {
    if (!this.error || !this.iframe) return;

    // 清除超时计时器
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // 显示错误消息
    this.error.style.display = "block";
    const messageElement = this.error.querySelector("p");
    if (messageElement) {
      messageElement.textContent = message;
    }

    // 隐藏游戏框架
    this.iframe.style.visibility = "hidden";
    this.iframe.src = "";

    // 处理重试
    const retryButton = this.error.querySelector(
      ".retry-button"
    ) as HTMLButtonElement;
    if (retryButton) {
      retryButton.onclick = () => {
        if (this.retryCount < defaultGameConfig.loading.maxRetries) {
          this.retryCount++;
          this.error!.style.display = "none";
          setTimeout(() => {
            this.startGame();
          }, defaultGameConfig.error.retryInterval);
        } else {
          this.handleError(defaultGameConfig.error.messages.generic);
        }
      };
    }
  }
}
