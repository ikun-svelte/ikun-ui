/// <reference types="./types" />
import ColorPicker from './index.svelte';
import ColorPickerPalette from './palette.svelte';
export { ColorPicker as KColorPicker };
export { ColorPickerPalette as KColorPickerPalette };
export default ColorPicker;

export type { KColorPickerProps } from './types';
