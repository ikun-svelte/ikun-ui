---
title: KRadio
lang: en-US
---

# KRadio

Single selection among multiple options.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/radio
```

```bash [yarn]
yarn add @ikun-ui/radio
```

```bash [npm]
npm install @ikun-ui/radio
```

:::

## Basic usage

Radio should not have too many options. Otherwise, use the Select component instead.

<demo src="../../../../example/radio/basic.svelte" github="Radio"></demo>

## Disabled radio

Set the `disabled` attribute.

<demo src="../../../../example/radio/disabled.svelte" github="Radio"></demo>

## Radio Props

| Name     | Type      | Default | Description                   |
| -------- | --------- | ------- | ----------------------------- |
| label    | `string`  | `-`     | Label of the Radio            |
| disabled | `boolean` | `false` | Whether the Radio is disabled |
| value    | `boolean` | `false` | Binding value                 |
| cls      | `string`  | `-`     | Additional class              |
| attrs    | `any`     | `{}`    | Additional attributes         |

## Radio Events

| Name        | Description                             | Type                    |
| ----------- | --------------------------------------- | ----------------------- |
| updateValue | Event fired when the `value` is changes | `(value: Event)=> void` |
