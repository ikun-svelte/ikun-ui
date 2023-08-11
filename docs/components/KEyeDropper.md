---
title: KEyeDropper
lang: en-US
---

# KEyeDropper

An eyedropper tool that can be opened and used by the user to select colors from the screen.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/eye-dropper
```

```bash [yarn]
yarn add @ikun-ui/eye-dropper
```

```bash [npm]
npm install @ikun-ui/eye-dropper
```

:::

## Basic usage

Call the `eyedropper` interface by using `scoped slots`

<demo src="../../../../example/eye-dropper/basic.svelte" github="EyeDropper"></demo>

## EyeDropper Props

| Name  | Type     | Default | Description           |
| ----- | -------- | ------- | --------------------- |
| cls   | `string` | `-`     | Additional class      |
| attrs | `any`    | `{}`    | Additional attributes |

## EyeDropper Slots

| Name    | Description                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------- |
| default | The element that triggers the eyedropper.The scope parameter is { `sRGBHex`, `open`, `isSupported` } |
