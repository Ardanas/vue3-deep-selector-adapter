import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'

function getNextNode(node: selectorParser.Node) {
  let res = node.next()
  while (res && res.type === 'combinator') {
    res = res.next()
  }
  return res
}

function replaceDeepCombinator(combinator: selectorParser.Node, next: selectorParser.Node | undefined, isNeedSpace: boolean = true) {
  if (next) {
    const deepPseudo = selectorParser.pseudo({ value: isNeedSpace ? ' :deep' : ':deep' })
    // const selector = selectorParser.selector({ nodes: undefined })
    deepPseudo.append(next.clone() as selectorParser.Selector)
    combinator.replaceWith(deepPseudo)
    next.remove()
    return true
  }
  return false
}

export function transformDeepSelector(code: string): string {
  // 预处理
  code = code.replace(/>>>/g, '/deep/')
  code = code.replace(/::v-deep\(([^)]*)\)?/g, ':deep($1)')

  return postcss([
    (root: postcss.Root) => {
      root.walkRules((rule: postcss.Rule) => {
        rule.selector = selectorParser((selectors: selectorParser.Root) => {
          selectors.walkCombinators((combinator: selectorParser.Combinator) => {
            if (combinator.value === '/deep/') {
              replaceDeepCombinator(combinator, combinator.next())
            }
          })

          selectors.walkPseudos((pseudo) => {
            if (pseudo.value === '::v-deep') {
              const next = getNextNode(pseudo)
              if (next) {
                // const isNeedSpace = !!pseudo.prev()?.toString().startsWith(' ')
                // console.log('isSpace', isNeedSpace)

                replaceDeepCombinator(pseudo, next, false)
              }
            }
          })
        }).processSync(rule.selector)
      })
    },
  ]).process(code, { from: undefined }).css
}
