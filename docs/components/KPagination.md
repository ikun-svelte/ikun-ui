---
title: KPagination
lang: en-US
---

# KPagination

A long list can be divided into several pages using Pagination, and only one page will be loaded at a time.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/pagination
```

```bash [yarn]
yarn add @ikun-ui/pagination
```

```bash [npm]
npm install @ikun-ui/pagination
```

:::

## Basic usage

<demo src="pagination/basic.svelte"  github='Pagination'></demo>

## Pager with background

The `isBg` attribute gives the `pager` a background

<demo src="pagination/background.svelte"  github='Pagination'></demo>

## Control and Layout

Use the `layout` attribute to enable related display controls

<demo src="pagination/layout.svelte"  github='Pagination'></demo>


## Disabled Pagination
Use `disabled` attribute to determine whether a pagination is disabled.

<demo src="pagination/disabled.svelte"  github='Pagination'></demo>

## Customize next and prev

You can also control the paging button to display text or icons yourself

<demo src="pagination/next.svelte"  github='Pagination'></demo>

## Pagination Size

Use the size property to control the pagination size. It supports enumerations such as `md`, `sm`, and `lg`.

<demo src="pagination/size.svelte"  github='Pagination'></demo>

## Infinite Paging
For scenarios like search engines where there is no total number of pages,   
you can use infinite paging

<demo src="pagination/infinite.svelte"  github='Pagination'></demo>

## Pagination Props

| Name        | Type                                               | Default                     | Description                                                                          |
| ----------- | -------------------------------------------------- | --------------------------- |--------------------------------------------------------------------------------------|
| total       | `number`                                           | `0`                         | Total number of data items.                                                          |
| pagerCount  | `number`                                           | `7`                         | Number of pagers. Pagination collapses when the total page count exceeds this value. |
| pageSize    | `number`                                           | `10`                        | Item count of each page.                                                             |
| currentPage | `number`                                           | `1`                         | Current page number.                                                                 |
| prevText    | `string`                                           | `-`                         | Text for the prev button.                                                            |
| prevIcon    | `string`                                           | `-`                         | Icon for the prev button(following the unocss standard).                             |
| nextText    | `string`                                           | `-`                         | Text for the next button.                                                            |
| nextIcon    | `string`                                           | `-`                         | Icon for the prev button(following the unocss standard).                             |
| infinite    | `boolean`                                          | `false`                     | Enable infinite paging.                                                              |
| layout      | `Array<'jumper' \| 'sizes' \| 'total' \| 'pager'>` | `['pager']`                 | Pagination control display order.                                                    |
| disabled    | `boolean`                                          | `false`                     | Disable the pagination.                                                              |
| size        | `'sm' \| 'md' \| 'lg'`                             | `md`                        | Pagination size.                                                                     |
| pageSizes   | `number[]`                                         | `[10, 20, 30, 40, 50, 100]` | Options of item count per page.                                                      |
| isBg        | `boolean`                                          | `false`                     | Show pager background.                                                               |
| cls         | `string`                                           | `''`                        | Additional class for component                                                       |
| attrs       | `any`                                              | `{}`                        | Additional attributes                                                                |

## Pagination Events

| Name          | Description                           | Type                          |
| ------------- | ------------------------------------- | ----------------------------- |
| currentChange | Triggered when `currentPage` changes. | `(event: CustomEvent)=> void` |
| sizeChange    | Triggered when `pageSize` changes.    | `(event: CustomEvent)=> void` |
