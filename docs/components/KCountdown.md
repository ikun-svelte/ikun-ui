---
title: KCountdown
lang: en-US
---

# KCountdown

Countdown component, support to add other components control countdown.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/countdown
```

```bash [yarn]
yarn add @ikun-ui/countdown
```

```bash [npm]
npm install @ikun-ui/countdown
```

:::

## Basic usage

<demo src="countdown/basic.svelte"  github='Countdown'></demo>

## Countdown Props

| Name       | Type     | Default | Description                       |
| ---------- | -------- | ------- | --------------------------------- |
| format     | `string` | `-`     | Formatting the countdown display. |
| value      | `number` | `0`     | Target time.                      |
| prefix     | `string` | `-`     | Sets the prefix of a countdown.   |
| suffix     | `string` | `-`     | Sets the suffix of a countdown.   |
| title      | `string` | `-`     | Countdown titles                  |
| valueStyle | `string` | `-`     | Styles countdown values           |
| cls        | `string` | `-`     | Additional class for component    |
| attrs      | `any`    | `{}`    | Additional attributes             |

## Countdown Events

| Name   | Description                   | Type                    |
| ------ | ----------------------------- | ----------------------- |
| change | Time difference change event. | `(vaue: number)=> void` |
| finish | Countdown end event.          | `()=> void`             |

## Countdown Slots

| Name   | Description                   |
| ------ | ----------------------------- |
| prefix | Countdown prefix.             |
| title  | Countdown titles.             |
| suffix | Suffixes forcountdown values. |
