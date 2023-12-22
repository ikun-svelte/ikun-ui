---
title: KAffix
lang: en-US
---

# KAffix

Avatars can be used to represent people or objects. It supports images, Icons, or characters.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/affix
```

```bash [yarn]
yarn add @ikun-ui/affix
```

```bash [npm]
npm install @ikun-ui/affix
```

:::

## Basic usage

Affix has `trigger-top`, `top`, `trigger-bottom` and `bottom`.
`trigger-to`p is top affixing trigger point.
`top` is the style `top` value after top affixing is trigger.
`trigger-bottom` and `bottom` work in similar way.

<demo src="affix/basic.svelte"  github='Affix'></demo>

## Position

Affix can be `absolute`or fixed positioned. You may need some css tricks to make it works as following.

<demo src="affix/position.svelte" github='Affix'></demo>

## Affix Props

| Name           | Type                                             | Default    | Description                                                                                   |
| -------------- | ------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------- |
| top            | `number`                                         | `-`        | The css top property after trigger top affix. (if not set, use `trigger-top` prop).           |
| triggerTop     | `number`                                         | `-`        | The distance px to top of target to trigger top affix. (if not set, use `top` prop).          |
| bottom         | `number`                                         | `-`        | The css bottom property after trigger bottom affix. (if not set, use `trigger-bottom` prop).  |
| triggerBottom  | `number`                                         | `-`        | The distance px to bottom of target to trigger bottom affix. (if not set, use `bottom` prop). |
| positionOption | `'fixed' \| 'absolute'`                          | `fixed`    | CSS position of the affix.                                                                    |
| listenTo       | `string \| ScrollTarget  \| (() => HTMLElement)` | `document` | The scrolling element to listen scrolling.                                                    |
| cls            | `string`                                         | `''`       | Additional class for component                                                                |
| attrs          | `Record<string, string>`                         | `{}`       | Additional attributes                                                                         |

## Affix Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
