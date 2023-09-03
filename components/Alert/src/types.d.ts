/// <reference types="svelte" />
import type { IKunTypeBase } from '@ikun-ui/utils';
import type { ClassValue } from 'clsx'

export type KAlertProps = {
	type: IKunTypeBase;
	title: string;
	description: string;
	showIcon: boolean;
	icon: string;
	closable: boolean;
	closeIcon: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
