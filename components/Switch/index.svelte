<script lang="ts">
	import { isBool, isNumber, isString } from 'baiwusanyu-utils';
	import Icon from '../Icon/src/index.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	export let modelValue = false;
	export let disabled = false;
	export let customClass = '';
	export let loading = false;
	export let checkedValue;
	export let unCheckedValue;

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

	let switchCircleRef = null;
	const changeClass = () => {
		return new Promise((resolve) => {
			switching = 'ui-switching';
			const circleWidth = switchCircleRef.getClientRects()[0].width;
			switchCircleRef.style.right = innerState ? '2px' : `calc(100% - ${circleWidth}px)`;
			setTimeout(() => {
				switching = '';
				resolve();
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

<div
	class="
  relative
  flex
  items-center
  cursor-pointer
  rounded-full
  w-10
  h-5
  {disabled || loading ? 'ui-disabled-cursor' : ''}
  {innerState ? `bg-main ${checkedColor}` : `bg-main:40 ${unCheckedColor}`}
  {switching}
  {customClass} "
	tabindex="0"
	on:click={handleClick}
>
	{#if !innerState}
		<div class="p1 ml-5">
			<slot name="unCheckedRender" state={innerState} />
		</div>
	{/if}
	<div
		class="
    h-4.5
    w-4.5
    shadow
    rounded-full
    bg-white
    flex-c
    absolute
    right-2px
    ui-switch-trans"
		bind:this={switchCircleRef}
	>
		{#if loading}
			<Icon icon="i-carbon-circle-dash" customClass="animate-spin h-4 w-4" />
		{/if}
	</div>
	{#if innerState}
		<div class="p1 mr-5">
			<slot name="checkedRender" state={innerState} />
		</div>
	{/if}
</div>

<style>
	@keyframes switching {
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

	.ui-switching {
		-webkit-animation: switching 0.3s linear;
		-moz-animation: switching 0.3s linear;
	}
</style>
