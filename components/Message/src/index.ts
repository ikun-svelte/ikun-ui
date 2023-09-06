import { KNotify, type NotifyOptions, type NotifyComponent } from '@ikun-ui/notify';
import type { MessageOptions } from './types';

export * from './types';
export type MessageComponent = NotifyComponent;

const resolveMessageOptions = <T>(options: MessageOptions<T>) => {
	const OptionsRes = {
		...options
	} as NotifyOptions<T, undefined>;
	OptionsRes.title = options.content;
	OptionsRes.placement = 'center';

	Reflect.deleteProperty(OptionsRes, 'content');
	return OptionsRes;
};

function MsgFn<T>(options: MessageOptions<T> = {}) {
	return KNotify(resolveMessageOptions<T>(options));
}

MsgFn.info = <T>(options: MessageOptions<T> = {}) => {
	return KNotify.info(resolveMessageOptions<T>(options));
};

MsgFn.warning = <T>(options: MessageOptions<T> = {}) => {
	return KNotify.warning(resolveMessageOptions<T>(options));
};

MsgFn.error = <T>(options: MessageOptions<T> = {}) => {
	return KNotify.error(resolveMessageOptions<T>(options));
};

MsgFn.success = <T>(options: MessageOptions<T> = {}) => {
	return KNotify.success(resolveMessageOptions<T>(options));
};

MsgFn.clear = KNotify.clear;

MsgFn.clearAll = KNotify.clearAll;

MsgFn.update = async <T>(inst: MessageComponent, options: MessageOptions<T> = {}) => {
	KNotify.update(inst, resolveMessageOptions<T>(options));
};

export const KMessage = MsgFn;
