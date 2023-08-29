/// <reference types="svelte" />
import type { IKunTypePro } from '@ikun-ui/utils';

export type KButtonProps = {
	type: IKunTypePro;
	size: 'sm' | 'md' | 'lg';
	icon: string;
	iconSize: number | null;
	to: HTMLAnchorElement['href'];
	round: string | number;
	circle: boolean;
	isBorder: boolean;
	disabled: boolean;
	cls: string;
	attrs: Record<string, string>;
};

export type KButtonGroupPropsInner = Partial<
	Pick<KButtonProps, 'type' | 'size' | 'iconSize' | 'isBorder' | 'disabled'>
>;
