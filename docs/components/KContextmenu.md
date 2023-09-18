---
title: KContextmenu
lang: en-US
---

# KContextmenu

Avatars can be used to represent people or objects. It supports images, Icons, or characters.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/contextmenu
```

```bash [yarn]
yarn add @ikun-ui/contextmenu
```

```bash [npm]
npm install @ikun-ui/contextmenu
```

:::

## Basic usage

Contextmenu contains three components, they are `KContextmenu`, `KContextItem`, `KContextSubmenu`
Write a simple contextmenu

<demo src="contextmenu/basic.svelte"  github='Contextmenu'></demo>

## Disable item

Disable an item using the `disabled` attribute

<demo src="contextmenu/disabled.svelte" github='Contextmenu'></demo>

## Divider

Use the `divider` attribute to turn the item into a dividing line

<demo src="contextmenu/divider.svelte" github='Contextmenu'></demo>

## Sub menu

Use `KContextmenuSubMenu` to create a sub menu

<demo src="contextmenu/sub.svelte" github='Contextmenu'></demo>

## Contextmenu Props

| Name     | Type                     | Default | Description             |
| -------- | ------------------------ | ------- | ----------------------- |
| disabled | `boolean`                | `false` | Disable the contextmenu |
| cls      | `string`                 | `''`    | Additional class for    |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes   |

## Contextmenu Events

| Name        | Description                                                      | Type                          |
| ----------- | ---------------------------------------------------------------- | ----------------------------- |
| change      | Triggered when the KContextmenu component is displayed or closed | `(value: CustomEvent)=> void` |
| contextmenu | Triggered when right clicked.                                    | `(event: CustomEvent)=> void` |

## Contextmenu Slots

| Name    | Description                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------- |
| default | Customize default content, Please pass in the `KContextmenu` component or `KContextmenuSubMenu` component |

## Contextmenu Item Props

| Name     | Type                     | Default | Description                  |
| -------- | ------------------------ | ------- | ---------------------------- |
| divider  | `boolean`                | `false` | Shown as dividing line       |
| disabled | `boolean`                | `false` | Disable the contextmenu item |
| cls      | `string`                 | `''`    | Additional class for         |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes        |

## Contextmenu Item Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |

## Contextmenu Sub Menu Props

| Name     | Type                     | Default | Description                  |
| -------- | ------------------------ | ------- | ---------------------------- |
| title    | `string`                 | `-`     | The title of the submenu     |
| disabled | `boolean`                | `false` | Disable the contextmenu item |
| cls      | `string`                 | `''`    | Additional class for         |
| attrs    | `Record<string, string>` | `{}`    | Additional attributes        |

## Contextmenu Sub Menu Slots

| Name    | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| default | Customize default content, Please pass in the `KContextmenu` component |
