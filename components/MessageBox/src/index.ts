import Msg from './index.svelte';
import type { SvelteComponent } from 'svelte';
import type { MsgBoxOptions } from "./types";

export * from './types';

const defaultMsgBoxOptions: MsgBoxOptions<SvelteComponent> = {
  placement: 'right-top',
  close: true,
  duration: 3000,
  autoClose: true,
  offset: 0
};


const resolveMsgBoxOptions = (options: MsgBoxOptions<SvelteComponent>) => {
  const evt = {
    onClose: options.onClose
  };

  const finalOptions = {
    ...defaultMsgBoxOptions,
    ...options
  };

  Reflect.deleteProperty(finalOptions, 'onClose');

  return {
    finalOptions,
    evt
  };
};

function mountMsgBox(options: MsgBoxOptions<SvelteComponent>, evt: Record<string, any>) {
  const NotificationInst = new Notification({
    target: options.target || document.body,
    props: {
      ...options,
      show: false,
      onClose: async () => {
        await unmountMsgBox(
          options.placement || 'right-top',
          NotificationInst as unknown as MsgBoxComponent<SvelteComponent>,
          0
        );
        evt.onClose && evt.onClose();
      }
    }
  });

  NotificationInst.$set({ show: true });

  return NotificationInst;
}


async function durationUnmountMsgBox(
  placement: MsgBoxPlacement,
  inst: MsgBoxComponent<SvelteComponent>,
  duration: number
) {
  setTimeout(() => {
    unmountMsgBox(placement, inst, 300);
  }, duration);
}

async function unmountMsgBox(
  placement: MsgBoxPlacement,
  inst: MsgBoxComponent<SvelteComponent>,
  duration: number
) {
  inst.$set({ show: false });
  setTimeout(() => {
    inst.$destroy();
  }, duration);
}



function MsgBoxFn(options: MsgBoxOptions<SvelteComponent>) {
  const { finalOptions, evt } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions, evt);
}

MsgBoxFn.prompt = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'info';
  const { finalOptions, evt } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions, evt);
};

MsgBoxFn.warning = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'warning';
  const { finalOptions, evt } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions, evt);
};

MsgBoxFn.confirm = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'error';
  const { finalOptions, evt } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions, evt);
};

MsgBoxFn.alert = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'success';
  const { finalOptions, evt } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions, evt);
};

export const KMsgBox = MsgBoxFn;
