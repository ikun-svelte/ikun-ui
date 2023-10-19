/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';

export type KPopoverProps = {
	placement: IKunPlacement;
	trigger: IKunTrigger;
	disabled: boolean;
	cls: ClassValue;
	clsTrigger: ClassValue;
	width: string | null | undefined;
	attrs: Record<string, string>;
};
