import MsgBox from './index.svelte';
import type { SvelteComponent } from 'svelte';
import type { MsgBoxOptions, MsgBoxComponent } from "./types";

export * from './types';

const defaultMsgBoxOptions: MsgBoxOptions<SvelteComponent> = {
  confirmBtnText: 'confirm',
  cancelBtnText: 'cancel'
};


const resolveMsgBoxOptions = (options: MsgBoxOptions<SvelteComponent>) => {

  const finalOptions = {
    ...defaultMsgBoxOptions,
    ...options
  };

  return {
    finalOptions,
  };
};

function mountMsgBox(options: MsgBoxOptions<SvelteComponent>) {
  console.log(options)
  const MsgBoxInst = new MsgBox({
    target: options.target || document.body,
    props: {
      ...options,
      show: false
    }
  });

  MsgBoxInst.$set({ show: true });

  return MsgBoxInst;
}


async function durationUnmountMsgBox(
  inst: MsgBoxComponent<SvelteComponent>,
  duration: number
) {
  setTimeout(() => {
    unmountMsgBox( inst, 300);
  }, duration);
}

async function unmountMsgBox(
  inst: MsgBoxComponent<SvelteComponent>,
  duration: number
) {
  inst.$set({ show: false });
  setTimeout(() => {
    inst.$destroy();
  }, duration);
}



function MsgBoxFn(options: MsgBoxOptions<SvelteComponent>) {
  const { finalOptions } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions);
}

MsgBoxFn.prompt = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'prompt';
  const { finalOptions } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions);
};

MsgBoxFn.confirm = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'confirm';
  const { finalOptions } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions);
};

MsgBoxFn.alert = (options: MsgBoxOptions<SvelteComponent> = {}) => {
  options.type = 'alert';
  const { finalOptions } = resolveMsgBoxOptions(options);
  return mountMsgBox(finalOptions);
};

export const KMsgBox = MsgBoxFn;
