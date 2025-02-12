# FiddleBops - 音乐创作游戏

FiddleBops 是一款由粉丝创作的音乐创作游戏，灵感来源于 Incredibox。让每个人都能轻松创作音乐，释放创造力。

## ✨ 特性

- 🎵 直观的拖放界面，简化音乐创作过程
- 👥 独特的音乐角色，每个角色都有自己的声音和个性
- 🎹 声音混合系统，解锁隐藏旋律
- 🌟 活跃的社区互动，分享和探索作品
- 🔄 持续更新内容，根据社区反馈优化

## 🚀 开始使用

### 环境要求

- Node.js >= 18.17.1
- pnpm >= 7.1.0

### 安装

```bash
# 克隆项目
git clone https://github.com/your-username/fiddlebops.git

# 进入项目目录
cd fiddlebops

# 安装依赖
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 🛠 开发指南

### 开发环境设置

1. 安装 VS Code 推荐扩展
   - Astro
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier

2. 配置开发工具
   ```json
   // .vscode/settings.json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

### 开发规范

- 组件开发
  - 组件放在 `src/components` 目录
  - 使用 `.astro` 扩展名
  - 采用 PascalCase 命名

- 样式开发
  - 优先使用 Tailwind 类名
  - 全局样式放在 `src/styles/global.css`
  - 遵循移动优先原则

- 数据管理
  - 静态数据放在 `src/data` 目录
  - 使用 TypeScript 类型定义

## 🚀 部署说明

### 静态部署 (推荐)

1. 构建项目
   ```bash
   pnpm build
   ```

2. 部署到 Vercel
   ```bash
   vercel deploy
   ```

### 自托管部署

1. 构建项目
   ```bash
   pnpm build
   ```

2. 将 `dist` 目录部署到你的服务器

3. 配置 Nginx
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     root /path/to/dist;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
     
     # 启用 gzip 压缩
     gzip on;
     gzip_types text/plain text/css application/json application/javascript;
   }
   ```

### 环境变量配置

创建 `.env` 文件：
```env
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_API_URL=https://api.your-domain.com
```

> 注意：不要将 `.env` 文件提交到版本控制系统

## 🛠️ 技术栈

- [Astro](https://astro.build) - 现代化的静态站点生成器
- [TailwindCSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org) - JavaScript 的超集
- [Font Awesome](https://fontawesome.com) - 图标库

## 📦 项目结构

```
fiddlebops/
├── src/
│   ├── assets/      # 静态资源
│   ├── components/  # UI 组件
│   ├── data/        # 静态数据
│   ├── layouts/     # 布局组件
│   ├── pages/       # 页面
│   └── styles/      # 全局样式
├── public/          # 公共资源
└── astro.config.mjs # Astro 配置
```

## 🎨 设计系统

### 颜色主题

- 主色: `#9D4EDD` - 按钮、重要文本
- 次色: `#2EC4B6` - 辅助元素、链接
- 强调: `#FFB627` - 突出显示、交互反馈
- 背景: `#10002B` - 页面背景

### 字体系统

- 标题: Bangers - 游戏风格的展示字体
- 正文: Nunito - 清晰易读的无衬线字体

## 🤝 参与贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📝 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Incredibox](https://www.incredibox.com/) - 项目灵感来源
- [Astro](https://astro.build) - 强大的 Web 框架支持
- [开源社区](https://github.com) - 优秀的工具和库支持

## 📧 联系我们

- GitHub: [@your-username](https://github.com/your-username)
- Twitter: [@your-twitter](https://twitter.com/your-twitter)
- Discord: [加入社区](https://discord.gg/your-discord)

---

使用 ❤️ 制作 | Made with ❤️
