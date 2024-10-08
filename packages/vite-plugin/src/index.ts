import type { Plugin } from 'vite'
import { transformDeepSelector, transformVueSfc } from '@vue3-deep-selector-adapter/core'

export default function vueDeepSelectorAdapter(): Plugin {
  return {
    name: 'vue3-deep-selector-adapter',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        return transformVueSfc(code)
      }
      if (/\.(?:css|less|sass|scss|styl)$/.test(id)) {
        return transformDeepSelector(code)
      }
    },
  }
}
