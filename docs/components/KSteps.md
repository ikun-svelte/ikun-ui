---
title: KSteps
lang: en-US
---

# KSteps

Steps is a navigation bar that guides users through the steps of a task.
It contains two components `KStep` and `KSteps`

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/steps
```

```bash [yarn]
yarn add @ikun-ui/steps
```

```bash [npm]
npm install @ikun-ui/steps
```

:::

## Basic usage

<demo src="steps/basic.svelte"  github='Steps'></demo>

## Vertical display

Use `direction` to set `Steps` to vertical

<demo src="steps/direction.svelte"  github='Steps'></demo>

## Vertical title

Use `labelPlacement` to set the `title` vertically

<demo src="steps/label-placement.svelte"  github='Steps'></demo>

## Dot style

Use the `dot` attribute to switch dot styles

<demo src="steps/dot.svelte"  github='Steps'></demo>

## Navigation style

Use the `navigation` attribute to switch navigation styles

<demo src="steps/nav.svelte"  github='Steps'></demo>

## Clickable Step

Make `Step` clickable through the `canClick` attribute

<demo src="steps/change.svelte"  github='Steps'></demo>

## Different status

The `status` field in the `items` attribute can forcefully set the status of the `Step`

<demo src="steps/status.svelte"  github='Steps'></demo>

## Custom rendering

By using the slots of the component `KStep` you can customize the rendering content

::: tip
In most cases you won't need custom rendering as this will require you to manage the styles yourself
:::

<demo src="steps/custom.svelte"  github='Steps'></demo>

## Steps Props

| Name           | Type                     | Default      | Description                                                                                                                                |
| -------------- | ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| active         | `number \| string`       | `0`          | The currently activated step, its value should be the index field in the attribute items                                                   |
| direction      | `vertical \| horizontal` | `horizontal` | Display direction of `Steps`.                                                                                                              |
| labelPlacement | `vertical \| horizontal` | `horizontal` | The display direction of `title`, `subTitle` and `description` in `Steps`. It is only valid when the value of `direction` is `horizontal`. |
| dot            | `boolean`                | `false`      | Whether Step is displayed as dots                                                                                                          |
| navigation     | `boolean`                | `false`      | `navigation` mode for `Steps`. After setting, the steps become connected by arrows.                                                        |
| canClick       | `boolean`                | `false`      | Whether `Step` can be clicked to interact.                                                                                                 |
| items          | `KStepsItems`            | `[]`         | `item` of `Steps`, used to render `step`.                                                                                                  |
| cls            | `string`                 | `''`         | Additional class for component                                                                                                             |
| attrs          | `any`                    | `{}`         | Additional attributes                                                                                                                      |

```typescript
export interface KStepsItem {
	// The index value of `item`,
	// which will match `active` to determine which `Step` is currently
	index: string | number;
	// Step title
	title: string;
	// Step sub title
	subTitle?: string;
	// Step description
	description?: string;
	// If not set, the state of the previous `step` defaults to 'finish',
	// the state of the next `step` defaults to 'wait',
	// and the state of the current `step` defaults to 'process'
	status?: KStepStatus;
}
export type KStepStatus = 'wait' | 'process' | 'finish' | 'error';

export type KStepsItems = Array<KStepsItem>;
```

## Steps Events

| Name   | Description                                                                  | Type                        |
| ------ | ---------------------------------------------------------------------------- | --------------------------- |
| change | When the attribute `canClick` is true, it is triggered when Step is clicked. | `(item: KStepsItem)=> void` |

## Steps Slots

| Name    | Description                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | The default slot of the `KSteps` component. Generally, you do not need to use it. If you want to customize rendering, please pass in the `KStep` component. |

## Step Props

| Name           | Type                     | Default                    | Description                                                               |
| -------------- | ------------------------ | -------------------------- | ------------------------------------------------------------------------- |
| active         | `number \| string`       | `0`                        | Same as the `KSteps` component, just pass in the same value when using it |
| direction      | `vertical \| horizontal` | `horizontal`               | Same as the `KSteps` component, just pass in the same value when using it |
| labelPlacement | `vertical \| horizontal` | `horizontal`               | Same as the `KSteps` component, just pass in the same value when using it |
| dot            | `boolean`                | `false`                    | Same as the `KSteps` component, just pass in the same value when using it |
| navigation     | `boolean`                | `false`                    | Same as the `KSteps` component, just pass in the same value when using it |
| canClick       | `boolean`                | `false`                    | Same as the `KSteps` component, just pass in the same value when using it |
| item           | `KStepsItem`             | `{ title: '', index: '' }` | `item` of `Step`, used to render `step`.                                  |
| index          | `number`                 | `0`                        | Just pass in the same value as the `index` field of `item`.               |
| eachIndex      | `number`                 | `0`                        | Numbers displayed by `Step`.                                              |
| last           | `boolean`                | `false`                    | Whether it is the last `Step`.                                            |
| cls            | `string`                 | `''`                       | Additional class for component                                            |
| attrs          | `any`                    | `{}`                       | Additional attributes                                                     |

## Step Events

| Name   | Description                                                                  | Type                        |
| ------ | ---------------------------------------------------------------------------- | --------------------------- |
| change | When the attribute `canClick` is true, it is triggered when Step is clicked. | `(item: KStepsItem)=> void` |

## Step Slots

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| icon        | Customize the `icon` content of rendering Step        |
| title       | Customize the `title` content of rendering Step       |
| subTitle    | Customize the `subTitle` content of rendering Step    |
| description | Customize the `description` content of rendering Step |
