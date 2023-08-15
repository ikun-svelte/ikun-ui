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
		if (valueInner) return;
		dispatch('updateValue', !valueInner);

		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	};
</script>

<label
	class="k-radio--base k-radio--base__dark {cls} {disabled ? 'k-cur-disabled' : ''}"
	{...attrs}
>
	<input value={valueInner} {disabled} type="radio" on:change={handleUpdateValue} hidden />
	<div
		class="k-radio--box
				{valueInner && !disabled ? 'bg-ikun-main border-ikun-main' : ''}
				{classChecking} {disabled ? 'k-radio--box__disabled' : ''}"
	>
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon
					icon="i-carbon:radio-button-checked"
					color="!text-white"
					width="16px"
					height="16px"
				/>
			</div>
		{/if}
	</div>
	<slot>
		{#if label}
			<span class="k-radio--label {valueInner && !disabled ? 'text-ikun-main' : ''}">
				{label}
			</span>
		{/if}
	</slot>
</label>
