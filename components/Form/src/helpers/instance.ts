import type { Contexts, FormContext, KFormRules } from "../types";
import type { IKunSize } from "@ikun-ui/utils";
import { jsonClone } from "baiwusanyu-utils";
import { getValueByPath, setValueByPath } from "./fields";
import { doValidate, doValidateField } from "./rules";

declare type showMsg = (msg: string) => void
interface IKunFormInstanceOption {
	initValue: any;
	rules?: KFormRules;
	size: IKunSize
	disabled: boolean
}
interface IKunFormInstance {
	__default_value: any
	__showMsgMap: Record<string, showMsg>
	__updateMap: Record<string, ()=>void>
	getValueByPath: typeof getValueByPath
	setValueByPath: typeof setValueByPath
}

export type Value = any;
export type Values = Record<string, Value>;
export interface ValidateError {
	message?: string;
	fieldValue?: Value;
	field?: string;
}

export type ValidateFieldsError = Record<string, ValidateError[]>;
type FormValidateCallback = (
	isValid: boolean,
	invalidFields?: ValidateFieldsError
) => void

export const createForm = (option: IKunFormInstanceOption):IKunFormInstance => {
	const instance = {
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
		__size: option.disabled,
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
		 * @internal
		 */
		setValueByPath,
		/**
		 * @internal
		 */
		updateField(
			path: string,
			value: unknown) {
			let errorMsg = ''
			const showMsg = this.__showMsgMap[path as keyof typeof this.__showMsgMap] as showMsg
			try {
				doValidateField(this.__rules, path, value)
			} catch (e: any) {
				errorMsg = e.message
				showMsg && showMsg(errorMsg)
			} finally {
				if(!errorMsg){
					// update
					this.__value = setValueByPath(path, this.__value, value)
					showMsg && showMsg(errorMsg)
				}
			}
		},
		/**
		 * @internal
		 */
		setEntireForm (
			values?: any,
			isValidate= false) {
			for (const key in this.__showMsgMap){
				// clear validate
				if(Object.hasOwnProperty.call(this.__showMsgMap, key)){
					const showMsg = this.__showMsgMap[key as keyof typeof this.__showMsgMap] as showMsg
					showMsg('')
				}

				// get update dom value fn
				if(Object.hasOwnProperty.call(this.__updateMap, key)){
					const updateDom = this.__updateMap[key as keyof typeof this.__updateMap] as ()=> void
					updateDom()
				}

				// called by setForm & validate field
				if(isValidate && isValidate && Object.hasOwnProperty.call(values, key)){
					this.updateField(key, values[key])
				}
			}
		},
		/**
		 * @public
		 */
		validate (callback: FormValidateCallback) {

		},
		/**
		 * @public
		 */
		validateField (
			path: string | string[]
		) {

		},
		/**
		 * @public
		 */
		resetFields ()  {
			this.__value = this.__default_value
			this.setEntireForm()
		},
		/**
		 * @public
		 */
		clearValidate ()  {

		},
		/**
		 * @public
		 */
		setForm (values: any, isValidate: boolean)  {
			this.__value = values
			this.setEntireForm(values, isValidate)
		},
		/**
		 * @public
		 */
		setFields ()  {

		}
	}
	return instance
};
