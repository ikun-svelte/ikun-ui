---
title: KAlert
lang: en-US
---

# KAlert

Displays important alert messages.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/alert
```

```bash [yarn]
yarn add @ikun-ui/alert
```

```bash [npm]
npm install @ikun-ui/alert
```

:::

## Basic usage

Alert components are non-overlay elements in the page that does not disappear automatically.

Alert provides 4 types of themes defined by `type`, whose default value is `info`.

<demo src="alert/basic.svelte"  github='Alert'></demo>

## Customizable Close Button

Customize the close button as texts or other symbols.

Alert allows you to configure if it's closable. The close button text and closing callbacks are also customizable. `closable` attribute decides if the component can be closed or not. It accepts boolean, and the default is true. `close` event fires when the component is closed.

In addition, `close slot` will cover `closeIcon`.

<demo src="alert/close-button.svelte" github='Alert'></demo>

## With Icon

Displaying an icon improves readability.

Setting the `showIcon` attribute displays an icon that corresponds with the current Alert type.

In addition, `icon slot` will cover `icon`.

<demo src="alert/icon.svelte" github='Alert'></demo>

## With Description

Description includes a message with more detailed information.

Besides the `title` attribute, you can add a `description` attribute to help you describe the alert with more details. Description can only store text string, and it will word wrap automatically.

<demo src="alert/description.svelte" github='Alert'></demo>

## Alert Props

| Name        | Type                                     | Default          | Description                                                |
| ----------- | ---------------------------------------- | ---------------- | ---------------------------------------------------------- |
| type        | `success` / `error` / `warning` / `info` | `info`           | alert type.                                                |
| title       | `string`                                 | `''`             | alert title.                                               |
| description | `string`                                 | `''`             | descriptive text.                                          |
| showIcon    | `boolean`                                | `false`          | whether a type icon is displayed.                          |
| icon        | `string`                                 | `''`             | The class name of the icon, following the unocss standard. |
| closable    | `boolean`                                | `true`           | whether alert can be dismissed.                            |
| closeIcon   | `string`                                 | `i-carbon-close` | customized close icon.                                     |
| cls         | `string`                                 | `''`             | Additional class for component                             |
| attrs       | `any`                                    | `{}`             | Additional attributes                                      |

## Alert Events

| Name  | Description                   | Type                           |
| ----- | ----------------------------- | ------------------------------ |
| close | trigger when alert is closed. | `(event: PointerEvent)=> void` |

## Alert Slots

| Name    | Description                 |
| ------- | --------------------------- |
| default | content of the description. |
| title   | content of the title.       |
| icon    | content of the icon.        |
| close   | content of the close.       |
