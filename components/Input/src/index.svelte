<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';

	export let value: KInputProps['value'] = '';
	export let placeholder: KInputProps['placeholder'] = '';
	export let disabled: KInputProps['disabled'] = false;
	export let iconPrefix: KInputProps['iconPrefix'] = '';
	export let iconSuffix: KInputProps['iconSuffix'] = '';
	export let cls: KInputProps['cls'] = '';
	export let attrs: KInputProps['attrs'] = {};
	export let useCompositionInput: KInputProps['useCompositionInput'] = false;

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

	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = clsx(
		prefixCls,
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		{
			[`${prefixCls}--base__disabled`]: disabled,
			[`${prefixCls}--base__disabled__dark`]: disabled
		},
		{
			[`${prefixCls}--base__error`]: isError,
			[`${prefixCls}--base__hover`]: !isError,
			[`${prefixCls}--base__focus`]: !isError
		},
		cls
	);
	$: errorMsgCls = clsx(`${prefixCls}--base__msg__error`);
	$: inputCls = clsx(`${prefixCls}--inner`, `${prefixCls}--inner__dark`, {
		[`${prefixCls}--base__disabled`]: disabled,
		[`${prefixCls}--base__disabled__dark`]: disabled
	});
</script>

<div class={baseCls}>
	{#if isError}
		<span class={errorMsgCls} transition:fade={{ duration: 200 }}>
			{errorMsg}
		</span>
	{/if}
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon cls="k-input--icon" icon={iconPrefix} />
		{/if}
	</slot>
	<input
		class={inputCls}
		{value}
		{disabled}
		on:input={onInput}
		on:change={onChange}
		on:keydown={onEnter}
		on:compositionstart={onCompositionStart}
		on:compositionend={onCompositionEnd}
		{placeholder}
		{...attrs}
	/>
	<slot name="suffix">
		{#if iconSuffix}
			<KIcon cls="k-input--icon" icon={iconSuffix} />
		{/if}
	</slot>
</div>
