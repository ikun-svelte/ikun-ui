---
title: KCollapse
lang: en-US
---

# KCollapse

Use Collapse to store contents.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/collapse
```

```bash [yarn]
yarn add @ikun-ui/collapse
```

```bash [npm]
npm install @ikun-ui/collapse
```

:::

## Basic usage

You can expand multiple panels

<demo src="../../../../example/collapse/basic.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Collapse"></demo>

## Custom title and content

You can render content through slots

<demo src="../../../../example/collapse/custom.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Collapse"></demo>

## Collapse Props

| Name    | Type      | Default | Description                    |
| ------- | --------- | ------- | ------------------------------ |
| title   | `string`  | `-`     | content of Collapse Item title |
| content | `string`  | `-`     | content of Collapse Item       |
| show    | `boolean` | `false` | expand the Collapse            |
| cls     | `string`  | `-`     | Additional class               |
| attrs   | `any`     | `{}`    | Additional attributes          |

## Collapse Events

| Name   | Description                            | Type                   |
| ------ | -------------------------------------- | ---------------------- |
| change | Event fired when the `show` is changes | `(show: Event)=> void` |

## Collapse Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| title   | Customize Collapse Item title content |
| content | Customize Collapse Item content       |
