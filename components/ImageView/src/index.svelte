<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KImageViewProps } from './types';

	export let cls: KImageViewProps['cls'] = undefined;
	export let attrs: KImageViewProps['attrs'] = {};

	const prefixCls = getPrefixCls('image-view');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
