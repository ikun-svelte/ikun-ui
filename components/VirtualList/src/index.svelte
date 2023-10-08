<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { KVirtual-listProps } from "./types";
  
  export let cls: KVirtual-listProps["cls"] = undefined;
  export let attrs: KVirtual-listProps["attrs"] = {};
 
  const prefixCls = getPrefixCls('virtual-list');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
  