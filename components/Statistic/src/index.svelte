<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { KStatisticProps } from "./types";
  
  export let cls: KStatisticProps["cls"] = undefined;
  export let attrs: KStatisticProps["attrs"] = {};
 
  const prefixCls = getPrefixCls('statistic');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
  