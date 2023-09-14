<script lang="ts">
	import { getPrefixCls, KSymbolKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps, KColProps } from './types';
	import { getContext } from 'svelte';
	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};
	export let tag: KColProps['tag'] = 36;
	export let span: KColProps['span'] = 0;
	export let offset: KColProps['offset'] = 0;
	export let push: KColProps['push'] = 0;
	export let pull: KColProps['pull'] = 0;
	export let xs: KColProps['xs'] = undefined;
	export let sm: KColProps['sm'] = undefined;
	export let md: KColProps['md'] = undefined;
	export let lg: KColProps['lg'] = undefined;
	export let xl: KColProps['xl'] = undefined;

	const prefixCls = getPrefixCls('col');
	$: gutterValue = (getContext(KSymbolKey) as number) || 0;

	$: pxStyle = '';
	$: {
		if (gutterValue) {
			pxStyle = `-${gutterValue / 2}px`;
		}
	}

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<svelte:element
	this={tag}
	class={cnames}
	style:padding-right={pxStyle}
	style:padding-left={pxStyle}
	{...$$restProps}
	{...attrs}
>
	<slot />
</svelte:element>
