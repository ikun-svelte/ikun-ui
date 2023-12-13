/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement } from '@ikun-ui/utils';

export interface KTabsNav {
	disabled: boolean;
	label: string;
	uid: string | number;
	closeable: boolean;
}
export type KTabsProps = {
	value: string | number;
	type: 'card' | 'border' | '';
	navOptions: KTabsNav[]
	closeable: boolean;
	editable: boolean;
	position: IKunPlacement;
	beforeLeave: (activeTabValue, oldActiveTabValue) => Promise<boolean>;
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: KTabs props -- value 🤡
// TODO: KTabs props  -- type -- card/border/'
// TODO: KTabs props -- closeable 🤡
// TODO: KTabs props -- editable 🤡
// TODO: KTabs props -- position -- top/right/bottom/left
// TODO: KTabs props -- beforeLeave 🤡
// TODO: KTabs events -- click 🤡
// TODO: KTabs events -- remove 🤡
// TODO: KTabs events -- add 🤡
// TODO: KTabs events -- edit 🤡
// TODO: KTabs slots -- addIcon 🤡
// TODO: KTabs slots -- default 🤡
// TODO: 滚动条（add）
// TODO: class
export type KTabsPaneProps = {
	//disabled: boolean;
	//label: string;
	uid: string | number;
	//closeable: boolean;
	attrs: Record<string, string>;
	cls: ClassValue;
};

// TODO: KTabPane props -- label 🤡
// TODO: KTabPane props -- disabled 🤡(样式，点击、删除)
// TODO: KTabPane props -- uid 与 value 对应 🤡
// TODO: KTabPane props -- closeable 🤡
// TODO: KTabPane slots -- default 🤡
export interface TabHeader extends KTabsNav{
	close?: boolean
}

export interface KTabContext {
	value: KTabsProps['value']
	setTabsNav: (uid: string | number) => void
	registerTabsShowEvt: (
		uid: KTabsProps['value'],
		fn: (v: KTabsProps['value']) => void
	) => void
}
