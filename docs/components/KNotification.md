---
title: KNotification
lang: en-US
---

# KNotification

Display a notification message globally.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/notify
```

```bash [yarn]
yarn add @ikun-ui/notify
```

```bash [npm]
npm install @ikun-ui/notify
```

:::

## Basic usage

Determine the display position by setting the `placement` option

<demo src="notification/basic.svelte" github="Notification"></demo>

## Different emotion categories

Display different emotion category notifications by calling different methods

::: tip
The method of `NotifyInst.info/success/error/warning` takes precedence over `options.type`.
:::

<demo src="notification/type.svelte" github="Notification"></demo>

## Closable notification

Through the options, you can set whether the notification can be closed,
the duration of existence, automatic close and close callback

<demo src="notification/close.svelte" github="Notification"></demo>

## notification with offset

Sometimes you may need the notification to be slightly offset by a distance in the y-axis direction

<demo src="notification/offset.svelte" github="Notification"></demo>

## Update the notification

<demo src="notification/update.svelte" github="Notification"></demo>

## Custom title and content

You can render content through slots

<demo src="notification/custom.svelte" github="Notification"></demo>

## Notification Options

| Name      | Type                                                        | Default     | Description                                                                             |
| --------- | ----------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| placement | `'right-top' / 'left-top' / 'right-bottom' / 'left-bottom'` | `right-top` | Where the notification appears                                                          |
| close     | `boolean`                                                   | `false`     | Whether the notification can be closed manually                                         |
| autoClose | `boolean`                                                   | `false`     | Whether the notification is automatically closed                                        |
| duration  | `number`                                                    | `3000`      | Notification's auto-close timing (only when `autoClose = true`) takes effect            |
| onClose   | `IKunUncertainFunction`                                     | `-`         | The callback method when the notification is closed                                     |
| type      | `'info' / 'warning'  'error' / 'success'`                   | `-`         | The emotion category of the notification                                                |
| offset    | `number`                                                    | `0`         | Notification is offset on the y-axis                                                    |
| title     | `string / SvelteComponent`                                  | `-`         | The title content of the notification, which can be a html string or a svelte component |
| content   | `string / SvelteComponent`                                  | `-`         | The content of the notification, which can be a html string or a svelte component       |
| cls       | `string`                                                    | `-`         | Additional class                                                                        |
| attrs     | `Record<string, string>`                                    | `{}`        | Additional attributes                                                                   |

## Notification Api

| Name             | Type                                                                  | Description                                                                                                        |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| KNotify          | `<T, C>(options: NotifyOptions<T, C>)=>NotifyInst`                    | Render a `notification` according to the incoming options and return the `notification` instance                   |
| KNotify.info     | `<T, C>(options: NotifyOptions<T, C>)=>NotifyInst`                    | Render a `notification` of `info` type according to the incoming options and return the `notification` instance    |
| KNotify.warning  | `<T, C>(options: NotifyOptions<T, C>)=>NotifyInst`                    | Render a `notification` of `warning` type according to the incoming options and return the `notification` instance |
| KNotify.success  | `<T, C>(options: NotifyOptions<T, C>)=>NotifyInst`                    | Render a `notification` of `success` type according to the incoming options and return the `notification` instance |
| KNotify.error    | `<T, C>(options: NotifyOptions<T, C>)=>NotifyInst`                    | Render a `notification` of `error` type according to the incoming options and return the `notification` instance   |
| KNotify.update   | `<T, C>(inst: typeof NotifyInst, options: NotifyOptions<T, C>)=>void` | Update the specified notification                                                                                  |
| KNotify.clearAll | `() => void`                                                          | Clear all notifications                                                                                            |
| KNotify.clear    | `(inst: typeof NotifyInst) => void`                                   | Clear the specified notification                                                                                   |
