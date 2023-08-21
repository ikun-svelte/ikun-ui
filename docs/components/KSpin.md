---
title: KSpin
lang: en-US
---

# KSpin

Show animation while loading data.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/spin
```

```bash [yarn]
yarn add @ikun-ui/spin
```

```bash [npm]
npm install @ikun-ui/spin
```

:::

## Basic usage

Use `show`, control loading show.

<demo src="../../../../example/spin/basic.svelte"  github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Spin'></demo>

## IKUN usage

Use `spinner`, be a real ikun.

<demo src="../../../../example/spin/ikun.svelte"  github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Spin'></demo>

## Loading Options

| Name       | Type      | Default | Description                                                  |
| ---------- | --------- | ------- | ------------------------------------------------------------ |
| show       | `boolean` | `false` | Whether to show spin                                      |
| text       | `string`  | `-`     | loading text that displays under the spinner                 |
| fullScreen | `boolean` | `false` | Show a full screen animation while loading data              |
| background | `string`  | `-`     | background color of the mask                                 |
| spinner    | `string`  | `-`     | The class name of the snipper, following the unocss standard |
| rotating   | `boolean` | `true`  | Whether the snipper is rotated or not                        |
| cls        | `string`  | `-`     | custom class name for Spin                                |
