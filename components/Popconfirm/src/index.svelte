<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { KPopconfirmProps } from "./types";
  
  export let cls: KPopconfirmProps["cls"] = undefined;
  export let attrs: KPopconfirmProps["attrs"] = {};
 
  const prefixCls = getPrefixCls('popconfirm');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
  