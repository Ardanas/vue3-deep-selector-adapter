import fs from 'node:fs'
import { argv, exit } from 'node:process'
import { transformDeepSelector } from '@vue3-deep-selector-adapter/core'
import glob from 'glob'

function transformFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const transformedContent = transformDeepSelector(content)
  fs.writeFileSync(filePath, transformedContent, 'utf-8')
  console.log(`Transformed: ${filePath}`)
}

function main() {
  const args = argv.slice(2)
  const pattern = args[0] || '**/*.{vue,css,scss,less,styl}'

  glob.glob(pattern, { ignore: 'node_modules/**' }).then((files) => {
    // 处理文件
    files.forEach(transformFile)
    console.log('Transformation complete.')
  }).catch((err) => {
    console.error('错误:', err)
    exit(1)
  })
}

main()
