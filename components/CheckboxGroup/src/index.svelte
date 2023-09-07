<script lang="ts">
    import { checkboxGroupKey, getPrefixCls} from '@ikun-ui/utils';
  import { clsx } from 'clsx';
  import type { KCheckboxGroupProps, checkboxMapType } from "./types";
  import {createEventDispatcher, setContext} from "svelte";
  export let disabled:KCheckboxGroupProps["disabled"] = false;
  export let value:KCheckboxGroupProps["value"] = [];
  export let cls: KCheckboxGroupProps["cls"] = undefined;
  export let attrs: KCheckboxGroupProps["attrs"] = {};

  let valueInner = value
  $: if(!disabled){
      valueInner = value
  }
  // updateValue
  const dispatch = createEventDispatcher();
  const checkboxMap:checkboxMapType = new Map()

  const initCheckboxMap = () => {
      value.forEach((v: string) => checkboxMap.set(v, v))
  }
  initCheckboxMap()
  const setCheckboxMap = (key: string, v: string) => {
      if(disabled){
          return
      }
      checkboxMap.set(key, v)
      handleUpdated()
  };

  const handleUpdated = () => {
      valueInner = Array.from(checkboxMap.values()).filter(v => v)
      dispatch('updateValue', valueInner);
  }

  // ✅ disabled 时可以初始化值
    // TODO disabled 时value 变化 ，不能 change 所有checkbox值
  // TODO disabled 变化时，值时 value 最新值
  // TODO 🚧 非 disabled 时，value 变化 , change 所有checkbox值
  // ✅ 非 disabled 时，可以初始值
  // ✅ checkbox 有一个值变化时，则触发 group 值
  setContext(checkboxGroupKey, {
      setCheckboxMap,
      value: valueInner,
      disabled
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
