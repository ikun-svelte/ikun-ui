---
title: KStatistics
lang: en-US
---

# KStatistics

Display statistics.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/statistics
```

```bash [yarn]
yarn add @ikun-ui/statistics
```

```bash [npm]
npm install @ikun-ui/statistics
```

:::

## Basic usage

<demo src="statistics/basic.svelte"  github='Statistics'></demo>

## With Card

Card usage display, can be freely combined.

<demo src="statistics/card.svelte" github='Statistics'></demo>

## Statistics Props

| Name             | Type                                    | Default | Description                     |
| ---------------- | --------------------------------------- | ------- | ------------------------------- |
| decimalSeparator | `string`                                | `'.'`     | Setting the decimal point.      |
| groupSeparator   | `string`                                | `','`     | Sets the thousandth identifier. |
| precision        | `number`                                | `0`     | numerical precision.            |
| formatter        | `((value: number) => string \| number)` | `-`     | Custom numerical presentation.  |
| value            | `number`                                | `0`     | Numerical content.              |
| prefix           | `string`                                | `-`     | Sets the prefix of a number.    |
| suffix           | `string`                                | `-`     | Sets the suffix of a number.    |
| title            | `string`                                | `-`     | Numeric titles                  |
| valueStyle       | `string`                                | `-`     | Styles numeric values           |
| cls              | `string`                                | `-`     | Additional class for component  |
| attrs            | `any`                                   | `{}`    | Additional attributes           |

## Statistics Slots

| Name    | Description                 |
| ------- | --------------------------- |
| prefix | Numeric prefix. |
| title   | Numeric titles.       |
| suffix    | Suffixes for numeric values.        |
