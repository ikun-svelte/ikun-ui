import MsgBox from './index.svelte';
import type { MsgBoxOptions, MsgBoxComponent } from './types';
import { jsonClone } from 'baiwusanyu-utils';

export * from './types';

const defaultMsgBoxOptions: MsgBoxOptions<undefined, undefined> = {
	confirmBtnText: 'confirm',
	cancelBtnText: 'cancel'
};

const resolveMsgBoxOptions = <T, C>(options: MsgBoxOptions<T, C>) => {
	const finalOptions = {
		...defaultMsgBoxOptions,
		...options
	} as MsgBoxOptions<T, C>;

	return {
		finalOptions
	};
};

function mountMsgBox<T, C>(options: MsgBoxOptions<T, C>) {
	const cancelEvt = options.onCancel;
	const confirmEvt = options.onConfirm;
	const finalProps = jsonClone(options);
	Reflect.deleteProperty(finalProps, 'target');
	Reflect.deleteProperty(finalProps, 'title');
	Reflect.deleteProperty(finalProps, 'content');
	const MsgBoxInst = new MsgBox({
		target: options.target || document.body,
		props: {
			...finalProps,
			show: false,
			content: options.content,
			title: options.title,
			inputValidator: options.inputValidator,
			onCancel() {
				cancelEvt && cancelEvt();
				durationUnmountMsgBox(MsgBoxInst, 0);
			},
			onConfirm(r: boolean, v: string) {
				confirmEvt && confirmEvt(r, v);
			}
		}
	});

	MsgBoxInst.$set({ show: true });

	return MsgBoxInst;
}

async function durationUnmountMsgBox(inst: MsgBoxComponent, duration: number) {
	setTimeout(() => {
		unmountMsgBox(inst, 300);
	}, duration);
}

async function unmountMsgBox(inst: MsgBoxComponent, duration: number) {
	inst.$set({ show: false });
	setTimeout(() => {
		inst.$destroy();
	}, duration);
}

function MsgBoxFn<T, C>(options: MsgBoxOptions<T, C>) {
	const { finalOptions } = resolveMsgBoxOptions<T, C>(options);
	return mountMsgBox(finalOptions);
}

MsgBoxFn.prompt = <T, C>(options: MsgBoxOptions<T, C> = {}) => {
	options.type = 'prompt';
	const { finalOptions } = resolveMsgBoxOptions<T, C>(options);
	return mountMsgBox(finalOptions);
};

MsgBoxFn.confirm = <T, C>(options: MsgBoxOptions<T, C> = {}) => {
	options.type = 'confirm';
	const { finalOptions } = resolveMsgBoxOptions<T, C>(options);
	return mountMsgBox(finalOptions);
};

MsgBoxFn.alert = <T, C>(options: MsgBoxOptions<T, C> = {}) => {
	options.type = 'alert';
	const { finalOptions } = resolveMsgBoxOptions<T, C>(options);
	return mountMsgBox(finalOptions);
};

export const KMsgBox = MsgBoxFn;
