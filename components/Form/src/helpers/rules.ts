// ⭕TODO: 支持简单的规则校验 require max min
// ⭕TODO: max min 只对 string、number
// ⭕TODO: 校验顺序按照 rules 顺序
// ⭕TODO: validator
// ⭕TODO: validator 后 require max min 将失效
import { getValueByPath } from './fields'
import { isArray, isNumber, isString } from "baiwusanyu-utils";
import type { KFormRule, KFormRules } from "../types";

/**
 * 校验整个表单
 * @param rules
 * @param target
 */
export function doValidate(
  rules: KFormRules,
  target: Record<string, any>){
  for (const field in rules){
    const value = getValueByPath(field, target)
    const rule = rules[field]
    for(let i = 0; i < rule.length; i++){
      const ruleOption = rule[i]
      if(ruleOption.validator){
        ruleOption.validator(value, (msg: string) => {
          if(msg){
            throw new Error(msg)
          }
        })
      } else {
        validateRequired(ruleOption, value, field)
        validateMin(ruleOption, value, field)
        validateMax(ruleOption, value, field)
      }
    }
  }
}

/**
 * 校验某个字段
 */
export function doValidateField(
  rules: KFormRules | undefined,
  path: string,
  value: unknown){
  if(rules){
    const fieldRule = rules[path]
    for(let i = 0; i < fieldRule.length; i++){
      const ruleOption = fieldRule[i]
      if(ruleOption.validator){
        ruleOption.validator(value, (msg: string) => {
          if(msg){
            throw new Error(msg)
          }
        })
      } else {
        validateRequired(ruleOption, value, path)
        validateMin(ruleOption, value, path)
        validateMax(ruleOption, value, path)
      }
    }
  }
}

function validateRequired(
  rule: KFormRule,
  value: any,
  field: string
){
  if(rule.required){
    if(!value && value !== 0){
      throw new Error(rule.msg || `${field} is required`)
    }
  }
}

function validateMin(
  rule: KFormRule,
  value: any,
  field: string
){
  if(rule.min || rule.min === 0){
    if(isNumber(value) && value < rule.min){
      throw new Error(rule.msg || `${field} cannot be less than ${rule.min}`)
    }
    if((isString(value) || isArray(value)) && value.length < rule.min){
      throw new Error(rule.msg || `${field} length cannot be less than ${rule.min}`)
    }
  }
}

function validateMax(
  rule: KFormRule,
  value: any,
  field: string
){
  if(rule.max || rule.max === 0){
    if(isNumber(value) && value  > rule.max){
      throw new Error(rule.msg || `${field} cannot be greater than ${rule.max}`)
    }

    if((isString(value) || isArray(value)) && value.length > rule.max){
      throw new Error(rule.msg || `${field} length cannot be greater than ${rule.max}`)
    }
  }
}
