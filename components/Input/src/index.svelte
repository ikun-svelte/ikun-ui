<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	export let icon = '';
	export let value = '';
	export let cls = '';
	export let placeholder = '';
	export let disabled = false;
	export let attrs = {};

	const dispatch = createEventDispatcher();
	const onUpdated = (e: Event) => {
		if(e.target){
			value = (e.target as HTMLInputElement).value;
		}
		dispatch('input', e);
	};
	const onEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') dispatch('enter', e);
		else dispatch('keydown', e);
	};
	const onChange = (e: Event) => {
		dispatch('change', e);
	};
</script>

<div
	class=" k-input--base k-input--base__hover k-input--base__focus {disabled ? 'k-input--bas__disabled' : ''} {cls}">
	<slot name="icon">
		{#if icon}
			<KIcon cls="k-input--icon" {icon} />
		{/if}
	</slot>
	<input
		class="k-input--inner k-input--inner__dark {disabled ? 'k-input--bas__disabled' : ''}"
		{...attrs}
		bind:value
		{disabled}
		on:input={onUpdated}
		on:change={onChange}
		on:keydown={onEnter}
		{placeholder}
	/>
</div>
