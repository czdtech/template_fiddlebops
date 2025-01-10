import { test, expect } from "@playwright/test";

test.describe("视觉回归测试", () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前都等待页面加载完成
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("首页布局", async ({ page }) => {
    // 进行视觉对比
    expect(
      await page.screenshot({
        fullPage: true,
        animations: "disabled",
      })
    ).toMatchSnapshot("homepage.png");
  });

  test("特性部分", async ({ page }) => {
    // 等待特性部分加载并滚动到可见区域
    const features = await page.locator("section#features").first();
    await features.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // 等待滚动动画完成

    // 获取特性部分的截图
    const screenshot = await features.screenshot({
      animations: "disabled",
    });

    expect(screenshot).toMatchSnapshot("features-section.png");
  });

  test("响应式布局测试 - 移动端", async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });

    // 重新加载页面以适应新的视口大小
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 进行移动端视觉对比
    expect(
      await page.screenshot({
        fullPage: true,
        animations: "disabled",
      })
    ).toMatchSnapshot("homepage-mobile.png");
  });
});
