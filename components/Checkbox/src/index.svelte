<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	export let disabled = false;
	export let value = false;
	export let cls = '';
	export let attrs = {};
	export let label = '';
	// updateValue
	const dispatch = createEventDispatcher();

	$: valueInner = value;
	let classChecking = '';
	const handleUpdateValue = () => {
		if (disabled) return;
		dispatch('updateValue', !valueInner);

		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	};
</script>

<label
	class="k-checkbox--base k-checkbox--base__dark {cls} { disabled ? 'k-cur-disabled' : ''}"
	{...attrs}>
	<input
		value={valueInner}
		{disabled}
		type="checkbox"
		on:change={handleUpdateValue}
		hidden
	/>
	<div class="k-checkbox--box
				{valueInner && !disabled ? 'bg-ikun-main border-ikun-main' : ''}
				{classChecking} {disabled ? 'k-checkbox--box__disabled' : ''}">
		{#if valueInner}
			<div out:fade={{ duration: 200 }}
				 in:fade={{ duration: 200 }}>
				<KIcon icon="i-carbon-checkmark"
					   color="!text-white"
					   width="16px"
					   height="16px" />
			</div>
		{/if}
	</div>
	<slot>
		{#if label}
			<span class="k-checkbox--label {valueInner && !disabled ? 'text-main' : ''}">
				{label}
			</span>
		{/if}
	</slot>
</label>
