---
title: KInput
lang: en-US
---

# KInput

Input data using keyboard.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/input
```

```bash [yarn]
yarn add @ikun-ui/input
```

```bash [npm]
npm install @ikun-ui/input
```

:::

## Basic usage

<demo src="../../../../example/input/basic.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Input"></demo>

## Prefix icon and suffix icon input

Set the prefix through the icon attribute

<demo src="../../../../example/input/prefix.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Input"></demo>

## Disabled input

Disable the input through the disabled attribute

<demo src="../../../../example/input/disabled.svelte" github="https://github.com/ikun-svelte/ikun-ui/tree/main/components/Input"></demo>

## Input Props

| Name        | Type      | Default | Description                                                      |
| ----------- | --------- | ------- | ---------------------------------------------------------------- |
| value       | `string`  | `-`     | Binding value                                                    |
| iconPrefix  | `string`  | `-`     | The class name of the prefix icon, following the unocss standard |
| iconPrefix  | `string`  | `-`     | The class name of the suffix icon, following the unocss standard |
| placeholder | `string`  | `false` | Input's placeholder                                              |
| disabled    | `boolean` | `false` | Disable the Input                                                |
| cls         | `string`  | `-`     | Additional class                                                 |
| attrs       | `any`     | `{}`    | Additional attributes                                            |

## Input Events

| Name    | Description                             | Type                                     |
| ------- | --------------------------------------- | ---------------------------------------- |
| input   | Event fired on input                    | `(value: HTMLInputElement.value)=> void` |
| enter   | Event fired when `enter` is pressed     | `(value: Event)=> void`                  |
| keydown | Event fired when `keyboard` is pressed  | `(value: Event)=> void`                  |
| change  | Event fired when the `value` is changes | `(value: Event)=> void`                  |

## Input Slots

| Name   | Description                    |
| ------ | ------------------------------ |
| prefix | Customize input prefix content |
| suffix | Customize input suffix content |
