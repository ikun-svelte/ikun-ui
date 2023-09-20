<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';

	export let size: KInputProps['size'] = 'md';
	export let value: KInputProps['value'] = '';
	export let placeholder: KInputProps['placeholder'] = '';
	export let disabled: KInputProps['disabled'] = false;
	export let iconPrefix: KInputProps['iconPrefix'] = '';
	export let iconSuffix: KInputProps['iconSuffix'] = '';
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

	$: isPassword = type;
	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = clsx(
		prefixCls,
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
		cls
	);
	$: inputCls = clsx(`${prefixCls}--inner`, `${prefixCls}--inner__dark`, {
		[`${prefixCls}__disabled`]: disabled,
		[`${prefixCls}__disabled__dark`]: disabled
	});
	$: iconCls = clsx(`${prefixCls}--icon`, `${prefixCls}--icon--${size}`);
	$: prefixIconCls = clsx(iconCls, `${prefixCls}--prefix-icon`);
	$: suffixIconCls = clsx(iconCls, `${prefixCls}--suffix-icon`);
	$: errorMsgCls = clsx(`${prefixCls}__msg__error`);
</script>

<div class={baseCls}>
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon cls={prefixIconCls} icon={iconPrefix} />
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
			<KIcon btn icon="i-carbon-view-off" cls='{iconCls} ml-1'/>
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
			<KIcon btn icon="i-carbon-view" cls='{iconCls} ml-1'/>
		</div>
	{/if}
	{#if isError}
		<span class={errorMsgCls} transition:fade={{ duration: 200 }}>
			{errorMsg}
		</span>
	{/if}
</div>
