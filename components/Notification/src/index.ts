import Notification from './index.svelte';
import type { SvelteComponent } from 'svelte';
import type {
	NotifyOptions,
	NotifyComponent,
	NotifyPlacement
} from './types'
export * from './types'


const defaultNotifyOptions: NotifyOptions<SvelteComponent> = {
	placement: 'right-top',
	close: true,
	duration: 3000,
	autoClose: true,
	offset: 0
};

const notifyMap = {
	'right-top': [] as NotifyComponent<SvelteComponent>[],
	center: [] as NotifyComponent<SvelteComponent>[],
	'left-bottom': [] as NotifyComponent<SvelteComponent>[],
	'right-bottom': [] as NotifyComponent<SvelteComponent>[],
	'left-top': [] as NotifyComponent<SvelteComponent>[]
};

const resolveNotifyOptions = (options: NotifyOptions<SvelteComponent>) => {
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

function mountNotify(options: NotifyOptions<SvelteComponent>, evt: Record<string, any>) {
	const notifyArray = notifyMap[options.placement || 'right-top'];
	let index = 0;
	if (!notifyArray) {
		console.error(
			'Notify Component Options Error: ' +
				"placement =  'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center'"
		);
		return;
	}

	index = notifyArray.length;
	const NotificationInst = new Notification({
		target: options.target || document.body,
		props: {
			...options,
			show: false,
			index,
			onClose: async () => {
				await unmountNotify(
					options.placement || 'right-top',
					NotificationInst as unknown as NotifyComponent<SvelteComponent>,
					0
				);
				evt.onClose && evt.onClose();
			}
		}
	});
	NotificationInst.__notify_index = index;
	NotificationInst.__notify_placment = options.placement;

	NotificationInst.$set({ show: true });
	// auto close
	autoUnmountNotify(options, NotificationInst as unknown as NotifyComponent<SvelteComponent>);
	// cache  NotificationInst
	notifyArray.push(NotificationInst as unknown as NotifyComponent<SvelteComponent>);

	return NotificationInst;
}

async function autoUnmountNotify(
	options: NotifyOptions<SvelteComponent>,
	inst: NotifyComponent<SvelteComponent>) {
	if (options.autoClose) {
		await durationUnmountNotify(options.placement || 'right-top', inst, options.duration || 0);
	}
}

async function durationUnmountNotify(
	placement: NotifyPlacement,
	inst: NotifyComponent<SvelteComponent>,
	duration: number
) {
	setTimeout(() => {
		unmountNotify(placement, inst, 300);
	}, duration);
}

async function unmountNotify(placement: NotifyPlacement, inst: NotifyComponent<SvelteComponent>, duration: number) {
	inst.$set({ show: false });
	setTimeout(() => {
		notifyMap[placement].splice(inst.__notify_index, 1);
		updatedNotifyByIndex(placement);
		inst.$destroy();
	}, duration);
}

function updatedNotifyByIndex(placement: NotifyPlacement) {
	notifyMap[placement].forEach((inst: NotifyComponent<SvelteComponent>, index) => {
		inst.$set({ index });
		inst.__notify_index = index;
	});
}

function NotifyFn(options: NotifyOptions<SvelteComponent>) {
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
}

NotifyFn.info = (options: NotifyOptions<SvelteComponent> = {}) => {
	options.type = 'info';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.warning = (options: NotifyOptions<SvelteComponent> = {}) => {
	options.type = 'warning';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.error = (options: NotifyOptions<SvelteComponent> = {}) => {
	options.type = 'error';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.success = (options: NotifyOptions<SvelteComponent> = {}) => {
	options.type = 'success';
	const { finalOptions, evt } = resolveNotifyOptions(options);
	return mountNotify(finalOptions, evt);
};

NotifyFn.clear = async (inst: NotifyComponent<SvelteComponent>) => {
	await unmountNotify(inst.__notify_placment, inst, 300);
};

NotifyFn.clearAll = () => {
	Object.keys(notifyMap).forEach((instArr) => {
		notifyMap[instArr as NotifyPlacement].forEach((inst: NotifyComponent<SvelteComponent>) => {
			unmountNotify(inst.__notify_placment, inst, 0);
		});
	});
};

NotifyFn.update = async (
	inst: NotifyComponent<SvelteComponent>,
	options: NotifyOptions<SvelteComponent> = {}) => {
	inst.$set({ ...options });
};

export const KNotify = NotifyFn;
