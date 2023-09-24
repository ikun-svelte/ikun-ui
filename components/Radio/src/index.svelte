<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import type { FormContext } from '@ikun-ui/form';
	import type { KRadioProps } from './types';
	import { radioGroupKey } from '@ikun-ui/utils';
	import type { RadioGroupCtx } from '@ikun-ui/radio-group';
	export let disabled: KRadioProps['disabled'] = false;
	export let value: KRadioProps['value'] = false;
	export let cls: KRadioProps['cls'] = undefined;
	export let attrs: KRadioProps['attrs'] = {};
	export let label: KRadioProps['label'] = '';

	export let uid: KRadioProps['uid'] = '';
	const formContext: FormContext = getContext('FormContext');
	// updateValue
	const dispatch = createEventDispatcher();

	const ctx = getContext(radioGroupKey) as RadioGroupCtx;

	let valueInner = value;
	$: if (value !== valueInner && !ctx) {
		valueInner = value;
	}

	let classChecking = '';
	$: isDisabled = (ctx && ctx.disabled) || disabled;
	const handleUpdateValue = () => {
		if (isDisabled) return;
		if (valueInner) return;

		doUpdatedValue(!valueInner, true);
		// When the component value changes, notify the form-item component
		formContext?.updateField(!valueInner);

		!ctx && dispatch('updateValue', !valueInner);
	};

	const doUpdatedValue = (v: boolean, inner: boolean = false) => {
		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);

		if (uid && ctx) {
			valueInner = v;
			inner && ctx.updatedValueWhenRadioChange(v, uid);
		}
	};
	//initial field
	formContext?.initialField(value);
	// when filed change,dom value will change.
	// Triggered when form.setValues is called,
	// set the value set by the form component to the radio component
	formContext?.subscribe((value: any) => {
		valueInner = value;
	});

	function setDisabled(v: boolean) {
		isDisabled = v;
	}

	/**
	 * Register radio
	 */
	function doRegisterRadio() {
		if (uid && ctx) {
			// Register checkbox
			ctx.registerRadio(uid, {
				doUpdatedValue,
				setDisabled
			});
		}
	}
	doRegisterRadio();

	$: cnames = clsx('k-radio--base k-radio--base__dark', { 'k-cur-disabled': isDisabled }, cls);
	$: radioboxCls = clsx(
		'k-radio--box',
		{
			'k-radio__selected': valueInner && !isDisabled,
			'k-radio--box__disabled': isDisabled
		},
		classChecking
	);
	$: labelCls = clsx('k-radio--label', {
		'text-ikun-main': valueInner && !isDisabled
	});
</script>

<label class={cnames} {...attrs}>
	<input
		value={valueInner}
		disabled={isDisabled}
		type="radio"
		on:click={handleUpdateValue}
		hidden
	/>
	<div class={radioboxCls}>
		{#if valueInner}
			<KIcon icon="i-carbon:radio-button-checked" color="!text-white" width="16px" height="16px" />
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
