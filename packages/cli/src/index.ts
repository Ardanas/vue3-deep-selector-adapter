import fs from 'node:fs'
import path from 'node:path'
import { argv } from 'node:process'
import { transformDeepSelector, transformVueSfc } from '@v3-deep-adapter/core'
import glob from 'glob'
import minimist from 'minimist'

const argv2 = minimist(argv.slice(2))

const defaultExclude = ['node_modules/**', '.*']
const include = argv2.include || argv2.i || '**/*.{vue,css,scss,sass,less,styl}'
const exclude = argv2.exclude || argv2.e || []

function processFiles(patterns: string | string[], exclude: string | string[]) {
  const e = Array.isArray(exclude) ? exclude : [exclude]
  const files = glob.sync(patterns, { ignore: [...defaultExclude, ...e] })

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const isVueSfc = path.extname(file) === '.vue'
    const transformed = isVueSfc ? transformVueSfc(content) : transformDeepSelector(content)

    if (content !== transformed) {
      fs.writeFileSync(file, transformed)
      console.log(`Transformed: ${file}`)
    }
  })
}

processFiles(include, exclude)

console.log('Deep selector transformation complete.')
