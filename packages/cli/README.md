# @v3-deep-adapter/cli

CLI tool for transforming Vue 2 deep selectors to Vue 3 compatible syntax.

## Installation
```bash
pnpm add @v3-deep-adapter/cli -g
```

## Usage

```bash
v3-deep-adapter --include ".{vue,css,scss,sass,less,styl}" --exclude "node_modules/**"
```
#### Options

- `--include` or `-i`: Specify files to include (can be used multiple times)
  - Default: `"**/*.{vue,css,scss,sass,less,styl}"`
- `--exclude` or `-e`: Specify files to exclude (can be used multiple times)
  - Default: `[]` (no files excluded by default, except `node_modules/**` and `.*`)

If no options are provided, the tool will process all supported file types in the current directory and its subdirectories, excluding `node_modules` and hidden files.
