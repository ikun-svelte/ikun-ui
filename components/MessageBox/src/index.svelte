<script lang="ts">
	import { KModal } from '@ikun-ui/modal';
	import { KIcon } from '@ikun-ui/icon';
	import { isFunction, isString } from 'baiwusanyu-utils';
	import type { MsgBoxEmoType, ValidatorFn } from './types';
	import { KButton } from '@ikun-ui/button';
	import { KInput } from '@ikun-ui/input';
	import type { IKunUncertainFunction } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let show = false;
	export let attrs = {};
	export let cls: ClassValue = '';
	export let title: any = '';
	export let emoType: MsgBoxEmoType | null = null;
	export let type: 'alert' | 'confirm' | 'prompt' | null = null;
	export let onConfirm: null | ((r?: boolean, v?: string) => void) = null;
	export let onCancel: null | IKunUncertainFunction = null;
	export let cancelBtnText: string = 'Cancel';
	export let confirmBtnText: string = 'Confirm';
	export let cancelBtnCls: string = '';
	export let confirmBtnCls: string = '';
	export let inputPlaceholder: string = '';
	export let content: any = '';
	export let inputValidator: RegExp | null | ValidatorFn = null;
	export let inputErrorMessage: string = '';
	// center、right
	export let layout: 'center' | 'right' = 'right';
	$: showInner = show;

	let value = '';
	let isError = false;

	const handleCancel = () => {
		showInner = false;
		onCancel && onCancel();
	};

	const handleConfirm = () => {
		if (type === 'prompt') {
			if (!value) {
				isError = true;
			}
			if (!isError) {
				showInner = false;
			}
			onConfirm && onConfirm(!isError, value);
		} else {
			showInner = false;
			onConfirm && onConfirm();
		}
	};

	const onInput = (e: Event) => {
		const valueTemp = String((e as InputEvent).detail);
		if (!inputValidator) {
			value = valueTemp;
			isError = false;
			return;
		}
		// Validator
		if (inputValidator && Object.prototype.toString.call(inputValidator) === '[object RegExp]') {
			if ((inputValidator as unknown as RegExp).test(valueTemp)) {
				value = valueTemp;
				isError = false;
			} else {
				isError = true;
			}
		}

		if (inputValidator && isFunction(inputValidator)) {
			if ((inputValidator as ValidatorFn)(valueTemp)) {
				value = valueTemp;
				isError = false;
			} else {
				isError = true;
			}
		}
	};

	$: cnames = clsx(cls);
</script>

<KModal
	show={showInner}
	cls="k-msg-box--base k-msg-box--base__dark {cnames}"
	{attrs}
	footer
	{layout}
>
	<div slot="header">
		{#if title && isString(title)}
			<h1 class="k-msg-box--header--title k-msg-box--header--title__dark">
				{#if emoType && type === 'confirm'}
					<KIcon
						icon="k-msg-box--icon--{emoType}"
						cls="k-msg-box--icon"
						color="k-msg-box--{emoType}"
					/>
				{/if}
				{@html title}
			</h1>
		{:else if title && isFunction(title)}
			<svelte:component this={title} />
		{/if}
	</div>

	{#if content}
		<div class="k-msg-box--content">
			{#if isString(content)}
				{@html content}
				{#if type === 'prompt'}
					<KInput
						cls="k-msg-box--input__prompt"
						placeholder={inputPlaceholder}
						errorMsg={inputErrorMessage}
						{isError}
						on:input={onInput}
						{value}
					></KInput>
				{/if}
			{:else if isFunction(content)}
				<svelte:component this={content} />
			{/if}
		</div>
	{/if}
	<div
		slot="footer"
		class="k-msg-box--footer {layout === 'center' ? 'justify-center' : 'justify-end'}"
	>
		{#if type !== 'alert'}
			<KButton cls="k-msg-box--footer--btn {cancelBtnCls}" on:click={handleCancel} type="info">
				{cancelBtnText}
			</KButton>
		{/if}

		<KButton cls="k-msg-box--footer--btn {confirmBtnCls}" on:click={handleConfirm} type="primary">
			{confirmBtnText}
		</KButton>
	</div>
</KModal>
