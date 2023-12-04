/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';
export type KDropdownProps = {
	placement: IKunPlacement;
	trigger: IKunTrigger;
	tabindex: number;
	role: string;
	disabled: boolean;
	hideOnClick: boolean;
	cls: ClassValue;
	maxHeight: string | number;
	attrs: Record<string, string>;
};

export type KDropdownItemProps = {
	command: string | number | Record<any, any>;
	divider: boolean;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface KDropdownCtx {
	disabledEvt: Array<(isDisabled: boolean) => void>;
	commandEvt: (value: KDropdownItemProps['command']) => void;
}

// TODO: Dropdown props disabled ✅ 🤡
// TODO: Dropdown props placement ✅
// TODO: Dropdown props trigger ✅
// TODO: Dropdown props role ✅
// TODO: Dropdown props tabindex ✅
// TODO: Dropdown props hideOnClick ✅ 🤡
// TODO: Dropdown props max-height ✅ 🤡

// TODO: Dropdown events change ✅ 🤡
// TODO: Dropdown events command ✅ 🤡

// TODO: Dropdown Api handleOpen ✅ 🤡
// TODO: Dropdown Api handleOpen ✅ 🤡

// TODO: Dropdown slots default ✅
// TODO: Dropdown slots dropdown --> Dropdown Item ✅

// TODO: Dropdown-Item props command ✅ 🤡
// TODO: Dropdown-Item props disabled ✅ 🤡
// TODO: Dropdown-Item props divider ✅ 🤡
