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

	// 获取上下文
	const checkboxContext = getContext<{
		setCheckboxMap: (key: string, v: {
			label: string,
			update: (v: string[] | number[]) => void
		}) => void;
		value: string[] | number[];
		disabled: boolean
		handleUpdated: (key: string, v: {
			label: string,
			update: (v: string[] | number[]) => void
		}) => void;
	}>(checkboxGroupKey);

	// 设置 disabled
	$: isDisabled = disabled || checkboxContext && checkboxContext.disabled

	// 根据 checkboxContext.value  或 value 来设置 valueInner
	let valueInner = checkboxContext ? hasLabel() : value
	$: if(!isDisabled){
		valueInner = checkboxContext ? hasLabel() : value
		setAnimate()
	}
	// 注册 checkboxMap
	checkboxContext && checkboxContext.setCheckboxMap(label, { label, update: handleUpdateValueFromGroup })

	function hasLabel(v?: string[] | number[]){
		return (v || checkboxContext.value).some(v => {
			return v.toString() === label
		})
	}

	let classChecking = '';
	function handleUpdateValue() {
		if (isDisabled) return;
		valueInner = !valueInner
		// 更新 checkboxGroup valueInner
		checkboxContext && checkboxContext.handleUpdated(
				label, {
					label: valueInner ? label : '',
					update: handleUpdateValueFromGroup
				})
		dispatch('updateValue', valueInner);
		setAnimate()
	}

	/**
	 * 同步从 checkbox group valueInner 变化
	 * @param v
	 */
	function handleUpdateValueFromGroup(v: string[] | number[]) {
		valueInner = hasLabel(v)
		setAnimate()
	}

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
