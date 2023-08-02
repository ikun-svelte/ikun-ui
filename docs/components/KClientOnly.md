---
title: KClientOnly
lang: en-US
---

# KCollapse

An abstract component, use it to wrap the component so that the component can only run on the client.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/client-only
```

```bash [yarn]
yarn add @ikun-ui/client-only
```

```bash [npm]
npm install @ikun-ui/client-only
```

:::

## Basic usage

::: tip
`ClientOnly` only applies to `·`svelte kit`
:::

```html
<script>
    import { KClientOnly } from '@ikun-ui/client-only'
    import { KTooltip } from '@ikun-ui/tooltip'
</script>
<KClientOnly>
    <KTooltip content="KTooltip content">
        <p>KTooltip trigger dom</p>
    </KTooltip>
</KClientOnly>

```

## ClientOnly Slots

| Name    | Description                           |
|---------| ------------------------------------- |
| default | Components that only run on the client side |
