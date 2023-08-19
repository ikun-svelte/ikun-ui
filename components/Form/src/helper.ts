import type { FormInstance } from './types';
import { writable } from 'svelte/store';
export const createForm: () => FormInstance = () => {
	const FormInstance: FormInstance = {
		values: writable({}),
		subscribe: (cb) => {
			FormInstance.values.subscribe(cb);
		},
		submit: () => console.log('submit: ', FormInstance.values),
		setValue: (field, value) => {
			FormInstance.values.update((values: any) => {
				return { ...values, [field]: value };
			});
		},
		setValues: (values: any) => {
			FormInstance.values = {
				...FormInstance.values,
				...values
			};
		}
	};
	return FormInstance;
};
