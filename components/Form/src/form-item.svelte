<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, KFormItemProps, KFormProps } from './types';
	import { formItemKey, getPrefixCls, formKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { fly } from 'svelte/transition';
	export let cls: KFormItemProps['cls'] = undefined;
	export let attrs: KFormItemProps['attrs'] = {};
	export let field: KFormItemProps['field'] = '';
	export let label: KFormItemProps['label'] = '';
	export let showMsg: KFormItemProps['showMsg'] = true;
	/**
	 * @internal
	 */
	export let showLabel: boolean = true;
	let errorMsg = '';
	function showErrorMsg(msg: string) {
		errorMsg = msg;
	}
	const formInstance = getContext(formKey) as IKunFormInstance;

	const formContext = getContext(formItemKey);
	let disabled: KFormProps['disabled'] = false;
	let size: KFormProps['size'] = 'md';
	let labelPosition: KFormProps['labelPosition'] = 'horizontal';
	let labelAlign: KFormProps['labelAlign'] = 'right';
	let labelWidth: KFormProps['labelWidth'] = undefined;

	function formPropsChangeCb(props: Record<any, any>) {
		size = props.size;
		labelPosition = props.labelPosition;

		disabled = props.disabled;
		labelAlign = props.labelAlign;
		labelWidth = props.labelWidth;
	}
	// nested KFormItem
	let isRequired = false;
	if (field) {
		let resolveField = field;
		if (formContext) {
			resolveField = `${formContext}&${field}`;
			setContext(formItemKey, resolveField);
			formInstance.__showMsgMap[field] = showErrorMsg;
		} else {
			setContext(formItemKey, resolveField);
			formInstance.__showMsgMap[field] = showErrorMsg;
		}
		const rules = formInstance.__rules || {};
		if (rules) {
			isRequired = (rules[field] || []).some((v) => v.required);
		}
	}
	if (formInstance) {
		formPropsChangeCb(formInstance.__dynamicProps);
		// register props change callback
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}

	// class
	const prefixCls = getPrefixCls('form-item');
	$: cnames = clsx(
		{
			[prefixCls]: !formContext
		},
		`${prefixCls}__${labelPosition}`,
		cls
	);
	$: lableCls = clsx(
		`${prefixCls}-label`,
		{
			[`${prefixCls}-label__ml`]: !formContext
		},
		`${prefixCls}-label__dark`,
		{
			[`${prefixCls}-label__${labelAlign}`]: labelPosition !== 'vertical'
		},
		`${prefixCls}-label__${labelPosition}`,
		`${prefixCls}-label__${size}`,
		{
			[`${prefixCls}-label__disabled`]: disabled
		}
	);
	$: startCls = clsx(`${prefixCls}-star`);
	$: contentCls = clsx(`${prefixCls}-content`);
	$: errorMsgCls = clsx(`${prefixCls}-msg_error`);
	$: labelWidthInner = !formContext && labelWidth ? `${labelWidth}px` : undefined;
	$: minWidthInner = !formContext ? `80px` : undefined;
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if !(!$$slots.label && !label && labelPosition === 'vertical') && showLabel}
		<label class={lableCls} style:min-width={minWidthInner} style:width={labelWidthInner}>
			{#if isRequired && (label || $$slots.label)}
				<span class={startCls}>*</span>
			{/if}
			<slot name="label">
				{label}
			</slot>
		</label>
	{/if}
	<div class={contentCls}>
		<slot />
		{#if errorMsg && showMsg}
			<div class={errorMsgCls} in:fly={{ y: -3, duration: 300 }}>
				<slot name="error">
					{errorMsg}
				</slot>
			</div>
		{/if}
	</div>
</div>
