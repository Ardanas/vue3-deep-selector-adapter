# Vue 3 深度选择器适配器

[English](./README.md)

Vue 3 深度选择器适配器是一个工具,旨在帮助将 Vue 2 的深度选择器迁移到与 Vue 3 兼容的语法。它支持各种构建工具,可以作为 CLI 工具、Vite 插件或 Webpack 插件使用。

## 特性

- 将 Vue 2 的深度选择器 (>>>, /deep/, ::v-deep) 转换为 Vue 3 的 :deep() 语法
- 支持 .vue, .css, .scss, .less 和 .styl 文件
- 可用作 CLI 工具、Vite 插件和 Webpack 插件

## 安装

您可以使用 npm、yarn 或 pnpm 安装 Vue 3 深度选择器适配器包。

### 使用 pnpm

```bash
# for cli
pnpm add @vue3-deep-selector-adapter/cli -g

# for vite
pnpm add -D @vue3-deep-selector-adapter/vite

# for webpack
pnpm add -D @vue3-deep-selector-adapter/webpack
```

## 用例

### CLI

```bash
npx vue3-deep-selector-adapter ".{vue,css,scss,less,styl}"
```

### Vite Plugin

```javascript
import vue from '@vitejs/plugin-vue'
import vueDeepSelectorAdapter from '@vue3-deep-selector-adapter/vite'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueDeepSelectorAdapter()
  ]
})
```

### Webpack Plugin

```javascript
// webpack.config.js
const VueDeepSelectorAdapterPlugin = require('@vue3-deep-selector-adapter/webpack').default

module.exports = {
  plugins: [
    new VueDeepSelectorAdapterPlugin()
  ]
}
```
