---
title: KCarousel
lang: en-US
---

# KCarousel

A carousel component

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/carousel
```

```bash [yarn]
yarn add @ikun-ui/carousel
```

```bash [npm]
npm install @ikun-ui/carousel
```

:::

## Basic usage

Basic usage.

<demo src="carousel/basic.svelte"  github='Carousel'></demo>

## Indicator

Indicators can be displayed inside the carousel

<demo src="carousel/indicator.svelte" github='Carousel'></demo>

## Arrows

The arrow property determines when arrows are displayed.

<demo src="carousel/arrows.svelte" github='Carousel'></demo>

## Auto height

When the height property is not set, the carousel component dynamically changes height according to the content.

<demo src="carousel/height.svelte" github='Carousel'></demo>

## Custom indicator and arrow

Sometimes you may want to customize indicator and arrow.

<demo src="carousel/custom.svelte" github='Carousel'></demo>

## Vertical Layout

The carousel component supports vertical layout.

<demo src="carousel/vertical.svelte" github='Carousel'></demo>

## Carousel Props

| Name         | Type                             | Default      | Description                                                                                  |
| ------------ | -------------------------------- | ------------ | -------------------------------------------------------------------------------------------- |
| height       | `number`                         | `-`         | Height of the carousel.                                                                      |
| initialIndex | `number`                         | `0`          | The default display index of carousel (starting from 0).                                     |
| count        | `number`                         | `0`          | Specifies the number of carousels to display, it is required.                                |
| arrow        | `'always' \| 'hover' \| 'never'` | `hover`      | How the arrow paginator is displayed.                                                        |
| loop         | `boolean`                        | `true`       | Whether to loop play.                                                                        |
| direction    | `'horizontal' \| 'vertical'`     | `horizontal` | The direction of the carousel.                                                               |
| autoplay     | `boolean`                        | `true`       | Whether to play through automatic page turning.                                              |
| pauseOnHover | `boolean`                        | `true`       | When the mouse moves over the carousel, the automatic page turning playback will be paused.. |
| interval     | `number`                         | `3000`       | Automatic page turning playback interval (unit ms).                                          |
| cls          | `string`                         | `''`         | Additional class for component                                                               |
| attrs        | `Record<string, string>`         | `{}`         | Additional attributes                                                                        |

## Carousel Events

| Name   | Description                        | Type                                                |
| ------ | ---------------------------------- | --------------------------------------------------- |
| change | Triggered when a page turn occurs. | `(data: { index: number, oldIndex:number })=> void` |

## Carousel Slots

| Name       | Description                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| default    | Customize default content                                                         |
| indicators | Customize indicators content, Use with KIndicators to implement custom indicators |
| arrow      | Customize arrow content, Use with KCarouselArrow to implement a customized arrow  |
