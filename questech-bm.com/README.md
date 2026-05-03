# Questech GEO Tools

GEO（生成式引擎优化）工具站，帮助内容创作者提升在 AI 搜索引擎中的可见性。

## 功能

- **内容优化工具** - 分析内容并提供 GEO 优化建议
- **内容分析工具** - 评估网页内容的 AI 亲和度

## 技术栈

- React 19
- Vite
- Tailwind CSS v4
- Cloudflare Pages 部署

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Cloudflare Pages

1. 将此仓库推送到你的 GitHub 账户
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 Pages → 创建项目 → 连接到 GitHub
4. 选择 `questech-geo-tools` 仓库
5. 构建配置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
6. 点击部署

## 域名配置

在 Cloudflare Pages 设置中，添加自定义域名 `questech-bm.com`，Cloudflare 会自动配置 SSL 和路由。
