---
title: KEmpty
lang: en-US
---

# KEmpty

Placeholder hints for empty states.

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

<demo src="empty/basic.svelte"  github='Empty'></demo>

## Custom image

`image` prop can set image URL.

<demo src="empty/image.svelte"  github='Empty'></demo>

## Image size

`image-size` prop can control image size.

<demo src="empty/size.svelte"  github='Empty'></demo>

## Bottom content

Use the default slot to insert content at the bottom.

<demo src="empty/bottom.svelte"  github='Empty'></demo>

## Empty Props

| Name             | Type                     | Default     | Description                    |
| ---------------- | ------------------------ | ----------- | ------------------------------ |
| image            | `string`                 | `''`        | image URL of empty.            |
| imageSize        | `number`                 | `-`         | image size (width) of empty.   |
| emptyDescription | `string`                 | `'No Data'` | description of empty.          |
| cls              | `string`                 | `''`        | Additional class for component |
| attrs            | `Record<string, string>` | `{}`        | Additional attributes          |

## Empty Slots

| Name        | Description                   |
| ----------- | ----------------------------- |
| default     | Customize default content     |
| image       | Customize image               |
| description | Customize description content |
