import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const cliPath = path.resolve(__dirname, '../bin/index.js')

describe('cLI', () => {
  const testDir = path.join(__dirname, 'test-project')
  const testFile = path.join(testDir, 'test.vue')
  const excludeFile = path.join(testDir, 'exclude.vue')

  beforeEach(() => {
    // 创建测试目录和文件
    fs.mkdirSync(testDir, { recursive: true })
    fs.writeFileSync(testFile, '.foo >>> .bar { color: red; }')
    fs.writeFileSync(excludeFile, '.foo >>> .bar { color: blue; }')
  })

  afterEach(() => {
    // 清理测试目录
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('should transform files correctly', () => {
    execSync(`node ${cliPath} --include "${testDir}/**/*.vue"`, { encoding: 'utf-8' })

    const transformedContent = fs.readFileSync(testFile, 'utf-8')
    expect(transformedContent).toContain('.foo :deep(.bar)')
    expect(transformedContent).not.toContain('>>>')
  })

  it('should respect exclude option', () => {
    execSync(`node ${cliPath} --include "${testDir}/**/*.vue" --exclude "**/exclude.vue"`, { encoding: 'utf-8' })

    const transformedContent = fs.readFileSync(testFile, 'utf-8')
    expect(transformedContent).toContain('.foo :deep(.bar)')

    const excludedContent = fs.readFileSync(excludeFile, 'utf-8')
    expect(excludedContent).toContain('>>>')
    expect(excludedContent).not.toContain(':deep(')
  })

  it('should handle multiple include patterns', () => {
    fs.writeFileSync(path.join(testDir, 'test.css'), '.foo >>> .bar { color: green; }')

    execSync(`node ${cliPath} --include "${testDir}/**/*.vue" "${testDir}/**/*.css"`, { encoding: 'utf-8' })

    const vueContent = fs.readFileSync(testFile, 'utf-8')
    expect(vueContent).toContain('.foo :deep(.bar)')

    const cssContent = fs.readFileSync(path.join(testDir, 'test.css'), 'utf-8')
    expect(cssContent).toContain('.foo :deep(.bar)')
  })

  it('should not transform files when no changes are needed', () => {
    fs.writeFileSync(testFile, '.foo :deep(.bar) { color: red; }')
    const originalContent = fs.readFileSync(testFile, 'utf-8')

    execSync(`node ${cliPath} --include "${testDir}/**/*.vue"`, { encoding: 'utf-8' })

    const transformedContent = fs.readFileSync(testFile, 'utf-8')
    expect(transformedContent).toBe(originalContent)
  })
})
