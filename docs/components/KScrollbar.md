---
title: KScrollbar
lang: en-US
---

# KScrollbar

A scroll bar dom container with a unified style

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/scrollbar
```

```bash [yarn]
yarn add @ikun-ui/scrollbar
```

```bash [npm]
npm install @ikun-ui/scrollbar
```

:::

## Basic usage

<demo src="scrollbar/basic.svelte"  github='Scrollbar'></demo>

## Customizable style

scrollbar supports partial style settings for `tumb`, `bar`, and `track`

<demo src="scrollbar/custom.svelte" github='Scrollbar'></demo>

## Scrollbar Props

| Name            | Type     | Default                 | Description                                                |
| --------------- | -------- | ----------------------- |------------------------------------------------------------|
| css             | `string` | `string`                | Css content which will be appended to the style attribute. |
| trackBackground | `string` | `transparent`           | Scrollbar track background color.                          |
| trackRadius     | `string` | `20px`                  | Scrollbar track radius.                                    |
| width           | `string` | `6px`                   | Scrollbar width.                                           |
| height          | `string` | `6px`                   | Scrollbar height.                                          |
| thumbBackground | `string` | `var(--ikun-light-800)` | Thumb background color.                                    |
| thumbRadius     | `string` | `20px`                  | Thumb background radius.                                   |
| cls             | `string` | `-`                     | Additional class for component                             |
| attrs           | `any`    | `{}`                    | Additional attributes                                      |

## Scrollbar Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | content of the container. |
