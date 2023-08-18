---
title: KLoading
lang: en-US
---

# KLoading

Show animation while loading data.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/loading
```

```bash [yarn]
yarn add @ikun-ui/loading
```

```bash [npm]
npm install @ikun-ui/loading
```

:::

## Basic usage

Use `show`, control loading show.

<demo src="../../../../example/loading/basic.svelte"  github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Loading'></demo>

## IKUN usage

Use `spinner`, be a real ikun.

<demo src="../../../../example/loading/ikun.svelte"  github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Loading'></demo>

## Loading Options

| Name       | Type      | Default | Description                                                  |
| ---------- | --------- | ------- | ------------------------------------------------------------ |
| show       | `boolean` | `false` | Whether to show loading                                      |
| text       | `string`  | `-`     | loading text that displays under the spinner                 |
| fullScreen | `boolean` | `false` | Show a full screen animation while loading data              |
| background | `string`  | `-`     | background color of the mask                                 |
| spinner    | `string`  | `-`     | The class name of the snipper, following the unocss standard |
| rotating   | `boolean` | `true`  | Whether the snipper is rotated or not                        |
| cls        | `string`  | `-`     | custom class name for Loading                                |
