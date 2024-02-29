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
	export let avatar: KSkeletonProps['avatar'] = false;
	export let size: KSkeletonProps['size'] = 'md';
	export let active: KSkeletonProps['active'] = false;
	export let cls: KSkeletonProps['cls'] = '';
	export let attrs: KSkeletonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton');
	$: avatarSize = isObject(avatar) ? (avatar as KSkeletonAvatarProps).size || size : size;
	$: cnames = clsx(prefixCls, cls);
	$: contentCls = clsx(`${prefixCls}-content--${avatarSize}`);
	$: headerCls = clsx(`${prefixCls}-header`);
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

	$: avatarProps = isObject(avatar)
		? {
				size: avatarSize,
				active,
				...(avatar as KSkeletonAvatarProps)
			}
		: {
				size: avatarSize,
				active
			};
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
