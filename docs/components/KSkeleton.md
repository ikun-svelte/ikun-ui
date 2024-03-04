---
title: KSkeleton
lang: en-US
---

# KSkeleton

Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/skeleton
```

```bash [yarn]
yarn add @ikun-ui/skeleton
```

```bash [npm]
npm install @ikun-ui/skeleton
```

:::

## Basic usage

Simplest Skeleton usage.

<demo src="skeleton/basic.svelte"  github='Skeleton'></demo>

## Complex Combination

Complex combination with avatar and multiple paragraphs.

<demo src="skeleton/complex.svelte"  github='Skeleton'></demo>

## Active

Display active animation.

<demo src="skeleton/active.svelte"  github='Skeleton'></demo>

## Skeleton Button, Avatar, Input, Image

Support some subcomponent skeletons

<demo src="skeleton/option.svelte"  github='Skeleton'></demo>

## Custom Skeleton

You can customize the skeleton content through slots

<demo src="skeleton/custom.svelte"  github='Skeleton'></demo>

## Skeleton Props

| Name      | Type                             | Default | Description                                |
| --------- | -------------------------------- | ------- | ------------------------------------------ |
| loading   | `boolean`                        | `false` | Display the skeleton when true.            |
| size      | `sm \| md \| lg`                 | `'md'`  | Set the size of skeleton.                  |
| active    | `boolean`                        | `false` | Show animation effect.                     |
| round     | `boolean`                        | `false` | Show paragraph and title radius when true. |
| title     | `boolean \| KSkeletonTitleProps` | `true`  | Show title placeholder.                    |
| paragraph | `boolean \| KSkeletonTitleProps` | `true`  | Show paragraph placeholder.                |
| avatar    | `boolean \| KSkeletonTitleProps` | `false` | Show avatar placeholder.                   |
| cls       | `string`                         | `''`    | Additional class for component             |
| attrs     | `any`                            | `{}`    | Additional attributes                      |

## Skeleton Slots

| Name     | Description                           |
| -------- | ------------------------------------- |
| default  | Content of the skeleton.              |
| skeleton | Custom rendering of skeleton content. |

## Skeleton Title Props

| Name   | Type               | Default | Description                      |
| ------ | ------------------ | ------- | -------------------------------- |
| width  | `number \| string` | `50%`   | Set the width of skeleton title. |
| size   | `sm \| md \| lg`   | `'md'`  | Set the size of skeleton title.  |
| active | `boolean`          | `false` | Show animation effect.           |
| round  | `boolean`          | `false` | Show title radius when true.     |
| cls    | `string`           | `''`    | Additional class for component   |
| attrs  | `any`              | `{}`    | Additional attributes            |

## Skeleton Paragraph Props

| Name   | Type                                          | Default | Description                                                                                                                  |
| ------ | --------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| width  | `number \| string \| Array<number \| string>` | `-`     | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width. |
| rows   | `number`                                      | `3`     | Set the row count of paragraph.                                                                                              |
| size   | `sm \| md \| lg`                              | `'md'`  | Set the size of paragraph title.                                                                                             |
| active | `boolean`                                     | `false` | Show animation effect.                                                                                                       |
| round  | `boolean`                                     | `false` | Show paragraph radius when true.                                                                                             |
| cls    | `string`                                      | `''`    | Additional class for component                                                                                               |
| attrs  | `any`                                         | `{}`    | Additional attributes                                                                                                        |

## Skeleton Avatar Props

| Name   | Type                        | Default  | Description                       |
| ------ | --------------------------- | -------- | --------------------------------- |
| shape  | `circle \| round \| square` | `circle` | Set the shape of skeleton avatar. |
| size   | `sm \| md \| lg`            | `'md'`   | Set the size of skeleton avatar.  |
| active | `boolean`                   | `false`  | Show animation effect.            |
| cls    | `string`                    | `''`     | Additional class for component    |
| attrs  | `any`                       | `{}`     | Additional attributes             |

## Skeleton Button Props

| Name   | Type                        | Default | Description                                     |
| ------ | --------------------------- | ------- | ----------------------------------------------- |
| shape  | `circle \| round \| square` | `round` | Set the shape of skeleton button.               |
| size   | `sm \| md \| lg`            | `'md'`  | Set the size of skeleton button.                |
| active | `boolean`                   | `false` | Show animation effect.                          |
| block  | `boolean`                   | `false` | Option to fit button width to its parent width. |
| cls    | `string`                    | `''`    | Additional class for component                  |
| attrs  | `any`                       | `{}`    | Additional attributes                           |

## Skeleton Input Props

| Name   | Type             | Default | Description                                    |
| ------ | ---------------- | ------- | ---------------------------------------------- |
| size   | `sm \| md \| lg` | `'md'`  | Set the size of skeleton input.                |
| active | `boolean`        | `false` | Show animation effect.                         |
| block  | `boolean`        | `false` | Option to fit input width to its parent width. |
| cls    | `string`         | `''`    | Additional class for component                 |
| attrs  | `any`            | `{}`    | Additional attributes                          |

## Skeleton Image Props

| Name   | Type      | Default | Description                    |
| ------ | --------- | ------- | ------------------------------ |
| active | `boolean` | `false` | Show animation effect.         |
| cls    | `string`  | `''`    | Additional class for component |
| attrs  | `any`     | `{}`    | Additional attributes          |

## Skeleton Image Slots

| Name    | Description                    |
| ------- | ------------------------------ |
| default | Content of the skeleton image. |
