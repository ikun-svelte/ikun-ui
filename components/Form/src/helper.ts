import type { FormInstance } from './types';

export const createForm: () => FormInstance = () => {
	const FormInstance: FormInstance = {
		values: {},
		submit: () => console.log('submit: ', FormInstance.values),
		setValue: (field, value) => {
			FormInstance.values[field] = value;
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
