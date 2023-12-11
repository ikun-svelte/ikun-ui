---
title: KDropdown
lang: en-US
---

# KDropdown

Toggleable menu for displaying lists of links and actions.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/dropdown
```

```bash [yarn]
yarn add @ikun-ui/dropdown
```

```bash [npm]
npm install @ikun-ui/dropdown
```

:::

## Basic usage

<demo src="dropdown/basic.svelte"  github='Dropdown'></demo>

## Trigger mode

Like `KPopover`, the trigger method is set through the trigger attribute

<demo src="dropdown/trigger.svelte" github='Dropdown'></demo>

## Dropdown hiding behavior

Use `hideOnClick` to define if dropdown closes on clicking.

<demo src="dropdown/behavior.svelte" github='Dropdown'></demo>

## Command event

Clicking each dropdown item fires an event whose parameter is assigned by each item.

<demo src="dropdown/command.svelte" github='Dropdown'></demo>

## External control

Control opening and closing through `handleOpen` and `handleOpen`

<demo src="dropdown/control.svelte" github='Dropdown'></demo>

## Dropdown Props

| Name        | Type                                     | Default  | Description                                                          |
| ----------- | ---------------------------------------- | -------- | -------------------------------------------------------------------- |
| placement   | `'top' \| 'left' \| 'right' \| 'bottom'` | `bottom` | Where the `dropdown` appears                                         |
| trigger     | `'manual' \| 'click' \| 'hover'`         | `hover`  | How `dropdown` are triggered                                         |
| disabled    | `boolean`                                | `false`  | Whether the dropdown is disabled.                                    |
| hideOnClick | `boolean`                                | `true`   | Whether to hide dropdown after clicking `dropdown-item`.             |
| maxHeight   | `number`                                 | `-`      | the max height of dropdown.                                          |
| role        | `string`                                 | `menu`   | The ARIA role attribute for the dropdown. Depending on the use case. |
| tabindex    | `number`                                 | `0`      | tabindex of `dropdown`.                                              |
| cls         | `string`                                 | `''`     | Additional class for component                                       |
| attrs       | `Record<string, string>`                 | `{}`     | Additional attributes                                                |

## Dropdown Events

| Name    | Description                                     | Type                            |
| ------- | ----------------------------------------------- | ------------------------------- |
| change  | Triggered when dropdown display status changes. | `(show: CustomEvent)=> void`    |
| command | Triggered when dropdown item is clicked.        | `(command: CustomEvent)=> void` |

## Dropdown Api

| Name        | Description         | Type        |
| ----------- | ------------------- | ----------- |
| handleOpen  | Open the dropdown.  | `()=> void` |
| handleClose | Close the dropdown. | `()=> void` |

## Dropdown Slots

| Name     | Description                |
| -------- | -------------------------- |
| default  | Customize default content  |
| dropdown | Customize dropdown content |

## Dropdown Item Props

| Name     | Type                     | Default  | Description                                              |
| -------- | ------------------------ | -------- | -------------------------------------------------------- |
| command  | `string`                 | `bottom` | Where the `dropdown` appears                             |
| disabled | `boolean`                | `false`  | Whether the dropdown is disabled.                        |
| divider  | `boolean`                | `false`  | Whether to hide dropdown after clicking `dropdown-item`. |
| cls      | `string`                 | `''`     | Additional class for component                           |
| attrs    | `Record<string, string>` | `{}`     | Additional attributes                                    |

## Dropdown Item Slots

| Name     | Description                |
| -------- | -------------------------- |
| default  | Customize default content  |
| dropdown | Customize dropdown content |
