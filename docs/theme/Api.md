---
title: Preset Api
lang: en-US
---

## Preset Api

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
	 * @default defaultTheme
	 */
	theme?: Theme,
	/**
	 * preset rules
	 * @default defaultRules
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
usually to avoid component styles being wrongly shaken by packaging tools.

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

The default color is exposed to users,
and the content inside can be customized to override the default rules

**e.g**

```typescript jsx
import { ikunColors } from '@ikun-ui/preset';
ikunTheme.colors['black'] = '#333333';
```

## ikunTheme

The default theme, the color information used by the package components,
is exposed to the user,
and the content inside can be customized to override the default rules

**e.g**

```typescript jsx
import { ikunRules } from '@ikun-ui/preset';
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
