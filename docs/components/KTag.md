---
title: KTag
lang: en-US
---

# KTag

Tag for categorizing or markup.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/tag
```

```bash [yarn]
yarn add @ikun-ui/tag
```

```bash [npm]
npm install @ikun-ui/tag
```

:::

## Basic usage

Use the `type` attribute to define Tag's type. In addition, the `bgColor` and `textColor` attribute can be used to set the background and text color of the Tag.

<demo src="../../../../example/tag/basic.svelte"  github='Tag'></demo>

## Removable Tag

`closable` attribute can be used to define a removable tag. `close` event triggers when Tag is removed. In addition, the `closeIcon` attribute can customize the close icon.

<demo src="../../../../example/tag/removable.svelte"  github='Tag'></demo>

## Icon Tag

`icon` attribute can be used to define a tag with an icon.

<demo src="../../../../example/tag/icon.svelte"  github='Tag'></demo>

## Tag Props

| Name      | Type                                                 | Default          | Description                                               |
| --------- | ---------------------------------------------------- | ---------------- | --------------------------------------------------------- |
| type      | `primary` / `success` / `error` / `warning` / `info` | `primary`        | type of Tag                                               |
| bgColor   | `string`                                             | `-`              | customize background color                                |
| textColor | `string`                                             | `-`              | customize text color                                      |
| icon      | `string`                                             | `-`              | The class name of the icon, following the unocss standard |
| border    | `boolean`                                            | `false`          | whether Tag has a border                                  |
| closable  | `boolean`                                            | `false`          | whether Tag can be removed                                |
| closeIcon | `string`                                             | `i-carbon-close` | The class name of the icon, following the unocss standard |
| cls       | `string`                                             | `-`              | Additional class for                                      |
| attrs     | `any`                                                | `{}`             | Additional attributes                                     |

## Tag Events

| Name  | Description                  | Type                           |
| ----- | ---------------------------- | ------------------------------ |
| click | triggers when Tag is clicked | `(event: CustomEvent) => void` |
| close | triggers when Tag is removed | `(event: CustomEvent) => void` |

## Tag Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
