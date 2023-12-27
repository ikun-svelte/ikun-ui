---
title: KPageHeader
lang: en-US
---

# KPageHeader

If path of the page is simple, it is recommended to use PageHeader instead of the Breadcrumb.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/page-header
```

```bash [yarn]
yarn add @ikun-ui/page-header
```

```bash [npm]
npm install @ikun-ui/page-header
```

:::

## Basic usage

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## Additional operation section

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## Main content

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## Breadcrumbs

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## Custom icon

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## No icon

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## Complete example

<demo src="page-header/basic.svelte"  github='Pageheader'></demo>

## PageHeader Props

| Name    | Type     | Default               | Description                                                 |
| ------- | -------- | --------------------- | ----------------------------------------------------------- |
| icon    | `string` | `i-carbon-arrow-left` | Icon component of page header.following the unocss standard |
| title   | `string` | `''`                  | Title of page header.                                       |
| content | `string` | `''`                  | Content of page header.                                     |
| cls     | `string` | `''`                  | Additional class for component                              |
| attrs   | `any`    | `{}`                  | Additional attributes                                       |

## PageHeader Events

| Name | Description                          | Type        |
| ---- | ------------------------------------ | ----------- |
| back | Triggers when right side is clicked. | `()=> void` |

## PageHeader Slots

| Name       | Description            |
| ---------- | ---------------------- |
| default    | Main content.          |
| title      | Content of the title.  |
| icon       | Content of the icon.   |
| content    | Content.               |
| extra      | Extra.                 |
| breadcrumb | Content as breadcrumb. |
