<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import type { FormContext } from '@ikun-ui/utils';
	export let disabled = false;
	export let value = false;
	export let cls = '';
	export let attrs = {};
	export let label = '';
	const formContext: FormContext = getContext('FormContext');
	// updateValue
	const dispatch = createEventDispatcher();

	$: valueInner = value;
	let classChecking = '';
	const handleUpdateValue = () => {
		if (disabled) return;
		if (valueInner) return;
		dispatch('updateValue', !valueInner);
		// When the component value changes, notify the form-item component
		formContext?.updateField(!valueInner);
		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);
	};
	// when filed change,dom value will change.
	// Triggered when form.setValues is called,
	// set the value set by the form component to the radio component
	formContext?.subscribe((value: any) => {
		valueInner = value;
	});
	//initial field
	formContext?.initialField(value);
</script>

<label
	class="k-radio--base k-radio--base__dark {cls} {disabled ? 'k-cur-disabled' : ''}"
	{...attrs}
>
	<input value={valueInner} {disabled} type="radio" on:change={handleUpdateValue} hidden />
	<div
		class="k-radio--box
				{valueInner && !disabled ? 'bg-ikun-main border-ikun-main' : ''}
				{classChecking} {disabled ? 'k-radio--box__disabled' : ''}"
	>
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon
					icon="i-carbon:radio-button-checked"
					color="!text-white"
					width="16px"
					height="16px"
				/>
			</div>
		{/if}
	</div>
	<slot>
		{#if label}
			<span class="k-radio--label {valueInner && !disabled ? 'text-ikun-main' : ''}">
				{label}
			</span>
		{/if}
	</slot>
</label>
