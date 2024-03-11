/// <reference types="./types" />
import ColorPicker from './index.svelte';
import ColorPickerPalette from './palette.svelte';
import ColorPickerSlider from './slider.svelte';
export { ColorPicker as KColorPicker };
export { ColorPickerPalette as KColorPickerPalette };
export { ColorPickerSlider as KColorPickerSlider };
export default ColorPicker;

export type { KColorPickerProps } from './types';
