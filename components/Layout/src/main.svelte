<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KLayoutProps } from './types';

	export let cls: KLayoutProps['cls'] = undefined;
	export let attrs: KLayoutProps['attrs'] = {};

	const prefixCls = getPrefixCls('main');

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<main class={cnames} {...$$restProps} {...attrs}>
	<slot />
</main>
