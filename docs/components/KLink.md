---
title: KLink
lang: en-US
---

# KLink

Text hyperlink

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/link
```

```bash [yarn]
yarn add @ikun-ui/link
```

```bash [npm]
npm install @ikun-ui/link
```

:::

## Basic usage

Basic text link

<demo src="../../../../example/link/basic.svelte" github='link'></demo>

## Disabled

Disabled state of link

<demo src="../../../../example/link/disabled.svelte" github='link'></demo>

## Underline

Underline of link

<demo src="../../../../example/link/underline.svelte" github='link'></demo>

## Icon

Link with icon

<demo src="../../../../example/link/icon.svelte" github='link'></demo>

## link Props

| Name      | Type                                                             | Default   | Description                         |
| --------- | ---------------------------------------------------------------- | --------- | ----------------------------------- |
| type      | `primary` / `success` / `error` / `warning` / `info` / `default` | `default` | Button type                         |
| underline | `boolean`                                                        | `true`    | whether the component has underline |
| disabled  | `boolean`                                                        | `false`   | whether the component is disabled   |
| href      | `string`                                                         | `-`       | same as native hyperlink's href     |
| icon      | `string`                                                         | `-`       | link's icon                         |
| cls       | `string`                                                         | `-`       | Additional class                    |
| attrs     | `Record<string, string>`                                         | `{}`      | Additional attributes               |

## link Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
| icon    | Customize icon content    |
