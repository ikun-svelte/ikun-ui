/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KDescriptionsProps = {
	title: string;
	extra: string;
	border: boolean;
	column: number;
	direction: 'horizontal' | 'vertical';
	size: IKunSize;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type DescriptionsItemLabelMap = Record<string, HTMLElement>;
export type DescriptionsItemColGroup = number[][];

export type KDescriptionsCtx = {
	column: KDescriptionsProps['column'];
	border: KDescriptionsProps['border'];
	direction: KDescriptionsProps['direction'];
	size: KDescriptionsProps['size'];
	colLabelRefs: DescriptionsItemLabelMap;
	colGroup: DescriptionsItemColGroup;
};
