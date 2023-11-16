<script lang="ts">
	import { createForm } from './helpers/instance';
	import { setContext } from 'svelte';
	import { formKey, getPrefixCls } from "@ikun-ui/utils";
	import type { FormValidateCallback, KFormProps } from "./types";
	import { clsx } from "clsx";

	export let cls: KFormProps['cls'] = undefined;
	export let attrs: KFormProps['attrs'] = {};
	export let rules: KFormProps['rules'] = undefined;
	export let size: KFormProps['size'] = 'md';
	export let disabled: KFormProps['disabled'] = false;
	export let manualValidate: KFormProps['manualValidate'] = false;
	export let initValue: KFormProps['initValue'] = {};

	const formInst = createForm({
		size,
		disabled,
		rules,
		initValue,
		manualValidate
	})
	setContext(formKey, formInst);

	export function validateForm(callback: FormValidateCallback){
		formInst && formInst.validateForm(callback)
	}

	export function validateField(path: string){
		formInst && formInst.validateField(path)
	}

	export function resetForm(){
		formInst && formInst.resetForm()
	}

	export function clearValidateField(path: string){
		formInst && formInst.clearValidateField(path)
	}

	export function setForm(value: any, isValidate = false){
		formInst && formInst.setForm(value, isValidate)
	}


	export function setFields(path: string, value: any, isValidate = false){
		formInst && formInst.setFields(path, value, isValidate)
	}

	export function getForm<T>(){
		return formInst && formInst.getForm<T>()
	}

	// class
	const prefixCls = getPrefixCls('form');
	$: cnames = clsx(prefixCls, cls);
</script>

<form class={cnames} {...$$restProps} {...attrs}>
	<slot />
</form>
