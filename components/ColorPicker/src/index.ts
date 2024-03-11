/// <reference types="./types" />
import ColorPicker from './index.svelte';
import ColorPickerPalette from './palette.svelte';
import ColorPickerSlider from './slider.svelte';
import ColorPickerBlock from './block.svelte';
export { ColorPicker as KColorPicker };
export { ColorPickerPalette as KColorPickerPalette };
export { ColorPickerSlider as KColorPickerSlider };
export { ColorPickerBlock as KColorPickerBlock };
export default ColorPicker;

export type {
	KColorPickerProps,
	KColorPickerPaletteProps,
	KColorPickerSliderProps,
	KColorPickerBlockProps
} from './types';
