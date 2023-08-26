<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import type { FormContext } from '@ikun-ui/utils';
	export let iconPrefix = '';
	export let iconSuffix = '';
	export let value = '';
	export let cls = '';
	export let placeholder = '';
	export let disabled = false;
	export let attrs = {};
	/**
	 * @internal
	 */
	export let isError: boolean = false;
	/**
	 * @internal
	 */
	export let errorMsg: string = '';
	const formContext: FormContext = getContext('FormContext');
	const dispatch = createEventDispatcher();
	const onUpdated = (e: Event) => {
		if (disabled) return;
		dispatch('input', (e.target as HTMLInputElement).value);
		formContext?.updateField((e.target as HTMLInputElement).value);
	};
	const onEnter = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter') dispatch('enter', e);
		else dispatch('keydown', e);
	};
	const onChange = (e: Event) => {
		if (disabled) return;
		dispatch('change', e);
	};
	let valueInner = value;

	// when filed change,dom value will change.
	formContext?.subscribe((value: any) => (valueInner = value));
	//initial field
	formContext?.initialField(value);
</script>

<div
	class="
	k-input--base
	k-input--base__dark
	{disabled ? 'k-input--base__disabled k-input--base__disabled__dark' : ''}
	{isError ? 'k-input--base__error' : 'k-input--base__hover k-input--base__focus'}
	{cls}"
>
	{#if isError}
		<span
			out:fade={{ duration: 200 }}
			in:fade={{ duration: 200 }}
			class="k-input--base__msg__error"
		>
			{errorMsg}
		</span>
	{/if}
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon cls="k-input--icon" icon={iconPrefix} />
		{/if}
	</slot>
	<input
		class="k-input--inner k-input--inner__dark {disabled
			? 'k-input--base__disabled k-input--base__disabled__dark'
			: ''}"
		bind:value={valueInner}
		{disabled}
		on:input={onUpdated}
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
