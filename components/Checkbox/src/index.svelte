<script lang="ts">
	import {createEventDispatcher, getContext} from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx, type ClassValue } from 'clsx';
	import {checkboxGroupKey, getPrefixCls} from '@ikun-ui/utils';

	export let disabled = false;
	export let value = false;
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let label = '';
	// updateValue
	const dispatch = createEventDispatcher();

	const checkboxContext = getContext<{
		setCheckboxMap: (key: string, v: string) => void;
		value: string[] | number[];
		disabled: boolean
	}>(checkboxGroupKey);

	$: isDisabled = disabled || checkboxContext && checkboxContext.disabled
	let valueInner = checkboxContext ? hasLabel() : value
	$: if(!isDisabled){
		valueInner = checkboxContext ? hasLabel() : value
		setAnimate()
	}

	function hasLabel(){
		return checkboxContext.value.some(v => {
			return v.toString() === label
		})
	}

	let classChecking = '';
	const handleUpdateValue = () => {
		if (isDisabled) return;
		valueInner = !valueInner
		checkboxContext && checkboxContext.setCheckboxMap(label, valueInner ? label : '')
		dispatch('updateValue', valueInner);
		setAnimate()
	};

	function setAnimate(){
		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	}

	// class
	const prefixCls = getPrefixCls('checkbox');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		{
			[`k-cur-disabled`]: isDisabled
		},
		cls
	);

	$: boxCls = clsx(
		`${prefixCls}--box`,
		{
			[`bg-ikun-main border-ikun-main`]: valueInner && !isDisabled,
			[`${prefixCls}--box__disabled`]: isDisabled
		},
		classChecking
	);

	$: labelCls = clsx(`${prefixCls}--label`, {
		[`text-ikun-main`]: valueInner && !isDisabled
	});
</script>

<label class={cnames} {...attrs}>
	<input value={valueInner} disabled={isDisabled} type="checkbox" on:change={handleUpdateValue} hidden />
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
