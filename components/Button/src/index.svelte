<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import type { IKunTypePro } from '@ikun-ui/utils';
	export let to = false;
	export let icon = '';
	export let cls = '';
	export let attrs = {};
	export let type:IKunTypePro = 'primary';
	export let disabled = false;
	// small medium large
	// export let size = 'medium'

	const dispatch = createEventDispatcher();
	const handleClick = (e: Event) => {
		if (!to) dispatch('click', e);
	};

	$: tag = to ? 'a' : 'button';

</script>

<svelte:element
	this={tag}
	aria-hidden="true"
	on:click={handleClick}
	{...attrs}
	class="
        k-button--base
        k-button--{type}
        k-button--{type}__active
        k-button--{type}__focus
        {disabled ? 'k-cur-disabled' : ''}
        {cls}">
	{#if icon}
		<KIcon {icon}
			   color={`k-button--${type}__icon`}
			   cls="mr-2" />
	{/if}
	<slot />
</svelte:element>
