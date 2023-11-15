/// <reference types="./types" />
import Form from './form.svelte';
import FormItem from './form-item.svelte';
import { createForm } from './helpers/instance';

export { Form as KForm };
export { FormItem as KFormItem };
export { createForm as createKFormInstance };

export type { IKunFormInstance, FormContext } from './types';
