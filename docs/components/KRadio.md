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

<demo src="radio/basic.svelte" github="Radio"></demo>

## Disabled radio

Set the `disabled` attribute.

<demo src="radio/disabled.svelte" github="Radio"></demo>

## Sizes

Add `size` attribute to change the size of Radio. It supports `sm`, `md` and `lg`.

<demo src="radio/sizes.svelte" github="Radio"></demo>

## Radio group

In fact, more often we use `radioGroup` to implement radio selection.

<demo src="radio/group.svelte" github="RadioGroup"></demo>

## Radio Props

| Name     | Type                     | Default | Description                                                                            |
| -------- | ------------------------ | ------- | -------------------------------------------------------------------------------------- |
| label    | `string`                 | `-`     | Label of the Radio                                                                     |
| disabled | `boolean`                | `false` | Whether the Radio is disabled                                                          |
| value    | `boolean`                | `false` | Binding value                                                                          |
| uid      | `string`                 | `-`     | The unique value of the `radio` component, must be passed when wrapped by `radioGroup` |
| size     | `sm \| md \|lg`          | `md`    | size of `radio`.                                                                       |
| cls      | `string`                 | `-`     | Additional class                                                                       |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes                                                                  |

## Radio Events

| Name        | Description                             | Type                    |
| ----------- | --------------------------------------- | ----------------------- |
| updateValue | Event fired when the `value` is changes | `(value: Event)=> void` |

## Radio Group Props

| Name     | Type                     | Default | Description                                                                           |
| -------- | ------------------------ | ------- | ------------------------------------------------------------------------------------- |
| disabled | `boolean`                | `false` | Whether the `radioGroup` is disabled                                                  |
| value    | `string \| number`       | `-`     | Binding value,Its elements must be consistent with the `uid` of the `radio` component |
| size     | `sm \| md \|lg`          | `md`    | size of `radio`.                                                                      |
| cls      | `string`                 | `-`     | Additional class                                                                      |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes                                                                 |

## Radio Group Events

| Name        | Description                             | Type                          |
| ----------- | --------------------------------------- | ----------------------------- |
| updateValue | Event fired when the `value` is changes | `(value: CustomEvent)=> void` |

## Radio Group Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| default | Please pass in the radio component |
