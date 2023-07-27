<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';

	export let icon = '';
	export let disabled = false;
	export let placeholder = '';
	export let modelValue:string | undefined = undefined;
	export let customClass = '';
	// updateModelValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value
		dispatch('updateModelValue', value)
	}
</script>

<div
	class="flex items-center border border-solid border-main rounded px-2 py-1 hover:border-main focus-within:border-main focus-within:ui-input-shadow {customClass}"
>
	<slot name="icon">
		{#if icon}
			<KIcon {icon} customClass="mr-0.4em text-1.1em op50" />
		{/if}
	</slot>
	<select
		bind:value={modelValue}
		{disabled}
		on:change={handleSelect}
		class="w-full flex-auto !outline-none dark:bg-dark-500"
	>
		{#if placeholder}
			<option value="" disabled hidden>
				{placeholder}
			</option>
		{/if}
		<slot />
	</select>
</div>
