<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KImageProps } from './types';

	export let cls: KImageProps['cls'] = undefined;
	export let attrs: KImageProps['attrs'] = {};

	const prefixCls = getPrefixCls('image');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
