import fs from 'node:fs'
import { argv } from 'node:process'
import { transformDeepSelector } from '@vue3-deep-selector-adapter/core'
import glob from 'glob'
import minimist from 'minimist'

const argv2 = minimist(argv.slice(2))

const defaultExclude = ['node_modules/**', '.*']
const include = argv2.include || argv2.i || '**/*.{vue,css,scss,less,styl}'
const exclude = argv2.exclude || argv2.e || []

function processFiles(pattern: string) {
  const files = glob.sync(pattern, { ignore: [...defaultExclude, ...exclude] })

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const transformed = transformDeepSelector(content)

    if (content !== transformed) {
      fs.writeFileSync(file, transformed)
      console.log(`Transformed: ${file}`)
    }
  })
}

if (typeof include === 'string') {
  processFiles(include)
}
else if (Array.isArray(include)) {
  include.forEach(processFiles)
}

console.log('Deep selector transformation complete.')
