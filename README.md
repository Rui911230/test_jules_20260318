# AI 识别实物卡路里后台管理系统 (test_jules_20260318)

本项目是一个 AI 识别实物卡路里后台管理系统，基于最新的 Vue 3 技术栈开发。

## 技术方案

*   **框架:** Vue 3 (Composition API)
*   **构建工具:** Vite
*   **类型检查:** TypeScript
*   **路由:** Vue Router 4
*   **状态管理:** Pinia
*   **UI 组件库:** Element Plus
*   **图标库:** @element-plus/icons-vue

## 项目结构

```text
├── public/              # 静态资源，不经过编译
├── src/                 # 源码目录
│   ├── assets/          # 经过编译的静态资源
│   ├── components/      # 全局公共组件
│   ├── layout/          # 布局组件
│   │   └── index.vue    # 侧边栏和顶栏布局
│   ├── router/          # 路由配置
│   │   └── index.ts     # 路由表（概览、食物管理、识别记录、用户管理、系统配置）
│   ├── store/           # 状态管理
│   │   └── index.ts     # Pinia 实例
│   ├── views/           # 页面级组件
│   │   ├── Overview.vue # 概览
│   │   ├── Food.vue     # 食物管理
│   │   ├── Records.vue  # 识别记录
│   │   ├── Users.vue    # 用户管理
│   │   └── System.vue   # 系统配置
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── style.css        # 全局样式
├── index.html           # 入口 HTML
├── package.json         # 项目依赖配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 运行项目

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **启动开发服务器**
    ```bash
    npm run dev
    ```

3.  **构建生产版本**
    ```bash
    npm run build
    ```
