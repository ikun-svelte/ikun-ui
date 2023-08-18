/// <reference types="svelte" />
import type { IKunTypeBase, IKunUncertainFunction } from '@ikun-ui/utils';

export type NotifyType = IKunTypeBase;
export type NotifyPlacement = 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center';

/*export type NotifyExtend = {
	__notify_index: number;
	__notify_placement: NotifyPlacement;
	index: number;
	show: boolean;
};*/

export declare type NotifyOptions<T, C> = {
	/**
	 * Whether the notification can be closed manually
	 */
	close?: boolean;
	/**
	 * Content of Notification title
	 * which can be a html string or a svelte component
	 */
	title?: string | T;
	/**
	 * The emotion category of the notification
	 */
	type?: NotifyType;
	/**
	 * Where the notification appears
	 */
	placement?: NotifyPlacement;
	/**
	 * @internal
	 * The notification is mounted
	 * using this as the anchor point
	 */
	target?: Element;
	/**
	 * The callback method when the notification is closed
	 */
	onClose?: IKunUncertainFunction;
	/**
	 * The content of the notification,
	 * which can be a html string or a svelte component
	 */
	content?: string | C;
	/**
	 * Whether the notification is automatically closed
	 */
	autoClose?: boolean;
	/**
	 * Notification's auto-close timing
	 * (only when `autoClose = true`) takes effect
	 */
	duration?: number;
	/**
	 * Notification is offset on the y-axis
	 */
	offset?: number;
	/**
	 * Additional class
	 */
	cls?: string;
	/**
	 * Additional attributes
	 */
	attrs?: any;
};
