---
title: KSwitch
lang: en-US
---

# KSwitch

Use Switch to store contents.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/switch
```

```bash [yarn]
yarn add @ikun-ui/switch
```

```bash [npm]
npm install @ikun-ui/switch
```

:::

## Basic usage

<demo src="switch/basic.svelte" github="Switch"></demo>

## Disabled switch

Use `disabled` attribute to determine whether a switch is disabled.

<demo src="switch/disabled.svelte" github="Switch"></demo>

## Loading switch

Use `disabled` attribute to determine whether a switch is loading.

<demo src="switch/loading.svelte" github="Switch"></demo>

## Custom color switch

<demo src="switch/color.svelte" github="Switch"></demo>

## Custom switch value

<demo src="switch/value.svelte" github="Switch"></demo>

## Custom switch render

<demo src="switch/render.svelte" github="Switch"></demo>

## Switch Props

| Name           | Type                        | Default | Description                  |
| -------------- | --------------------------- | ------- | ---------------------------- |
| value          | `boolean`                   | `false` | Binding value                |
| unCheckedValue | `string / number / boolean` | `false` | UnChecked state switch value |
| checkedValue   | `string / number / boolean` | `true`  | Checked state switch value   |
| disabled       | `boolean`                   | `-`     | Disabled the switch          |
| loading        | `boolean`                   | `-`     | Loading state switch         |
| unCheckedColor | `string`                    | `-`     | unChecked state switch color |
| checkedColor   | `string`                    | `-`     | Checked state switch color   |
| cls            | `string`                    | `-`     | Additional class             |
| attrs          | `Record<string, string>`    | `{}`    | Additional attributes        |

## Switch Events

| Name        | Description                                              | Type                    |
| ----------- | -------------------------------------------------------- | ----------------------- |
| click       | Triggered when the `switch` is clicked                   | `(value: Event)=> void` |
| updateValue | Triggered when the value in the `switch` binding changes | `(value: Event)=> void` |
| change      | Triggered when the value in the `switch` binding changes | `(value: Event)=> void` |

## Switch Slots

| Name            | Description                                    |
| --------------- | ---------------------------------------------- |
| unCheckedRender | Customize content of the uncheked state switch |
| checkedRender   | Customize content of the cheked state switch   |
