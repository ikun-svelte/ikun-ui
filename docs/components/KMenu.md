---
title: KMenu
lang: en-US
---

# KMenu

A versatile menu for navigation.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/menu
```

```bash [yarn]
yarn add @ikun-ui/menu
```

```bash [npm]
npm install @ikun-ui/menu
```

:::

## Basic usage

Horizontal top navigation menu.

<demo src="menu/horizontal.svelte" github="Menu"></demo>

## Vertical mode

Vertical menu

<demo src="menu/vertical.svelte" github="Menu"></demo>

## Inline mode

Vertical menu with inline submenus.

<demo src="menu/inline.svelte" github="Menu"></demo>

## Collapsed inline menu

Inline menu could be collapsed.

<demo src="menu/collapsed.svelte" github="Menu"></demo>

## Theme

There are two built-in themes: `light` and `dark`. The default value is `light`.
When `theme` is specified, it takes precedence over unocss's dark theme.

<demo src="menu/theme.svelte" github="Menu"></demo>

## Switch the menu type

Show the dynamic switching mode (between `inline` and `vertical`).

<demo src="menu/type.svelte" github="Menu"></demo>

## Custom Render

Implement custom rendering through various slots

<demo src="menu/custom.svelte" github="Menu"></demo>

Implement custom rendering through various slots

<demo src="menu/item-slot.svelte" github="Menu"></demo>

## Menu Props

| Name                 | Type                                | Default                 | Description                                                                                                                      |
| -------------------- | ----------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ctxKey               | `string`                            | `-`                     | Context key, used for component internal logic, should be a globally unique value, `KMenuItem` and `KMenu` share the same value. |
| expandIcon           | `string`                            | `i-carbon-chevron-down` | Expand Icon,following the unocss standard                                                                                        |
| inlineIndent         | `number`                            | `24`                    | Menu indent width in inline mode                                                                                                 |
| inlineCollapsed      | `boolean`                           | `false`                 | Whether the menu is collapsed in inline or vertical mode                                                                         |
| mode                 | `vertical \| horizontal  \| inline` | `vertical`              | Menu rendering mode                                                                                                              |
| openUids             | `string[]`                          | `[]`                    | Default open menu uid array                                                                                                      |
| selectedUids         | `string[]`                          | `[]`                    | Default select menu uid array                                                                                                    |
| selectable           | `boolean`                           | `true`                  | Whether the menu can be selected. Setting it to false will not trigger `select` related events                                   |
| subMenuCloseDelay    | `number`                            | `100`                   | The closing delay after the user leaves the submenu, unit: milliseconds                                                          |
| subMenuOpenDelay     | `number`                            | `0`                     | The delay after the user mouse enters the submenu, unit: milliseconds                                                            |
| theme                | `light \| dark`                     | `-`                     | Theme style                                                                                                                      |
| multiple             | `boolean`                           | `false`                 | Whether to allow multiple selections                                                                                             |
| triggerSubMenuAction | `hover \| click`                    | `hover`                 | Sub menu expand/close trigger behavior                                                                                           |
| cls                  | `string`                            | `-`                     | Additional class                                                                                                                 |
| attrs                | `Record<string, string>`            | `{}`                    | Additional attributes                                                                                                            |

## Menu Events

| Name       | Description                                                                     | Type                                   |
| ---------- | ------------------------------------------------------------------------------- | -------------------------------------- |
| click      | Triggered when the menu item is clicked                                         | `(e: CustomEvent<ClickEvtPa>)=> void`  |
| openChange | Sub menu expand/close callback, the parameter is the currently opened uid array | `(e: CustomEvent<string[]>)=> void`    |
| select     | Triggered when the menu item is seleced                                         | `(e: CustomEvent<SelectEvtPa>)=> void` |
| deSelect   | Fired when the menu item is deselected                                          | `(e: CustomEvent<SelectEvtPa>)=> void` |

#### ClickEvtPa

```typescript
export type ClickEvtPa = {
	// The clicked item object
	item: SubMenuType;
	// The uid of the item object clicked
	uid: string;
	// An array of uid paths starting from the root menu object to the clicked item
	uidPath: string[];
	e: MouseEvent;
};
```

#### SelectEvtPa

```typescript
export type SelectEvtPa = {
	// The selected/deSelected item object
	item: SubMenuType;
	// The uid of the item object selected/deSelected
	uid: string;
	// An array of uid paths starting from the root menu object to the selected/deSelected item
	uidPath: string[];
	// An array of uids selected in multi-select mode
	selectedUids: string[];
	// An array of items selected in multi-select mode
	selectedItems: SubMenuType[];
	// An array of uid paths selected in multi-select mode
	selectedUidPaths: string[][];
	e: MouseEvent;
};
```

## MenuItem Props

| Name   | Type                     | Default | Description                                                                                                                      |
| ------ | ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ctxKey | `string`                 | `-`     | Context key, used for component internal logic, should be a globally unique value, `KMenuItem` and `KMenu` share the same value. |
| items  | `SubMenuType[]`          | `-`     | Menu configuration object                                                                                                        |
| cls    | `string`                 | `-`     | Additional class                                                                                                                 |
| attrs  | `Record<string, string>` | `{}`    | Additional attributes                                                                                                            |

#### SubMenuType

```typescript
export type SubMenuType = {
	/**
	 * @en Display error state style
	 * @default false
	 */
	danger?: boolean;
	/**
	 * @en Render as groups or dividers
	 */
	type?: 'group' | 'divider';
	/**
	 * @en Menu Icon
	 */
	icon?: string;
	/**
	 * @en Menu Label
	 */
	label?: string;
	/**
	 * @en The unique value of the menu item.
	 * It should be a unique value in the entire menu tree.
	 */
	uid?: string;
	/**
	 * @en Indicates whether it is disabled. Its priority is higher than danger,
	 * and its child nodes are also disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * @en title
	 */
	title?: string;
	/**
	 * @en Menu items in submenus
	 */
	children?: SubMenuType[];
	/**
	 * @en Submenu popover style
	 */
	popupClassName?: string;
};
```

## MenuItem Events

| Name       | Description                                 | Type                                       |
| ---------- | ------------------------------------------- | ------------------------------------------ |
| titleClick | Triggered when the submenu title is clicked | `(e: CustomEvent<TitleClickEvtPa>)=> void` |

#### TitleClickEvtPa

```typescript
type TitleClickEvtPa = {
	// The clicked item object
	item: SubMenuType;
	e: MouseEvent;
};
```

## MenuItem Slots

| Name       | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| label      | Customize menu item's `label` content                                                               |
| icon       | Customize menu item's `icon` content                                                                |
| expandIcon | Customize menu item's `expandIcon` content                                                          |
| item       | Customize menu item content, When setting the item slot, the other three slots will not take effect |

#### label slot params

```typescript
//  render item object
type item = SubMenuType;
//  render item class
type cls = string;
```

#### icon slot params

```typescript
//  render item object
type item = SubMenuType;
//  render item class
type cls = string;
```

#### expandIcon slot params

```typescript
//  render item object
type item = SubMenuType;
//  render item class
type cls = string;
```

#### item slot params

```typescript
//  render item object
type item = SubMenuType;
//  render item class
type cls = string;
```
