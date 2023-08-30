---
title: KMessage
lang: en-US
---

# KMessage

Display global messages as feedback in response to user operations.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/message
```

```bash [yarn]
yarn add @ikun-ui/message
```

```bash [npm]
npm install @ikun-ui/message
```

:::

## Basic usage

Determine the display position by setting the `placement` option

<demo src="../../../../example/message/basic.svelte" github="Message"></demo>

## Different emotion categories

Display different emotion category messages by calling different methods

::: tip
The method of `MessageInst.info/success/error/warning` takes precedence over `options.type`.
:::

<demo src="../../../../example/message/type.svelte" github="Message"></demo>

## Closable message

Through the options, you can set whether the message can be closed,
the duration of existence, automatic close and close callback

<demo src="../../../../example/message/close.svelte" github="Message"></demo>

## message with offset

Sometimes you may need the message to be slightly offset by a distance in the y-axis direction

<demo src="../../../../example/message/offset.svelte" github="Message"></demo>

## Update the message

<demo src="../../../../example/message/update.svelte" github="Message"></demo>

## Custom content

You can render content through slots

<demo src="../../../../example/message/custom.svelte" github="Message"></demo>

## Message Options

| Name      | Type                                                        | Default     | Description                                                                        |
| --------- | ----------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| placement | `'right-top' / 'left-top' / 'right-bottom' / 'left-bottom'` | `right-top` | Where the message appears                                                          |
| close     | `boolean`                                                   | `false`     | Whether the message can be closed manually                                         |
| autoClose | `boolean`                                                   | `false`     | Whether the message is automatically closed                                        |
| duration  | `number`                                                    | `3000`      | Message's auto-close timing (only when `autoClose = true`) takes effect            |
| onClose   | `IKunUncertainFunction`                                     | `-`         | The callback method when the message is closed                                     |
| type      | `'info' / 'warning'  'error' / 'success'`                   | `-`         | The emotion category of the message                                                |
| offset    | `number`                                                    | `0`         | Message is offset on the y-axis                                                    |
| title     | `string / SvelteComponent`                                  | `-`         | The title content of the message, which can be a html string or a svelte component |
| content   | `string / SvelteComponent`                                  | `{}`        | The content of the message, which can be a html string or a svelte component       |
| cls       | `string`                                                    | `-`         | Additional class                                                                   |
| attrs     | `Record<string, string>`                                    | `{}`        | Additional attributes                                                              |

## Message Api

| Name              | Type                                                              | Description                                                                                              |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| KMessage          | `<T>(options: MessageOptions<T>)=>MessageInst`                    | Render a `message` according to the incoming options and return the `message` instance                   |
| KMessage.info     | `<T>(options: MessageOptions<T>)=>MessageInst`                    | Render a `message` of `info` type according to the incoming options and return the `message` instance    |
| KMessage.warning  | `<T>(options: MessageOptions<T>)=>MessageInst`                    | Render a `message` of `warning` type according to the incoming options and return the `message` instance |
| KMessage.success  | `<T>(options: MessageOptions<T>)=>MessageInst`                    | Render a `message` of `success` type according to the incoming options and return the `message` instance |
| KMessage.error    | `<T>(options: MessageOptions<T>)=>MessageInst`                    | Render a `message` of `error` type according to the incoming options and return the `message` instance   |
| KMessage.update   | `<T>(inst: typeof MessageInst, options: MessageOptions<T>)=>void` | Update the specified message                                                                             |
| KMessage.clearAll | `() => void`                                                      | Clear all messages                                                                                       |
| KMessage.clear    | `(inst: typeof MessageInst) => Promise<void>`                     | Clear the specified message                                                                              |
