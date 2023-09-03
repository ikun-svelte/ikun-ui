/// <reference types="svelte" />
import { type IKunTypePro } from '@ikun-ui/utils';
import type { ClassValue } from 'clsx'

export type KProgressProps = {
	percentage: number;
	status: IKunTypePro;
	type: 'line' | 'circle' | 'dashboard';
	color: string;
	showText: boolean;
	textInside: boolean;
	format: ((v: number) => string) | null;
	strokeWidth: number;
	width: number;
	duration: number;
	cls: ClassValue;
	attrs: Record<string, string>;
};
