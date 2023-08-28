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

## With text

Using text to indicate rating score.

Add attribute `showText` to display text at the right of Rate. You can assign `texts` for different scores using texts.

<demo src="../../../../example/rate/with-text.svelte" github='Rate'></demo>

## More icons

You can use different icons to distinguish different rate components.

You can customize `icons` by passing icons.

<demo src="../../../../example/rate/more-icon.svelte" github='Rate'></demo>

## Readonly

Readonly Rate is for displaying rating score.

<demo src="../../../../example/rate/readonly.svelte" github='Rate'></demo>

## Rate Props

| Name             | Type                                | Default                  | Description                                                                                     |
| ---------------- | ----------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| max              | `number`                            | `5`                      | max rating score.                                                                               |
| value            | `number`                            | `0`                      | rate value.                                                                                     |
| showScore        | `boolean`                           | `false`                  | whether to display current score. `showScore` and `showText` cannot be `true` at the same time. |
| scoreTemplate    | `string`                            | `'{value}'`              | score template.                                                                                 |
| showText         | `boolean`                           | `false`                  | whether to display texts.                                                                       |
| texts            | `string` / `Record<number, string>` | `''`                     | text or text map.                                                                               |
| textColor        | `string`                            | `'color-#303133'`        | color of texts.                                                                                 |
| icons            | `string` / `Record<number, string>` | `'i-carbon-star-filled'` | icon or icons map.                                                                              |
| colors           | `string` / `Record<number, string>` | `'color-#f7ba2a'`        | color or colors map.                                                                            |
| voidIcon         | `string`                            | `'i-carbon-star'`        | void icon.                                                                                      |
| voidColor        | `string`                            | `'color-#cdd0d6'`        | void icon color.                                                                                |
| disabled         | `boolean`                           | `false`                  | whether rate is readonly.                                                                       |
| disableVoidIcon  | `string`                            | `'i-carbon-star-filled'` | disabled void icon.                                                                             |
| disableVoidColor | `string`                            | `'color-#f0f2f5'`        | disabled void icon color.                                                                       |
| cls              | `string`                            | `''`                     | Additional class for                                                                            |
| attrs            | `Record<string, string>`            | `{}`                     | Additional attributes                                                                           |

## Rate Events

| Name        | Description                            | Type                    |
| ----------- | -------------------------------------- | ----------------------- |
| updateValue | Event fired when the value is changes. | `(event: Event)=> void` |
