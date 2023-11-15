<script lang="ts">
	import { createForm } from './helpers/instance';
	import { setContext } from 'svelte';
	import { formKey, getPrefixCls } from "@ikun-ui/utils";
	import type { KFormProps } from "./types";
	import { clsx } from "clsx";

	export let cls: KFormProps['cls'] = undefined;
	export let attrs: KFormProps['attrs'] = {};
	export let rules: KFormProps['rules'] = undefined;
	export let size: KFormProps['size'] = 'md';
	export let disabled: KFormProps['disabled'] = false;
	export let initValue: KFormProps['initValue'] = {};

	const formInst = createForm({
		size,
		disabled,
		rules,
		initValue,
	})
	setContext(formKey, formInst);

	export function validate(){

	}

	export function validateField(){

	}

	export function resetFields(){

	}

	export function clearValidate(){

	}

	// need updated
	export function setForm(){

	}

	// need updated
	export function setFields(){

	}

	// class
	const prefixCls = getPrefixCls('form');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
