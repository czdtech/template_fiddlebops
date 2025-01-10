import { test, expect } from "@playwright/test";

test("布局和可访问性测试", async ({ page }) => {
  await page.goto("http://localhost:4321");

  // 检查文本对比度
  const textElements = await page.locator("text").all();
  for (const element of textElements) {
    const colors = await element.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        bgColor: style.backgroundColor,
      };
    });
    console.log("Text element colors:", colors);
  }

  // 检查元素可见性和重叠
  await test.step("检查元素可见性和重叠", async () => {
    // 检查主要导航元素是否可见
    await expect(page.locator("header.header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // 检查所有特性卡片是否可见且不重叠
    const featureCards = await page.locator(".feature-card").all();
    for (const card of featureCards) {
      await expect(card).toBeVisible();

      // 获取当前卡片的边界框
      const box = await card.boundingBox();
      if (!box) continue;

      // 检查与其他卡片是否重叠
      for (const otherCard of featureCards) {
        if (card === otherCard) continue;
        const otherBox = await otherCard.boundingBox();
        if (!otherBox) continue;

        // 简单的重叠检测
        const isOverlapping = !(
          box.x + box.width < otherBox.x ||
          box.x > otherBox.x + otherBox.width ||
          box.y + box.height < otherBox.y ||
          box.y > otherBox.y + otherBox.height
        );

        expect(isOverlapping).toBeFalsy();
      }
    }
  });

  // 检查响应式布局断点
  await test.step("检查响应式布局断点", async () => {
    // 移动端视图
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // 等待布局调整

    // 检查游戏区域封面在移动端的显示
    await test.step("检查游戏区域封面在移动端的显示", async () => {
      // 检查游戏区域标题是否完全可见
      const gameTitle = page.locator(".cover-title");
      await expect(gameTitle).toBeVisible();

      // 检查游戏描述文本是否完全可见
      const gameDesc = page.locator(".cover-description");
      await expect(gameDesc).toBeVisible();

      // 检查开始游戏按钮是否完全可见且可点击
      const startButton = page.locator(".start-button");
      await expect(startButton).toBeVisible();

      // 获取按钮的边界框，确保它完全在视口内
      const buttonBox = await startButton.boundingBox();
      if (buttonBox) {
        const viewport = { width: 375, height: 667 };
        const isFullyVisible =
          buttonBox.x >= 0 &&
          buttonBox.y >= 0 &&
          buttonBox.x + buttonBox.width <= viewport.width &&
          buttonBox.y + buttonBox.height <= viewport.height;
        expect(
          isFullyVisible,
          "Start按钮在移动端视图中被部分遮挡"
        ).toBeTruthy();
      }

      // 检查游戏区域是否有适当的内边距，防止内容被遮挡
      const gameCover = page.locator(".game-cover");
      const coverBox = await gameCover.boundingBox();
      if (coverBox) {
        const minPadding = 16; // 最小内边距
        const style = await gameCover.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            paddingTop: parseInt(computed.paddingTop),
            paddingBottom: parseInt(computed.paddingBottom),
          };
        });

        expect(
          style.paddingTop >= minPadding,
          "游戏区域顶部内边距不足"
        ).toBeTruthy();
        expect(
          style.paddingBottom >= minPadding,
          "游戏区域底部内边距不足"
        ).toBeTruthy();

        // 检查内容区域是否有足够的空间
        const coverContent = page.locator(".cover-content");
        const contentBox = await coverContent.boundingBox();
        if (contentBox) {
          const hasEnoughSpace =
            contentBox.y >= coverBox.y + minPadding &&
            contentBox.y + contentBox.height <=
              coverBox.y + coverBox.height - minPadding;
          expect(hasEnoughSpace, "游戏区域内容空间不足").toBeTruthy();
        }
      }
    });

    await expect(page.locator("section#features")).toBeVisible();

    // 检查所有特性卡片在移动端是否正确显示
    const mobileCards = await page.locator(".feature-card").all();
    for (const card of mobileCards) {
      await expect(card).toBeVisible();
    }

    // 平板视图
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(page.locator("section#features")).toBeVisible();

    // 检查所有特性卡片在平板端是否正确显示
    const tabletCards = await page.locator(".feature-card").all();
    for (const card of tabletCards) {
      await expect(card).toBeVisible();
    }

    // 桌面视图
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(500);
    await expect(page.locator("section#features")).toBeVisible();

    // 检查所有特性卡片在桌面端是否正确显示
    const desktopCards = await page.locator(".feature-card").all();
    for (const card of desktopCards) {
      await expect(card).toBeVisible();
    }
  });
});
