---
title: KDescriptions
lang: en-US
---

# KDescriptions

Display multiple fields in list form.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/descriptions @ikun-ui/descriptions-item
```

```bash [yarn]
yarn add @ikun-ui/descriptions @ikun-ui/descriptions-item
```

```bash [npm]
npm install @ikun-ui/descriptions @ikun-ui/descriptions-item
```

:::

## Basic usage

<demo src="descriptions/basic.svelte"  github='Descriptions'></demo>

## Sizes

<demo src="descriptions/sizes.svelte"  github='Descriptions'></demo>

# Vertical

<demo src="descriptions/vertical.svelte"  github='Descriptions'></demo>

## Descriptions Props

| Name      | Type                      | Default      | Description                                |
| --------- | ------------------------- | ------------ | ------------------------------------------ |
| title     | `string`                  | `''`         | title text, display on the top left        |
| extra     | `string`                  | `''`         | extra text, display on the top right       |
| border    | `boolean`                 | `false`      | with or without border                     |
| column    | `number`                  | `3`          | numbers of `Descriptions Item` in one line |
| direction | `horizontal` / `vertical` | `horizontal` | direction of descriptions                  |
| size      | `sm` / `md` / `lg`        | `md`         | size of descriptions                       |
| cls       | `string`                  | `''`         | Additional class for component             |
| attrs     | `Record<string, string>`  | `{}`         | Additional attributes                      |

## Descriptions Slots

| Name    | Description               |
| ------- | ------------------------- |
| title   | Customize title content   |
| extra   | Customize extra content   |
| default | Customize default content |

## DescriptionsItem Props

| Name  | Type                     | Default | Description                    |
| ----- | ------------------------ | ------- | ------------------------------ |
| label | `string`                 | `''`    | label text                     |
| cls   | `string`                 | `''`    | Additional class for component |
| attrs | `Record<string, string>` | `{}`    | Additional attributes          |

## DescriptionsItem Slots

| Name    | Description               |
| ------- | ------------------------- |
| label   | Customize label content   |
| default | Customize default content |
