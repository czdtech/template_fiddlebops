export class GameController {
  private wrapper: HTMLDivElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private error: HTMLDivElement | null = null;
  private cover: HTMLDivElement | null = null;
  private startButton: HTMLButtonElement | null = null;
  private maxRetries = 3;
  private retryCount = 0;
  private loadTimeout = 30000; // 30 seconds timeout
  private timeoutId: number | null = null;

  constructor() {
    this.init();
  }

  private init() {
    const wrapper = document.querySelector(
      ".game-wrapper"
    ) as HTMLDivElement | null;
    if (!wrapper) throw new Error("Game wrapper not found");
    this.wrapper = wrapper;

    const iframe = wrapper.querySelector(
      ".game-frame"
    ) as HTMLIFrameElement | null;
    if (!iframe) throw new Error("Game iframe not found");
    this.iframe = iframe;

    const error = wrapper.querySelector(
      ".error-message"
    ) as HTMLDivElement | null;
    if (!error) throw new Error("Error message element not found");
    this.error = error;

    const cover = document.querySelector(
      ".game-cover"
    ) as HTMLDivElement | null;
    if (!cover) throw new Error("Game cover not found");
    this.cover = cover;

    const startButton = document.querySelector(
      ".start-button"
    ) as HTMLButtonElement | null;
    if (!startButton) throw new Error("Start button not found");
    this.startButton = startButton;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.startButton || !this.iframe || !this.error) return;

    // 监听开始按钮
    this.startButton.addEventListener("click", () => this.startGame());

    // 监听 iframe 错误
    this.iframe.addEventListener("error", () => this.handleError());

    // 监听重试按钮
    const retryButton = this.error.querySelector("button");
    if (retryButton) {
      retryButton.addEventListener("click", () => this.retry());
    }

    // 监听 iframe 加载完成
    this.iframe.addEventListener("load", () => this.handleIframeLoad());
  }

  private startGame() {
    if (!this.cover || !this.iframe) return;

    // 隐藏封面
    this.cover.dataset.visible = "false";

    // 直接显示 iframe
    this.iframe.style.visibility = "visible";

    // 设置游戏 URL
    if (this.iframe.dataset.src) {
      this.iframe.src = this.iframe.dataset.src;
    }

    // 设置加载超时检查
    this.timeoutId = window.setTimeout(
      () => this.handleTimeout(),
      this.loadTimeout
    );
  }

  private handleIframeLoad() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private handleError() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.retryCount++;

    if (this.retryCount < this.maxRetries) {
      this.retry();
    } else {
      this.showError();
    }
  }

  private handleTimeout() {
    this.showError();
  }

  private retry() {
    if (!this.error || !this.iframe) return;

    this.error.style.display = "none";
    this.iframe.style.visibility = "visible";

    if (this.iframe.dataset.src) {
      this.iframe.src = this.iframe.dataset.src;
    }

    this.timeoutId = window.setTimeout(
      () => this.handleTimeout(),
      this.loadTimeout
    );
  }

  private showError() {
    if (!this.error || !this.iframe) return;

    this.error.style.display = "block";
    this.iframe.style.visibility = "hidden";
  }
}
