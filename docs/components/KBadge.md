---
title: KBadge
lang: en-US
---

# KBadge

A number or status mark on buttons and icons.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/badge
```

```bash [yarn]
yarn add @ikun-ui/badge
```

```bash [npm]
npm install @ikun-ui/badge
```

:::

## Basic usage

Displays the amount of new messages.

The amount is defined with value which accepts Number or String.

<demo src="badge/basic.svelte"  github='Badge'></demo>

## Max Value

You can customize the max value.

The max value is defined by property max which is a Number. Note that it only works when value is also a Number.

<demo src="badge/max-value.svelte" github='Badge'></demo>

## Customizations

Displays text content other than numbers.

When value is a String, it can display customized text.

<demo src="badge/customizations.svelte" github='Badge'></demo>

## Dot Mark

Use a dot to mark content that needs to be noticed.

Use the attribute isDot. It is a Boolean.

<demo src="badge/dot-mark.svelte" github='Badge'></demo>

## Badge Props

| Name  | Type                                                 | Default | Description                                                                 |
| ----- | ---------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| value | `string` / `number`                                  | `''`    | display value.                                                              |
| max   | `number`                                             | `99`    | maximum value, shows {max}+ when exceeded. Only works if value is a number. |
| isDot | `boolean`                                            | `false` | if a little dot is displayed.                                               |
| show  | `boolean`                                            | `true`  | show badge.                                                                 |
| type  | `primary` / `success` / `error` / `warning` / `info` | `error` | badge type.                                                                 |
| cls   | `string`                                             | `''`    | Additional class for                                                        |
| attrs | `Record<string, string>`                             | `{}`    | Additional attributes                                                       |

## Badge Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
