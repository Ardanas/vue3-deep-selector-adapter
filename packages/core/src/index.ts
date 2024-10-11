/* eslint-disable regexp/no-super-linear-backtracking */
import { parse } from '@vue/compiler-sfc'

function transformDeepSelector(code: string): string {
  code = code.replace(/>>>/g, '::v-deep')
  code = code.replace(/\/deep\//g, '::v-deep')

  // ::v-deep(.selector)
  code = code.replace(/(.+?)\s*::v-deep\s*\(/g, '$1 :deep(')

  // ::v-deep .selector and ::v-deep.selector
  code = code.replace(/(.+?\s*)::v-deep\s*([^\s{,]+(?:\s*[>+~]\s*[^\s{,]+)*)/g, (_, before, selector) => {
    return `${before}:deep(${selector})`
  })

  // ::v-deep {} or ::v-deep{}
  code = code.replace(/(.+?)\s*::v-deep(\s*\{)/g, '$1 :deep()$2')

  return code
}

export function transformVueSfc(code: string): string {
  const { descriptor } = parse(code)

  if (descriptor.styles.length > 0) {
    descriptor.styles.forEach((style) => {
      const transformedContent = transformDeepSelector(style.content)
      code = code.replace(style.content, transformedContent)
    })
  }

  return code
}

export { transformDeepSelector }
