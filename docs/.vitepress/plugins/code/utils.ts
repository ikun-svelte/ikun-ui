import { dirname, join, sep } from 'node:path'
import fsExtra from 'fs-extra'
import type { MarkdownRenderer } from 'vitepress'
import { DemoTag } from './constants'
import type { DemoInfos } from './types'

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/

let index = 1
export function getDemoComponent(
  md: MarkdownRenderer,
  env: any,
  { title, desc, path, code, ...props }: DemoInfos,
) {
  const componentName = `DemoComponent${index++}`
  path = normalizePath(path)
  const github = `https://github.com/onu-ui/onu-ui/tree/main/${path.split('/').slice(-4).join('/')}`

  injectImportStatement(env, componentName, path)

  const highlightedCode = md.options.highlight!(code, props.lang || 'vue', '')
  return `
    <${DemoTag}
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${title ?? ''}"
      desc="${desc ?? ''}"
      github="${github}"
    >
        <${componentName}></${componentName}>
    </${DemoTag}>
  `.trim()
}

let fenceIndex = 1
export function genDemoByCode(
  md: MarkdownRenderer,
  env: any,
  path: string,
  code: string,
) {
  let demoName = ''
  let demoPath = ''

  while (true) {
    demoName = `demo-${fenceIndex++}.vue`
    demoPath = join(dirname(path), demoName)
    if (!fsExtra.existsSync(demoPath))
      break
  }

  fsExtra.createFileSync(demoPath)
  fsExtra.writeFileSync(demoPath, code)

  return getDemoComponent(md, env, {
    path: demoPath,
    code,
  })
}

function normalizePath(path: string) {
  return path.split(sep).join('/')
}

function injectImportStatement(
  env: any,
  componentName: string,
  path: string,
) {
  const componentRegistStatement
    = `import ${componentName} from '${path}'`.trim()

  if (!env?.sfcBlocks?.scripts)
    env.sfcBlocks.scripts = []
  const tags = env.sfcBlocks.scripts as { content: string }[]

  const isUsingTS
    = tags.findIndex(tag => scriptLangTsRE.test(tag.content)) > -1
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return (
      scriptRE.test(tag.content)
      && scriptSetupRE.test(tag.content)
      && !scriptClientRE.test(tag.content)
    )
  })

  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex]
    tags[existingSetupScriptIndex].content = tagSrc.content.replace(
      scriptRE,
      `${componentRegistStatement}

      </script>`,
    )
  }
  else {
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ''} setup >
          ${componentRegistStatement}
        </script>
      `.trim(),
    })
  }
}
