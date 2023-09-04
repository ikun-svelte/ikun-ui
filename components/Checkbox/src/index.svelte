<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx, type ClassValue } from 'clsx';

	export let disabled = false;
	export let value = false;
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
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
	class={clsx(cls, 'k-checkbox--base k-checkbox--base__dark', {
		'k-cur-disabled': disabled
	})}
	{...attrs}
>
	<input value={valueInner} {disabled} type="checkbox" on:change={handleUpdateValue} hidden />
	<div
		class={clsx(classChecking, 'k-checkbox--box', {
			'bg-ikun-main border-ikun-main': valueInner && !disabled,
			'k-checkbox--box__disabled': disabled
		})}
	>
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon icon="i-carbon-checkmark" color="!text-white" width="16px" height="16px" />
			</div>
		{/if}
	</div>
	<slot>
		{#if label}
			<span
				class={clsx('k-checkbox--label', {
					'text-ikun-main': valueInner && !disabled
				})}
			>
				{label}
			</span>
		{/if}
	</slot>
</label>
