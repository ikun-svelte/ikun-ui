---
title: KLayout
lang: en-US
---

# KLayout

Handling the overall layout of a page.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/layout
```

```bash [yarn]
yarn add @ikun-ui/layout
```

```bash [npm]
npm install @ikun-ui/layout
```

:::

## Basic usage

`KLayout` consists of 5 components, namely `KContainer`, `KMain`, `KFooter`, `KAside`, and `KHeader`.

Some common combination examples are given below

<demo src="layout/basic.svelte"  github='Layout'></demo>

<demo src="layout/basic2.svelte"  github='Layout'></demo>

<demo src="layout/basic3.svelte"  github='Layout'></demo>

<demo src="layout/basic4.svelte"  github='Layout'></demo>

<demo src="layout/basic5.svelte"  github='Layout'></demo>

<demo src="layout/basic6.svelte"  github='Layout'></demo>

<demo src="layout/basic7.svelte"  github='Layout'></demo>

## KContainer Props

| Name      | Type                     | Default | Description                                                            |
| --------- | ------------------------ | ------- | ---------------------------------------------------------------------- |
| direction | `vertical \| horizontal` | `-`     | vertical when nested with `KHeader` or `KFooter`; horizontal otherwise |
| cls       | `string`                 | `'-'`   | Additional class for                                                   |
| attrs     | `Record<string, string>` | `{}`    | Additional attributes                                                  |

## KContainer Slots

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| header  | Customize header content, Please pass in the `KHeader` component |
| default | Customize default content                                        |
| footer  | Customize footer content, Please pass in the `KFooter` component |

## KMain Props

| Name  | Type                     | Default | Description           |
| ----- | ------------------------ | ------- | --------------------- |
| cls   | `string`                 | `'-'`   | Additional class for  |
| attrs | `Record<string, string>` | `{}`    | Additional attributes |

## KMain Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## KFooter Props

| Name   | Type                     | Default | Description           |
| ------ | ------------------------ | ------- | --------------------- |
| heigth | `string`                 | `'-'`   | Heigth of `footer`    |
| cls    | `string`                 | `'-'`   | Additional class for  |
| attrs  | `Record<string, string>` | `{}`    | Additional attributes |

## KFooter Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## KHeader Props

| Name   | Type                     | Default | Description           |
| ------ | ------------------------ | ------- | --------------------- |
| heigth | `string`                 | `'-'`   | Heigth of `header`    |
| cls    | `string`                 | `'-'`   | Additional class for  |
| attrs  | `Record<string, string>` | `{}`    | Additional attributes |

## KHeader Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## KAside Props

| Name  | Type                     | Default | Description           |
| ----- | ------------------------ | ------- | --------------------- |
| width | `string`                 | `'-'`   | Width of `aside`      |
| cls   | `string`                 | `'-'`   | Additional class for  |
| attrs | `Record<string, string>` | `{}`    | Additional attributes |

## KAside Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
