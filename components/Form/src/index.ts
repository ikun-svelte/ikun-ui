// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="./types" />
import Form from './form.svelte';
import FormItem from './form-item.svelte';
import { type FormInstance } from './types';
import { createForm } from './helper';

export default Form;

export { Form as KForm };
export { FormItem as KFormItem };
export { createForm as createKFormInstance };
export type { FormInstance as KFormInstance };