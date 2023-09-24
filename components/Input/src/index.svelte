<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher, onMount, tick, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { KButton } from '@ikun-ui/button';
	import type { FormContext } from '@ikun-ui/form';
	import { getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';
	import { isObject } from 'baiwusanyu-utils';
	import type { CSSObject } from 'unocss';
	import { compTextareaH } from './compute-textarea-h';

	export let size: KInputProps['size'] = 'md';
	export let value: KInputProps['value'] = '';
	export let placeholder: KInputProps['placeholder'] = '';
	export let disabled: KInputProps['disabled'] = false;
	export let iconPrefix: KInputProps['iconPrefix'] = '';
	export let iconSuffix: KInputProps['iconSuffix'] = '';
	export let append: KInputProps['append'] = '';
	export let prepend: KInputProps['prepend'] = '';
	export let cls: KInputProps['cls'] = undefined;
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
	export let errorMsg: KInputProps['errorMsg'] = '';

	const formContext: FormContext = getContext('FormContext');
	const dispatch = createEventDispatcher();

	const onInput = (e: Event) => {
		if (disabled) return;
		const { value: inputValue } = e.target as HTMLInputElement;
		dispatch('input', inputValue, e);
		formContext?.updateField(inputValue);
		if (!useCompositionInput || !isComposing) {
			value = inputValue;
			if (useCompositionInput && !isComposing) {
				dispatch('compositionInput', inputValue, e);
			}
		}
	};

	const onChange = (e: Event) => {
		if (disabled) return;
		dispatch('change', e);
		formContext?.updateField((e?.target as HTMLInputElement)?.value);
	};

	const onEnter = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter') {
			if (search) {
				dispatch('search', (e.target as HTMLInputElement)!.value);
			} else {
				dispatch('enter', e);
			}
		} else dispatch('keydown', e);
	};
	//initial field
	formContext?.initialField(value);
	// when filed change,dom value will change.
	formContext?.subscribe((_value: any) => (value = _value));

	let isComposing = false;
	const onCompositionStart = (e: CompositionEvent) => {
		if (disabled) return;
		dispatch('compositionstart', e);
		isComposing = true;
	};

	const onCompositionEnd = (e: CompositionEvent) => {
		if (disabled) return;
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
		if (disabled) return;
		if (search) {
			inputRef && dispatch('search', inputRef.value);
		} else {
			inputRef && dispatch('triggerPrepend', inputRef.value);
		}
	};

	const handleAppendClick = () => {
		if (disabled) return;
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
			[`${prefixCls}__${size}`]: !(type === 'textarea')
		},
		`${prefixCls}__dark`,
		{
			[`${prefixCls}__disabled`]: disabled,
			[`${prefixCls}__disabled__dark`]: disabled
		},
		{
			[`${prefixCls}__error`]: isError,
			[`${prefixCls}__hover`]: !isError,
			[`${prefixCls}__focus`]: !isError
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
		`${prefixCls}--inner__dark`,
		{
			[`${prefixCls}__disabled`]: disabled,
			[`${prefixCls}__disabled__dark`]: disabled
		}
	);
	$: iconCls = clsx(`${prefixCls}--icon`, `${prefixCls}--icon__${size}`);
	$: prefixIconCls = clsx(iconCls, `${prefixCls}--prefix-icon`);
	$: suffixIconCls = clsx(iconCls, `${prefixCls}--suffix-icon`);
	$: errorMsgCls = clsx(`${prefixCls}__msg__error`);
	$: prependCls = clsx(`${prefixCls}--prepend`, `${prefixCls}--prepend__${size}`);
	$: appendgCls = clsx(`${prefixCls}--append`, `${prefixCls}--append__${size}`);
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
				{disabled}
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
				{disabled}
				bind:this={inputRef}
				on:input={onInput}
				on:change={onChange}
				on:keydown={onEnter}
				on:compositionstart={onCompositionStart}
				on:compositionend={onCompositionEnd}
				type={isPassword}
				{placeholder}
				{...attrs}
			/>
			<slot name="suffix">
				{#if iconSuffix}
					<KIcon cls={suffixIconCls} icon={iconSuffix} />
				{/if}
			</slot>

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
			{#if isError}
				<span class={errorMsgCls} transition:fade={{ duration: 200 }}>
					{errorMsg}
				</span>
			{/if}
		</div>
		{#if $$slots.append || append}
			<KButton
				cls={appendgCls}
				hiddenSlot
				type="main"
				icon={append}
				on:click={handleAppendClick}
				{disabled}
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
				{disabled}
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
