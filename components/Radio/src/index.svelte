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
		if (valueInner) return;
		dispatch('updateValue', !valueInner);

		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	};

	$: cnames = clsx('k-radio--base k-radio--base__dark', { 'k-cur-disabled': disabled }, cls);
	$: radioboxCls = clsx(
		'k-radio--box',
		{
			'k-radio--selected': valueInner && !disabled,
			'k-radio--box__disabled': disabled
		},
		classChecking
	);
	$: labelCls = clsx('k-radio--label', {
		'text-ikun-main': valueInner && !disabled
	});
</script>

<label class={cnames} {...attrs}>
	<input value={valueInner} {disabled} type="radio" on:change={handleUpdateValue} hidden />
	<div class={radioboxCls}>
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
			<span class={labelCls}>
				{label}
			</span>
		{/if}
	</slot>
</label>
