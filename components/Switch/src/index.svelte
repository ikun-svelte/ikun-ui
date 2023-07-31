<script lang="ts">
	import { isBool, isNumber, isString } from 'baiwusanyu-utils';
	import {KIcon} from '@ikun-ui/icon';
	import { createEventDispatcher, onMount } from 'svelte';
	export let modelValue:boolean = false;
	export let disabled:boolean  = false;
	export let cls:string = '';
	export let attrs = {};
	export let loading:boolean  = false;
	export let checkedValue:string | number | boolean | undefined = undefined;
	export let unCheckedValue:string | number | boolean | undefined = undefined;

	export let checkedColor = '';

	export let unCheckedColor = '';
	const dispatch = createEventDispatcher();
	let innerState = modelValue;
	let switching = '';
	/**
	 * 切换状态方法
	 */
	let changeData = {};
	const emitChangeEvt = (): void => {
		dispatch('change', changeData);
	};

	/**
	 * 设置动画样式类
	 */

	let switchCircleRef:null | HTMLElement = null;
	const changeClass = () => {
		return new Promise((resolve) => {
			switching = 'k-switch-tra';
			if(switchCircleRef){
				const circleWidth = switchCircleRef.getClientRects()[0].width;
				switchCircleRef.style.right = innerState ? '2px' : `calc(100% - ${circleWidth}px)`;
			}
			setTimeout(() => {
				switching = '';
				resolve(true);
			}, 300);
		});
	};

	const setInnerState = (): string | number | boolean => {
		if (innerState) {
			innerState = false;
			changeData = {
				newVal: unCheckedValue ? unCheckedValue : false,
				oldVal: checkedValue ? checkedValue : true
			};
			return unCheckedValue ? unCheckedValue : false;
		}
		innerState = true;
		changeData = {
			newVal: checkedValue ? checkedValue : true,
			oldVal: unCheckedValue ? unCheckedValue : false
		};
		return checkedValue ? checkedValue : true;
	};
	let isUpdateModel = false;
	const switchState = async () => {
		// 切换状态
		const modelValue = setInnerState();
		emitChangeEvt();
		dispatch('updateModelValue', modelValue);
		isUpdateModel = true;
		await changeClass();
	};

	let oldModelValue = modelValue;
	$: if (modelValue !== oldModelValue) {
		if (isUpdateModel) {
			isUpdateModel = false;
		} else {
			setInnerState();
			emitChangeEvt();
		}
		oldModelValue = modelValue;
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
		await changeClass();
		if (
			unCheckedValue !== undefined &&
			unCheckedValue !== '' &&
			(isBool(unCheckedValue) || isString(unCheckedValue) || isNumber(unCheckedValue)) &&
			modelValue === unCheckedValue
		) {
			innerState = false;
			return;
		}
		if (
			checkedValue !== undefined &&
			checkedValue !== '' &&
			(isBool(checkedValue) || isString(checkedValue) || isNumber(checkedValue)) &&
			modelValue === checkedValue
		) {
			innerState = true;
			return;
		}
	};
	onMount(init);
</script>

<div class="
  k-switch--base
  {disabled || loading ? 'k-switch__disabled' : ''}
  {innerState ? `k-switch__checked ${checkedColor}`
  : `k-switch__un_checked ${unCheckedColor}`}
  {switching}
  {cls} "
   aria-hidden="true"
	 {...attrs}
   on:click={handleClick}>
	{#if !innerState}
		<div class="k-switch-tx__un_checked">
			<slot name="unCheckedRender" state={innerState} />
		</div>
	{/if}
	<div class="k-switch-circle"
		bind:this={switchCircleRef}>
		{#if loading}
			<KIcon icon="i-carbon-circle-dash" cls="k-switch-loading" />
		{/if}
	</div>
	{#if innerState}
		<div class="k-switch-tx__checked">
			<slot name="checkedRender" state={innerState} />
		</div>
	{/if}
</div>
