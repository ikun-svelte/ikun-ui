<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, KFormItemProps, KFormProps } from "./types";
	import { formItemKey, getPrefixCls, formKey } from "@ikun-ui/utils";
	import { clsx } from 'clsx';
	export let cls: KFormItemProps['cls'] = undefined;
	export let attrs: KFormItemProps['attrs'] = {};
	export let field: KFormItemProps['field'] = '';
	export let label: KFormItemProps['label'] = '';
	export let showMsg: KFormItemProps['showMsg'] = true;

	let errorMsg = '';
	function showErrorMsg(msg: string){
		errorMsg = msg
	}
	const formInstance = getContext(formKey) as IKunFormInstance;

	const formContext = getContext(formItemKey);
	let disabled:KFormProps['disabled'] = false
	let size:KFormProps['size'] = 'md'
	let labelPosition:KFormProps['labelPosition'] = 'horizontal'
	let labelAlign:KFormProps['labelAlign'] = 'right'
	let labelWidth:KFormProps['labelWidth'] = undefined

	function formPropsChangeCb(props: Record<any, any>) {
		size = props.size
		labelPosition = props.labelPosition

		disabled = props.disabled
		labelAlign = props.labelAlign
		labelWidth = props.labelWidth
	}
	// nested KFormItem
	if(field){
		let resolveField = field
		if(formContext){
			resolveField = `${formContext}&${field}`
			setContext(formItemKey, resolveField);
			formInstance.__showMsgMap[field] = showErrorMsg
		} else {
			setContext(formItemKey, resolveField);
			formInstance.__showMsgMap[field] = showErrorMsg
		}

		if(formInstance){
			formPropsChangeCb(formInstance.__dynamicProps)
			// register props change callback
			formInstance.__propHandleEvtMap.push(formPropsChangeCb)
		}
	}


	// class
	const prefixCls = getPrefixCls('form-item');
	$: cnames = clsx(
		`${prefixCls}__${labelPosition}`,
		cls
	);
	$: lableCls = clsx(
		`${prefixCls}-label`,
		`${prefixCls}-label__${labelAlign}`,
		{
			[`${prefixCls}-label__disabled`]: disabled
		}
	);
	$: contentCls = clsx(`${prefixCls}-content`);
	$: errorMsgCls = clsx(`${prefixCls}-msg_error`);
	$: labelWidthInner = labelWidth ? `${labelWidth}px` : undefined
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={lableCls} style:width={labelWidthInner}>
		<slot name="label">
			{label}
		</slot>
	</div>
	<div class={contentCls}>
		<slot />
		{#if errorMsg && showMsg}
			<div class={errorMsgCls}>
				<slot name="error">
					{errorMsg}
				</slot>
			</div>
		{/if}
	</div>
</div>
