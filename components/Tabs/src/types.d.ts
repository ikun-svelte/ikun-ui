/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement } from '@ikun-ui/utils';
export type KTabsProps = {
	value: string | number;
	type: 'card' | 'border' | '';
	closeable: boolean;
	editable: boolean;
	position: IKunPlacement;
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: KTabs props -- value 🤡
// TODO: KTabs props  -- type -- card/border/'
// TODO: KTabs props -- closeable 🤡
// TODO: KTabs props -- editable 🤡
// TODO: KTabs props -- position -- top/right/bottom/left
// TODO: KTabs props -- beforeLeave 🎯
// TODO: KTabs events -- click 🤡
// TODO: KTabs events -- remove 🤡
// TODO: KTabs events -- add 🤡
// TODO: KTabs events -- edit 🤡
// TODO: KTabs slots -- addIcon 🤡
// TODO: KTabs slots -- default 🤡

export type KTabsPaneProps = {
	disabled: boolean;
	label: string;
	uid: string | number;
	closeable: boolean;
	attrs: Record<string, string>;
	cls: ClassValue;
};

// TODO: KTabPane props -- label 🤡
// TODO: KTabPane props -- disabled
// TODO: KTabPane props -- uid 与 value 对应 🤡
// TODO: KTabPane props -- closeable
// TODO: KTabPane slots -- default 🤡

export interface TabHeader {
	uid: string | number;
	label: string;
	close: boolean
}
