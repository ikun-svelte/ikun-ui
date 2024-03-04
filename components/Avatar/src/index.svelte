<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { isNumber } from 'baiwusanyu-utils';
	import { clsx } from 'clsx';
	import type { KAvatarProps } from './types';

	export let icon: KAvatarProps['icon'] = '';
	export let src: KAvatarProps['src'] = '';
	export let srcSet: KAvatarProps['srcSet'] = '';
	export let alt: KAvatarProps['alt'] = '';
	export let fit: KAvatarProps['fit'] = 'cover';
	export let size: KAvatarProps['size'] = '50px';
	export let radius: KAvatarProps['radius'] = '4px';
	export let cls: KAvatarProps['cls'] = '';
	export let attrs: KAvatarProps['attrs'] = {};

	let avatarSize: KAvatarProps['size'] = size;
	$: if (isNumber(size)) {
		avatarSize = `${size}px`;
	}

	let avatarRadius: KAvatarProps['radius'] = radius;
	$: if (isNumber(radius)) {
		avatarRadius = `${radius}px`;
	}

	let hasLoadError: boolean = false;
	$: if (src) {
		hasLoadError = false;
	}

	const dispatch = createEventDispatcher();

	const onError = (event: Event & { currentTarget: EventTarget & Element }) => {
		hasLoadError = true;
		dispatch('error', event as unknown as CustomEvent);
	};

	// remove extra space from class names
	const avatarCls = getPrefixCls('avatar');
	$: cnames = clsx(avatarCls, cls);
</script>

<div
	class={cnames}
	style="width: {avatarSize}; height: {avatarSize}; border-radius: {avatarRadius}"
	{...attrs}
>
	{#if (src || srcSet) && !hasLoadError}
		<img {src} {alt} {srcSet} on:error={onError} style="object-fit: {fit}" />
	{:else if icon}
		<KIcon {icon}></KIcon>
	{:else}
		<slot />
	{/if}
</div>
