<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonParagraphProps, KSkeletonProps, KSkeletonTitleProps } from './types';
	import KSkeletonTitle from './title.svelte';
	import KSkeletonParagraph from './paragraph.svelte';
	import { isObject } from 'baiwusanyu-utils';
	export let loading: KSkeletonProps['loading'] = false;
	export let title: KSkeletonProps['title'] = true;
	export let paragraph: KSkeletonProps['paragraph'] = true;
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
				...(title as KSkeletonTitleProps)
			}
		: {
				size,
				active
			};
	$: paragraphProps = isObject(paragraph)
		? {
				size,
				active,
				...(paragraph as KSkeletonParagraphProps)
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
				<div>
					<KSkeletonTitle {...titleProps}></KSkeletonTitle>
					<KSkeletonParagraph {...paragraphProps}></KSkeletonParagraph>
				</div>
			{/if}
		</slot>
	{:else}
		<slot />
	{/if}
</div>
