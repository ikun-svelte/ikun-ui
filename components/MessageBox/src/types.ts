/// <reference types="svelte" />
import {type IKunTypeBase, type IKunUncertainFunction} from "@ikun-ui/utils";
type Extend = { show: boolean };
export type MsgBoxComponent<T> = T & (MsgBoxOptions<T> & Extend);
export type MsgBoxEmoType = IKunTypeBase;
export type MsgBoxType = 'confirm' | 'alert' | 'prompt';
export type MsgBoxLayout = 'center' | 'right';
export declare type MsgBoxOptions<T> = {
	/**
	 * Content of message-box title
	 * which can be a html string or a svelte component
	 */
	title?: string | T;
	/**
	 * @internal
	 * The emotion category of the message-box
	 */
	emoType?: MsgBoxEmoType;
	/**
	 * The category of the message-box
	 */
	type?: MsgBoxType;
	/**
	 * @internal
	 * The message-box is mounted
	 * using this as the anchor point
	 */
	target?: Element;
	/**
	 * The content of the message-box,
	 * which can be a html string or a svelte component
	 */
	content?: string | T;
	/**
	 * cancel button text
	 * @default cancel
	 */
	cancelBtnText?: string;
	/**
	 * @default confirm
	 * confirm button text
	 */
	confirmBtnText?: string;
	/**
	 * cancel button class
	 */
	cancelBtnCls?: string;
	/**
	 * confirm button class
	 */
	confirmBtnCls?: string;
	/**
	 * @default right
	 * confirm button and cancel button layout
	 */
	layout?: MsgBoxLayout
	/**
	 * Additional class
	 */
	cls?: string;
	/**
	 * Additional attributes
	 */
	attrs?: any;
	/**
	 * validation function for the input.
	 * @param value input value
	 */
	inputValidator?: (value: string) => boolean
	/**
	 * error message when validation fails
	 */
	inputErrorMessage?: string
	/**
	 * confirm callback
	 */
	onConfirm?: IKunUncertainFunction
	/**
	 * cancel callback
	 */
	onCancel?: IKunUncertainFunction
}
