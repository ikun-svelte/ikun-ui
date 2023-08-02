<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	export let iconPrefix = '';
	export let iconSuffix = '';
	export let value = '';
	export let cls = '';
	export let placeholder = '';
	export let disabled = false;
	export let attrs = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		dispatch('updateValue', (e.target as HTMLSelectElement).value)
	}
</script>

<div {...attrs} class="k-select--base k-select__hover k-select__focus {cls} {disabled ? 'k-select--base__disabled' : ''}">
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon icon={iconPrefix} cls="k-select--prefix" />
		{/if}
	</slot>
	<select
		bind:value={value}
		{disabled}
		on:change={handleSelect}
		class="k-select--inner k-select--inner__dark {disabled ? 'k-select--base__disabled' : ''}"
	>
		{#if placeholder}
			<option value="" disabled hidden>
				{placeholder}
			</option>
		{/if}
		<slot />
	</select>
	<slot name="suffix">
		{#if iconSuffix}
			<KIcon icon={iconSuffix} cls="k-select--suffix" />
		{/if}
	</slot>
</div>
