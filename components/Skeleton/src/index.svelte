<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonProps } from './types';
	import KSkeletonTitle from './title.svelte';
	import { isObject } from 'baiwusanyu-utils';
	export let loading: KSkeletonProps['loading'] = false;
	export let title: KSkeletonProps['title'] = true;
	export let size: KSkeletonProps['size'] = 'md';
	export let active: KSkeletonProps['active'] = false;
	export let cls: KSkeletonProps['cls'] = '';
	export let attrs: KSkeletonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton');
	$: cnames = clsx(prefixCls, cls);
	$: titleProps = isObject(title)
		? {
				size,
				active,
				...(title as Record<string, any>)
			}
		: {
				size,
				active
			};
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if loading}
		<slot name="skeleton">
			{#if title}
				<KSkeletonTitle {...titleProps}></KSkeletonTitle>
			{/if}
		</slot>
	{:else}
		<slot />
	{/if}
</div>
