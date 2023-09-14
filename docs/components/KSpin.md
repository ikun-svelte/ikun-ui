---
title: KSpin
lang: en-US
---

# KSpin

Show animation while loading data.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/spin
```

```bash [yarn]
yarn add @ikun-ui/spin
```

```bash [npm]
npm install @ikun-ui/spin
```

:::

## Basic usage

Use `show`, control loading show.

<demo src="spin/basic.svelte"  github='Spin'></demo>

## Full screen

Use the `fullScreen` property to enable a full-screen spin.

<demo src="spin/full.svelte"  github='Spin'></demo>

## Custom background color

Use the `background` property to set the background color.

<demo src="spin/bg-color.svelte"  github='Spin'></demo>

## Custom Spinner

The `spinner` attribute can also be passed directly into a component to display content as a spin

<demo src="spin/custom.svelte"  github='Spin'></demo>

## Loading Options

| Name       | Type                     | Default | Description                                                  |
| ---------- | ------------------------ | ------- | ------------------------------------------------------------ |
| show       | `boolean`                | `false` | Whether to show spin                                         |
| text       | `string`                 | `-`     | loading text that displays under the spinner                 |
| fullScreen | `boolean`                | `false` | Show a full screen animation while loading data              |
| background | `string`                 | `-`     | background color of the mask                                 |
| spinner    | `string`                 | `-`     | The class name of the snipper, following the unocss standard |
| rotating   | `boolean`                | `true`  | Whether the snipper is rotated or not                        |
| cls        | `string`                 | `-`     | Additional class                                             |
| attrs      | `Record<string, string>` | `{}`    | Additional attributes                                        |
