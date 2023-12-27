<script lang="ts">
	import type { KInputNumberProps } from './types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { KButton } from '@ikun-ui/button';
	import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';
	import type { IKunFormInstance } from '@ikun-ui/form';
	import { KIcon } from '@ikun-ui/icon';
	import Deci from 'decimal.js';
	import type { Decimal } from 'decimal.js';
	import { isNumber, isString, normalizeVarStrEmpty } from 'baiwusanyu-utils';
	export let size: KInputNumberProps['size'] = 'md';
	export let value: KInputNumberProps['value'] = null;
	export let min: KInputNumberProps['min'] = -Infinity;
	export let max: KInputNumberProps['max'] = Infinity;
	export let step: KInputNumberProps['step'] = 1;
	export let stepStrictly: KInputNumberProps['stepStrictly'] = false;
	export let precision: KInputNumberProps['precision'] = null;
	export let controls: KInputNumberProps['controls'] = true;
	export let valueOnClear: KInputNumberProps['valueOnClear'] = null;
	export let disabled: KInputNumberProps['disabled'] = false;
	export let append: KInputNumberProps['append'] = '';
	export let prepend: KInputNumberProps['prepend'] = '';
	export let cls: KInputNumberProps['cls'] = undefined;
	export let attrs: KInputNumberProps['attrs'] = {};
	export let useCompositionInput: KInputNumberProps['useCompositionInput'] = false;
	/**
	 * native attr
	 */
	export let placeholder: KInputNumberProps['placeholder'] = '';
	/**
	 * native attr
	 */
	export let readonly: KInputNumberProps['readonly'] = false;
	/**
	 * native attr
	 */
	export let id: KInputNumberProps['id'] = '';
	/**
	 * native attr
	 */
	export let name: KInputNumberProps['name'] = '';
	/**
	 * @internal
	 */
	export let isError: KInputNumberProps['isError'] = false;
	/**
	 * @internal
	 */
	export let center: KInputNumberProps['center'] = false;
	let resolveValue: Decimal | null = value ? new Deci(value) : null;
	let inputRef: null | HTMLInputElement | HTMLTextAreaElement = null;
	/*********************** KForm logic start ************************/
	let disabledFrom = false;
	$: disabledInner = disabledFrom || disabled;
	let sizeFrom = '';
	$: sizeInner = sizeFrom || size;
	let isErrorForm = false;
	$: isErrorInner = isErrorForm || isError;
	const formContext = getContext(formItemKey) as string;
	const formInstance = getContext(formKey) as IKunFormInstance;
	let field: string | undefined = '';
	// Initialize the KInput value based
	// on the form value in the KFormItem context
	function formUpdateField(init = false) {
		field = formContext.split('&').pop();
		resolveValue = value = formInstance.getValueByPath(
			field,
			init ? formInstance.__default_value : formInstance.__value
		);
		setValueToInput(normalizeVarStrEmpty(`${toPrecision(resolveValue)}`));
	}
	function formPropsChangeCb(props: Record<any, any>) {
		disabledFrom = props.disabled;
		sizeFrom = props.size;
	}

	function fromFieldError(error: boolean) {
		isErrorForm = error;
	}

	// Register event, KForm can set KInput value
	if (formContext && formInstance) {
		// init value
		formUpdateField(true);
		// init disabled、 size
		formPropsChangeCb(formInstance.__dynamicProps);
		// register updated event
		formInstance.__itemCompMap[field] = {
			update: formUpdateField,
			type: 'input-number'
		};
		// register error event
		formInstance.__errorCompEvtMap[field] = fromFieldError;
		// register prop change event
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}
	/*********************** KForm logic end ************************/

	const dispatch = createEventDispatcher();
	$: {
		if (!isInput) {
			resolveValue = fixStepStrictlyVal(value);
		} else {
			isInput = false;
		}
	}
	let isInput = false;
	const onInput = async (e: Event) => {
		if (disabledInner) return;
		const { value: inputValue } = e.target as HTMLInputElement;
		let normalValue =
			isNaN(Number(inputValue)) || inputValue.trim() === '' ? null : Number(inputValue);
		let finalValue = null;
		if (normalValue || normalValue === 0) {
			finalValue = new Deci(normalValue);
			finalValue = limitValue(finalValue);
		}

		isInput = true;
		finalValue = fixStepStrictlyVal(finalValue);
		value = isValueOnClear(finalValue);
		dispatchInput(finalValue, e);
	};

	function isValueOnClear(val: Decimal | number | null | undefined | string) {
		let res = val;
		if (!res && res !== 0) return valueOnClear;
		if (isNumber(res) || isString(res)) {
			res = new Deci(res);
		}
		return (res as Decimal).toNumber();
	}

	const fixStepStrictlyVal = (value: Decimal | null | number) => {
		if (!value && value !== 0) return null;
		let res = value;
		if (isNumber(value)) {
			res = new Deci(value);
		}
		let decimalStep = new Deci(step);
		if (stepStrictly) {
			const multiplier = (res as Decimal).dividedBy(decimalStep).ceil();
			res = decimalStep.times(multiplier);
		}
		return res as Decimal;
	};
	const dispatchInput = (resolveValue: Decimal | null, e?: Event) => {
		const finalVal = isValueOnClear(fixStepStrictlyVal(resolveValue));
		dispatch('input', finalVal, e);
		formInstance && formInstance?.updateField(field!, finalVal, !formInstance.__manual_validate);
		if (!useCompositionInput || !isComposing) {
			value = isValueOnClear(finalVal);
			if (useCompositionInput && !isComposing) {
				dispatch('compositionInput', finalVal, e);
			}
		}
	};

	const onChange = (e: Event) => {
		if (disabledInner) return;
		dispatch('change', e);
		const targetValue = (e?.target as HTMLInputElement)?.value;
		const deciValue = isValueOnClear(targetValue);
		formInstance && formInstance?.updateField(field!, deciValue, !formInstance.__manual_validate);

		resolveValue = fixStepStrictlyVal(isValueOnClear(value));
		setValueToInput(normalizeVarStrEmpty(`${toPrecision(resolveValue)}`));
	};

	const onBlur = (e: Event) => {
		if (disabledInner) return;
		dispatch('blur', e);
	};

	const onFocus = (e: Event) => {
		if (disabledInner) return;
		dispatch('focus', e);
	};

	const onEnter = (e: KeyboardEvent) => {
		if (disabledInner) return;
		if (e.key === 'Enter') {
			dispatch('enter', e);
		} else dispatch('keydown', e);
	};

	let isComposing = false;
	const onCompositionStart = (e: CompositionEvent) => {
		if (disabledInner) return;
		dispatch('compositionstart', e);
		isComposing = true;
	};

	const onCompositionEnd = (e: CompositionEvent) => {
		if (disabledInner) return;
		dispatch('compositionend', e);

		if (!isComposing) {
			return;
		}
		isComposing = false;
		if (useCompositionInput) {
			e.target?.dispatchEvent(new Event('input'));
		}
	};

	const handlePrependClick = () => {
		if (disabledInner) return;
		inputRef && dispatch('triggerPrepend', new Deci(inputRef.value).toNumber());
	};

	const handleAppendClick = () => {
		if (disabledInner) return;
		inputRef && dispatch('triggerAppend', new Deci(inputRef.value).toNumber());
	};

	function setValueToInput(value: string) {
		inputRef && (inputRef.value = value);
	}

	const handleUp = () => {
		if (disabledInner || readonly) return;
		if (resolveValue !== null) {
			const res = resolveValue.plus(new Deci(step));
			resolveValue = limitValue(res);
		} else {
			const res = new Deci(step);
			resolveValue = limitValue(res);
		}
		dispatchInput(resolveValue);
	};

	const handleDown = () => {
		if (disabledInner || readonly) return;
		if (resolveValue !== null) {
			const res = resolveValue.minus(new Deci(step));
			resolveValue = limitValue(res);
		} else {
			const res = new Deci(-step);
			resolveValue = limitValue(res);
		}
		dispatchInput(resolveValue);
	};

	const limitValue = (value: Decimal) => {
		if (max && !value.lessThan(max)) return new Deci(max);
		if (min && value.lessThan(min)) return new Deci(min);
		return value;
	};

	function toPrecision(value: Decimal | null) {
		if (value && precision) {
			return value.toFixed(precision);
		}

		if (value && !precision) return value.toString();
		return null;
	}

	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = clsx(prefixCls, cls);
	$: inputWrapperCls = clsx(
		`${prefixCls}--base`,
		{
			[`${prefixCls}-number__${sizeInner}`]: true
		},
		`${prefixCls}__dark`,
		{
			[`${prefixCls}__disabled`]: disabledInner,
			[`${prefixCls}__disabled__dark`]: disabledInner
		},
		{
			[`${prefixCls}__error`]: isErrorInner,
			[`${prefixCls}__hover`]: !isErrorInner,
			[`${prefixCls}__focus`]: !isErrorInner
		},
		{
			[`${prefixCls}__rounded`]: !$$slots.append && !append && !$$slots.prepend && !prepend,
			[`${prefixCls}__rounded__left`]: ($$slots.append || append) && !$$slots.prepend && !prepend,
			[`${prefixCls}__rounded__right`]: !$$slots.append && !append && ($$slots.prepend || prepend)
		}
	);
	$: inputCls = clsx(`${prefixCls}--inner`, {
		[`${prefixCls}--inner__dark`]: !disabledInner,
		[`${prefixCls}__disabled`]: disabledInner,
		[`${prefixCls}__disabled__dark`]: disabledInner
	});
	$: iconCls = clsx(`${prefixCls}-number--icon`, `${prefixCls}--icon__${sizeInner}`, {
		[`${prefixCls}-number--icon__disabled`]: disabledInner
	});
	$: upCls = clsx(`${prefixCls}-number--up`, `${prefixCls}-number--controls__dark`);
	$: downCls = clsx(`${prefixCls}-number--down`, `${prefixCls}-number--controls__dark`);
	$: prependCls = clsx(`${prefixCls}--prepend`, `${prefixCls}--prepend__${sizeInner}`);
	$: appendgCls = clsx(`${prefixCls}--append`, `${prefixCls}--append__${sizeInner}`);
	$: controlsCls = clsx(`${prefixCls}-number--controls`);
