# 项目目录结构

```
.
├── src/
│   ├── components/
│   │   ├── a11y/                    # 无障碍组件
│   │   │   ├── KeyboardNav.astro    # 键盘导航支持
│   │   │   ├── LiveRegion.astro     # 实时区域通知
│   │   │   └── ScreenReader.astro   # 屏幕阅读器支持
│   │   ├── ui/                      # UI 组件
│   │   │   ├── Button.astro         # 按钮组件
│   │   │   ├── GameEmbed.astro      # 游戏嵌入容器（已优化）
│   │   │   ├── LanguageSelector.astro    # 语言选择器（已优化无障碍）
│   │   │   └── LoadingIndicator.astro    # 加载指示器
│   │   └── sections/                # 页面区块组件
│   │       ├── FAQ.astro           # FAQ 组件（已优化无障碍和焦点状态）
│   │       ├── Features.astro      # 特性展示（已优化）
│   │       ├── GameEmbed.astro     # 游戏嵌入（已优化）
│   │       └── Hero.astro          # 首页主视觉（已优化）
│   ├── config/                     # 配置文件
│   │   ├── env.ts                  # 环境变量配置
│   │   ├── game.ts                 # 游戏相关配置
│   │   ├── navigation.ts           # 导航配置
│   │   ├── site.ts                 # 站点配置
│   │   ├── theme.ts                # 主题配置
│   │   └── types.ts                # 类型定义
│   ├── i18n/                       # 国际化
│   │   ├── translations/           # 翻译文件
│   │   ├── utils.ts                # 工具函数（已优化类型）
│   │   └── config.ts               # 配置文件（已优化类型）
│   ├── layouts/                    # 布局模板
│   │   └── BaseLayout.astro        # 主布局（已优化）
│   ├── pages/                      # 页面
│   │   ├── [lang]/                # 多语言页面
│   │   │   └── index.astro        # 语言特定首页
│   │   ├── index.astro            # 默认首页
│   │   └── 404.astro              # 404错误页面
│   ├── styles/                     # 样式
│   │   └── global.css             # 全局样式
│   └── utils/                      # 工具函数
│       └── performance.ts          # 性能优化工具

├── public/                         # 静态资源
│   ├── fonts/                      # 字体文件
│   │   └── Inter/                 # Inter 字体文件
│   ├── images/                     # 图片资源（已优化）
│   │   └── FiddleBops.webp        # 游戏预览图（已优化）
│   └── site.webmanifest           # PWA 配置文件

├── tests/                          # 测试文件
│   ├── layout.spec.ts              # 布局测试
│   ├── visual.spec.ts              # 视觉测试
│   └── visual.spec.ts-snapshots/   # 视觉测试快照
│       ├── homepage-chromium-win32.png
│       ├── homepage-mobile-chromium-win32.png
│       └── features-section-chromium-win32.png

# 配置文件
├── .vscode/                        # VS Code 配置
│   └── extensions.json             # 推荐扩展
├── astro.config.mjs                # Astro 配置（已优化构建）
├── tailwind.config.cjs             # Tailwind 配置
├── tsconfig.json                   # TypeScript 配置（已优化）
├── package.json                    # 项目依赖（已迁移到 pnpm）
└── .gitignore                      # Git 忽略配置
```

## 文件说明

### 核心组件

- 所有 UI 组件已完成无障碍优化
- GameEmbed 组件支持响应式设计
- 语言选择器支持键盘导航
- FAQ 组件支持屏幕阅读器

### 配置文件

- TypeScript 配置已启用严格模式
- Astro 配置优化了构建性能
- Tailwind 配置包含自定义主题

### 测试文件

- 包含布局和视觉回归测试
- 支持移动端和桌面端测试
- 保存测试快照用于比对

### 性能优化

- 图片资源已优化
- 字体文件本地化
- 构建流程优化
- 代码分割优化

```

```
