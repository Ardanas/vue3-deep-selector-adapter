import { describe, expect, it } from 'vitest'
import { transformDeepSelector } from '../src/index'

describe('transformDeepSelector', () => {
  it('>>> to :deep()', () => {
    const input = '.foo >>> .bar { color: red; }'
    expect(transformDeepSelector(input)).toContain('.foo :deep(.bar)')
  })

  it('/deep/ to :deep()', () => {
    const input = '.foo /deep/ .bar { color: blue; }'
    expect(transformDeepSelector(input)).toContain('.foo :deep(.bar)')
  })

  it('::v-deep to :deep()', () => {
    const input = '.foo ::v-deep .bar { color: green; }'
    expect(transformDeepSelector(input)).toContain('.foo :deep(.bar)')
  })

  it('::v-deep() to :deep()', () => {
    const input = '.foo ::v-deep(.bar) { color: yellow; }'
    expect(transformDeepSelector(input)).toContain('.foo :deep(.bar)')
  })

  it('should handle multiple transformations in one string', () => {
    const input = `
      .foo >>> .bar { color: red; }
      .baz /deep/ .qux { color: blue; }
      .quux ::v-deep .corge { color: green; }
      .grault ::v-deep(.garply) { color: yellow; }
    `
    const result = transformDeepSelector(input)
    expect(result).toContain('.foo :deep(.bar)')
    expect(result).toContain('.baz :deep(.qux)')
    expect(result).toContain('.quux :deep(.corge)')
    expect(result).toContain('.grault :deep(.garply)')
  })

  it('should handle nested selectors', () => {
    const input = '.foo >>> .bar >>> .baz { color: purple; }'
    const result = transformDeepSelector(input)
    expect(result).toContain('.foo :deep(.bar) :deep(.baz)')
  })

  it('should not transform existing :deep() syntax', () => {
    const input = '.foo :deep(.bar) { color: orange; }'
    expect(transformDeepSelector(input)).toBe(input)
  })
})
