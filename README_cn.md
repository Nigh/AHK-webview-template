# AHK WebView Template

基于 **Vite** + **TailwindCSS v4** + **DaisyUI v5** 的 **AutoHotkey v2** WebView GUI 模板。使用 [WebViewToo](https://github.com/The-CoDingman/WebViewToo) 在 AHK 窗口中渲染 Web 前端，支持 AHK 脚本与 Web 前端之间的双向消息传递。

[English](README.md)

## 特性

- **热重载开发** — 前端修改即时生效；按 `F6` 重载 AHK 脚本
- **双向消息传递** — AHK 与 Web 前端之间发送 JSON 消息
- **现代前端技术栈** — Vite 7 + TailwindCSS v4 + DaisyUI v5，基于组件的 HTML 架构
- **自定义窗口样式** — 无边框窗口，支持拖拽移动
- **一键构建** — `npm run build` 将前端和 AHK 编译为独立 `.exe`
- **4 个演示页面** — 消息传递、表单控件、UI 组件、DaisyUI 示例

## 演示页面

| 页面 | 说明 |
|---|---|
| **AHK WebView Template** | 双向消息演示 — 从前端向 AHK 发送字符串（`Msgbox`），通过热键 `F1` 从 AHK 向前端发送消息。包含纯前端计数器。 |
| **Register Example** | 表单 UI，展示 DaisyUI 表单组件，带背景图片。 |
| **Controller Example** | 交互式 UI 控件：开关、滑块、进度条、下拉框、步进器、评分、按钮组、音量/亮度滑块、复选框。 |
| **DaisyUI Sample** | 统计卡片、带格式工具栏的文章编辑器、柱状图。 |

通过滚轮或点击底部导航点切换页面。

<p align="center">
<img width="42%" src="docs/Screenshot1.png">
<img width="42%" src="docs/Screenshot2.png">
</p>

<p align="center">
<img width="42%" src="docs/Screenshot3.png">
<img width="42%" src="docs/Screenshot4.png">
</p>

## 技术栈

| 层级 | 技术 |
|---|---|
| 桌面包装器 | [AutoHotkey v2](https://www.autohotkey.com/) (64-bit) + [WebViewToo](https://github.com/The-CoDingman/WebViewToo) |
| 构建工具 | [Vite 7](https://vitejs.dev/) |
| CSS 框架 | [TailwindCSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/) |
| HTML 组件 | [vite-plugin-html-inject](https://github.com/alextsagkas/vite-plugin-html-inject) |
| AHK 工具链 | [ahk64](https://www.npmjs.com/package/ahk64) (npm CLI，用于运行/编译 AHK) |

## 项目结构

```
ahk-webview-template/
├── frontend/
│   ├── index.html                 # 入口文件 — 通过 <load> 标签加载组件
│   ├── index2.html                # 简洁单页模板（输入框 + 确定 + 退出）
│   ├── src/
│   │   ├── app.css                # TailwindCSS v4 + DaisyUI v5 自定义暗色主题
│   │   ├── main.js                # 页面导航 + AHK 消息处理
│   │   ├── counter.js             # 纯前端计数器组件
│   │   └── stepper.js             # 步进器控件逻辑
│   ├── components/                # 通过 <load src="..."> 加载的 HTML 片段
│   │   ├── title.html             #   标题栏（支持拖拽移动）
│   │   ├── logos.html             #   Logo 展示
│   │   ├── front2ahk.html         #   前端 → AHK 消息演示
│   │   ├── ahk2front.html         #   AHK → 前端消息演示
│   │   ├── counter.html           #   点击计数器
│   │   ├── register.html          #   注册表单
│   │   ├── toggle.html            #   开关控件
│   │   ├── range.html             #   范围滑块
│   │   ├── progress.html          #   进度条
│   │   ├── select.html            #   下拉选择框
│   │   ├── stepper.html           #   数字步进器
│   │   ├── rating.html            #   星级评分
│   │   ├── btnGroup.html          #   按钮组
│   │   ├── volumes.html           #   音量和亮度滑块
│   │   ├── checkbox.html          #   复选框
│   │   ├── score.html             #   统计卡片（分数）
│   │   ├── score2.html            #   统计卡片（收入）
│   │   ├── post.html              #   文章编辑器
│   │   ├── chart.html             #   柱状图
│   │   └── footer.html            #   页脚
│   └── public/assets/             # 静态资源（图片、字体）
├── scripts/
│   ├── dev.js                     # 开发编排器 — 并发运行 Vite + AHK
│   └── init-workspace.js          # 工作区初始化器 — 清除模板演示，创建简洁工作区
├── webview/                       # WebViewToo 库（第三方，勿修改）
│   ├── WebViewToo.ahk
│   ├── WebView2.ahk
│   ├── ComVar.ahk
│   ├── Promise.ahk
│   └── 64bit/                     # WebView2 加载器 DLL
├── app.ahk                        # AHK 入口 — 创建 WebViewGui，注册回调
├── gen_resource.ahk               # 生成 resource.ahk，嵌入 dist/ 资源
├── vite.config.js                 # Vite 配置（root: frontend/, output: dist/）
├── package.json
└── README_cn.md
```

## 快速开始

### 环境要求

- **Node.js** (LTS) — [nodejs.org](https://nodejs.org/)
- **AutoHotkey v2** (64-bit) — [autohotkey.com](https://www.autohotkey.com/)

### 安装依赖

```sh
npm install
```

### 开发模式

启动开发服务器（Vite + AHK 并发运行）：

```sh
npm run dev
```

- 前端文件修改后自动热重载
- 按 `F6` 重载 AHK 脚本
- 按 `Ctrl+C` 退出

启用 AHK 文件监听（文件变更时自动重载）：

```sh
npm run dev:watch
```

### 构建

将前端和 AHK 脚本编译为独立可执行文件：

```sh
npm run build
```

运行编译后的程序：

```sh
npm run preview
```

### 创建简洁工作区

清除所有模板演示内容，从一个最小化的单页应用开始（一个输入框 + 确定/退出按钮）：

```sh
npm run init
```

此命令会将 `index.html` 替换为简洁布局，简化 `app.ahk`，并移除所有模板组件、演示脚本和未使用的静态资源。之后你可以在此基础上开发自己的应用。

## 架构

### AHK ↔ 前端通信

AHK 脚本和 Web 前端通过 JSON 消息通信：

**前端 → AHK：**
```js
window.chrome.webview.postMessage(JSON.stringify({ type: "Msg", content: "hello" }))
```

**AHK → 前端：**
```ahk
MyGui.PostWebMessageAsJson('{"type":"testMsg","content":"hello"}')
```

**注册 AHK 回调：**
```ahk
MyGui.AddCallbackToScript("Msg", WebviewMsg)
```

### 组件系统

`frontend/components/` 中的 HTML 片段通过 `<load>` 标签注入到 `index.html`：

```html
<load src="./components/counter.html" />
```

每个组件是一个独立的 HTML 片段，可以包含自己的 `<script>` 标签。

### 开发模式 vs 编译模式

| 模式 | 前端来源 | AHK 导航 |
|---|---|---|
| 开发模式 | Vite 开发服务器 (`http://localhost:5173`) | `MyGui.Navigate("http://localhost:5173")` |
| 编译模式 | `dist/` 中的嵌入式资源 | `MyGui.Navigate("index.html")` |

`gen_resource.ahk` 脚本生成 `resource.ahk`，将所有 `dist/` 文件嵌入到编译后的 AHK 二进制文件中。

## 可用脚本

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发模式（Vite + AHK） |
| `npm run dev:watch` | 开发模式 + AHK 文件监听 |
| `npm run build` | 构建前端 + 编译 AHK 为 `.exe` |
| `npm run build:front` | 仅构建前端 |
| `npm run build:ahk` | 仅编译 AHK |
| `npm run preview` | 运行编译后的 `app.exe` |
| `npm run init` | 清除模板演示，创建简洁工作区 |

## 许可证

[MIT](LICENSE)
