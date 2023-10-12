---
title: KVirtualList
lang: en-US
---

# KVirtualList

A simple virtual list, useful when rendering large amounts of data.

> The code implementation of `KVirtualList` comes from [svelte-virtual-scroll-list <span class="i-carbon-link text-12px" />](https://github.com/v1ack/svelte-virtual-scroll-list)

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/virtual-list
```

```bash [yarn]
yarn add @ikun-ui/virtual-list
```

```bash [npm]
npm install @ikun-ui/virtual-list
```

:::

## Basic usage

Without further ado, please take a look at the demo

<demo src="virtual-list/basic.svelte"  github='VirtualList'></demo>

## Different heights

You can set different heights for `item` according to your needs.

<demo src="virtual-list/height.svelte"  github='VirtualList'></demo>

## Horizontal virtual lists

`isHorizontal` can control the display of horizontal virtual lists.

<demo src="virtual-list/horizontal.svelte"  github='VirtualList'></demo>

## Custom rendering header and footer

Slots allow you to add content at the top and bottom of the list.

<demo src="virtual-list/slot.svelte"  github='VirtualList'></demo>

## Scroll to bottom

KVirtualList provides some APIs, such as `scrollToBottom`.

<demo src="virtual-list/bottom.svelte"  github='VirtualList'></demo>

## VirtualList Props

| Name            | Type                         | Default | Description                                                        |
| --------------- | ---------------------------- | ------- | ------------------------------------------------------------------ |
| data            | `Array<Record<string, any>>` | `-`     | Source for list.                                                   |
| key             | `string`                     | `'id'`  | Unique key for getting data from `data`                            |
| keeps           | `number`                     | `30`    | Count of rendered items                                            |
| estimateSize    | `number`                     | `50`    | Estimate size of each item, needs for smooth scrollbar.            |
| isHorizontal    | `boolean`                    | `false` | Scroll direction.                                                  |
| start           | `number`                     | `0`     | Scroll position start index                                        |
| offset          | `number`                     | `0`     | Scroll position offset                                             |
| topThreshold    | `number`                     | `0`     | The threshold to emit `top` event, attention to multiple calls.    |
| bottomThreshold | `number`                     | `0`     | The threshold to emit `bottom` event, attention to multiple calls. |
| cls             | `string`                     | `''`    | Additional class for component                                     |
| attrs           | `Record<string, string>`     | `{}`    | Additional attributes                                              |

## VirtualList Events

| Name   | Description                                  | Type                                                 |
| ------ | -------------------------------------------- | ---------------------------------------------------- |
| scroll | trigger when scroll.                         | `(data: {event: CustomEvent, range: VRange})=> void` |
| top    | Fires when the scroll bar reaches the top    | `()=> void`                                          |
| bottom | Fires when the scroll bar reaches the bottom | `()=> void`                                          |

```typescript
declare interface VRange {
	start: number;
	end: number;
	padFront: number;
	padBehind: number;
}
```

## VirtualList Slots

| Name    | Description                   |
| ------- | ----------------------------- |
| default | Customize item content        |
| footer  | Customize footer item content |
| header  | Customize header item content |

## VirtualList Api

| method         | arguments              | description                                                |
| -------------- | ---------------------- | ---------------------------------------------------------- |
| scrollToBottom | `none`                 | Scroll list to bottom                                      |
| scrollToIndex  | `index: number`        | Set scroll position to a designated index                  |
| scrollToOffset | `offset: number`       | Set scroll position to a designated offset                 |
| getSize        | `id: typeof props.key` | Get the designated item size                               |
| getSizes       | `none`                 | Get the total number of stored (rendered) items            |
| getOffset      | `none`                 | Get current scroll offset                                  |
| getClientSize  | `none`                 | Get wrapper element client viewport size (width or height) |
| getScrollSize  | `none`                 | Get all scroll size (scrollHeight or scrollWidth)          |
