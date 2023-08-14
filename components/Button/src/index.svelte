<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import type { IKunTypePro } from '@ikun-ui/utils';
	export let to = false;
	export let icon = '';
	export let round:string | number = '';
	export let circle = false;
	export let cls = '';
	export let attrs = {};
	export let type:IKunTypePro = 'primary';
	export let disabled = false;
	// small medium large
	// export let size = 'medium'

	const dispatch = createEventDispatcher();
	const handleClick = (e: Event) => {
		if(disabled){
			e.preventDefault()
		}
		if (!to && !disabled) dispatch('click', e);
	};

	// TODO a tag document and impl
	$: tag = to ? 'a' : 'button';

</script>

<svelte:element
	this={tag}
	aria-hidden="true"
	on:click={handleClick}
	style = "border-radius: { round ? `${round}` : '4'}px"
	{...attrs}
	class="
        k-button--base
        k-button--{type}
        {disabled 
					? 'k-cur-disabled k-button--disabled' 
					: `k-button--${type}__active k-button--${type}__focus k-button--${type}__hover`}
        {circle ? 'k-button--circle' : ''}
        {cls}">
	{#if icon}
		<KIcon {icon} color={`k-button--${type}__icon`}/>
	{/if}

	{#if $$slots.default && icon}
		<div class="ml-2"/>
	{/if}

	<slot/>

</svelte:element>
