<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type {
		KSkeletonAvatarProps,
		KSkeletonParagraphProps,
		KSkeletonProps,
		KSkeletonTitleProps
	} from './types';
	import KSkeletonTitle from './title.svelte';
	import KSkeletonParagraph from './paragraph.svelte';
	import KSkeletonAvatar from './avatar.svelte';
	import { isObject } from 'baiwusanyu-utils';
	export let loading: KSkeletonProps['loading'] = false;
	export let title: KSkeletonProps['title'] = true;
	export let paragraph: KSkeletonProps['paragraph'] = true;
	export let round: KSkeletonProps['round'] = false;
	export let avatar: KSkeletonProps['avatar'] = false;
	export let size: KSkeletonProps['size'] = 'md';
	export let active: KSkeletonProps['active'] = false;
	export let cls: KSkeletonProps['cls'] = '';
	export let attrs: KSkeletonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton');
	$: paragraphSize = isObject(paragraph) ? (paragraph as KSkeletonAvatarProps).size || size : size;
	$: cnames = clsx(prefixCls, cls);
	$: contentCls = clsx(`${prefixCls}-content--${paragraphSize}`, {
		[`${prefixCls}-pd--${paragraphSize}`]: avatar
	});
	$: headerCls = clsx(`${prefixCls}-header`);
	$: defaultSubProps = {
		size,
		active
	};
	$: titleProps = isObject(title)
		? {
				...defaultSubProps,
				round,
				...(title as KSkeletonTitleProps)
			}
		: {
				...defaultSubProps,
				round
			};
	$: paragraphProps = isObject(paragraph)
		? {
				...defaultSubProps,
				round,
				...(paragraph as KSkeletonParagraphProps)
			}
		: {
				...defaultSubProps,
				round
			};

	$: avatarProps = isObject(avatar)
		? {
				...defaultSubProps,
				...(avatar as KSkeletonAvatarProps)
			}
		: defaultSubProps;
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if loading}
		<slot name="skeleton">
			<div class={headerCls}>
				{#if avatar}
					<KSkeletonAvatar {...avatarProps}></KSkeletonAvatar>
				{/if}
				{#if title}
					<KSkeletonTitle {...titleProps}></KSkeletonTitle>
				{/if}
			</div>

			<div class={contentCls}>
				{#if paragraph}
					<KSkeletonParagraph {...paragraphProps}></KSkeletonParagraph>
				{/if}
			</div>
		</slot>
	{:else}
		<slot />
	{/if}
</div>
