# 项目目录结构

```
项目根目录
├── src/                                # 源代码主目录
│   ├── assets/                         # 静态资源文件
│   │   └── logo.svg                    # 项目 Logo
│   ├── components/                     # 组件目录
│   │   ├── a11y/                      # 无障碍相关组件
│   │   │   ├── KeyboardNav.astro      # 键盘导航组件
│   │   │   ├── LiveRegion.astro       # 实时区域组件
│   │   │   └── ScreenReader.astro     # 屏幕阅读器组件
│   │   ├── i18n/                      # 国际化相关组件
│   │   │   └── LanguageContext.astro  # 语言上下文组件
│   │   ├── layout/                    # 布局相关组件
│   │   │   ├── Container.astro       # 容器组件
│   │   │   ├── Header.astro          # 头部组件
│   │   │   └── Footer.astro          # 尾部组件
│   │   ├── sections/                  # 页面区块组件
│   │   │   ├── game/                  # 游戏相关区块组件
│   │   │   │   └── GameController.ts  # 游戏控制器
│   │   │   ├── GameEmbed.astro       # 游戏嵌入组件
│   │   │   ├── Features.astro        # 特性展示区块
│   │   │   ├── FAQ.astro            # FAQ区块
│   │   │   └── Hero.astro           # 主视觉区块
│   │   └── ui/                        # UI 通用组件
│   │       ├── controls/              # 控制相关组件
│   │       │   └── ControlsGuide.astro # 控制指南组件
│   │       ├── orientation/           # 屏幕方向相关组件
│   │       │   ├── OrientationNotice.astro     # 方向提示组件
│   │       │   └── OrientationNoticeClient.tsx  # 方向提示客户端组件
│   │       ├── Button.astro          # 按钮组件
│   │       ├── GameControls.astro    # 游戏控制组件
│   │       ├── GamePreview.astro     # 游戏预览组件
│   │       ├── LanguageSelector.astro # 语言选择器（服务端）
│   │       └── LanguageSelectorClient.tsx # 语言选择器（客户端）
│   │
│   ├── config/                        # 配置文件目录
│   │   ├── env.ts                     # 环境变量配置
│   │   ├── game.ts                    # 游戏相关配置
│   │   ├── navigation.ts              # 导航配置
│   │   ├── site.ts                    # 站点基础配置
│   │   ├── theme.ts                   # 主题配置
│   │   └── types.ts                   # TypeScript 类型定义
│   │
│   ├── data/
    |   ├──  faqs.ts                    # FAQ 数据
    |   ├──  features.ts               # 特性数据
    |   ├──  social.ts                  # 社交数据
    |   └──  types.ts                   # 类型数据
│   │
│   ├── i18n/                          # 国际化资源
│   │   ├── config.ts
│   │   ├── check-translation.ts        # 翻译检查工具
│   │   ├── dev-utils.ts               # 开发工具
│   │   ├── utils.ts                   # 工具函数
│   │   └── translations/              # 翻译文件
│   │       ├── en.ts                  # 英文翻译
│   │       └── zh.ts                  # 中文翻译
│   │
│   ├── layouts/                       # 页面布局模板
│   │   └── BaseLayout.astro          # 基础布局组件
│   │
│   ├── pages/                         # 页面文件
│   │   ├── [lang]/                   # 多语言页面
│   │   │   └── index.astro           # 多语言首页
│   │   ├── index.astro               # 首页
│   │   ├── 404.astro                # 404错误页
│   │   ├── robots.txt.ts            # 爬虫规则
│   │   └── sitemap.xml.ts           # 站点地图
│   │
│   ├── styles/                        # 样式文件
│   │   └── global.css                # 全局样式
│   │
│   ├── utils/                         # 工具函数
│   │   ├── a11y.ts                   # 无障碍工具函数
│   │   ├── image.ts                  # 图片处理工具
│   │   ├── mobile.ts                 # 移动设备工具
│   │   ├── preload.ts                # 资源预加载工具
│   │   └── schema.ts                 # 数据模式工具
│   │
│   └── env.d.ts                       # 环境变量类型声明
│
├── public/                            # 公共静态资源目录
│   ├── assets/                        # 资源目录
│   │   └── sprites/                   # 精灵图目录
│   │       └── controls/              # 控制相关精灵图
│   ├── fonts/                         # 字体目录
│   │   └── Bangers-Regular.woff2     # Bangers 字体文件
│   ├── images/                        # 图片目录
│   │   └── FiddleBops.webp           # FiddleBops 游戏图片
│   ├── browserconfig.xml              # 浏览器配置文件
│   ├── favicon.svg                    # 网站图标
│   ├── humans.txt                     # 人类可读信息文件
│   ├── logo.svg                       # 项目 Logo
│   ├── manifest.json                  # PWA 应用清单
│   ├── og.svg                         # Open Graph 图片
│   ├── robots.txt                     # 爬虫规则文件
│   └── site.webmanifest              # 站点配置清单
│
├── tests/                             # 测试文件目录
│   ├── layout.spec.ts                 # 布局测试
│   ├── visual.spec.ts                 # 视觉回归测试
│   └── visual.spec.ts-snapshots/      # 视觉测试快照
│       ├── homepage-chromium-win32.png
│       ├── homepage-mobile-chromium-win32.png
│       └── features-section-chromium-win32.png
│
├── .astro/                           # Astro 构建缓存
├── .vscode/                          # VS Code 配置
├── playwright-report/                # Playwright 测试报告
├── test-results/                     # 测试结果
│
├── astro.config.mjs                   # Astro 框架配置
├── tailwind.config.mjs                # Tailwind CSS 配置
├── postcss.config.cjs                 # PostCSS 配置
├── tsconfig.json                      # TypeScript 配置
├── playwright.config.ts               # Playwright 测试配置
│
├── package.json                       # 项目依赖和脚本配置
├── pnpm-lock.yaml                     # pnpm 依赖锁定文件
├── .env                              # 环境变量文件
├── .gitignore                        # Git 忽略配置
├── .cursorrules                      # Cursor 编辑器规则
│
├── DEVELOPMENT.md                     # 开发指南文档
└── README.md                         # 项目说明文档
```
