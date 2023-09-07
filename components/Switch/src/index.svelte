<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { SwitchValueType } from './types';
	import { clsx, type ClassValue } from 'clsx';

	export let value: SwitchValueType = false;
	export let disabled: boolean = false;
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let loading: boolean = false;
	export let checkedValue: SwitchValueType = true;
	export let unCheckedValue: SwitchValueType = false;

	export let checkedColor = '';
	export let unCheckedColor = '';
	const dispatch = createEventDispatcher();
	$: innerState = value === checkedValue;
	/**
	 * 切换状态方法
	 */
	let changeData: {
		newVal: SwitchValueType;
		oldVal: SwitchValueType;
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
			switching = 'k-switch-tra';
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

	$: cnames = clsx(
		'k-switch--base',
		innerState ? ['k-switch__checked', checkedColor] : ['k-switch__un_checked', unCheckedColor],
		{
			'k-switch__disabled': disabled || loading
		},
		switching,
		cls
	);
</script>

<div class={cnames} aria-hidden="true" {...attrs} on:click={handleClick}>
	{#if !innerState}
		<div class="k-switch-tx__un_checked">
			<slot name="unCheckedRender" state={innerState} />
		</div>
	{/if}
	<div class="k-switch-circle" bind:this={switchCircleRef}>
		{#if loading}
			<KIcon icon="i-carbon-circle-dash" cls="k-switch-loading k-switch-loading__dark" />
		{/if}
	</div>
	{#if innerState}
		<div class="k-switch-tx__checked">
			<slot name="checkedRender" state={innerState} />
		</div>
	{/if}
</div>
