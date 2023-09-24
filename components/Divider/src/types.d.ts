/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KDividerProps = {
	direction: 'horizontal' | 'vertical';
	borderColor: string;
	borderStyle: 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
	contentPosition: 'left' | 'center' | 'right';
	cls: ClassValue;
	attrs: Record<string, string>;
};
