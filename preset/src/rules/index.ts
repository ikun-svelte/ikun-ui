import { parseColor } from '@unocss/preset-mini/utils'
import type { ParsedColorValue, Rule, RuleContext } from 'unocss'
import type { Theme } from '@unocss/preset-uno'
import theme from '../theme'
import { SwitchSizeMap } from './constants'

// 自定義的原子樣式規則
export function parseColors(body: string, _theme: Theme = theme): ParsedColorValue | undefined {
  return parseColor(body, _theme)
}

export default [
  [/^k-(.*)$/, ([, body]: string[], { theme }: RuleContext<Theme>) => {
    const color = parseColor(body, theme)
    if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
      return {
        '--ikun-c-context': `${color.cssColor.components.join(',')}`,
      }
    }
    else {
      return {
        '--ikun-c-context': color?.color,
      }
    }
  }],
  [/^k-switch-(.+)$/, ([, s]: string[]) => {
    if (['sm', 'md', 'lg'].includes(s)) {
      return {
        '--k-switch-offset': SwitchSizeMap[s][2],
        'width': SwitchSizeMap[s][0],
        'height': SwitchSizeMap[s][1],
      }
    }
  }],
  ['k-dashed', { 'border-style': 'dashed' }],
  ['k-solid', { 'background-color': 'rgba(var(--ikun-c-context), 1) !important', 'border-color': 'rgba(var(--ikun-c-context), 1)', 'color': 'white !important' }],
  ['k-bg-clip-half', { 'clip-path': 'polygon(0% 0%, 50% 0, 50% 50%, 50% 100%, 0% 100%)' }],
] as Rule<Theme>[]
