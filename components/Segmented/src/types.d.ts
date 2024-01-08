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
	onChange: (value: KSegmentedProps['value']) => void;
	sizeChangeFns: SizeChangeFns;
	valueChangeFns: ValueChangeFns;
}
// TODO: Segmented props : value  => string | number 🤡
// TODO: Segmented props : size  => 'md' | 'sm'	 | 'lg'(default 'md') 🤡
// TODO: Segmented props : block  => boolean(default: false)

// TODO: Segmented slots : default slot 🤡

// TODO: Segmented events : change  => function(value: string | number) 🤡

// TODO: Segmented item props : value  => string | number 🤡
// TODO: Segmented item props : disabled  => boolean(default: false)
// TODO: Segmented item props : label  => string | number 🤡
// TODO: Segmented item props : icon  => string 🤡
// TODO: Segmented item props : onlyIcon  => boolean 🤡

// TODO: Segmented item slots : default slot 🤡

// TODO: Segmented events : click  => function(value: string | number) 🤡
