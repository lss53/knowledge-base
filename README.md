# JSMD WebSite - 极简Markdown网站解决方案

## 📖 项目简介

这是一个基于单HTML文件的极简Markdown网站解决方案。只需一个HTML文件加上Markdown文档，即可快速搭建功能完整的文档网站。

😊 追求极致简洁，约120行代码实现侧边栏导航、响应式设计、Wiki风格链接和数学公式渲染等核心功能。JSMD含义：Just Markdown（只需MD文件） + JavaScript（实时转换渲染）。

## ✨ 主要功能

### 🎯 核心特性
- **极简设计**: 仅需一个HTML文件即可运行
- **Markdown渲染**: 支持完整的Markdown语法
- **侧边栏导航**: 从`_sidebar.md`生成导航菜单
- **响应式布局**: 完美适配桌面端和移动端
- **Wiki风格链接**: 支持`[[文件名]]`格式的链接
- **URL简化**: 文件名自动转换为简洁的URL参数
- **数学公式**: 集成MathJax支持LaTeX数学公式渲染
- **本地缓存**: 已访问页面自动缓存提升加载速度
- **加载指示器**: 内容加载时显示动画指示器

### 🔧 技术特点
- **单文件部署**: 只需上传`index.html`和相关Markdown文件
- **无服务器依赖**: 纯静态网站，可部署到任何静态托管平台
- **本地存储**: 侧边栏状态自动保存到浏览器本地存储
- **历史记录**: 支持浏览器前进后退功能
- **404处理**: 自动处理不存在的文件
- **延迟加载**: MathJax按需加载提升性能

## 🚀 快速开始

### 1. 基本部署
最核心就是一个 index.html，上传到服务器，再加上相应md文件即可。

```bash
# 项目结构
your-website/
├── index.html          # 主文件（必需）
├── _sidebar.md         # 侧边栏导航（必需）
├── README.md           # 首页内容
└── 你的诸多 md 文件们   # 其他Markdown文件
```

### 2. 创建侧边栏
在`_sidebar.md`中定义导航结构：

```markdown
# 目录
## 文档
- [[README]]
- [使用指南](guide.md)
- [[项目介绍]]

## 其他
- [[关于我们]]
```

### 3. 链接格式

#### Wiki风格链接（推荐）
```markdown
[[文件名]]           # 链接到 文件名.md
[[README]]          # 链接到 README.md
```

#### 标准Markdown链接
```markdown
[显示文本](文件名.md)
[使用指南](guide.md)
```

### 4. 数学公式支持
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$
```

### 5. URL访问
- 首页: `your-domain.com/`
- 特定页面: `your-domain.com/?文件名`
- 示例: `your-domain.com/?guide` 访问 `guide.md`

## 📱 响应式设计

- **自适应侧边栏**: 桌面端默认显示，移动端自动隐藏
- **触摸友好**: 优化的按钮大小和间距
- **全屏导航**: 移动端侧边栏占满屏幕
- **自动隐藏**: 点击链接后自动隐藏侧边栏
- **状态保存**: 桌面端侧边栏状态自动保存

## ⚠️ 注意事项

### 文件要求
- **必需文件**: `index.html` 和 `_sidebar.md`
- **文件编码**: 所有文件必须使用UTF-8编码
- **文件名**: 建议使用英文文件名，避免特殊字符
- **文件名不要出现空格**，会解析出错！

### 部署限制
- **静态托管**: 需要支持静态文件托管的平台，如GitHub Pages、Vercel、Netlify、阿里云OSS、腾讯云COS等
- **HTTPS**: 建议使用HTTPS协议（某些功能需要）
- **CORS**: 确保服务器允许跨域请求

### 浏览器兼容性
- **现代浏览器**: Chrome、Firefox、Safari、Edge
- **移动浏览器**: iOS Safari、Android Chrome
- **不支持**: IE浏览器

## 🔧 高级配置

### 修改默认页面
```javascript
// 在index.html中修改默认页面
return firstParam ? firstParam + '.md' : 'README.md'; // 改为你的默认页面
```

### 自定义标题格式
```javascript
// 修改页面标题格式
document.title = decodeURIComponent(file.replace('.md', '')) + ' - JSMD';
```

### 调整缓存策略
```javascript
// 修改缓存大小或策略
const contentCache = new Map(); // 当前使用Map实现简单缓存
```

### 添加新功能
项目结构清晰，易于扩展：
- 添加搜索功能
- 集成代码高亮
- 添加目录生成
- 支持图片预览
- 添加暗色主题

## 📋 部署平台推荐

- **GitHub Pages**: 免费、稳定、支持自定义域名
- **Vercel**: 快速部署、自动HTTPS、全球CDN
- **Netlify**: 功能丰富、支持表单处理
- **阿里云OSS**: 国内访问速度快
- **腾讯云COS**: 性价比高

## 🔍 核心实现原理

1. **Markdown解析**: 使用markdown-it库解析Markdown内容
2. **链接转换**: 自动转换Wiki风格链接为标准Markdown链接
3. **内容加载**: 使用Fetch API异步加载Markdown文件
4. **状态管理**: 使用URL参数和历史API管理页面状态
5. **响应式设计**: CSS媒体查询适配不同屏幕尺寸

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

*这是一个极简而强大的Markdown网站解决方案，让每个人都能轻松创建自己的知识库网站。*

## 📄 许可证

本项目采用MIT许可证，详情请参阅LICENSE文件。

## 🙏 致谢

感谢[张玉新（善用佳软）](https://github.com/xbeta-zhang/xbeta-small-tools/tree/main/jsmd-website)的灵感和贡献。

## 🔄 更新日志

### v1.1 (精简版)
- 代码量从约150行精简到约120行
- 优化了移动端侧边栏交互体验
- 改进了错误处理和加载状态显示
- 简化了事件处理逻辑
- 保留了所有核心功能

### v1.0 (初始版本)
- 初始版本发布
- 实现基本Markdown渲染和侧边栏导航
- 支持Wiki风格链接和数学公式
- 响应式设计和本地缓存功能
