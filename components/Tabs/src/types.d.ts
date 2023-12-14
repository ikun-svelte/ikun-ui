/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement } from '@ikun-ui/utils';

export interface KTabsNavItem {
	disabled?: boolean;
	label: string;
	uid: string | number;
	closeable?: boolean;
}
export type KTabsProps = {
	value: string | number;
	type: 'card' | 'border' | '';
	navOptions: KTabsNavItem[];
	closeable: boolean;
	editable: boolean;
	position: IKunPlacement;
	beforeLeave: (activeTabValue, oldActiveTabValue) => Promise<boolean>;
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: KTabs props -- value 🤡
// TODO: KTabs props  -- type -- card🤡/border🤡/'
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
export interface KTabsNav extends KTabsNavItem {}
export type TabsShowEvt = (v: KTabsProps['value']) => void;
export interface KTabContext {
	value: KTabsProps['value'];
	setTabsNav: (uid: string | number) => void;
	registerTabsShowEvt: (uid: KTabsProps['value'], fn: TabsShowEvt) => void;
}
