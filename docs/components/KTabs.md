---
title: KTabs
lang: en-US
---

# KTabs

Separate collections of data that are related but belong to different categories.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/tabs
```

```bash [yarn]
yarn add @ikun-ui/tabs
```

```bash [npm]
npm install @ikun-ui/tabs
```

:::

## Basic usage

Simple style tab page.

You can specify the currently selected tab through the value property.

::: tip
The `value` property, `navOptions` property and the `uid` property of `KTabsPane` are required.
The `value` property and the `uid` property of `KTabsPane` should correspond to the `uid` field of `navOptions`.
:::

<demo src="tabs/basic.svelte"  github='Tabs'></demo>

## Card style tabs

You can set up labels with a card style.

<demo src="tabs/card.svelte" github='Tabs'></demo>

## Card-style tabs with borders

You can also set the tab to be a card with a border

<demo src="tabs/border.svelte" github='Tabs'></demo>

## Dynamically add or remove tabs

<demo src="tabs/dynamic.svelte" github='Tabs'></demo>

## Add button custom icon

<demo src="tabs/add.svelte" github='Tabs'></demo>

## Disabled Tab

You can disable specific tabs through `navOptions`

<demo src="tabs/disabled.svelte" github='Tabs'></demo>

## Closeable Tab

You can enable a certain Tab to be deleted through `navOptions`

::: tip
Its priority `closeable` property is higher
:::

## Switching control

The `beforeLeave` hook can limit tab switching

<demo src="tabs/before.svelte" github='Tabs'></demo>

## Tabs Props

| Name        | Type                                                      | Default | Description                                                               |
| ----------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| value       | `string \| number`                                        | `0`     | The binding value of `Tab`, which should be the `uid` of a `navOptions`.  |
| navOptions  | `KTabsNavItem[]`                                          | `[]`    | `tabItem` options.                                                        |
| type        | `'card' \| 'border'`                                      | `''`    | tab style.                                                                |
| editable    | `boolean`                                                 | `false` | Whether tabs can be added dynamically.                                    |
| closeable   | `boolean`                                                 | `false` | Whether the tab can be closed.                                            |
| beforeLeave | `(oldActiveTabValue, activeTabValue) => Promise<boolean>` | `-`     | Hook when switching tabs. If false is returned, switching will not occur. |
| cls         | `string`                                                  | `''`    | Additional class for component                                            |
| attrs       | `any`                                                     | `{}`    | Additional attributes                                                     |

```typescript
export interface KTabsNavItem {
	// Whether tab is disabled
	disabled?: boolean;
	label: string;
	uid: string | number;
	// Whether tab is closeable
	closeable?: boolean;
}
```

## Tabs Events

| Name   | Description                                                                                                                      | Type                                                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| click  | trigger when alert is clicked.                                                                                                   | `(tab: KTabsNavItem)=> void`                                      |
| remove | trigger when alert is closed.                                                                                                    | `(data: { tab: KTabsNavItem, index: number })=> void`             |
| add    | Triggered when the add button is clicked.                                                                                        | `(event: PointerEvent)=> void`                                    |
| edit   | Triggered when the new button is clicked or when the tab is closed.                                                              | `(data: { tab: KTabsNavItem, action: 'remove' \| 'add' })=> void` |
| change | Triggered when the closed tab is the currently activated tab. You need to manually update the value to ensure correct rendering. | `(tab: KTabsNavItem)=> void`                                      |

## Tabs Slots

| Name    | Description                                          |
| ------- | ---------------------------------------------------- |
| default | content of the tab. Please use `KTabsPane` component |
| addIcon | add icon of the tab.                                 |

## TabsPane Props

| Name | Type               | Default | Description                                          |
| ---- | ------------------ | ------- | ---------------------------------------------------- |
| uid  | `string \| number` | `-`     | The value should match the uid field of `navOptions` |

## TabsPane Slots

| Name    | Description         |
| ------- | ------------------- |
| default | content of the tab. |
