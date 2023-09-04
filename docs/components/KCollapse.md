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

<demo src="../../../../example/collapse/basic.svelte" github="Collapse"></demo>

## Custom title and content

You can render content through slots

<demo src="../../../../example/collapse/custom.svelte" github="Collapse"></demo>

## Collapse Props

| Name      | Type                     | Default | Description                          |
| --------- | ------------------------ | ------- | ------------------------------------ |
| title     | `string`                 | `-`     | Content of Collapse Item title       |
| content   | `string`                 | `-`     | Content of Collapse Item             |
| show      | `boolean`                | `false` | Expand the Collapse                  |
| showClose | `boolean`                | `true`  | Determine whether display close ionc |
| cls       | `string`                 | `-`     | Additional class                     |
| attrs     | `Record<string, string>` | `{}`    | Additional attributes                |

## Collapse Events

| Name   | Description                            | Type                   |
| ------ | -------------------------------------- | ---------------------- |
| change | Event fired when the `show` is changes | `(show: Event)=> void` |

## Collapse Slots

| Name      | Description                           |
| --------- | ------------------------------------- |
| title     | Customize Collapse Item title content |
| content   | Customize Collapse Item content       |
| closeIcon | Customize close icon                  |
