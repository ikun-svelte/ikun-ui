---
title: KDrawer
lang: en-US
---

# KDrawer

Open a drawer to display data or forms.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/drawer
```

```bash [yarn]
yarn add @ikun-ui/drawer
```

```bash [npm]
npm install @ikun-ui/drawer
```

:::

## Basic usage

Open the `drawer` by setting the `value` attribute

<demo src="../../../../example/drawer/basic.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Drawer"></demo>

## Left or right

You can choose to open from the `right` or `left`

<demo src="../../../../example/drawer/placement.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Drawer"></demo>

## Drawer Props

| Name      | Type                 | Default | Description                                   |
| --------- | -------------------- | ------- | --------------------------------------------- |
| placement | `'right' / 'left'`   | `right` | The placement in which the drawer opens       |
| target    | `null / HTMLElement` | `-`     | Depending on which element to open the drawer |
| value     | `boolean`            | `false` | open the Drawer                               |
| cls       | `string`             | `-`     | Additional class                              |
| attrs     | `any`                | `{}`    | Additional attributes                         |

## Drawer Events

| Name  | Description                           | Type                |
| ----- | ------------------------------------- | ------------------- |
| close | Event fired when the `value` is false | `(e: Event)=> void` |

## Drawer Slots

| Name    | Description              |
| ------- | ------------------------ |
| default | Customize Drawer content |
