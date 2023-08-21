<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { createCls, getPrefixCls } from '@ikun-ui/utils';
	import { isNumber } from 'baiwusanyu-utils';

	export let icon: string = '';
	export let src: string = '';
	export let srcSet: string = '';
	export let alt: string = '';
	export let fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';
	export let size: string | number = '50px';
	export let radius: string | number = '4px';
	export let cls: string = '';

	let avatarSize: string = size;
	$: if (isNumber(size)) {
		avatarSize = `${size}px`;
	}

	let avatarRadius: string = radius;
	$: if (isNumber(radius)) {
		avatarRadius = `${radius}px`;
	}

	let hasLoadError: boolean = false;
	$: if (src) {
		hasLoadError = false;
	}

	const dispatch = createEventDispatcher();

	const onError = (event: CustomEvent) => {
		hasLoadError = true;
		dispatch('error', event);
	};

	// remove extra space from class names
	const avatarCls = getPrefixCls('avatar');
	$: cnames = createCls(avatarCls, cls);
</script>

<div
	class={cnames}
	style="width: {avatarSize}; height: {avatarSize}; border-radius: {avatarRadius}"
>
	{#if (src || srcSet) && !hasLoadError}
		<img {src} {alt} {srcSet} on:error={onError} style="object-fit: {fit}" />
	{:else if icon}
		<KIcon v-else-if="icon" {icon}></KIcon>
	{:else}
		<slot v-else />
	{/if}
</div>
