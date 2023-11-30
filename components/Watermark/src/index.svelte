<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KWatermarkProps } from './types';

	export let cls: KWatermarkProps['cls'] = undefined;
	export let attrs: KWatermarkProps['attrs'] = {};

	const prefixCls = getPrefixCls('watermark');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
