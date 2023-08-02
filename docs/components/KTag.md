---
title: KTag
lang: en-US
---

# KTag

Tag for categorizing or markup.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/tag
```

```bash [yarn]
yarn add @ikun-ui/tag
```

```bash [npm]
npm install @ikun-ui/tag
```

:::

## Basic usage

Use `type`, `round` and `circle` to define Tag's style.

<demo src="../../../../example/tag/basic.svelte"  github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Tag'></demo>

## Tag Props

| Name  | Type     | Default                                               | Description           |
| ----- | -------- | ----------------------------------------------------- | --------------------- |
| type  | `enum`   | `'success' / 'error' / 'warning' / 'info'/ 'primary'` | Tag type              |
| cls   | `string` | `-`                                                   | Additional class for  |
| attrs | `any`    | `{}`                                                  | Additional attributes |

## Tag Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
