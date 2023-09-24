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

<demo src="rate/basic.svelte"  github='Rate'></demo>

## With allowHalf

Add attribute `allowHalf` Half star allowed.

<demo src="rate/allow-half.svelte"  github='Rate'></demo>

## With text

Using text to indicate rating score.

Add attribute `showText` to display text at the right of Rate. You can assign `texts` for different scores using texts.

<demo src="rate/with-text.svelte" github='Rate'></demo>

## ShowScore and ScoreTemplate

Add attribute `showScore` to display score at the right of Rate. You can customize score display by set `scoreTemplate`, which is a string and internally uses `{value}` to represent the score.

<demo src="rate/score-template.svelte" github='Rate'></demo>

## Clearable

You can reset the value to `0` when you click at the same value again.

<demo src="rate/clearable.svelte" github='Rate'></demo>

## More icons

You can use different icons to distinguish different rate components.

You can customize `icons` by passing icons.

<demo src="rate/more-icon.svelte" github='Rate'></demo>

## Readonly

Read-only Rate is for displaying rating score. Half star is supported.

Use attribute `readonly` to make the component read-only. Add `readonlyVoidIcon` and `readonlyVoidColor` to set unselected icons and colors.

<demo src="rate/readonly.svelte" github='Rate'></demo>

## Rate Props

| Name              | Type                                | Default                   | Description                                                                                     |
| ----------------- | ----------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| max               | `number`                            | `5`                       | max rating score.                                                                               |
| value             | `number`                            | `0`                       | rate value.                                                                                     |
| allowHalf         | `boolean`                           | `false`                   | whether picking half start is allowed.                                                          |
| showScore         | `boolean`                           | `false`                   | whether to display current score. `showScore` and `showText` cannot be `true` at the same time. |
| scoreTemplate     | `string`                            | `'{value}'`               | score template.                                                                                 |
| showText          | `boolean`                           | `false`                   | whether to display texts.                                                                       |
| texts             | `string` / `Record<number, string>` | `''`                      | text or text map.                                                                               |
| textColor         | `string`                            | `'var(--ikun-zinc-500)'`  | color of texts.                                                                                 |
| icons             | `string` / `Record<number, string>` | `'k-rate--active-icon'`   | icon or icons map, alias `i-carbon-star-filled` to `k-rate--active-icon`.                       |
| colors            | `string` / `Record<number, string>` | `'var(--ikun-amber-500)'` | color or colors map.                                                                            |
| voidIcon          | `string`                            | `'k-rate--void-icon'`     | void icon, alias `i-carbon-star` to `k-rate--void-icon`.                                        |
| voidColor         | `string`                            | `'var(--ikun-stone-300)'` | void icon color.                                                                                |
| disabled          | `boolean`                           | `false`                   | whether rate is disabled.                                                                       |
| readonly          | `boolean`                           | `false`                   | whether rate is readonly.                                                                       |
| readonlyVoidIcon  | `string`                            | `'k-rate--readonly-icon'` | readonly void icon, alias `i-carbon-star-filled` to `k-rate--readonly-icon`.                    |
| readonlyVoidColor | `string`                            | `'var(--ikun-light-700)'` | readonly void icon color.                                                                       |
| clearable         | `boolean`                           | `false`                   | whether value can be reset to `0`.                                                              |
| cls               | `string`                            | `-`                       | Additional class                                                                                |
| attrs             | `Record<string, string>`            | `{}`                      | Additional attributes                                                                           |

## Rate Events

| Name        | Description                            | Type                    |
| ----------- | -------------------------------------- | ----------------------- |
| updateValue | Event fired when the value is changes. | `(event: Event)=> void` |
