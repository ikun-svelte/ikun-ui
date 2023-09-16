<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KHeaderFooterProps, KLayoutProps } from './types';

	export let cls: KLayoutProps['cls'] = undefined;
	export let attrs: KLayoutProps['attrs'] = {};
	export let height: KHeaderFooterProps['height'] = '';
	const prefixCls = getPrefixCls('header');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<header class={cnames} {...$$restProps} {...attrs} style:height>
	<slot />
</header>
