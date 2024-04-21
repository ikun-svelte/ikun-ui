/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';

export type KTooltipProps = {
	placement: IKunPlacement;
	trigger: IKunTrigger;
	content: string;
	disabled: boolean;
	mouseEnterDelay: number;
	mouseLeaveDelay: number;
	cls: ClassValue;
	attrs: Record<string, string>;
};
