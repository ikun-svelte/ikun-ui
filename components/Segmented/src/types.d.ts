/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KSegmentedProps = {
	value: string | number;
	size: IKunSize;
	block: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSegmentedItemProps = {
	value: string | number;
	label: string;
	disabled: boolean;
	icon: string;
	onlyIcon: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type SizeChangeFns = Array<(size: KSegmentedProps['size']) => void>;
export type ValueChangeFns = Array<(value: KSegmentedProps['value']) => void>;
export interface KSegmentedContext {
	block: boolean;
	segmentedValue: KSegmentedProps['value'];
	segmentedSize: KSegmentedProps['size'];
	onChange: (value: KSegmentedProps['value']) => void;
	sizeChangeFns: SizeChangeFns;
	valueChangeFns: ValueChangeFns;
}

// TODO: Segmented item slots : default slot 🤡
