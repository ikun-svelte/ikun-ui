import MsgBox from './index.svelte';
import type { MsgBoxOptions, MsgBoxComponent } from './types';

export * from './types';

const defaultMsgBoxOptions: MsgBoxOptions<undefined> = {
	confirmBtnText: 'confirm',
	cancelBtnText: 'cancel'
};

const resolveMsgBoxOptions = <T>(options: MsgBoxOptions<T>) => {
	const finalOptions = {
		...defaultMsgBoxOptions,
		...options
	} as MsgBoxOptions<T>;

	return {
		finalOptions
	};
};

function mountMsgBox<T>(options: MsgBoxOptions<T>) {
	const cancelEvt = options.onCancel;

	const MsgBoxInst = new MsgBox({
		target: options.target || document.body,
		props: {
			...options,
			show: false,
			onCancel() {
				cancelEvt && cancelEvt();
				durationUnmountMsgBox(MsgBoxInst, 0);
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

function MsgBoxFn<T>(options: MsgBoxOptions<T>) {
	const { finalOptions } = resolveMsgBoxOptions<T>(options);
	return mountMsgBox(finalOptions);
}

MsgBoxFn.prompt = <T>(options: MsgBoxOptions<T> = {}) => {
	options.type = 'prompt';
	const { finalOptions } = resolveMsgBoxOptions<T>(options);
	return mountMsgBox(finalOptions);
};

MsgBoxFn.confirm = <T>(options: MsgBoxOptions<T> = {}) => {
	options.type = 'confirm';
	const { finalOptions } = resolveMsgBoxOptions<T>(options);
	return mountMsgBox(finalOptions);
};

MsgBoxFn.alert = <T>(options: MsgBoxOptions<T> = {}) => {
	options.type = 'alert';
	const { finalOptions } = resolveMsgBoxOptions<T>(options);
	return mountMsgBox(finalOptions);
};

export const KMsgBox = MsgBoxFn;
