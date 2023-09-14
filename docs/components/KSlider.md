---
title: KSlider
lang: en-US
---

# KSlider

Drag the slider within a fixed range.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/slider
```

```bash [yarn]
yarn add @ikun-ui/slider
```

```bash [npm]
npm install @ikun-ui/slider
```

:::

## Basic usage

<demo src="slider/basic.svelte" github="Slider"></demo>

## Disabled slider

Use `disabled` attribute to determine whether a slider is disabled.

<demo src="slider/disabled.svelte" github="Slider"></demo>

## Range slider

<demo src="slider/range.svelte" github="Slider"></demo>

## Render slider

<demo src="slider/render.svelte" github="Slider"></demo>

## Slider Props

| Name     | Type                     | Default | Description                |
| -------- | ------------------------ | ------- | -------------------------- |
| value    | `number`                 | `0`     | Binding value              |
| min      | `number`                 | `0`     | Minimum value              |
| max      | `number`                 | `100`   | Maximum value              |
| step     | `number`                 | `1`     | Step size                  |
| disabled | `boolean`                | `false` | Whether Slider is disabled |
| cls      | `string`                 | `-`     | Additional class           |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes      |

## Slider Events

| Name   | Description                                            | Type                          |
| ------ | ------------------------------------------------------ | ----------------------------- |
| change | Fires when the value changes and the mouse is released | `(value: CustomEvent)=> void` |
| input  | Trigger in real time when data changes                 | `(value: CustomEvent)=> void` |

## Slider Slots

| Name         | Description                     |
| ------------ | ------------------------------- |
| buttonRender | Customize slider button content |
