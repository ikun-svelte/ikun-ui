import type { IKunFormInstance } from '@ikun-ui/utils';
import { get, writable } from 'svelte/store';
import _ from 'lodash';
export const createForm: () => IKunFormInstance = () => {
	const FormInstance: IKunFormInstance = {
		values: writable({}),
		subscribe: function (...args: any[]) {
			if (args.length === 0) throw new Error('subscribe need at least one argument');
			const callback = args.length === 1 ? args[0] : args[1];
			const path = args[0];
			if (arguments.length === 1) {
				FormInstance.values.subscribe(callback);
			} else if (arguments.length === 2) {
				FormInstance.values.subscribe((values: any) => {
					console.log(values, path);
					callback(_.get(values, path));
				});
			}
		},
		submit: () => get(FormInstance.values),
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
/**
 * get path By nesting FormItems
 * @param oldPath
 * @param field
 * @returns
 */
export const getFormItemPath = (oldPath: string, field: string) => {
	if (oldPath === '') {
		return field;
	} else {
		//we can resolve path e.g (a.0.b.c) by lodash
		return oldPath + `.${field}`;
	}
};
