<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	export let icon = '';
	export let value = '';
	export let customClass = '';
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
	class="
		flex
		items-center
		border
		rounded
		py-1
		pl-1
		pr-2
		hover:border-main
		focus-within:border-main
		focus-within:ui-input-shadow
		{disabled ? 'ui-disabled' : ''}
		{customClass}">
	<slot name="icon">
		{#if icon}
			<KIcon customClass="ml-0.3em mr-0.1em text-1.1em op50" {icon} />
		{/if}
	</slot>
	<input
		class="ml-0.4em w-full flex-auto !outline-none {disabled ? 'ui-disabled' : ''} dark:bg-dark-500"
		{...attrs}
		bind:value
		{disabled}
		on:input={onUpdated}
		on:change={onChange}
		on:keydown={onEnter}
		{placeholder}
	/>
</div>