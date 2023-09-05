<script lang="ts">
	import type { KIconProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';

	export let icon: KIconProps['icon'] = '';
	export let btn: KIconProps['btn'] = false;
	export let width: KIconProps['width'] = '24px';
	export let height: KIconProps['height'] = '24px';
	export let color: KIconProps['color'] = '';
	export let cls: KIconProps['cls'] = '';
	export let attrs: KIconProps['attrs'] = {};

	$: tag = btn ? 'button' : '';

	const dispatch = createEventDispatcher();
	const onClick = (event: Event) => {
		dispatch('click', event);
	};

	// class names
	$: cnames = clsx(
		'k-icon--base',
		'k-icon--base__dark',
		{ 'k-icon--role-button': !!btn },
		'k-icon-transition',
		icon,
		color,
		cls
	);
</script>

<span
	class={cnames}
	role={tag}
	aria-hidden="true"
	{...$$restProps}
	{...attrs}
	style:width
	style:height
	on:click={onClick}
></span>
