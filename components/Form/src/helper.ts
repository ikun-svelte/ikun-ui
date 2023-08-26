import type { Contexts, FormContext, IKunFormInstance } from '@ikun-ui/utils';
import { get, writable } from 'svelte/store';
import _ from 'lodash';
export const createForm: () => IKunFormInstance = () => {
	const FormInstance: IKunFormInstance = {
		// store all Field values
		values: writable({}),
		// record all FormContexts , we can grab all FormContexts to control every Field.
		contexts: {} as Contexts,
		/**
		 * call cb when values change,callback will pass specific value
		 */
		subscribe: function (path, callback) {
			FormInstance.values.subscribe((values: any) => {
				callback(_.get(values, path));
			});
		},
		/**
		 * call cb when values change,callback will pass all values
		 * @param callback
		 */
		subscribes: function (callback) {
			FormInstance.values.subscribe(callback);
		},
		// The form submit method, which returns the form value object
		submit: () => get(FormInstance.values),
		// Get the value of a specific field on a form
		getValue: (path: string) => {
			const values = get(FormInstance.values);
			return _.get(values, path);
		},
		// Set the value of a specific field on a form
		setValue: (path: string, value: any) => {
			FormInstance.values.update((values: any) => {
				_.set(values, path, value);
				return values;
			});
		},
		// Set form value
		setValues: (values: any) => {
			const oldValues: any = get(FormInstance.values) || {};
			FormInstance.values.set({ ...oldValues, ...values });
		},
		// Use it to collect context.
		setContext: (path: string, context: FormContext) => {
			_.set(FormInstance.contexts, getContextsPath(path), context);
		},
		// reset all Field using context.initialValue
		resetValues: () => {
			walkEdgeContexts(FormInstance.contexts, (node) => {
				FormInstance.setValue(node.path, node.initialValue);
			});
		},
		// reset specific Field using context.initialValue
		resetValue: (path: string) => {
			const targetContext = _.get(FormInstance.contexts, getContextsPath(path));
			FormInstance.setValue(path, targetContext.initialValue);
		},
		validateValues: () => {
			const errors: any[] = [];
			walkContexts(FormInstance.contexts, (node) => {
				const error = node.validateField();
				if (error.length > 0) errors.push(error);
			});
			if (errors.length > 0) throw errors;
			return true;
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

/**
 * wark contexts in edge.
 * @param contexts
 * @returns
 */
export const walkEdgeContexts = (
	contexts: { [key: string]: Contexts },
	callback: (node: FormContext) => void
) => {
	function traverse(node: Contexts) {
		if (node.__FormContext__) return;
		const currentContext = node.__this__;
		const anotherNodesKeys = Object.keys(node).filter((key) => key !== '__this__');
		anotherNodesKeys.forEach((item) => {
			traverse(node[item]);
		});
		if (anotherNodesKeys.length === 0) {
			callback(currentContext);
		}
	}
	Object.values(contexts).forEach(traverse);
};

/**
 * wark all contexts.
 * @param contexts
 * @returns
 */
export const walkContexts = (
	contexts: { [key: string]: Contexts },
	callback: (node: FormContext) => void
) => {
	function traverse(node: Contexts) {
		if (node.__FormContext__) return;
		const currentContext = node.__this__;
		const anotherNodesKeys = Object.keys(node).filter((key) => key !== '__this__');
		anotherNodesKeys.forEach((item) => {
			traverse(node[item]);
		});
		callback(currentContext);
	}
	Object.values(contexts).forEach(traverse);
};

/**
 * get contexts path,as contexts has attribute __this__ which is FormContexts.
 * @param path
 * @returns
 */
export const getContextsPath = (path: string) => path + '.__this__';
