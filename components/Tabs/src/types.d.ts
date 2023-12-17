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

// TODO: KTabs props -- position -- top/right/bottom/left

// TODO: KTabs dark mode
// TODO: KTabs Api addTab
export type KTabsPaneProps = {
	uid: string | number;
	attrs: Record<string, string>;
	cls: ClassValue;
};

export interface KTabsNav extends KTabsNavItem {}
export type TabsShowEvt = (v: KTabsProps['value']) => void;
export interface KTabContext {
	value: KTabsProps['value'];
	setTabsNav: (uid: string | number) => void;
	registerTabsShowEvt: (uid: KTabsProps['value'], fn: TabsShowEvt) => void;
}
