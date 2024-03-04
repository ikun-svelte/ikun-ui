/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunTypePro } from '@ikun-ui/utils';

export type KTagProps = {
	type: IKunTypePro;
	bgColor: string;
	textColor: string;
	icon: string;
	border: boolean;
	closable: boolean;
	closeIcon: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
