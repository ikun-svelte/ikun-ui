<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

  export let cls: string = '';
  export let attrs: Record<string, string> = {};

  const prefixCls = getPrefixCls('grid');

  $: cnames = clsx(prefixCls, {
    [`${prefixCls}--base`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
  