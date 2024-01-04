---
title: KFlex
lang: en-US
---

# KFlex

flex layout component

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/flex
```

```bash [yarn]
yarn add @ikun-ui/flex
```

```bash [npm]
npm install @ikun-ui/flex
```

:::

## Basic usage

The basic usage.

<demo src="flex/basic.svelte"  github='Flex'></demo>

## Justify and align

Supports adjusting justify and align,
the values should conform to the [justify <span class="i-carbon-link text-12px" />](https://www.tailwindcss.cn/docs/justify-content)
and [align <span class="i-carbon-link text-12px" />](https://www.tailwindcss.cn/docs/align-items) values of tailwindcss

<demo src="flex/justify-align.svelte" github='Flex'></demo>

## Gap

The gap attribute can jump the gap and supports `sm`, `md`, `lg` and custom numbers.

<demo src="flex/gap.svelte" github='Flex'></demo>

## Flex Props

| Name     | Type                                                                                                  | Default                                                           | Description                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| vertical | `boolean`                                                                                             | `false`                                                           | Is direction of the flex vertical.                                          |
| wrap     | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                | `'normal'`                                                        | Set whether the element is displayed in a single line or in multiple lines. |
| justify  | `'normal' \| 'start'\| 'end'\| 'center'\| 'between'\| 'around' \| 'evenly' \| 'stretch'` | `'normal'` | Sets the alignment of elements in the direction of the main axis. |
| align    | `'center' \| 'start' \| 'end' \| 'baseline' \| 'normal' \| 'stretch'`                                 | `'normal'`                                                        | Sets the alignment of elements in the direction of the cross axis.          |
| flex     | `string`                                                                                              | `-`                                                               | Flex CSS shorthand properties.                                              |
| gap      | `'sm' \| 'md' \| 'lg' \| number`                                                                      | `-`                                                               | Sets the gap between grids.                                                 |
| elm      | `string`                                                                                              | `div`                                                             | Custom element type.                                                        |
| cls      | `string`                                                                                              | `''`                                                              | Additional class for component                                              |
| attrs    | `any`                                                                                                 | `{}`                                                              | Additional attributes                                                       |

## Flex Slots

| Name    | Description                    |
| ------- | ------------------------------ |
| default | content of the flex component. |
