<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { SwitchValueType } from './types';
	import { clsx, type ClassValue } from 'clsx';
	import type { FormContext } from '@ikun-ui/utils';

	export let value: SwitchValueType = false;
	export let disabled: boolean = false;
	export let cls: ClassValue = '';
	export let attrs = {};
	export let loading: boolean = false;
	export let checkedValue: SwitchValueType = true;
	export let unCheckedValue: SwitchValueType = false;

	export let checkedColor = '';
	export let unCheckedColor = '';
	const formContext: FormContext = getContext('FormContext');
	const dispatch = createEventDispatcher();
	$: innerState = value === checkedValue;
	/**
	 * change state method
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
	 * set animation class
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
		// switch state
		emitChangeEvt();
		dispatch('updateValue', changeData.newVal);
		isUpdateModel = true;
		formContext?.updateField(changeData.newVal);
		await changeClass(changeData.newVal === checkedValue);
	};

	$: if (changeData && value !== changeData.newVal) {
		if (!isUpdateModel) {
			emitChangeEvt();
		}
		isUpdateModel = false;
	}
	/**
	 * click method
	 * @param {Event} e - event obejct
	 */
	const handleClick = async (e?: Event) => {
		if (disabled || loading) return;
		await switchState();
		dispatch('click', e);
	};
	/**
	 * initial method
	 */
	const init = async () => {
		await changeClass(innerState);
		//initial field
		formContext?.initialField(unCheckedValue);
		// when filed change,dom value will change.
		formContext?.subscribe(async (_value: any) => {
			if (value === _value) return;
			value = _value;
			await changeClass(_value === checkedValue);
		});
	};
	onMount(init);

	$: cnames = clsx(cls);
</script>

<div
	class="
  k-switch--base
  {disabled || loading ? 'k-switch__disabled' : ''}
  {innerState ? `k-switch__checked ${checkedColor}` : `k-switch__un_checked ${unCheckedColor}`}
  {switching}
  {cnames}"
	aria-hidden="true"
	{...attrs}
	on:click={handleClick}
>
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
