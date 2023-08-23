---
title: KMessageBox
lang: en-US
---

# KMessageBox

A set of modal boxes simulating system message box, mainly for alerting information, confirm operations and prompting messages.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/message-box
```

```bash [yarn]
yarn add @ikun-ui/message-box
```

```bash [npm]
npm install @ikun-ui/message-box
```

:::

## Basic usage

<demo src="../../../../example/message-box/basic.svelte" github="MessageBox"></demo>

## Alert MessageBox

`Alert MessageBox` is used for message notification type scenarios

<demo src="../../../../example/message-box/alert.svelte" github="MessageBox"></demo>

## Confirm MessageBox

`Confirm MessageBox` is used in scenarios where confirmation messages are required

<demo src="../../../../example/message-box/confirm.svelte" github="MessageBox"></demo>

Display different emotion category `message box` by `emoType` attributes

<demo src="../../../../example/message-box/type.svelte" github="MessageBox"></demo>

## Prompt MessageBox

`Prompt MessageBox` is used for scenarios where you need to confirm a message and fill out a simple form

::: tip
`inputErrorMessage` and `inputValidator` properties can be verified
:::

<demo src="../../../../example/message-box/prompt.svelte" github="MessageBox"></demo>

## Customize button text

The `cancelBtnText` and `confirmBtnText` attributes set the button text

<demo src="../../../../example/message-box/btn-text.svelte" github="MessageBox"></demo>

## Custom title and content

You can render `content` and `title` through slots

::: tip
When customizing the `title` and `content`,
if you want to perform form validation, then you can handle it yourself through the `onConfirm` event.
:::

<demo src="../../../../example/message-box/custom.svelte" github="MessageBox"></demo>

## MessageBox Options

| Name              | Type                                      | Default   | Description                                                                                                                                              |
| ----------------- | ----------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type              | `'confirm' / 'alert'/ 'prompt'`           | `-`       | The category of the message box                                                                                                                          |
| emoType           | `'info' / 'warning'  'error' / 'success'` | `-`       | The emotion category of the message box (only `type='confirm'`)                                                                                          |
| title             | `string / SvelteComponent`                | `-`       | The title content of the message box, which can be a html string or a svelte component                                                                   |
| content           | `string / SvelteComponent`                | `-`       | The content of the message box, which can be a html string or a svelte component                                                                         |
| cancelBtnText     | `string`                                  | `Cancel`  | cancel button text (only `type != 'alert'`)                                                                                                              |
| confirmBtnText    | `string`                                  | `Confirm` | confirm button text                                                                                                                                      |
| cancelBtnCls      | `string`                                  | `-`       | cancel button class (only `type != 'alert'`)                                                                                                             |
| confirmBtnCls     | `string`                                  | `-`       | confirm button class                                                                                                                                     |
| onConfirm         | `((r?: boolean, v?: string) => void)`     | `-`       | The callback method when the confirm, Only `type='prompt'` will return parameters, `r` represents the verification result, `v` represents the input data |
| onCancel          | `IKunUncertainFunction`                   | `-`       | The callback method when the cancel                                                                                                                      |
| layout            | `'center' / 'right'`                      | `-`       | confirm button and cancel button layout                                                                                                                  |
| inputValidator    | `RegExp / (v: string) => boolean`         | `-`       | validation function for the input. (only `type='confirm'`)                                                                                               |
| inputErrorMessage | `string`                                  | `-`       | error message when validation fails (only `type='confirm'`)                                                                                              |
| inputPlaceholder  | `string`                                  | `-`       | input placeholder (only `type='confirm'`)                                                                                                                |
| cls               | `string`                                  | `-`       | Additional class                                                                                                                                         |
| attrs             | `any`                                     | `{}`      | Additional attributes                                                                                                                                    |

## MessageBox Api

| Name            | Type                                             | Description                                                                                                      |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| KMsgBox         | `<T,C>(options: MsgBoxOptions<T,C>)=>MsgBoxInst` | Render a `message box` according to the incoming options and return the `message box` instance                   |
| KMsgBox.confirm | `<T,C>(options: MsgBoxOptions<T,C>)=>MsgBoxInst` | Render a `message box` of `confirm` type according to the incoming options and return the `message box` instance |
| KMsgBox.alert   | `<T,C>(options: MsgBoxOptions<T,C>)=>MsgBoxInst` | Render a `message box` of `alert` type according to the incoming options and return the `message box` instance   |
| KMsgBox.prompt  | `<T,C>(options: MsgBoxOptions<T,C>)=>MsgBoxInst` | Render a `message box` of `prompt` type according to the incoming options and return the `message box` instance  |
