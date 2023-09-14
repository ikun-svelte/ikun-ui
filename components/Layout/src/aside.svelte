<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KAsideProps, KLayoutProps } from './types';

	export let cls: KLayoutProps['cls'] = undefined;
	export let attrs: KLayoutProps['attrs'] = {};

	export let width: KAsideProps['width'] = '';

	const prefixCls = getPrefixCls('aside');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<footer class={cnames} {...$$restProps} {...attrs} style:width>
	<slot />
</footer>
