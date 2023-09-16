import Notification from './index.svelte';
import type { NotifyOptions, NotifyPlacement } from './types';
import { jsonClone } from 'baiwusanyu-utils';
export * from './types';

export declare type NotifyComponent = InstanceType<typeof Notification>;

const ANIMATION_DURATION = 300;
const defaultNotifyOptions: NotifyOptions<undefined, undefined> = {
	placement: 'right-top',
	close: true,
	duration: 3000,
	autoClose: true,
	offset: 0
};

const notifyMap = {
	'right-top': [] as ReturnType<typeof NotifyFn>[],
	center: [] as ReturnType<typeof NotifyFn>[],
	'left-bottom': [] as ReturnType<typeof NotifyFn>[],
	'right-bottom': [] as ReturnType<typeof NotifyFn>[],
	'left-top': [] as ReturnType<typeof NotifyFn>[]
};

const resolveNotifyOptions = <T, C>(options: NotifyOptions<T, C>) => {
	const evt = {
		onClose: options.onClose
	};

	const finalOptions = {
		...defaultNotifyOptions,
		...options
	};

	Reflect.deleteProperty(finalOptions, 'onClose');

	return {
		finalOptions,
		evt
	};
};

function mountNotify<T, C>(options: NotifyOptions<T, C>, evt: Record<string, any>) {
	const notifyArray = notifyMap[options.placement || 'right-top'];
	let index = 0;
	if (!notifyArray) {
		console.error(
			'Notify Component Options Error: ' +
				"placement =  'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center'"
		);
		return;
	}

	const finalProps = jsonClone(options);
	Reflect.deleteProperty(finalProps, 'duration');
	Reflect.deleteProperty(finalProps, 'autoClose');
	Reflect.deleteProperty(finalProps, 'target');

	index = notifyArray.length;
	const NotificationInst = new Notification({
		target: options.target || document.body,
		props: {
			...finalProps,
			attrs: options.attrs,
			title: options.title,
			content: options.content,
			show: false,
			index,
			onClose() {
				unmountNotify(options.placement || 'right-top', NotificationInst, ANIMATION_DURATION);
				evt.onClose && evt.onClose();
			}
		}
	});
	NotificationInst.__notify_index = index;
	NotificationInst.__notify_placment = options.placement;

	NotificationInst.$set({ show: true });
	// auto close
	autoUnmountNotify(options, NotificationInst);
	// cache  NotificationInst
	notifyArray.push(NotificationInst);

	return NotificationInst;
}

async function autoUnmountNotify<T, C>(options: NotifyOptions<T, C>, inst: NotifyComponent) {
	if (options.autoClose) {
		await durationUnmountNotify(options.placement || 'right-top', inst, options.duration || 0);
	}
}

async function durationUnmountNotify(
	placement: NotifyPlacement,
	inst: NotifyComponent,
	duration: number
) {
	setTimeout(() => {
		unmountNotify(placement, inst, ANIMATION_DURATION);
	}, duration);
}

function unmountNotify(placement: NotifyPlacement, inst: NotifyComponent, duration: number) {
	inst.$set({ show: false });
	notifyMap[placement].splice(inst.__notify_index, 1);
	updatedNotifyByIndex(placement);
	setTimeout(() => {
		inst.$destroy();
	}, duration);
}

function updatedNotifyByIndex(placement: NotifyPlacement) {
	notifyMap[placement].forEach((inst: NotifyComponent | undefined, index) => {
		inst && inst.$set({ index });
		inst && (inst.__notify_index = index);
	});
}

function NotifyFn<T, C>(options: NotifyOptions<T, C>) {
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
}

NotifyFn.info = <T, C>(options: NotifyOptions<T, C> = {}) => {
	options.type = 'info';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.warning = <T, C>(options: NotifyOptions<T, C> = {}) => {
	options.type = 'warning';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.error = <T, C>(options: NotifyOptions<T, C> = {}) => {
	options.type = 'error';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.success = <T, C>(options: NotifyOptions<T, C> = {}) => {
	options.type = 'success';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.clear = (inst: NotifyComponent) => {
	unmountNotify(inst.__notify_placment, inst, ANIMATION_DURATION);
};

NotifyFn.clearAll = () => {
	Object.keys(notifyMap).forEach((instArr) => {
		notifyMap[instArr as NotifyPlacement].forEach((inst: NotifyComponent | undefined) => {
			if (inst) {
				inst.$set({ show: false });
				setTimeout(() => {
					inst.$destroy();
				}, ANIMATION_DURATION);
			}
		});
		// array clear
		notifyMap[instArr as NotifyPlacement].length = 0;
	});
};

NotifyFn.update = async <T, C>(inst: NotifyComponent, options: NotifyOptions<T, C> = {}) => {
	inst.$set({ ...options });
};

export const KNotify = NotifyFn;
