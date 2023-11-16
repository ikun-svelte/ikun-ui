/// <reference types="./types" />
import Form from './form.svelte';
import FormItem from './form-item.svelte';

export { Form as KForm };
export { FormItem as KFormItem };

export { createForm } from './helpers/instance';
export type {
	IKunFormInstanceOption,
	ShowMsg,
	IKunFormInstance,
	FormValidateCallback,
	ValidateError,
	KFormProps,
	KFormItemProps,
	KFormRule,
	KFormRules
} from './types';
