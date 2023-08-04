import { KNotify, type NotifyOptions, type NotifyComponent } from '@ikun-ui/notify';
import { SvelteComponent } from 'svelte';

type MessageType = 'info' | 'warning' | 'error' | 'success';
type UncertainFunction<T = any> = () => T | void;
export interface MessageOptions {
	/**
	 * Whether the notification can be closed manually
	 */
	close?: boolean;
	/**
	 * The emotion category of the notification
	 */
	type?: MessageType;
	/**
	 * @internal
	 * The message is mounted
	 * using this as the anchor point
	 */
	target?: Element;
	/**
	 * The callback method when the message is closed
	 */
	onClose?: UncertainFunction;
	/**
	 * The content of the message,
	 * which can be a html string or a svelte component
	 */
	content?: string | SvelteComponent;
	/**
	 * Whether the message is automatically closed
	 */
	autoClose?: boolean;
	/**
	 * Message's auto-close timing
	 * (only when `autoClose = true`) takes effect
	 */
	duration?: number;
	/**
	 * Message is offset on the y-axis
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
}

const resolveMessageOptions = (options: MessageOptions) => {
	const OptionsRes = {
		...options
	} as NotifyOptions;
	OptionsRes.title = options.content;
	OptionsRes.placement = 'center';

	Reflect.deleteProperty(OptionsRes, 'content');
	return OptionsRes as NotifyOptions;
};

function MsgFn(options: MessageOptions = {}) {
	return KNotify(resolveMessageOptions(options));
}

MsgFn.info = (options: MessageOptions = {}) => {
	return KNotify.info(resolveMessageOptions(options));
};

MsgFn.warning = (options: MessageOptions = {}) => {
	return KNotify.warning(resolveMessageOptions(options));
};

MsgFn.error = (options: MessageOptions = {}) => {
	return KNotify.error(resolveMessageOptions(options));
};

MsgFn.success = (options: MessageOptions = {}) => {
	return KNotify.success(resolveMessageOptions(options));
};

MsgFn.clear = KNotify.clear;

MsgFn.clearAll = KNotify.clearAll;

MsgFn.update = async (inst: NotifyComponent, options: MessageOptions = {}) => {
	KNotify.update(inst, resolveMessageOptions(options));
};

export const KMessage = MsgFn;
