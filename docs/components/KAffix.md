---
title: KAffix
lang: en-US
---

# KAffix

Fix the element to a specific visible area.

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

Affix is fixed at the top of the page by default.

You can set `offset` attribute to change the offset top，the default value is 0.

<demo src="../../../../example/affix/basic.svelte"  github='Affix'></demo>

## Affix Props

| Name           | Type                    | Default             | Description                                                |
|----------------|-------------------------|---------------------|------------------------------------------------------------|
| offset         | `number`                | `0`                 | offset distance.                                           |
| position       | `top` / `bottom`        | `'top'`             | position of affix.                                         |
| target         | `string`                | `''`                | target container.(CSS selector)                            |
| z              | `number`                | `100`               | `z-index` of affix.                                        |

## Affix Events

| Name     | Description                       | Type                                                     |
|----------|-----------------------------------|----------------------------------------------------------|
| change   | trigger when fixed state changed. | `(fixed: boolean) => void`                               |
| scroll   | trigger when scrolling.           | `(value: { scrollTop: number, fixed: boolean }) => void` |

## Affix Slots

| Name    | Description                |
| ------- |----------------------------|
| default | customize default content. |
