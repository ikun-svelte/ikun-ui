---
title: KDivider
lang: en-US
---

# KDivider

The dividing line that separates the content.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/divider
```

```bash [yarn]
yarn add @ikun-ui/divider
```

```bash [npm]
npm install @ikun-ui/divider
```

:::

## Basic usage

Divide the text of different paragraphs.

<demo src="divider/basic.svelte" github="Divider"></demo>

## Custom content

You can customize the content on the divider line.

<demo src="divider/custom-content.svelte" github="Divider"></demo>

## Line Style

You can set the style of divider.

<demo src="divider/line-style.svelte" github="Divider"></demo>

## Vertical divider

<demo src="divider/vertical-divider.svelte" github="Divider"></demo>

## Divider Props

| Name            | Type                        | Default            | Description                                                 |
| --------------- | --------------------------- | ------------------ | ----------------------------------------------------------- |
| direction       | `horizontal` / `vertical`   | `horizontal`       | Set divider's direction.                                    |
| borderColor     | `string`                    | `'b-ikun-bd-base'` | divider's line color.                                       |
| borderStyle     | `string`                    | `''`               | divider's line style.                                       |
| contentPosition | `left` / `center` / `right` | `center`           | the position of the customized content on the divider line. |
| cls             | `string`                    | `''`               | Additional class for                                        |
| attrs           | `any`                       | `{}`               | Additional attributes                                       |

## Divider Slots

| Name    | Description                             |
| ------- | --------------------------------------- |
| default | customized content on the divider line. |
