<script lang="ts">
	import type { KSwitchProps } from './types';
	import { createEventDispatcher, onMount } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';

	export let value: KSwitchProps['value'] = false;
	export let checkedValue: KSwitchProps['checkedValue'] = true;
	export let unCheckedValue: KSwitchProps['unCheckedValue'] = false;
	export let checkedColor: KSwitchProps['checkedColor'] = '';
	export let unCheckedColor: KSwitchProps['unCheckedColor'] = '';
	export let size: KSwitchProps['size'] = 'md';
	export let loading: KSwitchProps['loading'] = false;
	export let disabled: KSwitchProps['disabled'] = false;
	export let cls: KSwitchProps['cls'] = undefined;
	export let attrs: KSwitchProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	$: innerState = value === checkedValue;
	/**
	 * 切换状态方法
	 */
	let changeData: {
		newVal: KSwitchProps['value'];
		oldVal: KSwitchProps['value'];
	};
	const emitChangeEvt = (): void => {
		changeData = innerState
			? {
					newVal: unCheckedValue,
					oldVal: checkedValue
			  }
			: {
					newVal: checkedValue,
					oldVal: unCheckedValue
			  };
		dispatch('change', changeData);
	};

	/**
	 * 设置动画样式类
	 */
	let switching = '';
	let switchCircleRef: null | HTMLElement = null;
	const changeClass = (checked: boolean) => {
		return new Promise((resolve) => {
			switching = `${prefixCls}-tra`;
			if (switchCircleRef) {
				const circleWidth = switchCircleRef.getClientRects()[0]?.width;
				switchCircleRef.style.right = checked ? '1px' : `calc(100% - ${circleWidth}px - 1px)`;
			}
			setTimeout(() => {
				switching = '';
				resolve(true);
			}, 300);
		});
	};

	let isUpdateModel = false;
	const switchState = async () => {
		// 切换状态
		emitChangeEvt();
		dispatch('updateValue', changeData.newVal);
		isUpdateModel = true;
		await changeClass(changeData.newVal === checkedValue);
	};

	$: if (changeData && value !== changeData.newVal) {
		if (!isUpdateModel) {
			emitChangeEvt();
		}
		isUpdateModel = false;
	}
	/**
	 * 点击方法
	 * @param {Event} e - 事件对象
	 */
	const handleClick = async (e?: Event) => {
		if (disabled || loading) return;
		await switchState();
		dispatch('click', e);
	};
	/**
	 * 初始化方法
	 */
	const init = async () => {
		await changeClass(innerState);
	};
	onMount(init);

	const prefixCls = getPrefixCls('switch');
	$: switchCls = clsx(
		`${prefixCls}`,
		`${prefixCls}--base`,
		`${prefixCls}--${size}`,
		innerState
			? [`${prefixCls}__checked`, checkedColor]
			: [`${prefixCls}__unchecked`, unCheckedColor],
		{
			[`${prefixCls}__disabled`]: disabled || loading
		},
		switching,
		cls
	);
	$: loadingCls = clsx(`${prefixCls}-loading`, `${prefixCls}-loading__dark`);
	$: circleCls = clsx(`${prefixCls}-circle`, `${prefixCls}-circle--${size}`);
	$: unCheckedTxCls = clsx(`${prefixCls}-tx__unchecked`, `${prefixCls}-tx__unchecked--${size}`);
	$: checkedTxCls = clsx(`${prefixCls}-tx__checked`, `${prefixCls}-tx__checked--${size}`);
</script>

<div class={switchCls} aria-hidden="true" {...$$restProps} {...attrs} on:click={handleClick}>
	{#if !innerState}
		<span class={unCheckedTxCls}>
			<slot name="unCheckedRender" state={innerState} />
		</span>
	{/if}
	<span class={circleCls} bind:this={switchCircleRef}>
		{#if loading}
			<KIcon cls={loadingCls} icon="i-carbon-circle-dash" />
		{/if}
	</span>
	{#if innerState}
		<span class={checkedTxCls}>
			<slot name="checkedRender" state={innerState} />
		</span>
	{/if}
</div>
