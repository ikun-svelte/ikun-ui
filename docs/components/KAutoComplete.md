---
title: KAutoComplete
lang: en-US
---

# KAutoComplete

Get some recommended tips based on the current input.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/auto-complete
```

```bash [yarn]
yarn add @ikun-ui/auto-complete
```

```bash [npm]
npm install @ikun-ui/auto-complete
```

:::

## Basic usage

<demo src="autocomplete/basic.svelte"  github='AutoComplete'></demo>

## Clearable

Make the AutoComplete clearable with the `clearable` attribute.

<demo src="autocomplete/clearable.svelte"  github='AutoComplete'></demo>

## Custom Render

Through `slots` you can `customize` option rendering

<demo src="autocomplete/custom.svelte"  github='AutoComplete'></demo>

## AutoComplete Props

| Name                | Type                  | Default | Description                                                              |
| ------------------- | --------------------- | ------- | ------------------------------------------------------------------------ |
| size                | `sm \| md \|lg`       | `md`    | size of AutoComplete.                                                    |
| value               | `string`              | `-`     | Binding value                                                            |
| disabled            | `boolean`             | `false` | Disable the AutoComplete                                                 |
| clearable           | `boolean`             | `false` | whether to show clear button                                             |
| placeholder         | `string`              | `false` | AutoComplete's placeholder                                               |
| append              | `string`              | `-`     | The class name of the append button icon, following the unocss standard  |
| prepend             | `string`              | `-`     | The class name of the prepend button icon, following the unocss standard |
| triggerOnFocus      | `boolean`             | `false` | Triggered when mouse is focused.                                         |
| fetchSuggestions    | `FetchSuggestionType` | `-`     | Enter suggestion callback method.                                        |
| useCompositionInput | `boolean`             | `false` | Bind value will be updated after the composition input ends              |
| clsInput            | `string`              | `''`    | Additional class for input component                                     |
| cls                 | `string`              | `''`    | Additional class for component                                           |
| attrs               | `any`                 | `{}`    | Additional attributes                                                    |

```typescript
export type FetchSuggestionType = (
	params: string | number,
	cb: (res: AutoCompleteItems[]) => void
) => void;
export type AutoCompleteItems = {
	[string]: any;
	value: string | number;
};
```

## AutoComplete Events

| Name             | Description                                                                                                                        | Type                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| updateValue      | Triggered after selecting input suggestion                                                                                         | `(value: string)=> void`                 |
| enter            | Event fired when `enter` is pressed                                                                                                | `(e: Event)=> void`                      |
| keydown          | Event fired when `keyboard` is pressed                                                                                             | `(e: Event)=> void`                      |
| change           | Event fired when the `value` is changes                                                                                            | `(e: Event)=> void`                      |
| compositionstart | The compositionstart event is fired when a text composition system                                                                 | `(e: CompositionEvent)=> void`           |
| compositionend   | The compositionend event is fired when a text composition system                                                                   | `(e: CompositionEvent)=> void`           |
| compositionInput | Event fired when enable `useCompositionInput`                                                                                      | `(e: CompositionEvent)=> void`           |
| triggerPrepend   | Event fired on prepend button                                                                                                      | `(value: HTMLInputElement.value)=> void` |
| triggerAppend    | Event fired on append button                                                                                                       | `(value: HTMLInputElement.value)=> void` |
| search           | When search is true and you press `enter` or click the `prepend` button or click the `append` button, the event will be triggered. | `(value: HTMLInputElement.value)=> void` |

## AutoComplete Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | Customize option content.             |
| prefix  | Customize AutoComplete prefix content |
| suffix  | Customize AutoComplete suffix content |
