<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';
	import type { KTagProps } from './types';

	export let type: KTagProps['type'] = 'primary';
	export let bgColor: KTagProps['bgColor'] = '';
	export let textColor: KTagProps['textColor'] = '';
	export let icon: KTagProps['icon'] = '';
	export let border: KTagProps['border'] = false;
	export let closable: KTagProps['closable'] = false;
	export let closeIcon: KTagProps['closeIcon'] = 'i-carbon-close';
	export let cls: KTagProps['cls'] = undefined;
	export let attrs: KTagProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	const onClick = (event: MouseEvent) => {
		dispatch('click', event);
	};

	const onClose = (event: CustomEvent) => {
		event.detail.stopPropagation();
		dispatch('close', event);
	};

	$: cnames = clsx(
		'k-tag',
		'k-tag--base',
		`k-tag--${type}`,
		{
			[`k-tag--${type}__border`]: border
		},
		cls
	);
</script>

<span
	class={cnames}
	{...$$restProps}
	{...attrs}
	aria-hidden="true"
	style="background-color: {bgColor}; color: {textColor}"
	on:click={onClick}
>
	{#if icon}
		<KIcon
			cls={['k-tag--icon', { 'k-tag--icon__has-slot': $$slots.default }]}
			{icon}
			width="0.8rem"
			height="0.8rem"
			color={`k-tag--${type}__icon`}
		/>
	{/if}
	<slot />
	{#if closable}
		<KIcon
			cls={['k-tag--close-icon', `k-tag--${type}__close-icon`]}
			icon={closeIcon}
			width="0.8rem"
			height="0.8rem"
			color={`k-tag--${type}__icon`}
			on:click={onClose}
		/>
	{/if}
</span>
