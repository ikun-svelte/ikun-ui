import {
	KNotify,
	type NotifyOptions,
	type NotifyComponent
} from '@ikun-ui/notify';
import type { MessageOptions } from './types'
import type { SvelteComponent } from 'svelte';
export * from './types'

const resolveMessageOptions = (options: MessageOptions<SvelteComponent>) => {
	const OptionsRes = {
		...options
	} as NotifyOptions<SvelteComponent>;
	OptionsRes.title = options.content;
	OptionsRes.placement = 'center';

	Reflect.deleteProperty(OptionsRes, 'content');
	return OptionsRes as NotifyOptions<SvelteComponent>;
};

function MsgFn(options: MessageOptions<SvelteComponent> = {}) {
	return KNotify(resolveMessageOptions(options));
}

MsgFn.info = (options: MessageOptions<SvelteComponent> = {}) => {
	return KNotify.info(resolveMessageOptions(options));
};

MsgFn.warning = (options: MessageOptions<SvelteComponent> = {}) => {
	return KNotify.warning(resolveMessageOptions(options));
};

MsgFn.error = (options: MessageOptions<SvelteComponent> = {}) => {
	return KNotify.error(resolveMessageOptions(options));
};

MsgFn.success = (options: MessageOptions<SvelteComponent> = {}) => {
	return KNotify.success(resolveMessageOptions(options));
};

MsgFn.clear = KNotify.clear;

MsgFn.clearAll = KNotify.clearAll;

MsgFn.update = async (
	inst: NotifyComponent<SvelteComponent>,
	options: MessageOptions<SvelteComponent> = {}) => {
	KNotify.update(inst, resolveMessageOptions(options));
};

export const KMessage = MsgFn;
