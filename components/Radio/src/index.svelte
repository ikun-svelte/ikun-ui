<script lang="ts">
	import type { KRadioProps } from './types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import type { RadioGroupCtx } from '@ikun-ui/radio-group';
	import { getPrefixCls, formItemKey, radioGroupKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { FormContext } from '@ikun-ui/form';
	export let value: KRadioProps['value'] = false;
	export let label: KRadioProps['label'] = '';
	export let uid: KRadioProps['uid'] = '';
	export let size: KRadioProps['size'] = 'md';
	export let disabled: KRadioProps['disabled'] = false;
	export let cls: KRadioProps['cls'] = undefined;
	export let attrs: KRadioProps['attrs'] = {};

	const formContext: FormContext = getContext(formItemKey);
	// updateValue
	const dispatch = createEventDispatcher();

	const ctx = getContext(radioGroupKey) as RadioGroupCtx;

	let valueInner = value;
	$: if (value !== valueInner && !ctx) {
		valueInner = value;
	}

	let classChecking = '';
	$: isDisabled = (ctx && ctx.disabled) || disabled;
	$: sizeInner = ctx && ctx.size ? ctx.size : size;
	enum ERadioSize {
		'lg' = 16,
		'md' = 14,
		'sm' = 12
	}

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

	const prefixCls = getPrefixCls('radio');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		`${prefixCls}--${sizeInner}`,
		{ 'k-cur-disabled': isDisabled },
		cls
	);
	$: radioboxCls = clsx(
		`${prefixCls}--box`,
		{
			[`${prefixCls}__selected`]: valueInner && !isDisabled,
			[`${prefixCls}--box__disabled`]: isDisabled
		},
		classChecking
	);
	$: labelCls = clsx(`${prefixCls}--label`, {
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
			<KIcon
				icon="i-carbon:radio-button-checked"
				color="!text-white"
				width={ERadioSize[sizeInner]}
				height={ERadioSize[sizeInner]}
			/>
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
