/// <reference types="svelte" />
import type { ClassValue } from 'clsx/clsx';
import type { IKunTypePro } from '@ikun-ui/utils';
export type KLinkProps = {
	cls: ClassValue;
	disabled: boolean;
	underline: boolean;
	href: string;
	icon: string;
	type: IKunTypePro | 'default';
	attrs: Record<string, string>;
};
