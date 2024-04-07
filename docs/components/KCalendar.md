---
title: KCalendar
lang: en-US
---

# KCalendar

A container that displays data in calendar form.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/calendar
```

```bash [yarn]
yarn add @ikun-ui/calendar
```

```bash [npm]
npm install @ikun-ui/calendar
```

:::

## Basic usage

A basic calendar component with Year/Month switch.

<demo src="calendar/basic.svelte"  github='Alert'></demo>

## Card mode

Nested inside a container element for rendering in limited space.

<demo src="calendar/card.svelte"  github='Alert'></demo>

## Custom render

Custom rendering via slots.

<demo src="calendar/custom.svelte"  github='Alert'></demo>

## Calendar Props

| Name         | Type                              | Default                                                                                       | Description                                                |
| ------------ | --------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| mode         | `month` \| `year`                 | `year`                                                                                        | The display mode of the calendar.                          |
| value        | `Dayjs`                           | `-`                                                                                           | The current selected date.                                 |
| fullscreen   | `boolean`                         | `true`                                                                                        | Whether to display in full-screen.                         |
| validRange   | `[Dayjs, Dayjs]`                  | `[]`                                                                                          | To set valid range.                                        |
| disabledDate | `(currentDate: Dayjs) => boolean` | `-`                                                                                           | Function that specifies the dates that cannot be selected. |
| locale       | `object`                          | [default](https://github.com/ikun-svelte/ikun-ui/blob/main/components/Calendar/src/locale.ts) | The calendar's locale.                                     |
| cls          | `string`                          | `''`                                                                                          | Additional class for component                             |
| attrs        | `any`                             | `{}`                                                                                          | Additional attributes                                      |

## Calendar Events

| Name        | Description                                                | Type                                                     |
| ----------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| select      | Callback for when a date is selected, include source info. | `(v: { date: Dayjs, source: 'month' \| 'year' })=> void` |
| panelChange | Callback for when panel changes.                           | `(v: { date: Dayjs, mode: 'month' \| 'year' })=> void`   |

## Calendar Slots

| Name          | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| header        | Content of the header.                                              |
| monthFullCell | Content of the month cell, the content will override the cell       |
| monthCell     | Content of the month cell, the content will be appended to the cell |
| dateFullCell  | Content of the date cell, the content will override the cell.       |
| dateCell      | Content of the date cell, the content will be appended to the cell  |

#### Header slot params

```typescript
interface SelectOption {
    label: string
    value: string
    id: string
}
```

```typescript
interface HeaderSlot {
    // Current mode
    mode: 'year' | 'month'
    // Select callback of ‘year’
    handleYearSelect: (v: { detail: SelectOption }) => void
    // Select callback of ‘month’
    handleMonthSelect: (v: { detail: SelectOption }) => void
    // Switch mode callback
    handleMYClick: (v: 'year' | 'month') => void
    // Select rendering data of ‘year’
    yearList: Array<SelectOption>
    // Select rendering data of ‘month’
    monthList: Array<SelectOption>
    // The value of the year selector
    year: SelectOption
    // The value of the month selector
    month: SelectOption
}
```

#### dateCell slot params

```typescript
interface dateCellSlot {
    // Data used for rendering
    date: { instance: Dayjs; }
}
```

#### dateFullCell slot params

```typescript
interface dateFullCellSlot {
   // Data used for rendering
   date: { instance: Dayjs; }
}
```

#### MonthCell slot params

```typescript
interface monthCellSlot {
   // Data used for rendering
    month: Dayjs
}
```

#### MonthFullCell slot params

```typescript
interface monthFullCellSlot {
   // Data used for rendering
    month: Dayjs
}
```
