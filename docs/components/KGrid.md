---
title: KGrid
lang: en-US
---

# KGrid

Quickly and easily create layouts with the basic 24-column.

::: tip
The component uses flex layout by default, no need to set `type="flex"` manually.

Please note that the parent container should avoid using `inline` related styles, which will cause the component to not fill up its width.
:::

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/grid
```

```bash [yarn]
yarn add @ikun-ui/grid
```

```bash [npm]
npm install @ikun-ui/grid
```

:::

## Basic usage

`KGrid` consists of 2 components, namely `KCol`, `KRol`.  
Create basic grid layout using columns.

<demo src="grid/basic.svelte"  github='Grid'></demo>

## Column spacing

Use the `gutter` attribute to increase the gap between column

<demo src="grid/gutter.svelte"  github='Grid'></demo>

## Hybrid layout

Form a more complex hybrid layout by combining the basic 1/24 columns.

<demo src="grid/hybrid.svelte"  github='Grid'></demo>

## Column offset

The `offset` attribute lets you specify a column offset.

<demo src="grid/offset.svelte"  github='Grid'></demo>

## Alignment

You can define the formatting method of child elements through the `justify` attribute.

<demo src="grid/justify.svelte"  github='Grid'></demo>

## Responsive Layout

five breakpoints are preset: `xs`, `sm`, `md`, `lg` and `xl`.

<demo src="grid/responsive.svelte"  github='Grid'></demo>

## KRow Props

| Name    | Type                                                      | Default | Description                         |
| ------- | --------------------------------------------------------- | ------- | ----------------------------------- |
| gutter  | `number`                                                  | `0`     | grid spacing                        |
| justify | `'start'\|'end'\|'center'\|'around'\|'between'\|'evenly'` | `start` | horizontal alignment of flex layout |
| align   | `top \| middle \| bottom`                                 | `-`     | vertical alignment of flex layout   |
| tag     | `string`                                                  | `div`   | custom element tag                  |
| cls     | `string`                                                  | `'-'`   | Additional class                    |
| attrs   | `Record<string, string>`                                  | `{}`    | Additional attributes               |

## KRow Slots

| Name    | Description                                                    |
| ------- | -------------------------------------------------------------- |
| default | Customize default content, Please pass in the `KCol` component |

## KCol Props

| Name   | Type                                                                      | Default | Description                                                     |
| ------ | ------------------------------------------------------------------------- | ------- | --------------------------------------------------------------- |
| span   | `number`                                                                  | `24`    | number of column the grid spans, The optional range is `0 ~ 24` |
| offset | `number`                                                                  | `0`     | number of spacing on the left side of the grid                  |
| push   | `number`                                                                  | `0`     | number of columns that grid moves to the right                  |
| pull   | `number`                                                                  | `0`     | number of columns that grid moves to the left                   |
| xs     | `number\| {span?: number, offset?: number, pull?: number, push?: number}` | `-`     | `<768px` Responsive columns or column props object              |
| sm     | `number\| {span?: number, offset?: number, pull?: number, push?: number}` | `-`     | `≥768px` Responsive columns or column props object              |
| md     | `number\| {span?: number, offset?: number, pull?: number, push?: number}` | `-`     | `≥992px` Responsive columns or column props object              |
| lg     | `number\| {span?: number, offset?: number, pull?: number, push?: number}` | `-`     | `≥1200px` Responsive columns or column props object             |
| xl     | `number\| {span?: number, offset?: number, pull?: number, push?: number}` | `-`     | `≥1920px` Responsive columns or column props object             |
| tag    | `string`                                                                  | `div`   | custom element tag                                              |
| cls    | `string`                                                                  | `'-'`   | Additional class                                                |
| attrs  | `Record<string, string>`                                                  | `{}`    | Additional attributes                                           |

## KCol Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
