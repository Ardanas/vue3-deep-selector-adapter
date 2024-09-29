import { transformDeepSelector } from '@vue3-deep-selector-adapter/core'
import { type Compiler, sources } from 'webpack'

class VueDeepSelectorPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync('VueDeepSelectorPlugin', (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((filename) => {
          if (/\.(?:vue|css|scss|less|styl)$/.test(filename)) {
            const asset = compilation.assets[filename]
            const transformedCode = transformDeepSelector(asset.source().toString())
            compilation.assets[filename] = new sources.RawSource(transformedCode)
          }
        })
      })
      callback()
    })
  }
}

export default VueDeepSelectorPlugin
