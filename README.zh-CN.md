# Vue 3 深度选择器适配器

[English](./README.md)

Vue 3 深度选择器适配器是一个工具,旨在帮助将 Vue 2 的深度选择器迁移到与 Vue 3 兼容的语法.

## 特性

- 将 Vue 2 的深度选择器 (>>>, /deep/, ::v-deep) 转换为 Vue 3 的 :deep() 语法
- 支持 .vue, .css, .scss, .sass, .less 和 .styl 文件

## 安装

您可以使用 npm、yarn 或 pnpm 安装 Vue 3 深度选择器适配器包。

### 使用 pnpm

```bash
pnpm add @v3-selector-adapter/cli -g
```

## 用例

### CLI

```bash
npx v3-deep-adapter --include ".{vue,css,scss,sass,less,styl}" --exclude "node_modules/**"
```

#### 选项

- `--include` 或 `-i`：指定要包含的文件（可多次使用）
  - 默认值：`"**/*.{vue,css,scss,sass,less,styl}"`
- `--exclude` 或 `-e`：指定要排除的文件（可多次使用）
  - 默认值：`[]`（默认不排除任何文件，除了 `node_modules/**` 和 `.*`）

如果未提供任何选项，工具将处理当前目录及其子目录中所有支持的文件类型，排除 `node_modules` 和隐藏文件。

## 测试

运行所有测试：

```bash
pnpm test
```
