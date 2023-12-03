/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export interface KWatermarkFont {
	color: string;
	fontSize: number;
	fontWeight: 'normal' | 'light' | 'weight' | number;
	fontFamily: string;
	fontStyle: 'none' | 'normal' | 'italic' | 'oblique';
	textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
	textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}

export type KWatermarkProps = {
	width: number;
	height: number;
	rotate: number;
	zIndex: number;
	image: string;
	content: string;
	font: KWatermarkFont;
	gap: [number, number];
	offset: [number, number];
	cls: ClassValue;
	attrs: Record<string, string>;
};
