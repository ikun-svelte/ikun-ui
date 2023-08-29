---
title: KSelect
lang: en-US
---

# KSelect

Select component to select value from options.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/select
```

```bash [yarn]
yarn add @ikun-ui/select
```

```bash [npm]
npm install @ikun-ui/select
```

:::

## Basic usage

<demo src="../../../../example/select/basic.svelte" github="Select"></demo>

## Prefix icon and suffix icon select

Set the prefix through the icon attribute

<demo src="../../../../example/select/prefix.svelte" github="Select"></demo>

## Disabled select

Disable the select through the disabled attribute

<demo src="../../../../example/select/disabled.svelte" github="Select"></demo>

## Select Props

| Name        | Type                     | Default | Description                                                      |
| ----------- | ------------------------ | ------- | ---------------------------------------------------------------- |
| value       | `string`                 | `-`     | Binding value                                                    |
| iconPrefix  | `string`                 | `-`     | The class name of the prefix icon, following the unocss standard |
| iconSuffix  | `string`                 | `-`     | The class name of the suffix icon, following the unocss standard |
| placeholder | `string`                 | `false` | Select's placeholder                                             |
| disabled    | `boolean`                | `false` | Disable the Select                                               |
| cls         | `string`                 | `-`     | Additional class                                                 |
| attrs       | `Record<string, string>` | `{}`    | Additional attributes                                            |

## Select Events

| Name        | Description           | Type                                      |
| ----------- | --------------------- | ----------------------------------------- |
| updateValue | Event fired on select | `(value: HTMLSelectElement.value)=> void` |

## Select Slots

| Name   | Description                     |
| ------ | ------------------------------- |
| prefix | Customize select prefix content |
| suffix | Customize select suffix content |
