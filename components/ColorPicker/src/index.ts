/// <reference types="./types" />
import ColorPicker from './index.svelte';
import ColorPickerPalette from './palette.svelte';
import ColorPickerSlider from './slider.svelte';
import ColorPickerBlock from './block.svelte';
import ColorPickerFormat from './format.svelte';
import ColorPickerPreset from './preset.svelte';
import tinycolor from 'tinycolor2';
import type { ColorInput } from 'tinycolor2';
export { ColorPicker as KColorPicker };
export { ColorPickerPalette as KColorPickerPalette };
export { ColorPickerSlider as KColorPickerSlider };
export { ColorPickerBlock as KColorPickerBlock };
export { ColorPickerFormat as KColorPickerFormat };
export { ColorPickerPreset as KColorPickerPreset };
export default ColorPicker;

export type {
	KColorPickerProps,
	KColorPickerPaletteProps,
	KColorPickerSliderProps,
	KColorPickerBlockProps,
	KColorPickerFormatProps,
	KColorPickerPresetProps
} from './types';

export type Color = ColorInput;
export function toHex(value: Color) {
	return tinycolor(value).toHex();
}

export function toHexString(value: Color) {
	return tinycolor(value).toHexString();
}

export function toHsv(value: Color) {
	return tinycolor(value).toHsv();
}

export function toHsbString(value: Color) {
	return tinycolor(value).toHsvString();
}

export function toRgb(value: Color) {
	return tinycolor(value).toRgb();
}

export function toRgbString(value: Color) {
	return tinycolor(value).toRgbString();
}
