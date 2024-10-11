import { describe, expect, it } from 'vitest'
import { transformDeepSelector, transformVueSfc } from '../src/index'

describe('transformDeepSelector', () => {
  it('>>> to :deep()', () => {
    const input = '.foo >>> .bar { color: red; }'
    expect(transformDeepSelector(input)).toBe('.foo :deep(.bar) { color: red; }')
  })

  it('/deep/ to :deep()', () => {
    const input = '.foo /deep/ .bar { color: blue; }'
    expect(transformDeepSelector(input)).toBe('.foo :deep(.bar) { color: blue; }')
  })

  it('::v-deep to :deep()', () => {
    const input = '.foo ::v-deep .bar { color: green; }'
    expect(transformDeepSelector(input)).toBe('.foo :deep(.bar) { color: green; }')
  })

  it('::v-deep() to :deep()', () => {
    const input = '.foo ::v-deep(.bar) { color: yellow; }'
    expect(transformDeepSelector(input)).toBe('.foo :deep(.bar) { color: yellow; }')
  })

  it('should handle multiple transformations in one string', () => {
    const input = `
      .foo >>> .bar { color: red; }
      .baz /deep/ .qux { color: blue; }
      .quux ::v-deep .corge { color: green; }
      .grault ::v-deep(.garply) { color: yellow; }
    `
    const result = transformDeepSelector(input)
    expect(result).toContain('.foo :deep(.bar) { color: red; }')
    expect(result).toContain('.baz :deep(.qux) { color: blue; }')
    expect(result).toContain('.quux :deep(.corge) { color: green; }')
    expect(result).toContain('.grault :deep(.garply) { color: yellow; }')
  })

  it('should not transform existing :deep() syntax', () => {
    const input = '.foo :deep(.bar) { color: orange; }'
    expect(transformDeepSelector(input)).toBe(input)
  })

  it('should handle various ::v-deep writing styles', () => {
    const input = `
      .a::v-deep.b { color: red; }
      .c ::v-deep.d { color: green; }
      .e::v-deep .f { color: blue; }
      .g ::v-deep .h { color: yellow; }
      .i ::v-deep(.j) { color: purple; }
    `
    const result = transformDeepSelector(input)
    expect(result).toContain('.a:deep(.b) { color: red; }')
    expect(result).toContain('.c :deep(.d) { color: green; }')
    expect(result).toContain('.e:deep(.f) { color: blue; }')
    expect(result).toContain('.g :deep(.h) { color: yellow; }')
    expect(result).toContain('.i :deep(.j) { color: purple; }')
  })

  it('should handle ::v-deep with various bracket and space combinations', () => {
    const cases = [
      { input: '.a ::v-deep(){} ', expected: '.a :deep(){} ' },
      { input: '.a ::v-deep() \n{}', expected: '.a :deep() \n{}' },
      { input: '.a ::v-deep {}', expected: '.a :deep() {}' },
      { input: '.a::v-deep{\n\n}', expected: '.a :deep(){\n\n}' },
      { input: '.a ::v-deep\n{\n  \n}', expected: '.a :deep()\n{\n  \n}' },
    ]

    cases.forEach(({ input, expected }) => {
      expect(transformDeepSelector(input)).toBe(expected)
    })
  })

  it('should handle ::v-deep with classes inside brackets', () => {
    const cases = [
      {
        input: '.a ::v-deep () { .b { color: red; } }',
        expected: '.a :deep() { .b { color: red; } }',
      },
      {
        input: '.a ::v-deep { .b { .c { color: purple; } } }',
        expected: '.a :deep() { .b { .c { color: purple; } } }',
      },
      {
        input: '.a ::v-deep (.b) { color: red; }',
        expected: '.a :deep(.b) { color: red; }',
      },
    ]

    cases.forEach(({ input, expected }) => {
      expect(transformDeepSelector(input)).toBe(expected)
    })
  })

  it('should correctly handle ::v-deep() with spaces', () => {
    const input = '.foo ::v-deep( .bar ) { color: orange; }'
    expect(transformDeepSelector(input)).toBe('.foo :deep( .bar ) { color: orange; }')
  })

  it('should handle multi-line selectors', () => {
    const input = `
        .foo
            >>> .bar {
            color: red;
        }
        .baz ::v-deep
            .qux {
            color: blue;
        }
        `
    const result = transformDeepSelector(input)
    expect(result).toContain(':deep(.bar) {')
    expect(result).toContain(':deep(.qux) {')
  })

  it('should handle complex selectors with multiple ::v-deep', () => {
    const cases = [
      {
        input: '.a::v-deep .b > .c, .d::v-deep .e + .f { color: red; }',
        expected: '.a:deep(.b > .c), .d:deep(.e + .f) { color: red; }',
      },
      {
        input: '.a::v-deep .b, .c::v-deep .d, .e::v-deep .f { color: red; }',
        expected: '.a:deep(.b), .c:deep(.d), .e:deep(.f) { color: red; }',
      },
      {
        input: '.a::v-deep .b > .c + .d ~ .e { color: red; }',
        expected: '.a:deep(.b > .c + .d ~ .e) { color: red; }',
      },
    ]
    cases.forEach(({ input, expected }) => {
      expect(transformDeepSelector(input)).toBe(expected)
    })
  })

  it('should handle ::v-deep with nested selectors', () => {
    const input = '.a ::v-deep .b { .c ::v-deep .d { color: red; } }'
    expect(transformDeepSelector(input)).toBe('.a :deep(.b) { .c :deep(.d) { color: red; } }')
  })
})

describe('vue sfc', () => {
  it('should transform selectors in .vue files', () => {
    const input = `
                <template>
                    <div class="foo">
                        <span class="bar"></span>
                    </div>
                </template>

                <style scoped>
                    .foo >>> .bar {
                        color: red;
                    }
                </style>
            `
    expect(transformVueSfc(input)).toContain('.foo :deep(.bar)')
  })

  it('should transform selectors in .vue files with multiple style tags', () => {
    const input = `
                <template>
                    <div class="foo">
                        <span class="bar"></span>
                    </div>
                </template>

                <style scoped>
                    .foo >>> .bar {
                        color: red;
                    }
                </style>

                <style scoped>
                    .baz /deep/ .qux {
                        background: blue;
                    }
                </style>
            `
    const result = transformVueSfc(input)
    expect(result).toContain('.foo :deep(.bar) {')
    expect(result).toContain('.baz :deep(.qux) {')
  })
})
