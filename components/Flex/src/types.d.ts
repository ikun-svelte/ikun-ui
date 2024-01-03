/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';
export type KFlexProps = {
	vertical: boolean;
	wrap: 'wrap' | 'nowrap' | 'wrap-reverse';
	justify: 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
	align: 'center' | 'start' | 'end' | 'baseline' | 'normal' | 'stretch';
	flex: string | undefined;
	gap: IKunSize | number | undefined;
	elm: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
