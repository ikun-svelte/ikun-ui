<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from '../Icon/src/index.svelte';
	export let disabled = false;
	export let modelValue = false;
	export let customClass = '';
	export let attrs = {};
	export let label = '';
	// updateModelValue
	const dispatch = createEventDispatcher();

	$: valueInner = modelValue;
	let classChecking = '';
	const handleUpdateModelValue = () => {
		if (disabled) return;
		dispatch('updateModelValue', !valueInner);

		classChecking = 'ui-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	};
</script>

<label
	class="inline-flex cursor-pointer justify-start text-tx dark:text-white items-center gap-2 {customClass} {disabled
		? 'ui-disabled-cursor'
		: ''}"
	{...attrs}
>
	<input
		value={valueInner}
		{disabled}
		class="peer"
		type="checkbox"
		on:change={handleUpdateModelValue}
		hidden
	/>
	<div
		class="rounded border border-solid flex-c h-4 w-4 {valueInner
			? 'bg-main'
			: ''} {classChecking} {disabled ? 'ui-disabled' : ''}"
	>
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<Icon icon="i-carbon-checkmark" colorCls="!text-white" width="16px" height="16px" />
			</div>
		{/if}
	</div>
	<slot>
		{#if label}
			<span class="ui-checkbox--label text-sm {valueInner ? 'text-main' : ''}">
				{label}
			</span>
		{/if}
	</slot>
</label>

<style>
	@keyframes checking {
		0% {
			box-shadow: 0 0 0 2px rgb(255 30 30 / 40%);
		}

		60% {
			box-shadow: 0 0 0 4px rgb(255 30 30 / 20%);
		}

		80% {
			box-shadow: 0 0 0 6px rgb(255 30 30 / 10%);
		}

		100% {
			box-shadow: 0 0 0 8px rgb(255 30 30 / 5%);
		}
	}

	.ui-checking {
		-webkit-animation: checking 0.3s linear;
		-moz-animation: checking 0.3s linear;
	}
</style>
