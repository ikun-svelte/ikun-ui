import { isString, isNumber, isArray, isObject, isRewritten } from "./utils"

export function createCls(
  ...args:
    (string | number | Record<string, any> | any[]
    )[]
): string | undefined {
  const hasOwn = {}.hasOwnProperty
  const classnames: Array<string | number> = []
  for (let i = 0; i < arguments.length; i++) {
    const arg = args[i]
    if (!arg) continue
    if (isString(arg) || isNumber(arg)) {
      classnames.push(arg)
    } else if (isArray(arg)) {
      if (!arg.length) return
      // eslint-disable-next-line prefer-spread
      const inner = createCls.apply(null, arg)
      if (inner) {
        classnames.push(inner)
      }
    } else if (isObject(arg)) {
      if (isRewritten(arg)) {
        classnames.push(arg.toString())
        continue
      }
      for (const key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classnames.push(key)
        }
      }
    }
  }
  return classnames.join(' ')
}