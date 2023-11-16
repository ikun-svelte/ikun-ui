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

	export function validate(callback: FormValidateCallback){
		formInst && formInst.validate(callback)
	}

	export function validateField(){

	}

	export function resetFields(){
		formInst && formInst.resetFields()
	}

	export function clearValidate(){

	}

	export function setForm(value: any, isValidate = false){
		formInst && formInst.setForm(value, isValidate)
	}


	export function setFields(){

	}

	// class
	const prefixCls = getPrefixCls('form');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
