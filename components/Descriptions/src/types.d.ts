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

export type KDescriptionsMapItem = {
	setBorder: (v: KDescriptionsProps['border']) => void;
	setColumn: (v: KDescriptionsProps['column']) => void;
	setDirection: (v: KDescriptionsProps['direction']) => void;
	setSize: (v: KDescriptionsProps['size']) => void;
};

export type KDescriptionsItemMap = Map<string, KDescriptionsMapItem>;

export type KDescriptionsCtx = {
	registerDescriptionsItem: (uid: symbol, op: KDescriptionsMapItem) => void;
	descriptionsItemMap: KDescriptionsItemMap;
	border: KDescriptionsProps['border'];
	column: KDescriptionsProps['column'];
	direction: KDescriptionsProps['direction'];
	size: KDescriptionsProps['size'];
};
