---
title: KBreadcrumb
lang: en-US
---

# KBreadcrumb

Displays the location of the current page, making it easier to browser back.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/breadcrumb @ikun-ui/breadcrumb-item
```

```bash [yarn]
yarn add @ikun-ui/breadcrumb @ikun-ui/breadcrumb-item
```

```bash [npm]
npm install @ikun-ui/breadcrumb @ikun-ui/breadcrumb-item
```

:::

## Basic usage

In `KBreadcrumb`, each `KBreadcrumbItem` is a tag that stands for every level starting from homepage. This component has a String attribute `separator`, and it determines the `separator`. Its default value is '/'.

<demo src="../../../../example/breadcrumb/basic.svelte"  github='Breadcrumb'></demo>

## Icon separator

Set `separatorIcon` to use `KIcon` as the separator, it will cover `separator`.

<demo src="../../../../example/breadcrumb/separator-icon.svelte"  github='Breadcrumb'></demo>

## Breadcrumb Props

| Name          | Type     | Default | Description                                                |
| ------------- | -------- | ------- | ---------------------------------------------------------- |
| separator     | `string` | `/`     | separator character                                        |
| separatorIcon | `string` | `''`    | The class name of the icon, following the unocss standard. |
| cls           | `string` | `''`    | Additional class for                                       |
| attrs         | `any`    | `{}`    | Additional attributes                                      |

## Breadcrumb Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## BreadcrumbItem Props

| Name  | Type     | Default | Description                                                                                                                                                |
| ----- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| href  | `string` | `''`    | The URL that the hyperlink points to, same as [href <span class="i-carbon-link text-12px" />](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) |
| cls   | `string` | `''`    | Additional class for                                                                                                                                       |
| attrs | `any`    | `{}`    | Additional attributes                                                                                                                                      |

## BreadcrumbItem Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
