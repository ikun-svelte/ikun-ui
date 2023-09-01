/// <reference types="svelte" />
import { type IKunTypePro } from '@ikun-ui/utils';

export type KProgressProps = {
	percentage: number;
	status: IKunTypePro;
	type: 'line' | 'circle' | 'dashboard';
	color: string;
	showText: boolean;
	textInside: boolean;
	format: string | number;
	strokeWidth: number;
	width: number;
	duration: number;
	cls: string;
	attrs: Record<string, string>;
};
