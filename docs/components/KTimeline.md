---
title: KTimeline
lang: en-US
---

# KTimeline

Vertical display timeline.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/timeline
```

```bash [yarn]
yarn add @ikun-ui/timeline
```

```bash [npm]
npm install @ikun-ui/timeline
```

:::

## Basic usage

Basic timeline.

<demo src="timeline/basic.svelte"  github='Timeline'></demo>

## Color

Set the color of circles.

<demo src="timeline/color.svelte"  github='Timeline'></demo>

## Last node and Reversing

When the timeline is incomplete and ongoing, 
put a ghost node at last. Set `pending` as truthy value to enable displaying pending item.
`reverse={true}` is used for reversing nodes.

<demo src="timeline/reverse.svelte"  github='Timeline'></demo>

## Custom render pending content

You can customize the rendering of pending nodes through the pending slot and pendingDot slot. 

::: tip
* The `pendingDot` slot provides style class `cls`, rendering node item `item` and rendering index `index`  
* The `pending` slot provides the style class `cls`, the content of the rendering node item `children` and the rendering index `index`  
:::

<demo src="timeline/pending.svelte"  github='Timeline'></demo>

## Right alternate

Right alternate timeline.

<demo src="timeline/right.svelte"  github='Timeline'></demo>

## Alternate

Alternate timeline.

<demo src="timeline/alternate.svelte"  github='Timeline'></demo>

## Label

Use `label` show time alone.

<demo src="timeline/label.svelte"  github='Timeline'></demo>

## Custom render

You can customize the rendering of pending nodes through the label slot 、dot slot and children slot.

::: tip
* The `dot` slot provides style class `cls`, rendering node item `item` and rendering index `index`
* The `children` slot provides the style class `cls`, the content of the rendering node item `children` and the rendering index `index`  
* The `label` slot provides the style class `cls`, the content of the rendering node item `label` and the rendering index `index`  
  :::

<demo src="timeline/custom.svelte"  github='Timeline'></demo>

## Timeline Props

| Name    | Type                           | Default | Description                                                                          |
| ------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| mode    | `left` \| `alternate`\| `left` | `left`  | By sending `alternate` the timeline will distribute the nodes to the left and right. |
| reverse | `boolean`                      | `false` | Whether reverse nodes or not.                                                        |
| pending | `string` \| `boolean`          | `false` | Set the last ghost node's existence or its content.                                  |
| items   | `KTimelineItem[]`              | `[]`    | Each node of timeline                                                                |
| cls     | `string`                       | `''`    | Additional class for component                                                       |
| attrs   | `any`                          | `{}`    | Additional attributes                                                                |

```typescript
export interface KTimelineItem<L = string, C = string> {
	/**
	 * Set the circle's color
	 */
	color?: string;
	/**
	 * Customize node position
	 */
	position?: 'left' | 'right';
	/**
	 * Set the label
	 */
	label?: L;
	/**
	 * Set the content
	 */
	children: C;
	/**
	 * Uniquely identifies
	 */
	uid: string | number;
}
```

## Timeline Slots

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| dot        | content of the `dot`.                                              |
| pendingDot | content of the `pending dot`. it will only work if pending is true |
| children   | content of the `content`.                                          |
| pending    | content of the `pending`.                                          |
| label      | content of the `label`.                                            |
