import Notification from './index.svelte';
import type { NotifyOptions, NotifyPlacement } from './types';
import { jsonClone } from 'baiwusanyu-utils';
export type { NotifyType, NotifyPlacement, NotifyOptions } from './types';

export declare type NotifyComponent = InstanceType<typeof Notification> & {
	__notify_index: number;
	__notify_placement: NotifyPlacement;
	__notify_evt: Pick<NotifyOptions<undefined, undefined>, 'onClose'>;
};

const ANIMATION_DURATION = 300;
const defaultNotifyOptions: NotifyOptions<undefined, undefined> = {
	placement: 'right-top',
	close: true,
	duration: 3000,
	autoClose: true,
	offset: 0
};

let nid = 0;
const notifyMap = {
	'right-top': [] as NotifyComponent[],
	center: [] as NotifyComponent[],
	'left-bottom': [] as NotifyComponent[],
	'right-bottom': [] as NotifyComponent[],
	'left-top': [] as NotifyComponent[]
} as const;

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

	const NotificationInst = new Notification({
		target: options.target || document.body,
		props: {
			...finalProps,
			attrs: options.attrs,
			title: options.title,
			content: options.content,
			show: false,
			index: notifyArray.length,
			onClose() {
				NotifyFn.clear(NotificationInst);
			}
		}
	}) as unknown as NotifyComponent;
	NotificationInst.__notify_index = nid++;
	NotificationInst.__notify_placement = options.placement!;
	NotificationInst.__notify_evt = evt;

	NotificationInst.$set({ show: true });
	// auto close
	autoUnmountNotify(options, NotificationInst);
	// cache  NotificationInst
	notifyArray.push(NotificationInst);

	return NotificationInst;
}

async function autoUnmountNotify<T, C>(options: NotifyOptions<T, C>, inst: NotifyComponent) {
	if (options.autoClose) {
		await durationUnmountNotify(inst, options.duration || 0);
	}
}

async function durationUnmountNotify(inst: NotifyComponent, duration: number) {
	inst.__notify_durationUnmountTimer = setTimeout(() => {
		NotifyFn.clear(inst);
	}, duration);
}

function unmountNotify(inst: NotifyComponent, duration: number) {
	clearTimeout(inst.__notify_durationUnmountTimer);

	inst.$set({ show: false });
	inst.__notify_evt.onClose && inst.__notify_evt.onClose();

	setTimeout(() => {
		inst.$destroy();
	}, duration);
}

function updatedNotifyByIndex(placement: NotifyPlacement) {
	notifyMap[placement].forEach((inst: NotifyComponent | undefined, index) => {
		inst && inst.$set({ index });
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
	const index = notifyMap[inst.__notify_placement as NotifyPlacement].findIndex(
		(notify) => notify!.__notify_index === inst.__notify_index
	);
	if (index !== -1) {
		notifyMap[inst.__notify_placement as NotifyPlacement].splice(index, 1);
		updatedNotifyByIndex(inst.__notify_placement);

		unmountNotify(inst, ANIMATION_DURATION);
	}
};

NotifyFn.clearAll = () => {
	Object.keys(notifyMap).forEach((instArr) => {
		notifyMap[instArr as NotifyPlacement].forEach((inst: NotifyComponent | undefined) => {
			if (inst) {
				unmountNotify(inst, ANIMATION_DURATION);
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
