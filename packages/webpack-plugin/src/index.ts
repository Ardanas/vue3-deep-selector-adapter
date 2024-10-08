import { transformDeepSelector, transformVueSfc } from '@vue3-deep-selector-adapter/core'
import { type Compiler, sources } from 'webpack'

class VueDeepSelectorPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync('VueDeepSelectorPlugin', (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((filename) => {
          if (filename.endsWith('.vue')) {
            const asset = compilation.assets[filename]
            const transformedCode = transformVueSfc(asset.source().toString())
            compilation.assets[filename] = new sources.RawSource(transformedCode)
          }
          else if (/\.(?:css|less|sass|scss|styl)$/.test(filename)) {
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