</script>

<div class={baseCls}>
	{#if $$slots.prepend || prepend}
		<KButton
			cls={prependCls}
			hiddenSlot
			type="main"
			icon={prepend}
			on:click={handlePrependClick}
			disabled={disabledInner}
		>
			{#if $$slots.prepend}
				<slot name="prepend" />
			{/if}
		</KButton>
	{/if}
	<div class={inputWrapperCls}>
		<input
			type="number"
			class={inputCls}
			value={toPrecision(resolveValue)}
			{min}
			{max}
			disabled={disabledInner}
			bind:this={inputRef}
			on:input={onInput}
			on:blur={onBlur}
			on:focus={onFocus}
			on:change={onChange}
			on:keydown={onEnter}
			on:compositionstart={onCompositionStart}
			on:compositionend={onCompositionEnd}
			style:text-align={center ? 'center' : undefined}
			{placeholder}
			{name}
			{id}
			{readonly}
			{...attrs}
		/>
		{#if controls}
			<div class={controlsCls}>
				<div
					class={upCls}
					on:click={handleUp}
					aria-hidden="true"
					role="button"
					aria-label="decrease number"
				>
					<KIcon cls={iconCls} icon="i-carbon-chevron-up"></KIcon>
				</div>
				<div
					class={downCls}
					on:click={handleDown}
					aria-hidden="true"
					role="button"
					aria-label="increase number"
				>
					<KIcon cls={iconCls} icon="i-carbon-chevron-down"></KIcon>
				</div>
			</div>
		{/if}
	</div>
	{#if $$slots.append || append}
		<KButton
			cls={appendgCls}
			hiddenSlot
			type="main"
			icon={append}
			on:click={handleAppendClick}
			disabled={disabledInner}
		>
			{#if $$slots.append}
				<slot name="append" />
			{/if}
		</KButton>
	{/if}
</div>

<style>
	.k-input--inner::-webkit-inner-spin-button,
	.k-input--inner::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
