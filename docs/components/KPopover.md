---
title: KPopover
lang: en-US
---

# KPopover

The floating card popped by clicking or hovering.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/popover
```

```bash [yarn]
yarn add @ikun-ui/popover
```

```bash [npm]
npm install @ikun-ui/popover
```

:::

## Basic usage

<demo src="popover/basic.svelte" github="Popover"></demo>

## Different placement

Specify different display positions through the `placement` attribute

<demo src="popover/placement.svelte" github="Popover"></demo>

## Different triggers

Specify different trigger methods through the `trigger` attribute

<demo src="popover/trigger.svelte" github="Popover"></demo>

## Popover Props

| Name      | Type                                  | Default | Description                 |
| --------- | ------------------------------------- | ------- | --------------------------- |
| placement | `'top' / 'left' / 'right' / 'bottom'` | `top`   | Where the `popover` appears |
| trigger   | `'manual' / 'click' / 'hover'`        | `hover` | How popovers are triggered  |
| cls       | `string`                              | `-`     | Additional class            |
| attrs     | `Record<string, string>`              | `{}`    | Additional attributes       |

## Popover Slots

| Name      | Description                 |
| --------- | --------------------------- |
| triggerEl | Trigger element for popover |
| contentEl | Content of popover          |
