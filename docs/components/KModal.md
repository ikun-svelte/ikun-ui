---
title: KModal
lang: en-US
---

# KModal

Modal dialogs.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/modal
```

```bash [yarn]
yarn add @ikun-ui/modal
```

```bash [npm]
npm install @ikun-ui/modal
```

:::

## Basic usage

<demo src="../../../../example/modal/basic.svelte" github="Modal"></demo>

## Enable the built-in footer button

<demo src="../../../../example/modal/footer.svelte" github="Modal"></demo>

## Different footer layouts

Define the footer button layout through the layout attribute

<demo src="../../../../example/modal/layout.svelte" github="Modal"></demo>

## Custom header and footer

Implement custom header and footer through slots

<demo src="../../../../example/modal/custom.svelte" github="Modal"></demo>

## Modal Props

| Name   | Type                     | Default  | Description               |
| ------ | ------------------------ | -------- | ------------------------- |
| title  | `string`                 | `-`      | content of Modal title    |
| footer | `boolean`                | `false`  | Show bottom footer button |
| show   | `boolean`                | `false`  | show the Modal            |
| layout | `'center' / 'right'`     | `center` | footer button layout      |
| cls    | `string`                 | `-`      | Additional class          |
| attrs  | `Record<string, string>` | `{}`     | Additional attributes     |

## Modal Events

| Name    | Description                                | Type                   |
| ------- | ------------------------------------------ | ---------------------- |
| cancel  | Fired when the `cancel` button is clicked  | `(e: Event)=> void`    |
| confirm | Fired when the `confirm` button is clicked | `(e: Event)=> void`    |
| close   | Triggered when the Modal is closed         | `(show: Event)=> void` |

## Modal Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Customize Modal content |
| header  | Customize Modal header  |
| footer  | Customize Modal footer  |
