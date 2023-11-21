import type {
	IKunFormInstanceOption,
	ShowMsg,
	IKunFormInstance,
	FormValidateCallback
} from '../types';
import { jsonClone } from 'baiwusanyu-utils';
import { getValueByPath, setValueByPath } from './fields';
import { doValidate, doValidateField, traverseObjects } from './rules';
import type { ValidateError } from '../types';

export const createForm = (option: IKunFormInstanceOption): IKunFormInstance => {
	return {
		/**
		 * @internal
		 */
		__default_value: jsonClone(option.initValue),
		/**
		 * @internal
		 */
		__value: jsonClone(option.initValue),
		/**
		 * @internal
		 */
		__manual_validate: option.manualValidate,
		/**
		 * @internal
		 */
		__rules: option.rules || undefined,
		/**
		 * @internal
		 */
		__showMsgMap: {},
		/**
		 * @internal
		 */
		__itemCompMap: {},
		/**
		 * @internal
		 */
		__errorCompEvtMap: {},
		/**
		 * @internal
		 */
		__propHandleEvtMap: [],
		/**
		 * @internal
		 */
		__dynamicProps: option.dynamicProps,
		/**
		 * @internal
		 */
		getValueByPath,
		/**
		 * Update specific fields
		 * It should be called when the value is updated in each form component
		 * (such as KInput)
		 * @internal
		 * @param path field path
		 * @param value
		 * @param isValidate Whether to Validate form fields
		 */
		updateField(path: string, value: unknown, isValidate = false) {
			let errorMsg = '';
			this.updateErrorMsg(path, '');
			try {
				// validate form fields
				if (!this.__manual_validate || isValidate) {
					doValidateField(this.__rules, path, value, this.__itemCompMap);
				}
			} catch (e: any) {
				// show verification error message
				errorMsg = e.message;
				this.updateErrorMsg(path, errorMsg);
			} finally {
				// update
				this.__value = setValueByPath(path, this.__value, value);
			}
		},
		/**
		 * Clear the error message of KFormItem
		 * @internal
		 * @param key Field record,
		 * which can be mapped to the showErrorMsg method of the corresponding KFormItem
		 * @param msg error message
		 */
		updateErrorMsg(key: string, msg: string) {
			if (Object.hasOwnProperty.call(this.__showMsgMap, key)) {
				const showMsg = this.__showMsgMap[key as keyof typeof this.__showMsgMap] as ShowMsg;
				showMsg(msg);
				if (this.__errorCompEvtMap[key]) {
					this.__errorCompEvtMap[key](!!msg);
				}
			}
		},
		/**
		 * Update the value displayed in a form component
		 * (such as KInput)
		 * @internal
		 * @param key
		 */
		updateDomText(key: string) {
			if (Object.hasOwnProperty.call(this.__itemCompMap, key)) {
				const updateDom = this.__itemCompMap[key as keyof typeof this.__itemCompMap].update as () => void;
				updateDom();
			}
		},
		/**
		 * Set the entire form object value
		 * @internal
		 * @param values
		 * @param isValidate Whether to Validate form fields
		 */
		setEntireForm(values?: any, isValidate = false) {
			for (const key in this.__showMsgMap) {
				// clear validate
				this.updateErrorMsg(key, '');
				// get update dom value fn
				this.updateDomText(key);
				// called by setForm & validate field
				if (isValidate && values) {
					this.updateField(key, this.getValueByPath(key, values), true);
				}
			}
		},
		/**
		 * Validate the entire form object
		 * @public
		 * @param callback
		 */
		validateForm(callback: FormValidateCallback) {
			const errorMsgArr: ValidateError[] = [];
			if (this.__rules) {
				doValidate(this.__rules, this.__value, errorMsgArr, this.__itemCompMap);
			}
			// update error message
			errorMsgArr.forEach((error) => {
				this.updateErrorMsg(error.field!, error.message!);
			});
			callback(this.__value, errorMsgArr.length === 0, errorMsgArr);
		},
		/**
		 * Validate the specific fields
		 * @public
		 * @param path field path
		 */
		validateField(path: string) {
			const resolveValue = this.getValueByPath(path, this.__value);
			this.updateField(path, resolveValue, true);
		},
		/**
		 * Reset the entire form to default values and clear validation
		 * @public
		 */
		resetForm() {
			this.__value = this.__default_value;
			this.setEntireForm();
		},
		/**
		 * Clear verification information of specific field
		 * @public
		 * @param path field path
		 */
		clearValidateField(path: string) {
			this.updateErrorMsg(path, '');
		},
		/**
		 * Set the entire form object value
		 * @public
		 * @param values
		 * @param isValidate Whether to Validate form fields
		 */
		setForm(values: any, isValidate: boolean) {
			this.__value = values;
			this.setEntireForm(values, isValidate);
		},
		/**
		 * get the entire form object value
		 * @public
		 */
		getForm<T>() {
			return this.__value as T;
		},
		/**
		 * Set form field value
		 * @public
		 * @param path field path
		 * @param value
		 * @param isValidate Whether to Validate form fields
		 */
		setFields(path: string, value: any, isValidate: boolean) {
			this.updateField(path, value, isValidate);
			this.updateDomText(path);
			// If it is a value object, verify its fields
			traverseObjects(
				value,
				(key, val) => {
					this.updateField(key, val, isValidate);
					this.updateDomText(key);
				},
				path
			);
		}
	};
};
