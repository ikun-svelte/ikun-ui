<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher, onMount, tick, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { KButton } from '@ikun-ui/button';
	import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';
	import { isObject } from 'baiwusanyu-utils';
	import type { CSSObject } from 'unocss';
	import { compTextareaH } from './compute-textarea-h';
	import type { IKunFormInstance } from '@ikun-ui/form';

	export let size: KInputProps['size'] = 'md';
	export let value: KInputProps['value'] = '';
	export let placeholder: KInputProps['placeholder'] = '';
	export let disabled: KInputProps['disabled'] = false;
	export let iconPrefix: KInputProps['iconPrefix'] = '';
	export let iconSuffix: KInputProps['iconSuffix'] = '';
	export let append: KInputProps['append'] = '';
	export let prepend: KInputProps['prepend'] = '';
	export let cls: KInputProps['cls'] = undefined;
	export let ignoreForm: KInputProps['ignoreForm'] = false;
	export let attrs: KInputProps['attrs'] = {};
	export let useCompositionInput: KInputProps['useCompositionInput'] = false;
	export let type: KInputProps['type'] = 'text';
	export let search: KInputProps['search'] = false;
	export let rows: KInputProps['rows'] = 3;
	export let autosize: KInputProps['autosize'] = false;
	/**
	 * @internal
	 */
	export let isError: KInputProps['isError'] = false;
	/**
	 * @internal
	 */
	export let center: KInputProps['center'] = false;
	export let clearable: KInputProps['clearable'] = false;
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
		value = formInstance.getValueByPath(
			field,
			init ? formInstance.__default_value : formInstance.__value
		);
	}
	function formPropsChangeCb(props: Record<any, any>) {
		disabledFrom = props.disabled;
		sizeFrom = props.size;
	}

	function fromFieldError(error: boolean) {
		isErrorForm = error;
	}

	// Register event, KForm can set KInput value
	if (formContext && formInstance && !ignoreForm) {
		formUpdateField(true);
		formPropsChangeCb(formInstance.__dynamicProps);
		formInstance.__itemCompMap[field] = {
			update: formUpdateField,
			type: 'input'
		};
		formInstance.__errorCompEvtMap[field] = fromFieldError;
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}
	/*********************** KForm logic end ************************/

	const dispatch = createEventDispatcher();
	const onInput = (e: Event) => {
		if (disabledInner) return;
		const { value: inputValue } = e.target as HTMLInputElement;
		dispatch('input', inputValue, e);
		doUpdateFormField(inputValue);
		if (!useCompositionInput || !isComposing) {
			value = inputValue;
			if (useCompositionInput && !isComposing) {
				dispatch('compositionInput', inputValue, e);
			}
		}
	};

	const onChange = (e: Event) => {
		if (disabledInner) return;
		dispatch('change', e);
		doUpdateFormField((e?.target as HTMLInputElement)?.value);
	};

	/**
	 * @internal
	 * @param value
	 */
	export function doUpdateFormField(value: string) {
		formInstance && formInstance?.updateField(field!, value, !formInstance.__manual_validate);
	}

	const onClear = () => {
		if (disabledInner) return;
		value = '';
		dispatch('updateValue', value);
	};

	const onEnter = (e: KeyboardEvent) => {
		if (disabledInner) return;
		if (e.key === 'Enter') {
			if (search) {
				dispatch('search', (e.target as HTMLInputElement)!.value);
			} else {
				dispatch('enter', e);
			}
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

	let inputRef: null | HTMLInputElement | HTMLTextAreaElement = null;
	const handlePrependClick = () => {
		if (disabledInner) return;
		if (search) {
			inputRef && dispatch('search', inputRef.value);
		} else {
			inputRef && dispatch('triggerPrepend', inputRef.value);
		}
	};

	const handleAppendClick = () => {
		if (disabledInner) return;
		if (search) {
			inputRef && dispatch('search', inputRef.value);
		} else {
			inputRef && dispatch('triggerAppend', inputRef.value);
		}
	};

	let areaStyle: CSSObject = {};
	const resizeTextarea = () => {
		if (type !== 'textarea' || !inputRef) return;

		if (autosize) {
			if (isObject(autosize)) {
				const minRows = (autosize as Record<string, number>).minRows || undefined;
				const maxRows = (autosize as Record<string, number>).maxRows || undefined;
				areaStyle = {
					...compTextareaH(inputRef as HTMLTextAreaElement, minRows, maxRows)
				};
			}
		} else {
			areaStyle = {
				minHeight: compTextareaH(inputRef as HTMLTextAreaElement, rows).minHeight
			};
		}
	};

	let valueInner = value;
	$: if (value !== valueInner) {
		valueInner = value;
		resizeTextarea();
	}
	onMount(async () => {
		await tick();
		resizeTextarea();
	});

	$: isPassword = type;
	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = clsx(prefixCls, cls);
	$: inputWrapperCls = clsx(
		`${prefixCls}--base`,
		{
			[`${prefixCls}__${sizeInner}`]: !(type === 'textarea')
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
	$: inputCls = clsx(
		`${prefixCls}--inner`,
		{
			[`${prefixCls}--inner__textarea`]: type === 'textarea'
		},
		{
			[`${prefixCls}--inner__dark`]: !disabledInner,
			[`${prefixCls}__disabled`]: disabledInner,
			[`${prefixCls}__disabled__dark`]: disabledInner
		}
	);
	$: iconCls = clsx(`${prefixCls}--icon`, `${prefixCls}--icon__${sizeInner}`);
	$: prefixIconCls = clsx(iconCls, `${prefixCls}--prefix-icon`);
	$: suffixIconCls = clsx(iconCls, `${prefixCls}--suffix-icon`);
	$: prependCls = clsx(`${prefixCls}--prepend`, `${prefixCls}--prepend__${sizeInner}`);
	$: appendgCls = clsx(`${prefixCls}--append`, `${prefixCls}--append__${sizeInner}`);
	$: clearCls = clsx(`${prefixCls}--clear-icon`);
</script>

{#if type !== 'textarea'}
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
			<slot name="prefix">
				{#if iconPrefix}
					<KIcon cls={prefixIconCls} icon={iconPrefix} />
				{/if}
			</slot>
			<input
				class={inputCls}
				{value}
				disabled={disabledInner}
				bind:this={inputRef}
				on:input={onInput}
				on:change={onChange}
				on:keydown={onEnter}
				on:compositionstart={onCompositionStart}
				on:compositionend={onCompositionEnd}
				style:text-align={center ? 'center' : undefined}
				type={isPassword}
				{placeholder}
				{...attrs}
			/>

			{#if clearable && !disabledInner && value}
				<div class={clearCls} role="button" aria-hidden="true" on:click={onClear}>
					<KIcon btn icon="i-carbon:close-outline" cls="{iconCls} ml-1" />
				</div>
			{/if}

			{#if isPassword === 'password' && type === 'password'}
				<div
					role="button"
					aria-hidden="true"
					on:click={() => {
						isPassword = 'text';
					}}
				>
					<KIcon btn icon="i-carbon-view-off" cls="{iconCls} ml-1" />
				</div>
			{/if}
			{#if isPassword === 'text' && type === 'password'}
				<div
					role="button"
					aria-hidden="true"
					on:click={() => {
						isPassword = 'password';
					}}
				>
					<KIcon btn icon="i-carbon-view" cls="{iconCls} ml-1" />
				</div>
			{/if}

			<slot name="suffix">
				{#if iconSuffix}
					<KIcon cls={suffixIconCls} icon={iconSuffix} />
				{/if}
			</slot>
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
{/if}

{#if type === 'textarea'}
	<div class={baseCls}>
		<div class={inputWrapperCls}>
			<textarea
				class={inputCls}
				{value}
				disabled={disabledInner}
				bind:this={inputRef}
				on:input={onInput}
				on:change={onChange}
				on:keydown={onEnter}
				style:min-height={areaStyle.minHeight}
				style:height={areaStyle.height}
				on:compositionstart={onCompositionStart}
				on:compositionend={onCompositionEnd}
				{placeholder}
				{...attrs}
			/>
		</div>
	</div>
{/if}
