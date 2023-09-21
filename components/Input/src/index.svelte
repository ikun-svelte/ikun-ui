<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { KButton } from '@ikun-ui/button';
	import { getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';

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

	/**
	 * @internal
	 */
	export let isError: KInputProps['isError'] = false;
	/**
	 * @internal
	 */
	export let errorMsg: KInputProps['errorMsg'] = '';

	const dispatch = createEventDispatcher();

	const onInput = (e: Event) => {
		if (disabled) return;
		const { value: inputValue } = e.target as HTMLInputElement;
		dispatch('input', inputValue, e);
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
	};

	const onEnter = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter') dispatch('enter', e);
		else dispatch('keydown', e);
	};

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

	let inputRef: null | HTMLInputElement = null;
	const handlePrependClick = () => {
		if (disabled) return;
		inputRef && dispatch('triggerPrepend', inputRef.value);
	};

	const handleAppendClick = () => {
		if (disabled) return;
		inputRef && dispatch('triggerAppend', inputRef.value);
	};

	$: isPassword = type;
	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = clsx(prefixCls, cls);
	$: inputWrapperCls = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--${size}`,
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
	$: inputCls = clsx(`${prefixCls}--inner`, `${prefixCls}--inner__dark`, {
		[`${prefixCls}__disabled`]: disabled,
		[`${prefixCls}__disabled__dark`]: disabled
	});
	$: iconCls = clsx(`${prefixCls}--icon`, `${prefixCls}--icon--${size}`);
	$: prefixIconCls = clsx(iconCls, `${prefixCls}--prefix-icon`);
	$: suffixIconCls = clsx(iconCls, `${prefixCls}--suffix-icon`);
	$: errorMsgCls = clsx(`${prefixCls}__msg__error`);
	$: prependCls = clsx(`${prefixCls}--prepend`);
	$: appendgCls = clsx(`${prefixCls}--append`);
</script>

<div class={baseCls}>
	{#if $$slots.prepend || prepend}
		<KButton cls={prependCls} type="main" icon={prepend} on:click={handlePrependClick}>
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
		<KButton cls={appendgCls} type="main" icon={append} on:click={handleAppendClick}>
			{#if $$slots.append}
				<slot name="append" />
			{/if}
		</KButton>
	{/if}
</div>
