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

<demo src="../../../../example/checkbox/basic.svelte" github="Checkbox"></demo>

## Disabled checkbox

Set the `disabled` attribute.

<demo src="../../../../example/checkbox/disabled.svelte" github="Checkbox"></demo>

## Checkbox group

It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.  
Bind an array of string or number type to the `checkbox-group` component and pass the checkbox component as a slot.
At the same time, `uid` must be passed to the `checkbox` component to mark its uniqueness.

<demo src="../../../../example/checkbox/group.svelte" github="CheckboxGroup"></demo>

## Indeterminate

The `indeterminate` property can help you to achieve a 'check all' effect.

<demo src="../../../../example/checkbox/indeterminate.svelte" github="CheckboxGroup"></demo>

## Checkbox Props

| Name          | Type                     | Default | Description                                                                          |
| ------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------ |
| label         | `string`                 | `-`     | Label of the Checkbox                                                                |
| disabled      | `boolean`                | `false` | Whether the Checkbox is disabled                                                     |
| value         | `boolean`                | `false` | Binding value                                                                        |
| uid           | `string`                 | `-`     | The unique value of the tag component, must be passed when wrapped by checkbox-group |
| indeterminate | `boolean`                | `false` | Determine whether it is an intermediate state                                        |
| cls           | `string`                 | `-`     | Additional class                                                                     |
| attrs         | `Record<string, string>` | `{}`    | Additional attributes                                                                |

## Checkbox Events

| Name        | Description                             | Type                    |
| ----------- | --------------------------------------- | ----------------------- |
| updateValue | Event fired when the `value` is changes | `(value: Event)=> void` |

## Checkbox Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Customize label content |

## Checkbox Group Props

| Name     | Type                      | Default | Description                              |
| -------- | ------------------------- | ------- | ---------------------------------------- |
| disabled | `boolean`                 | `false` | Whether the `checkbox-gropp` is disabled |
| value    | `Array<string \| number>` | `-`     | Binding value                            |
| cls      | `string`                  | `-`     | Additional class                         |
| attrs    | `Record<string, string>`  | `{}`    | Additional attributes                    |

## Checkbox Group Events

| Name        | Description                             | Type                          |
| ----------- | --------------------------------------- | ----------------------------- |
| updateValue | Event fired when the `value` is changes | `(value: CustomEvent)=> void` |

## Checkbox Group Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | Please pass in the checkbox component |
