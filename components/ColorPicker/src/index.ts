/// <reference types="./types" />
import ColorPicker from './index.svelte';
import ColorPickerPalette from './palette.svelte';
import ColorPickerSlider from './slider.svelte';
import ColorPickerBlock from './block.svelte';
import ColorPickerFormat from './format.svelte';
import ColorPickerPreset from './preset.svelte';
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
