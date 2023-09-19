---
title: KInfinite
lang: en-US
---

# KInfinite

Load more data while reach bottom of the page.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/infinite
```

```bash [yarn]
yarn add @ikun-ui/infinite
```

```bash [npm]
npm install @ikun-ui/infinite
```

:::

## Basic usage

<demo src="infinite/basic.svelte"  github='Infinite'></demo>

## Infinite Props

| Name          | Type                     | Default | Description                                |
| ------------- | ------------------------ | ------- | ------------------------------------------ |
| threshold     | `string`                 | `0`     | Threshold to call loadMore.                |
| elementScroll | `HTMLElement`            | `-`     | Element to bind scroll.                    |
| window        | `boolean`                | `false` | Bind scroll in window.                     |
| hasMore       | `boolean`                | `true`  | Tells you if there are more items to load. |
| horizontal    | `boolean`                | `false` | Changing orientation.                      |
| reverse       | `boolean`                | `false` | Revese scroll direction                    |
| cls           | `string`                 | `''`    | Additional class for                       |
| attrs         | `Record<string, string>` | `{}`    | Additional attributes                      |

## Infinite Events

| Name     | Description                                         | Type                          |
| -------- | --------------------------------------------------- | ----------------------------- |
| loadMore | Triggered when the scroll bar slides to the bottom. | `(event: CustomEvent)=> void` |

## Infinite Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
