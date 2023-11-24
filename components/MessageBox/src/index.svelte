<script lang="ts">
	import { KModal } from '@ikun-ui/modal';
	import { KIcon } from '@ikun-ui/icon';
	import { isFunction, isString } from 'baiwusanyu-utils';
	import type { MsgBoxEmoType, ValidatorFn } from './types';
	import { KButton } from '@ikun-ui/button';
	import { KInput } from '@ikun-ui/input';
	import { KForm, KFormItem } from "@ikun-ui/form";
	import type { IKunUncertainFunction } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';
	import { getPrefixCls } from "@ikun-ui/utils";

	export let show = false;
	export let attrs: Record<string, string> = {};
	export let cls: ClassValue = undefined;
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

	let isError = false;

	const handleCancel = () => {
		showInner = false;
		onCancel && onCancel();
	};


	let KFormInst: KForm | undefined = undefined
	let initValue = {
		data: ''
	}
	const rules = {
		data: [{
			required: true,
			validator: (value: string, callback: any) => {
				if (!inputValidator) {
					isError = false;
					callback('')
					return
				}
				if(!value && value !== 0){
					isError = true;
					callback('This is a required input box')
					return;
				}
				// Validator
				if (inputValidator && Object.prototype.toString.call(inputValidator) === '[object RegExp]') {
					if ((inputValidator as unknown as RegExp).test(value)) {
						isError = false;
					} else {
						isError = true;
						callback(inputErrorMessage)
					}
					return;
				}

				if (inputValidator && isFunction(inputValidator)) {
					if ((inputValidator as ValidatorFn)(value)) {
						isError = false;
					} else {
						isError = true;
						callback(inputErrorMessage)
					}
					return;
				}
			}
		}]
	}

	const handleConfirm = () => {
		if (type === 'prompt') {
			if(KFormInst){
				KFormInst.validateForm((value, isValid) => {
					if(isValid){
						showInner = false;
					}
					onConfirm && onConfirm(!isError, value.data);
				})
			}
		} else {
			showInner = false;
			onConfirm && onConfirm();
		}
	};
	const prefixCls = getPrefixCls('msg-box');
	$: footerCls = clsx(
		`${prefixCls}--footer`,
		layout === 'center' ? 'justify-center' : 'justify-end'
	);
	$: cancelBtnCls_ = clsx(
		`${prefixCls}--footer--btn`,
		cancelBtnCls)
	;
	$: confirmBtnCls_ = clsx(
		`${prefixCls}--footer--btn`,
		confirmBtnCls
	);
	$: formCls = clsx(`${prefixCls}--form`);
	$: inputCls = clsx(`${prefixCls}--input`);
</script>

<KModal
	show={showInner}
	cls={['k-msg-box--base k-msg-box--base__dark', cls]}
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
					<KForm
						{initValue}
						{rules}
						bind:this={KFormInst}
					>
						<KFormItem field="data"
											 label=""
											 cls={formCls}
											 showLabel={false}>
							<KInput placeholder={inputPlaceholder} cls={inputCls}>
							</KInput>
						</KFormItem>
					</KForm>
				{/if}
			{:else if isFunction(content)}
				<svelte:component this={content} />
			{/if}
		</div>
	{/if}
	<div slot="footer" class={footerCls}>
		{#if type !== 'alert'}
			<KButton cls={cancelBtnCls_} on:click={handleCancel} type="info">
				{cancelBtnText}
			</KButton>
		{/if}

		<KButton cls={confirmBtnCls_} on:click={handleConfirm} type="primary">
			{confirmBtnText}
		</KButton>
	</div>
</KModal>
