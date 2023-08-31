/// <reference types="svelte" />
import type { IKunTypeBase } from '@ikun-ui/utils';

export type KAlertProps = {
	type: IKunTypeBase;
	title: string;
	description: string;
	showIcon: boolean;
	icon: string;
	closable: boolean;
	closeIcon: string;
	cls: string;
	attrs: Record<string, string>;
};
