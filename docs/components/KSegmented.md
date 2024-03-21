---
title: KSegmented
lang: en-US
---

# KSegmented

When displaying multiple options and user can select a single option.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/segmented
```

```bash [yarn]
yarn add @ikun-ui/segmented
```

```bash [npm]
npm install @ikun-ui/segmented
```

:::

## Basic usage

The most basic usage.

<demo src="segmented/basic.svelte"  github='Segmented'></demo>

## Block segmented

`block` property will make the Segmented fit to its parent width.

<demo src="segmented/block.svelte"  github='Segmented'></demo>

## Disabled

Disabled Segmented.

<demo src="segmented/disabled.svelte"  github='Segmented'></demo>

## Custom render

Custom each Segmented Item by slot.

<demo src="segmented/custom.svelte"  github='Segmented'></demo>

## Sizes

There are three sizes of an Segmented

<demo src="segmented/size.svelte"  github='Segmented'></demo>

## Icon

Set `icon` for Segmented Item.

<demo src="segmented/icon.svelte"  github='Segmented'></demo>

## Just Only icon

Set `icon` without `label` for Segmented Item.

<demo src="segmented/only.svelte"  github='Segmented'></demo>

## Segmented Props

| Name  | Type                     | Default | Description                                |
| ----- | ------------------------ | ------- | ------------------------------------------ |
| value | `string \| number`       | `''`    | Selected value.                            |
| size  | `sm \| md \| lg`         | `md`    | Size of segmented                          |
| block | `boolean`                | `false` | Option to fit width to its parent's width. |
| cls   | `string`                 | `''`    | Additional class for component             |
| attrs | `Record<string, string>` | `{}`    | Additional attributes                      |

## Segmented Events

| Name   | Description                                                     | Type                               |
| ------ | --------------------------------------------------------------- | ---------------------------------- |
| change | The callback function that is triggered when the state changes. | `(value: string \| number)=> void` |

## Segmented Slots

| Name    | Description                    |
| ------- | ------------------------------ |
| default | content of segmented component |

## SegmentedItem Props

| Name     | Type                     | Default | Description                                                                                                     |
| -------- | ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| value    | `string \| number`       | `-`     | The callback value of `SegmentedItem`. Clicking on `SegmentedItem` will be passed to the event as a parameter.. |
| disabled | `boolean`                | `false` | Whether the `SegmentedItem` is disabled.                                                                        |
| label    | `string`                 | `-`     | Display value of `SegmentedItem`.                                                                               |
| icon     | `string`                 | `-`     | The front icon of `SegmentedItem`, which should comply with unocss standard.                                    |
| onlyIcon | `boolean`                | `false` | Show only icons.                                                                                                |
| cls      | `string`                 | `''`    | Additional class for component                                                                                  |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes                                                                                           |

## SegmentedItem Events

| Name  | Description                                                       | Type                               |
| ----- | ----------------------------------------------------------------- | ---------------------------------- |
| click | The callback function that is triggered when click segmentedItem. | `(value: string \| number)=> void` |

## SegmentedItem Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| default | content of segmentedItem component |
