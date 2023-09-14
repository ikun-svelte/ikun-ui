---
title: KProgress
lang: en-US
---

# KProgress

Progress is used to show the progress of current operation.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/progress
```

```bash [yarn]
yarn add @ikun-ui/progress
```

```bash [npm]
npm install @ikun-ui/progress
```

:::

## Basic usage

<demo src="progress/basic.svelte" github="Progress"></demo>

## TextInside progress

In this case the percentage takes no additional space.

`strokeWidth` attribute decides the `width` of progress bar.

`textInside` attribute to put description inside the progress bar.

<demo src="progress/textInside.svelte" github="Progress"></demo>

## Color progress

`color` attribute decides the `color` of progress bar.

<demo src="progress/color.svelte" github="Progress"></demo>

## Circle progress

By setting `type="circle"`, you can get a circle style of progress easily.

<demo src="progress/circle.svelte" github="Progress"></demo>

## Dashboard progress

By setting `type="dashboard"`, you can get a dashboard style of progress easily.

<demo src="progress/dashboard.svelte" github="Progress"></demo>

## Progress Props

| Name        | Type                                         | Default    | Description                                                   |
| ----------- | -------------------------------------------- | ---------- | ------------------------------------------------------------- |
| percentage  | `number`                                     | `0`        | Percentage                                                    |
| status      | `primary / success / error / warning / info` | `primary`  | The current status of progress bar                            |
| type        | `line, circle, dashboard`                    | `line`     | The type of progress bar                                      |
| strokeWidth | `number`                                     | `6`        | The width of progress bar                                     |
| width       | `number`                                     | `126`      | The canvas width of circle progress                           |
| color       | `string`                                     | `-`        | The current color of progress bar                             |
| textInside  | `boolean`                                    | `false`    | Put description inside the progress bar (`type` is 'line')    |
| format      | `(v: number) => string`                      | `-`        | Custom text format                                            |
| duration    | `number`                                     | `0.28 (s)` | Control the animation duration of progress (`type` is 'line') |
| showText    | `boolean`                                    | `true`     | Whether to show percentage                                    |
| cls         | `string`                                     | `true`     | Additional class                                              |
| attrs       | `Record<string, string>`                     | `{}`       | Additional attributes                                         |

## Progress Slots

| Name    | Description        |
| ------- | ------------------ |
| default | Customized content |
