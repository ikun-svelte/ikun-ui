<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonProps } from './types';
	import KSkeletonTitle from './title.svelte';
	export let loading: KSkeletonProps['loading'] = false;
	export let title: KSkeletonProps['title'] = true;
	export let cls: KSkeletonProps['cls'] = '';
	export let attrs: KSkeletonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if loading}
		<slot name="skeleton">
			{#if title}
				<KSkeletonTitle {...title}></KSkeletonTitle>
			{/if}
		</slot>
	{:else}
		<slot name="content" />
	{/if}
</div>
