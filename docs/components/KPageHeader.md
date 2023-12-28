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

The header can be as complicated as needed,
you may add additional sections to the header, to allow rich interactions.

<demo src="page-header/extra.svelte"  github='Pageheader'></demo>

## Main content

Sometimes we want the head to show with some co-responding content,
we can utilize the `default` slot for doing so.

<demo src="page-header/main.svelte"  github='Pageheader'></demo>

## Breadcrumbs

Page header allows you to add breadcrumbs for giving route information to the users by `breadcrumb` slot.

<demo src="page-header/breadcrumbs.svelte"  github='Pageheader'></demo>

## Custom icon

You can customize the icon through the slot or icon attribute

<demo src="page-header/icon.svelte"  github='Pageheader'></demo>

## No icon

PageHeader without icon is also possible

<demo src="page-header/no-icon.svelte"  github='Pageheader'></demo>

## Complete example

<demo src="page-header/complete.svelte"  github='Pageheader'></demo>

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
