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
	maxHeight?: string | number;
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
