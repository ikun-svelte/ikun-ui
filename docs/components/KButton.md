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

## Disabled Button

Use `disabled` attribute to determine whether a button is disabled.  
It accepts a `Boolean` value.

<demo src="../../../../example/button/disabled.svelte" github='Button'></demo>

## Icon Button

Use the icon attribute to add icon.

<demo src="../../../../example/button/icon.svelte" github='Button'></demo>

## Button Group

Displayed as a button group, can be used to group a series of similar operations.

Use tag `<k-button-group>` to group your buttons.

<demo src="../../../../example/button/group.svelte" github='ButtonGroup'></demo>

## Link Button

Use the `to` attribute to set a specific url that you can click to jump to.

<demo src="../../../../example/button/link.svelte" github='Button'></demo>

## Button Props

| Name     | Type               | Default                                               | Description                                               |
| -------- | ------------------ | ----------------------------------------------------- | --------------------------------------------------------- |
| icon     | `string`           | `-`                                                   | The class name of the icon, following the unocss standard |
| circle   | `boolean`          | `false`                                               | Determine whether it's a circle button                    |
| to       | `string`           | `-`                                                   | Determine whether it's a link button                      |
| round    | `string \| number` | `-`                                                   | Button's border radius                                    |
| disabled | `boolean`          | `false`                                               | Disable the button                                        |
| type     | `enum`             | `'success' / 'error' / 'warning' / 'info'/ 'primary'` | Button type                                               |
| cls      | `string`           | `-`                                                   | Additional class for                                      |
| attrs    | `any`              | `{}`                                                  | Additional attributes                                     |

## Button Events

| Name  | Description                            | Type                |
| ----- | -------------------------------------- | ------------------- |
| click | Event fired when the button is clicked | `(e: Event)=> void` |

## Button Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## Button Group Props

| Name | Type     | Default | Description          |
| ---- | -------- | ------- | -------------------- |
| cls  | `string` | `-`     | Additional class for |
