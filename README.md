# Vue 3 Deep Selector Adapter

[中文版](./README.zh-CN.md)

Vue 3 Deep Selector Adapter is a tool designed to help migrate Vue 2 deep selectors to Vue 3 compatible syntax.

## Features

- Converts Vue 2 deep selectors (>>>, /deep/, ::v-deep) to Vue 3 :deep() syntax
- Supports .vue, .css, .scss, .sass, .less, and .styl files

## Installation

You can install the Vue 3 Deep Selector Adapter packages using npm, yarn, or pnpm.

### Using pnpm
```bash
pnpm add @v3-deep-adapter/cli -g
```

## Usage

### CLI

```bash
npx v3-deep-adapter --include ".{vue,css,scss,sass,less,styl}" --exclude "node_modules/**"
```
#### Options

- `--include` or `-i`: Specify files to include (can be used multiple times)
  - Default: `"**/*.{vue,css,scss,sass,less,styl}"`
- `--exclude` or `-e`: Specify files to exclude (can be used multiple times)
  - Default: `[]` (no files excluded by default, except `node_modules/**` and `.*`)

If no options are provided, the tool will process all supported file types in the current directory and its subdirectories, excluding `node_modules` and hidden files.

## Testing

To run all tests:

```bash
pnpm test
```
