import { Notify, NotifyOptions } from '../Notification';
import { SvelteComponent } from 'svelte';

type MessageType = 'info' | 'warning' | 'error' | 'success';
export interface MessageOptions {
	customClass?: string;
	close?: boolean;
	content?: string;
	type?: MessageType;
	target?: HTMLElement;
	onClose?: () => void;
	slotContent?: string | SvelteComponent; // svelte sfc or html sting
	autoClose?: boolean;
	duration?: number; // just only autoClose = true
	offset?: number;
}

const resolveMessageOptions = (options: MessageOptions) => {
	const OptionsRes = {
		...options
	} as NotifyOptions;
	OptionsRes.title = options.content;
	OptionsRes.slotTitle = options.slotContent;
	OptionsRes.placement = 'center';

	Reflect.deleteProperty(OptionsRes, 'content');
	Reflect.deleteProperty(OptionsRes, 'slotContent');
	return OptionsRes as NotifyOptions;
};

function MsgFn(options: MessageOptions = {}) {
	return Notify(resolveMessageOptions(options));
}

MsgFn.info = (options: MessageOptions = {}) => {
	return Notify.info(resolveMessageOptions(options));
};

MsgFn.warning = (options: MessageOptions = {}) => {
	return Notify.warning(resolveMessageOptions(options));
};

MsgFn.error = (options: MessageOptions = {}) => {
	return Notify.error(resolveMessageOptions(options));
};

MsgFn.success = (options: MessageOptions = {}) => {
	return Notify.success(resolveMessageOptions(options));
};

MsgFn.clear = Notify.clear;

MsgFn.clearAll = Notify.clearAll;

MsgFn.update = async (inst, options: MessageOptions = {}) => {
	Notify.update(inst, resolveMessageOptions(options));
};

export const Message = MsgFn;
