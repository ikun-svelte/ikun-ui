<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let iconPrefix = '';
	export let iconSuffix = '';
	export let value = '';
	export let cls: ClassValue = '';
	export let placeholder = '';
	export let disabled = false;
	export let attrs = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		if (disabled) return;
		dispatch('updateValue', (e.target as HTMLSelectElement).value);
	};

	$: cnames = clsx(cls);
</script>

<div
	{...attrs}
	class="
	 k-select--base
	 k-select--base__dark
	 k-select__hover
	 k-select__focus {cnames} {disabled
		? 'k-select--base__disabled k-select--base__disabled__dark'
		: ''}"
>
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon icon={iconPrefix} cls="k-select--prefix" />
		{/if}
	</slot>
	<select
		bind:value
		{disabled}
		on:change={handleSelect}
		class="
		k-select--inner
		k-select--inner__dark {disabled ? 'k-select--base__disabled k-select--base__disabled__dark' : ''}"
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
