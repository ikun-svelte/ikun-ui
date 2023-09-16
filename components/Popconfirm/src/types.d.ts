/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunTrigger, IKunTypeBase } from '@ikun-ui/utils';
export type KPopconfirmProps = {
	cls: ClassValue; // ✅
	attrs: Record<string, string>; // ✅
	/**
	 * @default info
	 */
	type: IKunTypeBase; // ✅
	icon: string; // ✅
	/**
	 * @default false
	 */
	disabled: boolean;
	/**
	 * @default cancel
	 */
	cancelBtnText: string; // ✅
	cancelBtnCls: string; // ✅
	/**
	 * @default confirm
	 */
	confirmBtnText: string; // ✅
	confirmBtnCls: string; // ✅
	/**
	 * @default true
	 */
	showCancel: boolean; // ✅
	title: string; // ✅
	content: string; // ✅
	/**
	 * @default click
	 */
	trigger: IKunTrigger; // ✅
};
// ✅ slot - title
// ✅ slot - content
// ✅ slot - footer

// event - onCancel
// event - onConfirm
// event - onShow
// dark
