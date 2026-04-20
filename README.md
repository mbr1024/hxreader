# HxReader

基于 [Readest](https://github.com/readest/readest) 二次开发的跨平台电子书阅读器。

## 技术栈

- **前端**: Next.js + TypeScript
- **桌面**: Tauri (Rust)
- **包管理**: pnpm (monorepo)

## 开发环境

### 前置要求

- Node.js v22+
- pnpm
- Rust & Cargo

### 快速开始

```bash
# 安装依赖
pnpm install

# 初始化 submodules
git submodule update --init --recursive

# 复制 vendor 依赖
pnpm --filter @readest/readest-app setup-vendors

# 启动 Web 开发服务器
pnpm dev-web

# 启动 Tauri 桌面开发
pnpm tauri dev
```

## 项目结构

```
├── apps/
│   ├── readest-app/       # 主应用（Next.js + Tauri）
│   └── readest.koplugin/  # KOReader 插件
├── packages/              # 依赖包（submodules）
│   ├── foliate-js/        # 电子书渲染引擎
│   ├── tauri/             # Tauri fork
│   ├── tauri-plugins/     # Tauri 插件
│   ├── simplecc-wasm/     # 简繁转换
│   └── qcms/              # PDF 颜色管理
├── patches/               # 依赖补丁
└── data/                  # 资源文件
```

## 许可证

本项目基于 [AGPL-3.0](LICENSE) 许可证开源，继承自上游 Readest 项目。
