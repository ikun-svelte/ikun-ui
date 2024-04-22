/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';

export type KPopoverProps = {
	defaultOpen?: boolean;
	placement: IKunPlacement;
	trigger: IKunTrigger;
	disabled: boolean;
	arrow: boolean;
	cls: ClassValue;
	clsTrigger: ClassValue;
	mouseEnterDelay: number;
	mouseLeaveDelay: number;
	width: string | null | undefined;
	attrs: Record<string, string>;
};
