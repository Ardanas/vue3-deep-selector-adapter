# @v3-deep-adapter/core

Core functionality for transforming Vue 2 deep selectors to Vue 3 compatible syntax.

## Installation

```bash
pnpm add @v3-deep-adapter/core
```

## Usage
```javascript
import {
  transformDeepSelector,
  transformVueSfc
} from '@v3-deep-adapter/core'

// 1. Transform deep selectors in CSS
const cssCode = '.foo >>> .bar { color: red; }'
transformDeepSelector(cssCode)
// Output: '.foo :deep(.bar) { color: red; }'

// 2. Transform deep selectors in Vue SFC
const vueCode = `
    <template>
        <div class="foo">
            <span class="bar"></span>
        </div>
    </template>
    <style>
        .foo >>> .bar { color: red; }
    </style>`

transformVueSfc(vueCode)
// Output: 'xxx  .foo :deep(.bar) { color: red; }'
```
