# JSMD - 现代化 Markdown 网站引擎

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

JSMD 是一个轻量级、纯客户端、无需构建的现代化网站引擎。它允许你完全使用 Markdown 文件来构建一个功能丰富、响应迅速的文档网站、个人博客或知识库。

这个项目的设计哲学是**简约与强大**。它避免了复杂的构建工具和后台依赖，你只需要一个静态文件服务器，甚至可以直接部署在 GitHub Pages 上。

## ✨ 核心特性

*   **✍️ Markdown 驱动**: 所有内容（包括侧边栏导航）都由 `.md` 文件构成，编辑和管理极其简单。
*   **🚀 纯客户端渲染**: 无需后台服务或复杂的构建流程。修改 Markdown 文件后，刷新浏览器即可看到效果。
*   **⚡️ 极致性能优化**:
    *   **链接预加载**: 鼠标悬停在链接上时，自动在后台预取页面内容，实现近乎瞬时的页面切换。
    *   **图片懒加载**: 页面中的图片会等到进入视口时才加载，显著提升初始加载速度。
    *   **内容缓存**: 访问过的内容会被缓存，二次访问无需重新请求。
*   **📱 响应式与移动优先**: 无论在桌面还是移动设备上，都提供卓越的浏览体验。
*   **🔒 安全第一**: 所有渲染到页面的 HTML 都经过 `DOMPurify` 清理，有效防止 XSS 攻击。
*   **♿️ 绝佳的可访问性 (a11y)**:
    *   完整的 ARIA 属性支持。
    *   智能的焦点管理，方便键盘用户操作。
    *   尊重用户的 `prefers-reduced-motion` 偏好。
*   **🧩 强大的内容支持**:
    *   内置支持 GitHub 风格的 Markdown。
    *   通过 [MathJax](https://www.mathjax.org/) 自动渲染 LaTeX 数学公式。
*   **🎨 易于定制**: 使用 CSS 变量，可以轻松调整网站的主题颜色、字体和布局。

## 🚀 快速开始

使用 JSMD 非常简单，你只需要一个简单的 Web 服务器来托管文件。

### 1. 准备环境

由于浏览器安全策略的限制，`fetch` API 无法在 `file://` 协议下工作。因此，你需要一个本地的 HTTP 服务器。

如果你安装了 Python 3：
```bash
# 在项目根目录下运行
python -m http.server
```

或者，如果你安装了 Node.js，可以使用 `http-server`：
```bash
# 首先全局安装
npm install -g http-server

# 然后在项目根目录下运行
http-server
```

你也可以使用 VS Code 的 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件。

### 2. 定义导航

编辑根目录下的 `_sidebar.md` 文件。这个文件定义了网站的导航结构。它使用标准的 Markdown 链接语法。

**示例 `_sidebar.md`**:
```markdown
### JSMD 项目

*   [**首页**](?README)
*   [快速入门](?getting-started)
*   [核心特性](?features)

### 进阶

*   [自定义](?customization)
*   [部署指南](?deployment)
```> **注意**: 链接的目标是不带 `.md` 后缀的文件名，并以 `?` 开头。例如，`?getting-started` 会加载 `getting-started.md` 文件。

### 3. 创建页面

在根目录下创建对应的 Markdown 文件 (`README.md`, `getting-started.md`, `features.md` 等)。

**内部链接**:
你可以使用两种方式在页面之间创建链接：
1.  **Wiki 风格**: `[[页面名称]]` (例如 `[[getting-started]]`)
2.  **Markdown 风格**: `[链接文本](?页面名称)` (例如 `[快速入门指南](?getting-started)`)

这两种链接都会被自动转换成应用内部的 SPA (单页面应用) 导航链接。

### 4. 启动！

将你的文件放在 Web 服务器的根目录下，然后访问服务器地址（例如 `http://localhost:8000`）。你的网站就已经运行起来了！

## 📂 项目结构

```
.
├── js/
│   ├── dom.js             # 集中管理 DOM 元素的选择器
│   ├── state.js           # 全局状态管理器 (缓存, 侧边栏状态等)
│   ├── utils.js           # 通用工具函数 (安全、防抖、链接转换)
│   ├── renderer.js        # 核心渲染器，负责获取和渲染 Markdown
│   ├── sidebar.js         # 侧边栏的逻辑与状态控制
│   ├── eventHandlers.js   # 集中处理所有主要的事件监听
│   ├── imageLoader.js     # 图片懒加载模块
│   └── main.js            # 应用主入口，初始化所有模块
│
├── _sidebar.md            # 网站导航菜单 (Markdown 格式)
├── README.md              # 网站的默认主页
├── getting-started.md     # 其他内容页面...
└── index.html             # 项目唯一的 HTML 入口文件
```

## 🎨 定制化

你可以轻松地修改网站的外观。

打开 `index.html` 文件，在 `<style>` 标签的 `:root` 选择器中，你可以找到并修改全局 CSS 变量：

```css
:root {
  --primary-color: #0366d6;      /* 主题色 */
  --primary-hover: #0256b9;      /* 主题悬停色 */
  --error-color: #cb2431;        /* 错误提示颜色 */
  --border-color: #eaecef;       /* 边框颜色 */
  --sidebar-width: 300px;         /* 侧边栏宽度 */
  --radius: 6px;                  /* 圆角大小 */
  /* ... 还有更多 */
}
```

## 🛠️ 依赖的第三方库

JSMD 依赖了几个优秀的开源库，它们通过 CDN 的方式引入，无需本地安装：

*   [**markdown-it**](https://github.com/markdown-it/markdown-it): 高性能、可扩展的 Markdown 解析器。
*   [**DOMPurify**](https://github.com/cure53/DOMPurify): 超快速、高容错的 HTML 清理库，用于防止 XSS。
*   [**github-markdown-css**](https://github.com/sindresorhus/github-markdown-css): 让你的 Markdown 内容拥有 GitHub 般的优美样式。
*   [**MathJax**](https://www.mathjax.org/): 强大的数学公式渲染引擎。

## 📜 许可证

本项目采用 [MIT License](./LICENSE) 授权。

## 🙏 致谢

感谢[张玉新（善用佳软）](https://github.com/xbeta-zhang/xbeta-small-tools/tree/main/jsmd-website)的开源项目。
