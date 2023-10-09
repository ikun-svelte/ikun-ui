---
title: KCard
lang: en-US
---

# KCard

Integrate information in a card container.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/card
```

```bash [yarn]
yarn add @ikun-ui/card
```

```bash [npm]
npm install @ikun-ui/card
```

:::

## Basic usage

Card includes title, content.

Card is made up of `header` and `body`. `header` is optional, and its content distribution depends on `header` slot or `title` attribute.

<demo src="card/basic.svelte" github='Card'></demo>

## Simple card

The header part can be omitted.

<demo src="card/simple-card.svelte" github='Card'></demo>

## Shadow

You can define when to show the card shadows

The `shadow` attribute determines when the card shadows are displayed. It can be `always`, `hover` or `never`.

<demo src="card/shadow.svelte" github='Card'></demo>

## Card Props

| Name   | Type                       | Default  | Description                |
| ------ | -------------------------- | -------- | -------------------------- |
| title  | `string`                   | `-`      | title of the card.         |
| shadow | `always \| hover \| never` | `always` | when to show card shadows. |
| cls    | `string`                   | `''`     | Additional class for       |
| attrs  | `Record<string, string>`   | `{}`     | Additional attributes      |

## Card Slots

| Name    | Description             |
| ------- | ----------------------- |
| header  | content of the header.  |
| default | content of the content. |
