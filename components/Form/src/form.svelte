<script lang="ts">
	import { createForm } from './helpers/instance';
	import { createEventDispatcher, setContext } from 'svelte';
	import { formKey, getPrefixCls } from '@ikun-ui/utils';
	import type {
		FormValidateCallback,
		IKunFormInstanceOption,
		KFormProps,
		ValidateError
	} from './types';
	import { clsx } from 'clsx';

	export let cls: KFormProps['cls'] = undefined;
	export let attrs: KFormProps['attrs'] = {};
	export let rules: KFormProps['rules'] = undefined;
	export let size: KFormProps['size'] = 'md';
	export let disabled: KFormProps['disabled'] = false;
	export let manualValidate: KFormProps['manualValidate'] = false;
	export let labelAlign: KFormProps['labelAlign'] = 'right';
	export let labelPosition: KFormProps['labelPosition'] = 'horizontal';
	export let labelWidth: KFormProps['labelWidth'] = undefined;
	export let initValue: KFormProps['initValue'] = {};

	const formInst = createForm({
		rules,
		initValue,
		manualValidate,
		validateEmitEvt: handleValidateEvt,
		dynamicProps: {
			size,
			disabled,
			labelAlign,
			labelPosition,
			labelWidth
		}
	} as IKunFormInstanceOption);
	setContext(formKey, formInst);

	// props 变化 ,更新 KFormItem、KInput
	$: {
		formInst.__propHandleEvtMap.forEach((cb) => {
			cb({
				size,
				disabled,
				labelAlign,
				labelPosition,
				labelWidth
			});
		});
	}

	export function validateForm(callback: FormValidateCallback) {
		formInst && formInst.validateForm(callback);
	}

	export function validateField(path: string) {
		formInst && formInst.validateField(path);
	}

	export function resetForm() {
		formInst && formInst.resetForm();
	}

	export function clearValidateField(path: string) {
		formInst && formInst.clearValidateField(path);
	}

	export function setForm(value: any, isValidate = false) {
		formInst && formInst.setForm(value, isValidate);
	}

	export function setField(path: string, value: any, isValidate = false) {
		formInst && formInst.setField(path, value, isValidate);
	}

	export function getForm<T>() {
		return formInst && formInst.getForm<T>();
	}

	const dispatch = createEventDispatcher();
	function handleValidateEvt(data: any, isValid: boolean, invalidFields?: ValidateError[]) {
		dispatch('validate', {
			data,
			isValid,
			invalidFields
		});
	}

	// class
	const prefixCls = getPrefixCls('form');
	$: cnames = clsx(prefixCls, cls);
</script>

<form class={cnames} {...$$restProps} {...attrs}>
	<slot />
</form>
