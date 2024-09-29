# Vue 3 Deep Selector Adapter

[中文版](./README.zh-CN.md)

Vue 3 Deep Selector Adapter is a tool designed to help migrate Vue 2 deep selectors to Vue 3 compatible syntax. It supports various build tools and can be used as a CLI tool, Vite plugin, or Webpack plugin.

## Features

- Converts Vue 2 deep selectors (>>>, /deep/, ::v-deep) to Vue 3 :deep() syntax
- Supports .vue, .css, .scss, .less, and .styl files
- Available as a CLI tool, Vite plugin, and Webpack plugin

## Installation

You can install the Vue 3 Deep Selector Adapter packages using npm, yarn, or pnpm.

### Using pnpm

```bash
# for cli
pnpm add @vue3-deep-selector-adapter/cli -g

# for vite
pnpm add -D @vue3-deep-selector-adapter/vite

# for webpack
pnpm add -D @vue3-deep-selector-adapter/webpack
```

## Usage

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

## Testing

To run all tests:

```bash
pnpm test
```

To run tests for a specific package:

```bash
pnpm test:core
pnpm test:vite
pnpm test:webpack
pnpm test:cli
```
