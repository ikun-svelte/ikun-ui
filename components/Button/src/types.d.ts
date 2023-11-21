/// <reference types="svelte" />
import type { IKunTypePro } from '@ikun-ui/utils';
import type { ClassValue } from 'clsx';
import { IKunSize } from "@ikun-ui/utils";

export type KButtonProps = {
	type: IKunTypePro | 'main';
	size: IKunSize;
	icon: string;
	iconSize: number | null;
	to: HTMLAnchorElement['href'];
	round: string | number;
	circle: boolean;
	plain: boolean;
	ghost: boolean;
	isBorder: boolean;
	disabled: boolean;
	hiddenSlot: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KButtonGroupPropsInner = Partial<
	Pick<KButtonProps, 'type' | 'size' | 'iconSize' | 'isBorder' | 'disabled'>
>;
