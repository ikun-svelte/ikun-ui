import type {
	IKunFormInstanceOption,
	ShowMsg,
	IKunFormInstance,
	FormValidateCallback
} from '../types';
import { jsonClone } from 'baiwusanyu-utils';
import { getValueByPath, setValueByPath } from './fields';
import { doValidate, doValidateField } from './rules';
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
		__disabled: option.disabled,
		/**
		 * @internal
		 */
		__manual_validate: option.manualValidate,
		/**
		 * @internal
		 */
		__size: option.size,
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
		__updateMap: {},
		/**
		 * @internal
		 */
		getValueByPath,
		/**
		 * 更新特定字段
		 * 它应该在各个表单组件（例如KInput）中值更新时被调用
		 * @param path 字段路径
		 * @param value 值
		 * @param isSetEntireForm 是否来自 isSetEntireForm 调用
		 * @internal
		 */
		updateField(path: string, value: unknown, isSetEntireForm = false) {
			let errorMsg = '';
			const showMsg = this.__showMsgMap[path as keyof typeof this.__showMsgMap] as ShowMsg;
			try {
				// 校验字段
				if (!this.__manual_validate || isSetEntireForm) {
					doValidateField(this.__rules, path, value);
				}
			} catch (e: any) {
				// 显示校验信息
				errorMsg = e.message;
				showMsg && showMsg(errorMsg);
			} finally {
				if (!errorMsg) {
					// update
					this.__value = setValueByPath(path, this.__value, value);
					showMsg && showMsg(errorMsg);
				}
			}
		},
		/**
		 * 清空 KFormItem 的错误信息
		 * @param key 字段记录，它能够映射到对应 KFormItem 的 showErrorMsg
		 * @internal
		 */
		clearErrorMsg(key: string) {
			if (Object.hasOwnProperty.call(this.__showMsgMap, key)) {
				const showMsg = this.__showMsgMap[key as keyof typeof this.__showMsgMap] as ShowMsg;
				showMsg('');
			}
		},
		/**
		 * 设置整个表单对象值
		 * @param values
		 * @param isValidate
		 * @internal
		 */
		setEntireForm(values?: any, isValidate = false) {
			for (const key in this.__showMsgMap) {
				// clear validate
				this.clearErrorMsg(key);

				// get update dom value fn
				if (Object.hasOwnProperty.call(this.__updateMap, key)) {
					const updateDom = this.__updateMap[key as keyof typeof this.__updateMap] as () => void;
					updateDom();
				}

				// called by setForm & validate field
				if (isValidate && values && Object.hasOwnProperty.call(values, key)) {
					this.updateField(key, values[key], true);
				}
			}
		},
		/**
		 * @public
		 */
		validate(callback: FormValidateCallback) {
			const errorMsgArr: ValidateError[] = [];
			if (this.__rules) {
				doValidate(this.__rules, this.__value, errorMsgArr);
			}
			callback(this.__value, errorMsgArr.length === 0, errorMsgArr);
		},
		/**
		 * @public
		 */
		validateField(path: string | string[]) {},
		/**
		 * @public
		 */
		resetFields() {
			this.__value = this.__default_value;
			this.setEntireForm();
		},
		/**
		 * @public
		 */
		clearValidate() {},
		/**
		 * @public
		 */
		setForm(values: any, isValidate: boolean) {
			this.__value = values;
			this.setEntireForm(values, isValidate);
		},
		/**
		 * @public
		 */
		getForm() {
			return this.__value;
		},
		/**
		 * @public
		 */
		setFields() {}
	};
};
