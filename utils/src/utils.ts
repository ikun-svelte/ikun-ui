const getReferenceDataType = (val: unknown): string => Object.prototype.toString.call(val)

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isArray = (val: unknown): val is Array<any> => getReferenceDataType(val) === '[object Array]'
export const isObject = (val: unknown): val is Record<string, unknown> => getReferenceDataType(val) === '[object Object]'

export const isRewritten = (target: Record<string, any>): boolean => {
  return target.toString !== Object.prototype.toString && !target.toString.toString().includes('[native code]')
}