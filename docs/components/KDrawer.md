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

<demo src="drawer/basic.svelte" github="Drawer"></demo>

## Custom header

Implement custom header through slots

<demo src="drawer/custom.svelte" github="Drawer"></demo>

## Left or right

You can choose to open from the `right` or `left`

<demo src="drawer/placement.svelte" github="Drawer"></demo>

## Drawer Props

| Name      | Type                     | Default | Description                             |
| --------- | ------------------------ | ------- | --------------------------------------- |
| placement | `'right' / 'left'`       | `right` | The placement in which the drawer opens |
| value     | `boolean`                | `false` | open the Drawer                         |
| cls       | `string`                 | `-`     | Additional class                        |
| attrs     | `Record<string, string>` | `{}`    | Additional attributes                   |

## Drawer Events

| Name  | Description                           | Type                |
| ----- | ------------------------------------- | ------------------- |
| close | Event fired when the `value` is false | `(e: Event)=> void` |

## Drawer Slots

| Name    | Description              |
| ------- | ------------------------ |
| default | Customize Drawer content |
