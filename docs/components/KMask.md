---
title: KMask
lang: en-US
---

# KMask

Adds a mask to the specified element.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/mask
```

```bash [yarn]
yarn add @ikun-ui/mask
```

```bash [npm]
npm install @ikun-ui/mask
```

:::

## Basic usage

<demo src="../../../../example/mask/basic.svelte" github="Mask"></demo>

## Custom background color

Set the background color of the mask through the color Attribute

<demo src="../../../../example/mask/bg-color.svelte" github="Mask"></demo>

## Mask Props

| Name   | Type                     | Default          | Description                            |
| ------ | ------------------------ | ---------------- | -------------------------------------- |
| color  | `string`                 | `-`              | The background color of the mask       |
| value  | `boolean`                | `false`          | Whether to display the mask            |
| target | `null / HTMLElement`     | `parent element` | The target element covered by the mask |
| cls    | `string`                 | `-`              | Additional class                       |
| attrs  | `Record<string, string>` | `{}`             | Additional attributes                  |

## Mask Slots

| Name    | Description            |
| ------- | ---------------------- |
| default | Customize Mask content |
