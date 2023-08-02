<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	export let iconPrefix = '';
	export let iconSuffix = '';
	export let value = '';
	export let cls = '';
	export let placeholder = '';
	export let disabled = false;
	export let attrs = {};

	const dispatch = createEventDispatcher();
	const onUpdated = (e: Event) => {
		dispatch('input', (e.target as HTMLInputElement).value);
	};
	const onEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') dispatch('enter', e);
		else dispatch('keydown', e);
	};
	const onChange = (e: Event) => {
		dispatch('change', e);
	};
	let valueInner = value
</script>

<div
	class=" k-input--base k-input--base__hover k-input--base__focus {disabled ? 'k-input--base__disabled' : ''} {cls}">
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon cls="k-input--icon" icon={iconPrefix} />
		{/if}
	</slot>
	<input
		class="k-input--inner k-input--inner__dark {disabled ? 'k-input--base__disabled' : ''}"
		bind:value={valueInner}
		{disabled}
		on:input={onUpdated}
		on:change={onChange}
		on:keydown={onEnter}
		{placeholder}
		{...attrs}
	/>
	<slot name="suffix">
		{#if iconSuffix}
			<KIcon cls="k-input--icon" icon={iconSuffix} />
		{/if}
	</slot>
</div>
