<script lang="ts">
	import { getContext, setContext } from 'svelte';
	// import { getFormItemPath } from './helpers/helper';
	// import { safeParse, type Issue } from 'valibot';
	import type { KFormItemProps, IKunFormInstance, FormContext } from './types';
	import { formItemKey, getPrefixCls, formKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	export let cls: KFormItemProps['cls'] = undefined;
	export let attrs: KFormItemProps['attrs'] = {};
	export let field: KFormItemProps['field'] = '';
	export let label: KFormItemProps['label'] = '';
	export let labelWidth: KFormItemProps['labelWidth'] = undefined;
	export let showMsg: KFormItemProps['showMsg'] = true;

	let errorMsg = '';
	// Set the component instance from the component context
	/*const form: IKunFormInstance = getContext(formKey);
	// Get the form component context from the
	// component context (nested use of form-item.svelte)
	const formContext: FormContext = getContext(formItemKey);
	// Set path according to `formContext.path` and `field`
	const currentPath = getFormItemPath(formContext?.path || '', field);
	// Set form component context
	const currentContext: FormContext = {
		form,
		__FormContext__: true,
		initialValue: undefined,
		path: currentPath,
		updateField: (value: any) => {
			// It will be called when the value of the component changes,
			// and the related value will be updated to the corresponding field of the form instance
			form.setValue(currentPath, value);
		},
		validateField: () => {
			const value = form.getValue(currentPath);
			const errors: Issue[] = [];
			if (required && !value)
				errors.push({
					validation: 'custom',
					origin: 'value',
					reason: 'any',
					message: `${currentPath} is required`,
					input: value
				});
			if (rules) {
				const result = safeParse(rules, value);
				if (!result.success) errors.push(...result.issues);
			}
			if (errors[0]) errorMessage = errors[0].message;
			return errors;
		},
		initialField: (initialValueFromComponent: any) => {
			// get initValue ,initialValue is entered by the user, so initialValue is preferred.
			const initValue = initialValue !== undefined ? initialValue : initialValueFromComponent;
			// save this initValue, it will used in form.resetValues.
			currentContext.initialValue = initValue;
			form.setValue(currentPath, initValue);
		},
		// The subscription method will be called in the component
		// and register related callback functions
		subscribe: (callback: (value: any) => void) => {
			// Register the callback function of the component to
			// the form instance according to the currentPath
			form.subscribe(currentPath, (value: any) => {
				callback(value);
			});
		},
		resetField: () => {
			errorMessage = '';
			form.setValue(currentPath, currentContext.initialValue);
		}
	};
	// record Context to form.contexts
	form.setContext(currentPath, currentContext as FormContext);
	// setContexts for nested component.
	setContext(formItemKey, currentContext);*/
	function showErrorMsg(msg: string){
		errorMsg = msg
	}
	const form = getContext(formKey);

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
