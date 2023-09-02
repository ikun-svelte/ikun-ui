---
title: KButton
lang: en-US
---

# KButton

Commonly used button.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/button
```

```bash [yarn]
yarn add @ikun-ui/button
```

```bash [npm]
npm install @ikun-ui/button
```

:::

## Basic usage

Use `type`, `round` and `circle` to define Button's style.

<demo src="../../../../example/button/basic.svelte"  github='Button'></demo>

## Plain Button

When you set the `plain` property to `true`, plain buttons will be rendered.

<demo src="../../../../example/button/plain.svelte"  github='Button'></demo>

## Ghost Button

When you set the `ghost` property to `true`, ghost buttons will be rendered.

::: tip
Ghost Button takes precedence over Plain Button
:::

<demo src="../../../../example/button/ghost.svelte"  github='Button'></demo>

## Disabled Button

Use `disabled` attribute to determine whether a button is disabled.  
It accepts a `Boolean` value.

<demo src="../../../../example/button/disabled.svelte" github='Button'></demo>

## Icon Button

Use the icon attribute to add icon.

<demo src="../../../../example/button/icon.svelte" github='Button'></demo>

## Button Size

Use the `size` property to control the button size.
It supports enumerations such as `md`, `sm`, and `lg`.

<demo src="../../../../example/button/size.svelte" github='Button'></demo>

## Button Border

Use the `isBorder` property to determine if the button is bordered.

::: tip
Applies only to plain button
:::

<demo src="../../../../example/button/isBorder.svelte" github='Button'></demo>

## Button Group

Displayed as a button group, can be used to group a series of similar operations.

Use tag `<KButtonGroup>` to group your buttons.

<demo src="../../../../example/button/group.svelte" github='ButtonGroup'></demo>

## Link Button

Use the `to` attribute to set a specific url that you can click to jump to.

<demo src="../../../../example/button/link.svelte" github='Button'></demo>

## Button Props

| Name     | Type                                                 | Default    | Description                                               |
| -------- | ---------------------------------------------------- | ---------- | --------------------------------------------------------- |
| type     | `primary` / `success` / `error` / `warning` / `info` | `primary'` | Button type                                               |
| size     | `'sm' / 'md' / 'lg'`                                 | `md`       | Button size                                               |
| icon     | `string`                                             | `-`        | The class name of the icon, following the unocss standard |
| iconSize | `number`                                             | `-`        | The icon size of the button                               |
| to       | `string`                                             | `-`        | Determine whether it's a link button                      |
| round    | `string` / `number`                                  | `-`        | Button's border radius                                    |
| circle   | `boolean`                                            | `false`    | Determine whether it's a circle button                    |
| isBorder | `boolean`                                            | `false`    | Border style button                                       |
| plain    | `boolean`                                            | `false`    | Determine whether it's a plain button                     |
| ghost    | `boolean`                                            | `false`    | Determine whether it's a ghost button                     |
| disabled | `boolean`                                            | `false`    | Disable the button                                        |
| cls      | `string`                                             | `-`        | Additional class for                                      |
| attrs    | `Record<string, string>`                             | `{}`       | Additional attributes                                     |

## Button Events

| Name  | Description                            | Type                |
| ----- | -------------------------------------- | ------------------- |
| click | Event fired when the button is clicked | `(e: Event)=> void` |

## Button Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## Button Group Props

| Name     | Type                                                 | Default | Description                                                         |
| -------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| type     | `primary` / `success` / `error` / `warning` / `info` | `false` | Buttons type.                                                       |
| size     | `'sm' / 'md' / 'lg'`                                 | `md`    | Buttons size. It will cover button size.                            |
| iconSize | `number`                                             | `-`     | The icon size of the buttons. It will cover button iconSize.        |
| isBorder | `boolean`                                            | `false` | Border style buttons. If true, will override the button's isBorder. |
| disabled | `boolean`                                            | `false` | Disable buttons. If true, will override the button's disabled.      |
| cls      | `string`                                             | `-`     | Additional class for                                                |
| attrs    | `Record<string, string>`                             | `{}`    | Additional attributes                                               |
