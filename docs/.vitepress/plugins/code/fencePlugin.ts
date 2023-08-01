import type { MarkdownRenderer } from 'vitepress'
import { FenceDemoTag } from './constants'
import { genDemoByCode } from './utils'

export function fencePlugin(md: MarkdownRenderer) {
  const defaultRender = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() !== FenceDemoTag)
      return defaultRender!(tokens, idx, options, env, self)

    const content = token.content
    const path = env.path

    const demoScripts = genDemoByCode(md, env, path, content)
    return demoScripts
  }
}
