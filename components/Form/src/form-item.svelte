<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, KFormItemProps } from "./types";
	import { formItemKey, getPrefixCls, formKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	export let cls: KFormItemProps['cls'] = undefined;
	export let attrs: KFormItemProps['attrs'] = {};
	export let field: KFormItemProps['field'] = '';
	export let label: KFormItemProps['label'] = '';
	export let labelWidth: KFormItemProps['labelWidth'] = undefined;
	export let showMsg: KFormItemProps['showMsg'] = true;

	let errorMsg = '';
	function showErrorMsg(msg: string){
		errorMsg = msg
	}
	const form = getContext(formKey) as IKunFormInstance;

	const formContext = getContext(formItemKey);
	// nested KFormItem
	if(field){
		if(formContext){
			setContext(formItemKey, `${formContext}&${field}`);
			form.__showMsgMap[field] = showErrorMsg
		} else {
			setContext(formItemKey, field);
			form.__showMsgMap[field] = showErrorMsg
		}
	}

	// class
	const prefixCls = getPrefixCls('form-item');
	$: cnames = clsx(prefixCls, cls);
	$: lableCls = clsx(`${prefixCls}-label`);
	$: contentCls = clsx(`${prefixCls}-content`);
	$: errorMsgCls = clsx(`${prefixCls}__error_msg`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={lableCls}>
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
