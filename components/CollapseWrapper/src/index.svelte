<script lang="ts">
    import { getPrefixCls, collapseWrapperKey } from '@ikun-ui/utils';
	import clsx from 'clsx';
    import {setContext} from "svelte";
    import type {collapseMapType} from "./types";

  export let cls: string = '';
  export let accordion = false;
  export let attrs: Record<string, string> = {};

  const collapseMap:collapseMapType = {}
  const setCollapseMap = (key: string, cb: () =>void) => {
      collapseMap[key] = cb
  }

 const closeCollapse = (key: string) => {
     Object.keys(collapseMap).forEach((k) => {
         if(k !== key){
             collapseMap[k]()
         }
     })
    }
  if(accordion){
      setContext(collapseWrapperKey, {
          setCollapseMap,
          closeCollapse
      });
  }

  const prefixCls = getPrefixCls('collapse-wrapper');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
    <slot></slot>
</div>
