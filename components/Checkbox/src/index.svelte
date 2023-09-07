<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx, type ClassValue } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';

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

	// class
	const prefixCls = getPrefixCls('checkbox');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		{
			[`k-cur-disabled`]: disabled
		},
		cls
	);

	$: boxCls = clsx(
		`${prefixCls}--box`,
		{
			[`bg-ikun-main border-ikun-main`]: valueInner && !disabled,
			[`${prefixCls}--box__disabled`]: disabled
		},
		classChecking
	);

	$: labelCls = clsx(
		`${prefixCls}--label`,
		{
			[`text-ikun-main`]: valueInner && !disabled
		},
		classChecking
	);
</script>

<label class={cnames} {...attrs}>
	<input value={valueInner} {disabled} type="checkbox" on:change={handleUpdateValue} hidden />
	<div class={boxCls}>
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon icon="i-carbon-checkmark" color="!text-white" width="16px" height="16px" />
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
