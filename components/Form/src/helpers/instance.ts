import type { Contexts, FormContext, KFormRules } from "../types";
import { get, writable } from 'svelte/store';
import type { IKunSize } from "@ikun-ui/utils";
import { jsonClone } from "baiwusanyu-utils";
import { getValueByPath, setValueByPath } from "./fields";
import { doValidateField } from "./rules";

declare type showMsg = (msg: string) => void
interface IKunFormInstanceOption {
	initValue: any;
	rules?: KFormRules;
	size: IKunSize
	disabled: boolean
}
interface IKunFormInstance {
	__default_value: any
	__formItemShowMsg: Record<string, showMsg>
	getValueByPath: typeof getValueByPath
	setValueByPath: typeof setValueByPath
}
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
		__formItemShowMsg: {},
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
			const showMsg = this.__formItemShowMsg[path as keyof typeof this.__formItemShowMsg] as showMsg
			try {
				doValidateField( this.__rules, path, value)
			} catch (e: any) {
				errorMsg = e.message
				showMsg && showMsg(errorMsg)
			} finally {
				if(!errorMsg){
					// update
					this.__value = setValueByPath(path, this.__value, value)
					showMsg && showMsg(errorMsg)
					console.log(this.__value)
				}
			}
		},
		/**
		 * @public
		 */
		validate () {

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

		},
		/**
		 * @public
		 */
		clearValidate ()  {

		},
		/**
		 * @public
		 */
		setForm ()  {

		},
		/**
		 * @public
		 */
		setFields ()  {

		}
	}
	return instance
};
