---
title: KPopconfirm
lang: en-US
---

# KPopconfirm

The floating card popped by clicking or hovering.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/popconfirm
```

```bash [yarn]
yarn add @ikun-ui/popconfirm
```

```bash [npm]
npm install @ikun-ui/popconfirm
```

:::

## Basic usage

The most basic example. The size of the floating layer depends on the contents region.

<demo src="popconfirm/basic.svelte"  github='Popconfirm'></demo>

## Different emotion categories

Display different emotion category messages by `type` attribute.

<demo src="popconfirm/type.svelte"  github='Popconfirm'></demo>

## Different placement

Specify different display positions through the `placement` attribute

<demo src="popconfirm/placement.svelte"  github='Popconfirm'></demo>

## Icon

Change the icon through the `icon` attribute

<demo src="popconfirm/icon.svelte"  github='Popconfirm'></demo>

## Different triggers

Specify different trigger methods through the `trigger` attribute

<demo src="popconfirm/trigger.svelte"  github='Popconfirm'></demo>

## Footer Button

Make simple style modifications to the footer button

<demo src="popconfirm/btn.svelte"  github='Popconfirm'></demo>

## Async Close

Sometimes you don't want to close popconfirm immediately, but want to decide when to close it yourself

<demo src="popconfirm/async.svelte"  github='Popconfirm'></demo>

## Popconfirm Props

| Name           | Type                                             | Default   | Description                                                                                                        |
| -------------- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------ |
| icon           | `string`                                         | `-`       | The class name of the icon, following the unocss standard.                                                         |
| iconCls        | `string`                                         | `-`       | Title icon class                                                                                                   |
| disabled       | `boolean`                                        | `false`   | Whether the Radio is disabled                                                                                      |
| type           | `'success' \| 'error'    \| 'warning' \| 'info'` | `info`    | The emotion category of the `popconfirm`.                                                                          |
| cancelBtnText  | `string`                                         | `Cancel`  | cancel button text                                                                                                 |
| confirmBtnText | `string`                                         | `Confirm` | confirm button text                                                                                                |
| cancelBtnCls   | `string`                                         | `-`       | cancel button class                                                                                                |
| confirmBtnCls  | `string`                                         | `-`       | confirm button class                                                                                               |
| showCancel     | `boolean`                                        | `true`    | Whether to display a cancel button.                                                                                |
| title          | `string`                                         | `''`      | Popconfrim title.                                                                                                  |
| content        | `string`                                         | `''`      | Popconfrim content.                                                                                                |
| placement      | `'top' \| 'left' \| 'right' \| 'bottom'`         | `top`     | Where the `popover` appears                                                                                        |
| trigger        | `'manual' \| 'click' \| 'hover'`                 | `hover`   | How popovers are triggered                                                                                         |
| asyncClose     | `boolean`                                        | `false`   | When its value is true, clicking the button will not close `popconfirm`, and the user needs to control it himself. |
| cls            | `string`                                         | `''`      | Additional class for                                                                                               |
| attrs          | `Record<string, string>`                         | `{}`      | Additional attributes                                                                                              |

## Popconfirm Events

| Name    | Description                                                                                                                                | Type                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| confirm | The method when clicking the confirmation will return a `close` function, which is used to close `popconfirm` when `asyncClose` is `true`. | `(event: CustomEvent)=> void` |
| cancel  | The method when clicking the confirmation will return a `close` function, which is used to close `popconfirm` when `asyncClose` is `true`. | `(event: CustomEvent)=> void` |
| change  | Triggered when `popconfirm` displays a status change.                                                                                      | `(event: CustomEvent)=> void` |

## Popconfirm Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| default | Customize trigger content          |
| title   | Customize popover's title content  |
| content | Customize popover content          |
| footer  | Customize popover's footer content |

## Popconfirm Api

| Name  | Description                                           | Type        |
| ----- | ----------------------------------------------------- | ----------- |
| close | Used to close `popconfirm` when using slot rendering. | `()=> void` |
