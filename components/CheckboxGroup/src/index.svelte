<script lang="ts">
  import { checkboxGroupKey, getPrefixCls} from '@ikun-ui/utils';
  import { clsx } from 'clsx';
  import type { KCheckboxGroupProps, checkboxMapType } from "./types";
  import {createEventDispatcher, setContext} from "svelte";
  export let disabled:KCheckboxGroupProps["disabled"] = false;
  export let value:KCheckboxGroupProps["value"] = [];
  export let cls: KCheckboxGroupProps["cls"] = undefined;
  export let attrs: KCheckboxGroupProps["attrs"] = {};

  interface checkboxMapValue {
      label: string,
      update: (v: string[] | number[]) => void
  }
  let valueInner = value
  $: if(!disabled && valueInner.join() !== value.join()){
      valueInner = value
      updateCheckBoxValue()
  }

  // value 值变化，更新 checkbox 组件
 const updateCheckBoxValue = () => {
     (Array.from(checkboxMap.values()) as checkboxMapValue[])
         .forEach((v: checkboxMapValue) => v.update && v.update(valueInner))
 }
  // updateValue
  const dispatch = createEventDispatcher();
  const checkboxMap:checkboxMapType = new Map()

  // 设置 checkboxMap，由 checkbox 组件调用，
  const setCheckboxMap = (key: string, v: checkboxMapValue) => {
      if(disabled){
          return
      }
      checkboxMap.set(key, v)
  };

  // 更新 value
  const handleUpdated = (key: string, v: checkboxMapValue) => {
      checkboxMap.set(key, v)
      valueInner = (Array.from(checkboxMap.values()) as checkboxMapValue[])
          .map((v: checkboxMapValue) => v.label)
          .filter((v: string ) => v)
      dispatch('updateValue', valueInner);
  }


  // ✅ disabled 时可以初始化值
  // ✅  disabled 时value 变化 ，不能 change 所有checkbox值
  // TODO disabled 变化时，值时 value 最新值
  // ✅ 非 disabled 时，value 变化 , change 所有checkbox值
  // ✅ 非 disabled 时，可以初始值
  // ✅ checkbox 有一个值变化时，则触发 group 值
  setContext(checkboxGroupKey, {
      // 传递给 checkbox 组件，注册 checkbox
      setCheckboxMap,
      // 传递给 checkbox 组件， 设置初始值
      value: valueInner,
      // 传递给 checkbox 组件， 设置禁用
      disabled,
      // 传递给 checkbox 组件， 更新 checkboxGroup valueInner
      handleUpdated
  });

  const prefixCls = getPrefixCls('checkbox-group');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
    <slot>
    </slot>
</div>
