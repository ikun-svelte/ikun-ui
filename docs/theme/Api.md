---
title: Preset Api
lang: en-US
---

# Preset Api

## presetIkun

It will return an `unocss` preset

**type**

```typescript jsx
declare function presetIkun(
	/**
	 * preset name
	 * @default '@ikun-ui/preset'
	 */
	name?: string,
	/**
	 * theme color
	 * @default '#f8a153'
	 */
	themeColor?: string,
	/**
	 * preset theme
	 * @default ikunTheme
	 */
	theme?: Theme,
	/**
	 * preset colors
	 * @default ikunColors
	 */
	colors?: typeof ikunColors,
	/**
	 * preset shortcuts
	 * @default ikunShortcuts
	 */
	shortcuts?: UserShortcuts<Theme>,

	/**
	 * preset rules
	 * @default ikunRules
	 */
	rules?: Record<string, any>
): Preset<Theme>;
```

**e.g**

```typescript jsx
import { presetIkun } from '@ikun-ui/preset';
export default function defineConfig() {
	return {
		presets: [presetIkun()]
	};
}
```

## getSafeList

It will return a list of `ikun-ui` Shortcuts,
usually to avoid component styles being wrongly shaken by vite.

**e.g**

```typescript jsx
import { getSafeList } from '@ikun-ui/preset';
export default function defineConfig() {
	return {
		safelist: [...getSafeList()]
	};
}
```

## getCSSPreflights

According to the color variable passed in,
return the color variable string,
which is usually used in the `preflights` option of `unocss` configuration

**type**

```typescript jsx
declare function getCSSPreflights(
	/**
	 * preset color variable
	 * @default defaultColors
	 */
	theme?: Record<string, string | Record<string, string>>
): string;
```

**e.g**

```typescript jsx
import { getCSSPreflights } from '@ikun-ui/preset';
export default function defineConfig() {
	return {
		preflights: [
			{
				layer: 'base',
				getCSS: () => `
        :root {
          ${getCSSPreflights()}
        }`
			}
		]
	};
}
```

## ikunColors

Color variables exposed to users,
can add variables or override default color variables

**e.g**

```typescript jsx
import { ikunColors } from '@ikun-ui/preset';
ikunColors['custom-black'] = '#333333';
```

## ikunTheme

The default theme, which defines color variables,
users can override color variables or add new color variables

**e.g**

```typescript jsx
import { ikunTheme } from '@ikun-ui/preset';
ikunTheme.colors['ikun-black'] = '#333333';
```

## ikunRules

The default rules, which contain some animation and shadow rules,
are exposed to users,
and the content can be customized to override the default rules

**e.g**

```typescript jsx
import { ikunRules } from '@ikun-ui/preset';
ikunRules['k-input-shadow'] = { 'box-shadow': '0 0 0 2px #ff787542' };
```

## ikunShortcuts

The default Shortcuts list,
`ikun-ui/preset` exposes the shortcuts of all components,
users can override the content to implement custom shortcuts

**e.g**

```typescript jsx
import { ikunShortcuts, buttonShortcuts } from '@ikun-ui/preset';
const customBtnShortcuts = JSON.parse(JSON.stringify(buttonShortcuts));
customBtnShortcuts['k-button--primary'] = 'bg-custom-color text-white';
const finalShortcuts = ikunShortcuts;
finalShortcuts.push(customBtnShortcuts);
```
