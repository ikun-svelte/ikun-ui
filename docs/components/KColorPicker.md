---
title: KColorPicker
lang: en-US
---

# KColorPicker

Components providing color selection.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/color-picker
```

```bash [yarn]
yarn add @ikun-ui/color-picker
```

```bash [npm]
npm install @ikun-ui/color-picker
```

:::

## Basic usage

Basic Usage.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Sizes

Add size attribute to change the size of ColorPicker. It supports `sm`, `md` and `lg`.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## External Control

Control opening and closing through `handleOpen` and `handleOpen`

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Rendering Trigger Text

Renders the default text of the trigger, effective when `showText` is `true`. When customizing text, you can use `showText` as a function to return custom text.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Disabled

Disabled ColorPicker

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Disabled Alpha

Disabled color alpha.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Clear

Clear Color

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Custom Trigger

Triggers for customizing color panels.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Color Format

Encoding formats, support `HEX`, `HSV`, `RGB`.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Preset Colors

Set the presets color of the color picker.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## Customizing Preset Colors

Set the presets color of the color picker by preset slot.

<demo src="color-picker/basic.svelte"  github='ColorPicker'></demo>

## ColorPicker Props

| Name          | Type                                     | Default | Description                                                               |
| ------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------- |
| value         | `string \| RgbaColor \| HsvaColor`       | `-`     | color value.                                                              |
| defaultValue  | `string \| RgbaColor \| HsvaColor`       | `-`     | The default color panel value, which determines the initial linear color. |
| format        | `'rgb' \| 'hsv' \| 'hex'`                | `'hex'` | Format of color.                                                          |
| allowClear    | `boolean`                                | `false` | Allow clearing color selected.                                            |
| disabled      | `boolean`                                | `false` | Disable ColorPicker.                                                      |
| disabledAlpha | `boolean`                                | `false` | Disable Alpha.                                                            |
| showText      | `boolean`                                | `true`  | Whether to display color values.                                          |
| placement     | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'` | Placement of popup.                                                       |
| title         | `string`                                 | `''`    | Title of ColorPicker.                                                     |
| trigger       | `'manual' \| 'click' \| 'hover'`         | `click` | How `ColorPicker` are triggered                                           |
| size          | `'sm' \| 'md' \| 'lg'`                   | `md`    | Size of ColorPicker.                                                      |
| presets       | `KColorPickerPreset`                     | `-`     | Preset colors.                                                            |
| cls           | `string`                                 | `''`    | Additional class for component                                            |
| attrs         | `any`                                    | `{}`    | Additional attributes                                                     |

```typescript
export interface KColorPickerPreset {
	defaultOpen?: boolean;
	label: string;
	colors: string[] | RgbaColor[] | HsvaColor[];
}
```

```typescript
export interface RgbaColor {
	r: number;
	g: number;
	b: number;
	a?: number;
}
```

```typescript
export interface HsvaColor {
	h: number;
	s: number;
	v: number;
	a?: number;
}
```

## ColorPicker Api

| Name        | Description         | Type        |
| ----------- | ------------------- | ----------- |
| handleOpen  | Open the dropdown.  | `()=> void` |
| handleClose | Close the dropdown. | `()=> void` |

## ColorPicker Events

| Name           | Description                        | Type                                       |
| -------------- | ---------------------------------- | ------------------------------------------ |
| change         | Callback when `value` is changed.  | `(color: string)=> void`                   |
| changeComplete | Called when color pick ends.       | `(color: string)=> void`                   |
| openChange     | Callback when `format` is changed. | `(format: 'rgb' \| 'hsv' \| 'hex')=> void` |
| openChange     | Callback when open is changed.     | `(open: boolean) => void`                  |
| clear          | Called when clear.                 | `()=> void`                                |

## ColorPicker Slots

| Name    | Description                |
| ------- | -------------------------- |
| default | Custom trigger element.    |
| title   | content of the title.      |
| text    | content of the color text. |
| preset  | content of the preset.     |

## Color Api

::: tip
It is based on [tinycolor2 <span class="i-carbon-link text-12px" />](https://bgrins.github.io/TinyColor), the `ColorInput` type comes from `tinycolor2`
:::

| Name        | Description                                                                    | type                                               |
| ----------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| toHex       | Convert to hex format characters, the return type like: 1677ff .               | `toHex(value: Color): string`                      |
| toHexString | onvert to hex format color string, the return type like: #1677ff.              | `toHexString(value: Color): string`                |
| toHsv       | Convert to hsv object.                                                         | `toHsv(value: Color): tinycolor.ColorFormats.HSVA` |
| toHsvString | Convert to hsb format color string, the return type like: hvb(215, 91%, 100%). | `toHsvString(value: Color): string`                |
| toRgb       | Convert to rgb object.                                                         | `toRgb(value: Color): tinycolor.ColorFormats.RGBA` |
| toRgbString | Convert to rgb format color string, the return type like: rgb(22, 119, 255).   | `toRgbString(value: Color): string`                |
