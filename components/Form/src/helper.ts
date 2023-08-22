import type { IKunFormInstance } from '@ikun-ui/utils';
import { get, writable } from 'svelte/store';
import _ from 'lodash';
export const createForm: () => IKunFormInstance = () => {
	const FormInstance: IKunFormInstance = {
		values: writable({}),
		/**
		 * call cb when values change
		 * if param path exist,callback will pass specific value
		 * else pass values
		 * @param args [callback] or [path,callback]
		 */
		subscribe: function (...args: any[]) {
			if (args.length === 0) throw new Error('subscribe need at least one argument');
			const callback = args.length === 1 ? args[0] : args[1];
			const path = args[0];
			if (arguments.length === 1) {
				FormInstance.values.subscribe(callback);
			} else if (arguments.length === 2) {
				FormInstance.values.subscribe((values: any) => {
					callback(_.get(values, path));
				});
			}
		},
		// The form submit method, which returns the form value object
		submit: () => get(FormInstance.values),
		// Set the value of a specific field on a form
		setValue: (path: string, value: any) => {
			FormInstance.values.update((values: any) => {
				_.set(values, path, value);
				return values;
			});
		},
		// set form value
		setValues: (values: any) => {
			const oldValues: any = get(FormInstance.values) || {};
			FormInstance.values.set({ ...oldValues, ...values });
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
