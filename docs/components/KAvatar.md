---
title: KAvatar
lang: en-US
---

# KAvatar

Avatars can be used to represent people or objects. It supports images, Icons, or characters.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/avatar
```

```bash [yarn]
yarn add @ikun-ui/avatar
```

```bash [npm]
npm install @ikun-ui/avatar
```

:::

## Basic usage

Use `size` and `radius` prop to set avatar's size and radius.

<demo src="../../../../example/avatar/basic.svelte"  github='Avatar'></demo>

## Types

It supports images, Icons, or characters.

<demo src="../../../../example/avatar/types.svelte" github='Avatar'></demo>

## Fallback

fallback when image load error.

<demo src="../../../../example/avatar/fallback.svelte" github='Avatar'></demo>

## Fit Container

Set how the image fit its container for an image avatar, same as [object-fit <span class="i-carbon-link text-12px" />](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

<demo src="../../../../example/avatar/fit-container.svelte" github='Avatar'></demo>

## Avatar Props

| Name   | Type                                                 | Default | Description                                                |
| ------ | ---------------------------------------------------- | ------- | ---------------------------------------------------------- |
| icon   | `string`                                             | `''`    | The class name of the icon, following the unocss standard. |
| src    | `string`                                             | `''`    | the source of the image for an image avatar..              |
| srcSet | `string`                                             | `''`    | native attribute `srcset` of image avatar.                 |
| alt    | `string`                                             | `''`    | native attribute `alt` of image avatar.                    |
| fit    | `fill` / `contain` / `cover` / `none` / `scale-down` | `cover` | set how the image fit its container for an image avatar.   |
| size   | `string` / `number`                                  | `50px`  | avatar size, the default unit is `px`.                     |
| radius | `string` / `number`                                  | `4px`   | avatar radius, the default unit is `px`.                   |
| cls    | `string`                                             | `''`    | Additional class for                                       |
| attrs  | `Record<string, string>`                             | `{}`    | Additional attributes                                      |

## Avatar Events

| Name  | Description                    | Type                          |
| ----- | ------------------------------ | ----------------------------- |
| error | trigger when image load error. | `(event: CustomEvent)=> void` |

## Avatar Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
