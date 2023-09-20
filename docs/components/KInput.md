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

<demo src="input/basic.svelte" github="Input"></demo>

## Prefix icon and suffix icon input

Set the prefix through the `icon` attribute

<demo src="input/prefix.svelte" github="Input"></demo>

## Disabled input

Disable the input through the `disabled` attribute

<demo src="input/disabled.svelte" github="Input"></demo>

## Password input

Enable the password input box and pass the `type` as `password`.

<demo src="input/password.svelte" github="Input"></demo>

## Sizes

Add `size` attribute to change the size of Input. It supports `sm`, `md` and `lg`.

<demo src="input/sizes.svelte" github="Input"></demo>

## Input Props

| Name                | Type                     | Default | Description                                                      |
| ------------------- | ------------------------ | ------- | ---------------------------------------------------------------- |
| size                | `sm \| md \|lg`          | `md`    | size of Input.                                                   |
| type                | `text \| password`       | `text`  | Determine whether it is a password input                         |
| value               | `string`                 | `-`     | Binding value                                                    |
| iconPrefix          | `string`                 | `-`     | The class name of the prefix icon, following the unocss standard |
| iconSuffix          | `string`                 | `-`     | The class name of the suffix icon, following the unocss standard |
| placeholder         | `string`                 | `false` | Input's placeholder                                              |
| disabled            | `boolean`                | `false` | Disable the Input                                                |
| useCompositionInput | `boolean`                | `false` | Bind value will be updated after the composition input ends      |
| cls                 | `string`                 | `-`     | Additional class                                                 |
| attrs               | `Record<string, string>` | `{}`    | Additional attributes                                            |

## Input Events

| Name             | Description                                                        | Type                                     |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| input            | Event fired on input                                               | `(value: HTMLInputElement.value)=> void` |
| enter            | Event fired when `enter` is pressed                                | `(value: Event)=> void`                  |
| keydown          | Event fired when `keyboard` is pressed                             | `(value: Event)=> void`                  |
| change           | Event fired when the `value` is changes                            | `(value: Event)=> void`                  |
| compositionstart | The compositionstart event is fired when a text composition system | `(e: CompositionEvent)=> void`           |
| compositionend   | The compositionend event is fired when a text composition system   | `(e: CompositionEvent)=> void`           |
| compositionInput | Event fired when enable `useCompositionInput`                      | `(value: Event)=> void`                  |

## Input Slots

| Name   | Description                    |
| ------ | ------------------------------ |
| prefix | Customize input prefix content |
| suffix | Customize input suffix content |
