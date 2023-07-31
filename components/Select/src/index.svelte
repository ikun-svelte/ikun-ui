<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';

	export let icon = '';
	export let disabled = false;
	export let placeholder = '';
	export let value:string | undefined = undefined;
	export let cls = '';
	export let attrs = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value
		dispatch('updateValue', value)
	}
</script>

<div {...attrs}
	class="k-select--base k-select__hover k-select__focus {cls}"
>
	<slot name="icon">
		{#if icon}
			<KIcon {icon} cls="k-select--prefix" />
		{/if}
	</slot>
	<select
		bind:value={value}
		{disabled}
		on:change={handleSelect}
		class="k-select--inner dark:bg-dark-500"
	>
		{#if placeholder}
			<option value="" disabled hidden>
				{placeholder}
			</option>
		{/if}
		<slot />
	</select>
</div>
