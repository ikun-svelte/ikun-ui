/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

type Align = 'left' | 'center' | 'right';

export type KDescriptionsItemProps = {
	label: string;
	span: string;
	align: Align;
	labelAlign: Align;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KDescriptionsCtx = {
	border: boolean;
	direction: 'horizontal' | 'vertical';
	size: IKunSize;
};
