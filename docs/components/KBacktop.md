---
title: KBacktop
lang: en-US
---

# KBacktop

A button to back to top.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/backtop
```

```bash [yarn]
yarn add @ikun-ui/backtop
```

```bash [npm]
npm install @ikun-ui/backtop
```

:::

## Basic usage

Scroll down to see the bottom-right button.

<demo src="../../../../example/backtop/basic.svelte"  github='Backtop'></demo>

## Slot Render

Render custom content via slots.

<demo src="../../../../example/backtop/custom.svelte" github='Backtop'></demo>

## Backtop Props

| Name       | Type     | Default    | Description                                          |
| ---------- | -------- |------------| ---------------------------------------------------- |
| right      | `number` | `40`       | Distance from the right side of the screen.          |
| bottom     | `number` | `40`       | Distance from the bottom of the screen.              |
| showHeight | `number` | `200`      | Scroll to this height to show the Backtop component. |
| target     | `string` | `-`        | Scroll target element `id`                           |
| easing     | `string` | `quartOut` | Animation during back to top(TODO)                   |
| duration   | `number` | `500`      | Time spent back to top.                              |
| cls        | `string` | `''`       | Additional class for                                 |
| attrs      | `any`    | `{}`       | Additional attributes                                |

## Backtop Events

| Name  | Description                 | Type                         |
| ----- | --------------------------- | ---------------------------- |
| click | trigger when backtop click. | `(event: MouseEvent)=> void` |

## Backtop Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
