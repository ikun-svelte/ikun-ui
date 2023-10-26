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

<demo src="select/basic.svelte" github="Select"></demo>

## Prefix icon and suffix icon select

Set the prefix through the `icon` attribute

<demo src="select/prefix.svelte" github="Select"></demo>

## Disabled select

Disable the select through the `disabled` attribute

<demo src="select/disabled.svelte" github="Select"></demo>

## Clearable select

Clear the select value through the `clearable` attribute

<demo src="select/clearable.svelte" github="Select"></demo>

## Binding Object

`k-select` supports binding objects,
but you need to set the `labelKey` attribute and `key` attribute

<demo src="select/object.svelte" github="Select"></demo>

## Custom Render

Through `slots` you can customize `option` rendering

<demo src="select/custom.svelte" github="Select"></demo>

## Virtual Render

`k-select` is implemented based on virtual lists to support high-performance rendering

<demo src="select/virtual.svelte" github="Select"></demo>

## Remote Search

`k-select` provides basic remote search capabilities

<demo src="select/remote.svelte" github="Select"></demo>

## Select Props

| Name          | Type                                                 | Default                 | Description                                                                                                         |
| ------------- | ---------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| value         | `string \| number \| Record<string, any>`            | `-`                     | Binding value                                                                                                       |
| dataList      | `string[] \| number[] \| Array<Record<string, any>>` | `[]`                    | Render list data                                                                                                    |
| iconPrefix    | `string`                                             | `-`                     | The class name of the prefix icon, following the unocss standard                                                    |
| iconSuffix    | `string`                                             | `-`                     | The class name of the suffix icon, following the unocss standard                                                    |
| placeholder   | `string`                                             | `'Please select value'` | Select's placeholder                                                                                                |
| maxHeight     | `number`                                             | `250`                   | Display scroll bars above this height                                                                               |
| labelKey      | `string`                                             | `'label'`               | Required when `value` is an object, specify the field of "label"                                                    |
| valueKey      | `string`                                             | `'value'`               | When `value` is an object, specify the field of "value"                                                             |
| key           | `string`                                             | `'id'`                  | Required when `value` is an object. It is the unique identifier of the object. It will be used in the virtual list. |
| disabled      | `boolean`                                            | `false`                 | Disable the Select                                                                                                  |
| clearable     | `boolean`                                            | `false`                 | Decide if it can be cleared                                                                                         |
| fitInputWidth | `boolean`                                            | `true`                  | Determine whether the width of the option is limited to be consistent with the selection box                        |
| cls           | `string`                                             | `-`                     | Additional class                                                                                                    |
| attrs         | `Record<string, string>`                             | `{}`                    | Additional attributes                                                                                               |

## Select Events

| Name        | Description           | Type                                      |
| ----------- | --------------------- | ----------------------------------------- |
| updateValue | Event fired on select | `(value: HTMLSelectElement.value)=> void` |

## Select Slots

| Name    | Description                     |
| ------- | ------------------------------- |
| prefix  | Customize select prefix content |
| suffix  | Customize select suffix content |
| default | Customize option content        |
