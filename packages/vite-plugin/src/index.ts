import type { Plugin } from 'vite'
import { transformDeepSelector } from '@vue3-deep-selector-adapter/core'

interface VueDeepSelectorPluginOptions {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
}

export default function vueDeepSelectorPlugin(options: VueDeepSelectorPluginOptions = {}): Plugin {
  const { include = /\.(vue|css|scss|less|styl)$/, exclude } = options

  return {
    name: 'vue3-deep-selector-adapter',
    enforce: 'pre',
    transform(code, id) {
      if (
        (typeof include === 'string' && !id.includes(include))
        || (include instanceof RegExp && !include.test(id))
        || (Array.isArray(include) && !include.some(i => (typeof i === 'string' ? id.includes(i) : i.test(id))))
        || (exclude && (
          (typeof exclude === 'string' && id.includes(exclude))
          || (exclude instanceof RegExp && exclude.test(id))
          || (Array.isArray(exclude) && exclude.some(e => (typeof e === 'string' ? id.includes(e) : e.test(id))))
        ))
      ) {
        return null
      }
      return {
        code: transformDeepSelector(code),
        map: null,
      }
    },
  }
}
