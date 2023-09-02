<script lang="ts">
	import type { KInputProps } from './types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createCls, getPrefixCls } from '@ikun-ui/utils';
	import type { FormContext } from '@ikun-ui/utils';
	export let value: KInputProps['value'] = '';
	export let placeholder: KInputProps['placeholder'] = '';
	export let disabled: KInputProps['disabled'] = false;
	export let iconPrefix: KInputProps['iconPrefix'] = '';
	export let iconSuffix: KInputProps['iconSuffix'] = '';
	export let cls: KInputProps['cls'] = '';
	export let attrs: KInputProps['attrs'] = {};
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

	const onInput = (e: InputEvent) => {
		if (disabled) return;
		dispatch('input', (e.target as HTMLInputElement).value);
		formContext?.updateField((e.target as HTMLInputElement).value);
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
	// when filed change,dom value will change.
	formContext?.subscribe((_value: any) => (value = _value));
	//initial field
	formContext?.initialField(value);
	// class names
	const prefixCls = getPrefixCls('input');
	$: baseCls = createCls(
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
	$: errorMsgCls = createCls(`${prefixCls}--base__msg__error`);
	$: inputCls = createCls(`${prefixCls}--inner`, `${prefixCls}--inner__dark`, {
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
		bind:value
		{disabled}
		on:input={onInput}
		on:change={onChange}
		on:keydown={onEnter}
		{placeholder}
		{...attrs}
	/>
	<slot name="suffix">
		{#if iconSuffix}
			<KIcon cls="k-input--icon" icon={iconSuffix} />
		{/if}
	</slot>
</div>
