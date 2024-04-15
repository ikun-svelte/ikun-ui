---
title: KTour
lang: en-US
---

# KTour

A popup component for guiding users through a product.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/tour
```

```bash [yarn]
yarn add @ikun-ui/tour
```

```bash [npm]
npm install @ikun-ui/tour
```

:::

## Basic usage

The most basic usage.

<demo src="tour/basic.svelte"  github='Tour'></demo>

## No mask layer

Sometimes you may not need the mask layer, you can set `mask` to `false`

<demo src="tour/mask.svelte"  github='Tour'></demo>

## Placement

When `target=null` the guide will be displayed in the center.

<demo src="tour/placement.svelte"  github='Tour'></demo>

## Tour Props

| Name                  | Type                                     | Default          | Description                                                                                                  |
| --------------------- | ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| mask                  | `boolean`                                | `true`           | Whether to enable masking.                                                                                   |
| prevBtnText           | `string`                                 | `'prev'`         | Previous button text.                                                                                        |
| nextBtnText           | `string`                                 | `'next'`         | Next button text.                                                                                            |
| placement             | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'`          | Placement of tour.                                                                                           |
| open                  | `boolean`                                | `false`          | Open tour.                                                                                                   |
| closeIcon             | `string`                                 | `i-carbon-close` | The class name of the icon, following the unocss standard                                                    |
| current               | `number`                                 | `0`              | What is the current step                                                                                     |
| scrollIntoViewOptions | `boolean \| ScrollIntoViewOptions`       | `true`           | support pass custom scrollIntoView options, the default follows the `scrollIntoViewOptions` property of Tour |
| zIndex                | `number`                                 | `1001`           | Tour's zIndex                                                                                                |
| steps                 | `KTourStepsOption[]`                     | `[]`             | Additional attributes                                                                                        |
| cls                   | `string`                                 | `''`             | Additional class for component                                                                               |
| attrs                 | `any`                                    | `{}`             | Additional attributes                                                                                        |

```typescript
export interface KTourStepsOption {
	// Get the element the guide card points to.
	// Empty makes it show in center of screen
	target?: Element | null;
	// title
	title?: string;
	// description
	description?: string;
}
```

## Tour Events

| Name   | Description                                                   | Type                       |
| ------ | ------------------------------------------------------------- | -------------------------- |
| close  | Callback function on shutdown.                                | `()=> void`                |
| finish | Callback when all steps are completed.                        | `()=> void`                |
| change | Callback when the step changes. Current is the previous step. | `(current: number)=> void` |

## Tour Slots

| Name        | Description                 |
| ----------- | --------------------------- |
| title       | content of the title.       |
| closeIcon   | content of the title.       |
| description | content of the description. |
| footer      | content of the footer.      |
| indicators  | content of the indicators.  |
| prevButton  | content of the prevButton.  |
| nextButton  | content of the nextButton.  |

#### Title slot params

```typescript
export interface TitleSlotPa {
	//  What is the current step
	current: number;
	// The title of the current step
	title: string;
}
```

#### Description slot params

```typescript
export interface DescriptionSlotPa {
	//  What is the current step
	current: number;
	// The description of the current step
	description: string;
}
```

#### CloseIcon slot params

```typescript
export interface CloseIconSlotPa {
	// Close button triggers close function
	handleClose: () => void;
}
```

#### Indicators slot params

```typescript
export interface IndicatorsSlotPa {
	//  What is the current step
	current: number;
}
```

#### PrevButton slot params

```typescript
export interface PrevButtonSlotPa {
	// The previous button triggers the function to go back to the previous step.
	handlePrev: () => void;
}
```

#### PrevButton slot params

```typescript
export interface PrevButtonSlotPa {
	//  The next button triggers the function to go back to the next step.
	handleNext: () => void;
}
```

#### Footer slot params

```typescript
export interface FooterSlotPa {
	//  What is the current step
	current: number;
	// The previous button triggers the function to go back to the previous step.
	handlePrev: () => void;
	//  The next button triggers the function to go back to the next step.
	handleNext: () => void;
}
```
