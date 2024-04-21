---
title: KTooltip
lang: en-US
---

# KTooltip

A simple text popup tip.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/tooltip
```

```bash [yarn]
yarn add @ikun-ui/tooltip
```

```bash [npm]
npm install @ikun-ui/tooltip
```

:::

## Basic usage

<demo src="tooltip/basic.svelte" github="Tooltip"></demo>

## Different placement

Specify different display positions through the `placement` attribute

<demo src="tooltip/placement.svelte" github="Tooltip"></demo>

## Different triggers

Specify different trigger methods through the `trigger` attribute

<demo src="tooltip/trigger.svelte" github="Tooltip"></demo>

## Tooltip Props

| Name            | Type                                  | Default | Description                                                           |
| --------------- | ------------------------------------- | ------- | --------------------------------------------------------------------- |
| placement       | `'top' / 'left' / 'right' / 'bottom'` | `top`   | Where the `tooltip` appears                                           |
| trigger         | `'manual' / 'click' / 'hover'`        | `hover` | How `tooltip` are triggered                                           |
| mouseEnterDelay | `number`                              | `200`   | Delay in seconds, before `tooltip` is shown on mouse enter, unit `ms` |
| mouseLeaveDelay | `number`                              | `200`   | Delay in seconds, before `tooltip` is shown on mouse enter, unit `ms` |
| cls             | `string`                              | `-`     | Additional class                                                      |
| attrs           | `Record<string, string>`              | `{}`    | Additional attributes                                                 |
| content         | `string`                              | `-`     | `tooltip`'s content                                                   |

## Tooltip Slots

| Name      | Description                 |
| --------- | --------------------------- |
| triggerEl | Trigger element for tooltip |
