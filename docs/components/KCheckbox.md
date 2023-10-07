---
title: KCheckbox
lang: en-US
---

# KCheckbox

A group of options for multiple choices.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/checkbox
```

```bash [yarn]
yarn add @ikun-ui/checkbox
```

```bash [npm]
npm install @ikun-ui/checkbox
```

:::

## Basic usage

Checkbox can be used alone to switch between two states.

<demo src="checkbox/basic.svelte" github="Checkbox"></demo>

## Disabled checkbox

Set the `disabled` attribute.

<demo src="checkbox/disabled.svelte" github="Checkbox"></demo>

## Sizes

Add `size` attribute to change the size of Checkbox. It supports `sm`, `md` and `lg`.

<demo src="checkbox/sizes.svelte" github="Checkbox"></demo>

## Checkbox group

It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.  
Bind an array of string or number type to the `checkboxGroup` component and pass the checkbox component as a slot.
At the same time, `uid` must be passed to the `checkbox` component to mark its uniqueness.

<demo src="checkbox/group.svelte" github="CheckboxGroup"></demo>

## Indeterminate

The `indeterminate` property can help you to achieve a 'check all' effect.

<demo src="checkbox/indeterminate.svelte" github="CheckboxGroup"></demo>

## Checkbox Props

| Name          | Type                     | Default | Description                                                                                  |
| ------------- | ------------------------ | ------- | -------------------------------------------------------------------------------------------- |
| label         | `string`                 | `-`     | Label of the `checkbox`                                                                      |
| value         | `boolean`                | `false` | Binding value                                                                                |
| uid           | `string`                 | `-`     | The unique value of the `checkbox` component, must be passed when wrapped by `checkboxGroup` |
| size          | `sm \| md \| lg`          | `md`    | size of `checkbox`.                                                                          |
| disabled      | `boolean`                | `false` | Whether the `checkbox` is disabled                                                           |
| indeterminate | `boolean`                | `false` | Determine whether it is an intermediate state                                                |
| cls           | `string`                 | `-`     | Additional class                                                                             |
| attrs         | `Record<string, string>` | `{}`    | Additional attributes                                                                        |

## Checkbox Events

| Name        | Description                             | Type                    |
| ----------- | --------------------------------------- | ----------------------- |
| updateValue | Event fired when the `value` is changes | `(value: Event)=> void` |

## Checkbox Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Customize label content |

## Checkbox Group Props

| Name     | Type                      | Default | Description                                                                              |
| -------- | ------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| value    | `Array<string \| number>` | `-`     | Binding value,Its elements must be consistent with the `uid` of the `checkbox` component |
| size     | `sm \| md \| lg`           | `md`    | size of `checkbox`                                                                       |
| disabled | `boolean`                 | `false` | Whether the `checkboxGroup` is disabled                                                  |
| cls      | `string`                  | `-`     | Additional class                                                                         |
| attrs    | `Record<string, string>`  | `{}`    | Additional attributes                                                                    |

## Checkbox Group Events

| Name        | Description                             | Type                          |
| ----------- | --------------------------------------- | ----------------------------- |
| updateValue | Event fired when the `value` is changes | `(value: CustomEvent)=> void` |

## Checkbox Group Slots

| Name    | Description                             |
| ------- | --------------------------------------- |
| default | Please pass in the `checkbox` component |
