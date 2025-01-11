# 项目目录结构

```
fiddlebops/
├── src/                       # 源代码目录
│   ├── assets/               # 资源文件
│   │   └── logo.svg         # 项目 Logo
│   │
│   ├── components/          # 组件目录
│   │   ├── a11y/           # 无障碍组件
│   │   │   ├── KeyboardNav.astro
│   │   │   ├── LiveRegion.astro
│   │   │   └── ScreenReader.astro
│   │   │
│   │   ├── i18n/           # 国际化组件
│   │   │   └── LanguageContext.astro
│   │   │
│   │   ├── layout/         # 布局组件
│   │   │   ├── Container.astro
│   │   │   ├── Footer.astro
│   │   │   └── Header.astro
│   │   │
│   │   ├── sections/       # 页面区块组件
│   │   │   ├── game/
│   │   │   │   └── GameController.ts
│   │   │   ├── FAQ.astro
│   │   │   ├── Features.astro
│   │   │   ├── GameEmbed.astro
│   │   │   └── Hero.astro
│   │   │
│   │   └── ui/            # UI 组件
│   │       ├── controls/
│   │       │   └── ControlsGuide.astro
│   │       ├── orientation/
│   │       │   ├── OrientationNotice.astro
│   │       │   └── OrientationNoticeClient.tsx
│   │       ├── Button.astro
│   │       ├── GameControls.astro
│   │       ├── GamePreview.astro
│   │       ├── LanguageSelector.astro
│   │       └── LanguageSelectorClient.tsx
│   │
│   ├── config/            # 配置文件
│   │   ├── env.ts        # 环境变量配置
│   │   ├── game.ts       # 游戏相关配置
│   │   ├── navigation.ts # 导航配置
│   │   ├── site.ts       # 站点配置
│   │   ├── theme.ts      # 主题配置
│   │   └── types.ts      # 类型定义
│   │
│   ├── data/             # 数据文件
│   │   ├── faqs.ts      # FAQ 数据
│   │   ├── features.ts  # 特性数据
│   │   ├── social.ts    # 社交媒体数据
│   │   └── types.ts     # 数据类型定义
│   │
│   ├── i18n/            # 国际化
│   │   ├── translations/
│   │   │   ├── en.ts   # 英文翻译
│   │   │   └── zh.ts   # 中文翻译
│   │   ├── check-translations.ts
│   │   ├── config.ts
│   │   ├── dev-utils.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   │
│   ├── layouts/         # 布局模板
│   │   └── BaseLayout.astro
│   │
│   ├── pages/          # 页面
│   │   ├── [lang]/
│   │   │   └── index.astro
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── robots.txt.ts
│   │   └── sitemap.xml.ts
│   │
│   ├── styles/         # 样式
│   │   └── global.css
│   │
│   ├── utils/         # 工具函数
│   │   ├── a11y.ts
│   │   ├── image.ts
│   │   ├── mobile.ts
│   │   ├── performance.ts
│   │   ├── preload.ts
│   │   └── schema.ts
│   │
│   └── env.d.ts       # 环境类型声明
│
├── public/           # 静态资源
│   ├── fonts/
│   │   └── Bangers-Regular.woff2
│   ├── images/
│   │   └── FiddleBops.webp
│   ├── browserconfig.xml
│   ├── favicon.svg
│   ├── humans.txt
│   ├── logo.svg
│   ├── manifest.json
│   ├── og.svg
│   ├── robots.txt
│   └── site.webmanifest
│
├── tests/           # 测试文件
│   ├── layout.spec.ts
│   ├── visual.spec.ts
│   └── visual.spec.ts-snapshots/
│       ├── homepage-chromium-win32.png
│       ├── homepage-mobile-chromium-win32.png
│       └── features-section-chromium-win32.png
│
├── .astro/         # Astro 构建输出
├── .vscode/        # VS Code 配置
├── node_modules/   # 依赖包
├── playwright-report/ # Playwright 测试报告
├── test-results/   # 测试结果
│
├── .cursorrules    # Cursor 配置规则
├── .env           # 环境变量
├── .gitignore     # Git 忽略配置
├── DEVELOPMENT.md # 开发文档
├── README.md      # 项目说明
├── astro.config.mjs # Astro 配置
├── code-review-progress.md # 代码审查进度
├── directory-tree.md # 目录结构文档
├── package.json   # 项目配置
├── playwright.config.ts # Playwright 配置
├── pnpm-lock.yaml # pnpm 锁文件
├── postcss.config.cjs # PostCSS 配置
├── tailwind.config.mjs # Tailwind 配置
└── tsconfig.json  # TypeScript 配置
```

## 目录说明

### 源代码目录 (src/)

#### 组件目录 (components/)

- `a11y/`: 无障碍相关组件
- `i18n/`: 国际化相关组件
- `layout/`: 布局相关组件
- `sections/`: 页面区块组件
- `ui/`: UI 通用组件

#### 配置目录 (config/)

- `env.ts`: 环境变量配置
- `game.ts`: 游戏相关配置
- `navigation.ts`: 导航配置
- `site.ts`: 站点配置
- `theme.ts`: 主题配置
- `types.ts`: 类型定义

#### 数据目录 (data/)

- `faqs.ts`: FAQ 数据
- `features.ts`: 特性数据
- `social.ts`: 社交媒体数据
- `types.ts`: 数据类型定义

#### 国际化目录 (i18n/)

- `translations/`: 翻译文件
- `check-translations.ts`: 翻译检查工具
- `config.ts`: 国际化配置
- `dev-utils.ts`: 开发工具
- `utils.ts`: 工具函数

#### 工具函数目录 (utils/)

- `a11y.ts`: 无障碍工具
- `image.ts`: 图片处理
- `mobile.ts`: 移动设备
- `performance.ts`: 性能优化
- `preload.ts`: 资源预加载
- `schema.ts`: 数据模式

### 静态资源目录 (public/)

- `fonts/`: 字体文件
- `images/`: 图片资源
- 各种配置文件和图标

### 测试目录 (tests/)

- `layout.spec.ts`: 布局测试
- `visual.spec.ts`: 视觉测试
- 测试快照和结果

### 配置文件

- `astro.config.mjs`: Astro 配置
- `tailwind.config.mjs`: Tailwind CSS 配置
- `postcss.config.cjs`: PostCSS 配置
- `tsconfig.json`: TypeScript 配置
- `playwright.config.ts`: E2E 测试配置
