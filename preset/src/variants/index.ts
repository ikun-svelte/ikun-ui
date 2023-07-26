import type { Variant } from 'unocss'
import type { Theme } from '@unocss/preset-uno'
// TODO: 變體 ？？？
export default [
  (input: string) => {
    const prefix = 'k-disabled:'
    if (input.startsWith(prefix)) {
      return {
        matcher: input.slice(prefix.length),
        selector: input => `[disabled] ${input}, ${input}[disabled]`,
      }
    }
  },
  (input: string) => {
    const prefix = 'k-checked:'
    if (input.startsWith(prefix)) {
      return {
        matcher: input.slice(prefix.length),
        selector: input => `[checked] ${input}, ${input}[checked]`,
      }
    }
  },
] as Variant<Theme>[]
