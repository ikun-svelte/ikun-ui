import { KNotify, type NotifyOptions, type NotifyComponent } from '@ikun-ui/notify';
import { SvelteComponent } from 'svelte';

type MessageType = 'info' | 'warning' | 'error' | 'success';
type UncertainFunction<T = any> = () => T | void;
export interface MessageOptions {
	cls?: string;
	attrs?: any;
	close?: boolean;
	content?: string | SvelteComponent;
	type?: MessageType;
	target?: HTMLElement;
	onClose?: UncertainFunction;
	autoClose?: boolean;
	duration?: number; // just only autoClose = true
	offset?: number;
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
