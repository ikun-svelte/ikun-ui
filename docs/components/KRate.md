---
title: KRate
lang: en-US
---

# KRate

Used for rating.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/rate
```

```bash [yarn]
yarn add @ikun-ui/rate
```

```bash [npm]
npm install @ikun-ui/rate
```

:::

## Basic usage

Use `colors` prop to set color for different level.

<demo src="../../../../example/rate/basic.svelte"  github='Rate'></demo>

## With allowHalf

Add attribute `allowHalf` Half star allowed.

<demo src="../../../../example/rate/allow-half.svelte"  github='Rate'></demo>

## With text

Using text to indicate rating score.

Add attribute `showText` to display text at the right of Rate. You can assign `texts` for different scores using texts.

<demo src="../../../../example/rate/with-text.svelte" github='Rate'></demo>

## Clearable

You can reset the value to `0` when you click at the same value again.

<demo src="../../../../example/rate/clearable.svelte" github='Rate'></demo>

## More icons

You can use different icons to distinguish different rate components.

You can customize `icons` by passing icons.

<demo src="../../../../example/rate/more-icon.svelte" github='Rate'></demo>

## Readonly

Readonly Rate is for displaying rating score.

<demo src="../../../../example/rate/readonly.svelte" github='Rate'></demo>

## Rate Props

| Name             | Type                                | Default                   | Description                                                                                     |
| ---------------- | ----------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| max              | `number`                            | `5`                       | max rating score.                                                                               |
| value            | `number`                            | `0`                       | rate value.                                                                                     |
| allowHalf        | `boolean`                           | `false`                   | whether picking half start is allowed.                                                          |
| showScore        | `boolean`                           | `false`                   | whether to display current score. `showScore` and `showText` cannot be `true` at the same time. |
| scoreTemplate    | `string`                            | `'{value}'`               | score template.                                                                                 |
| showText         | `boolean`                           | `false`                   | whether to display texts.                                                                       |
| texts            | `string` / `Record<number, string>` | `''`                      | text or text map.                                                                               |
| textColor        | `string`                            | `'var(--ikun-zinc-500)'`  | color of texts.                                                                                 |
| icons            | `string` / `Record<number, string>` | `'i-carbon-star-filled'`  | icon or icons map.                                                                              |
| colors           | `string` / `Record<number, string>` | `'var(--ikun-amber-500)'` | color or colors map.                                                                            |
| voidIcon         | `string`                            | `'i-carbon-star`          | void icon.                                                                                      |
| voidColor        | `string`                            | `'var(--ikun-stone-300)'` | void icon color.                                                                                |
| disabled         | `boolean`                           | `false`                   | whether rate is readonly.                                                                       |
| disableVoidIcon  | `string`                            | `'i-carbon-star-filled'`  | disabled void icon.                                                                             |
| disableVoidColor | `string`                            | `'var(--ikun-light-700)'` | disabled void icon color.                                                                       |
| clearable        | `boolean`                           | `false`                   | whether value can be reset to `0`.                                                              |
| cls              | `string`                            | `-`                       | Additional class                                                                                |
| attrs            | `Record<string, string>`            | `{}`                      | Additional attributes                                                                           |

## Rate Events

| Name        | Description                            | Type                    |
| ----------- | -------------------------------------- | ----------------------- |
| updateValue | Event fired when the value is changes. | `(event: Event)=> void` |
