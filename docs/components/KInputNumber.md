---
title: KInputNumber
lang: en-US
---

# KInputNumber

Input numerical values with a customizable range.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/input-number
```

```bash [yarn]
yarn add @ikun-ui/input-number
```

```bash [npm]
npm install @ikun-ui/input-number
```

:::

## Basic usage

<demo src="input-number/basic.svelte"  github='InputNumber'></demo>

## Disabled inputNumber

Disable the input through the `disabled` attribute

<demo src="input-number/disabled.svelte"  github='InputNumber'></demo>

## Step

Allows you to define incremental steps.

<demo src="input-number/basic.svelte"  github='InputNumber'></demo>

## Step strictly

The `stepStrictly` attribute accepts a `boolean`.
if this attribute is `true`, input value can only be multiple of step.

<demo src="input-number/strictly.svelte"  github='InputNumber'></demo>

## Precision

Add `precision` attribute to set the precision of input value.

<demo src="input-number/precision.svelte"  github='InputNumber'></demo>

## Ranges

Example of limiting value through `min` and `max` attributes

<demo src="input-number/limit.svelte"  github='InputNumber'></demo>

## Sizes

Add size attribute to change the size of InputNumber. It supports `sm`, `md` and `lg`.

<demo src="input-number/size.svelte"  github='InputNumber'></demo>

## InputNumber Props

| Name                | Type                     | Default     | Description                                                          |
| ------------------- | ------------------------ | ----------- | -------------------------------------------------------------------- |
| size                | `sm \| md \|lg`          | `md`        | size of InputNumber.                                                 |
| value               | `number \| null`         | `-`         | Binding value.                                                       |
| max                 | `number`                 | `-Infinity` | The maximum allowed value.                                           |
| min                 | `number`                 | `Infinity`  | The minimum allowed value.                                           |
| step                | `number`                 | `1`         | Incremental step.                                                    |
| stepStrictly        | `boolean`                | `false`     | Whether input value can only be multiple of step.                    |
| precision           | `number \| null`         | `-`         | Precision of input value.                                            |
| disabled            | `boolean`                | `false`     | Disable the InputNumber.                                             |
| controls            | `boolean`                | `false`     | Whether to enable the control buttons.                               |
| valueOnClear        | `number \| null`         | `null`      | Value should be set when input box is cleared.                       |
| placeholder         | `string`                 | `-`         | InputNumber's placeholder                                            |
| id                  | `string`                 | `-`         | InputNumber's placeholder                                            |
| name                | `string`                 | `-`         | InputNumber's placeholder                                            |
| readonly            | `boolean`                | `false`     | InputNumber's placeholder                                            |
| append              | `string`                 | `-`         | The class name of the append button, following the unocss standard.  |
| prepend             | `string`                 | `-`         | The class name of the prepend button, following the unocss standard. |
| useCompositionInput | `boolean`                | `false`     | Bind value will be updated after the composition input ends          |
| cls                 | `string`                 | `-`         | Additional class                                                     |
| attrs               | `Record<string, string>` | `{}`        | Additional attributes                                                |

## InputNumber Events

| Name             | Description                                                                                                                        | Type                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| input            | Event fired on input                                                                                                               | `(value: number)=> void`                 |
| enter            | Event fired when `enter` is pressed                                                                                                | `(e: Event)=> void`                      |
| keydown          | Event fired when `keyboard` is pressed                                                                                             | `(e: Event)=> void`                      |
| change           | Event fired when the `value` is changes                                                                                            | `(e: Event)=> void`                      |
| compositionstart | The compositionstart event is fired when a text composition system                                                                 | `(e: CompositionEvent)=> void`           |
| compositionend   | The compositionend event is fired when a text composition system                                                                   | `(e: CompositionEvent)=> void`           |
| compositionInput | Event fired when enable `useCompositionInput`                                                                                      | `(e: CompositionEvent)=> void`           |
| triggerPrepend   | Event fired on prepend button                                                                                                      | `(value: HTMLInputElement.value)=> void` |
| triggerAppend    | Event fired on append button                                                                                                       | `(value: HTMLInputElement.value)=> void` |
| search           | When search is true and you press `enter` or click the `prepend` button or click the `append` button, the event will be triggered. | `(value: HTMLInputElement.value)=> void` |
| blur             | Triggers when Input blurs.                                                                                                         | `(e: Event)=> void`                      |
| focus            | Triggers when Input focuses.                                                                                                       | `(e: Event)=> void`                      |

## InputNumber Slots

| Name    | Description                     |
| ------- | ------------------------------- |
| append  | Customize input append content  |
| prepend | Customize input prepend content |
