---
title: Basic
lang: en-US
---

# `ikun-ui` preset

`ikun-ui` has built-in a set of unocss-based presets. In the `quick start` chapter,
we use the presets to quickly reference `ikun-ui`.
This page gives a basic introduction to what the `ikun-ui` presets contain.
Can help you customize your own theme presets.

## Color

`@ikun-ui/preset` has the following built-in color variables available for use.

> [source code](https://github.com/ikun-svelte/ikun-ui/blob/main/preset/src/colors.ts)

<theme-color></theme-color>

## Theme Color

`@ikun-ui/preset` Based on color variables,
the following colors are used in the default preset.

> [source code](https://github.com/ikun-svelte/ikun-ui/blob/main/preset/src/theme.ts#L4)

```typescript jsx
const colors = {
	'ikun-white': 'var(--ikun-white)',
	'ikun-black': 'var(--ikun-black)',
	// dork mode
	'ikun-dark': '(--ikun-dark-50)',
	'ikun-dark-100': '(--ikun-dark-100)',
	'ikun-dark-200': '(--ikun-dark-200)',
	'ikun-dark-300': '(--ikun-dark-300)',
	'ikun-dark-400': '(--ikun-dark-400)',
	'ikun-dark-500': '(--ikun-dark-500)',
	'ikun-dark-600': '(--ikun-dark-600)',
	'ikun-dark-700': '(--ikun-dark-700)',
	'ikun-dark-800': '(--ikun-dark-800)',
	'ikun-dark-900': '(--ikun-dark-900)',
	'ikun-dark-950': '(--ikun-dark-950)',
	// disabled color
	'ikun-disabled': 'var(--ikun-zinc-200)',
	// primary color
	'ikun-primary': 'var(--ikun-teal-400)',
	'ikun-primary-100': 'var(--ikun-teal-100)',
	// text default color
	'ikun-error': 'var(--ikun-rose-400)',
	'ikun-error-100': 'var(--ikun-rose-100)',
	// warning color
	'ikun-warning': 'var(--ikun-amber-400)',
	'ikun-warning-100': 'var(--ikun-amber-100)',
	// info color
	'ikun-info': 'var(--ikun-slate-400)',
	'ikun-info-100': 'var(--ikun-slate-100)',
	// success color
	'ikun-success': 'var(--ikun-green-400)',
	'ikun-success-100': 'var(--ikun-green-100)',
	// text default color
	'ikun-tx-base': 'var(--ikun-slate-900)',
	// placeholder or some weakly emphasized text color
	'ikun-tx-gr': 'var(--ikun-slate-400)',
	// border default color
	'ikun-bd-base': 'var(--ikun-zinc-300)'
};
```

## Shortucts

`@ikun-ui/preset` For each component,
use the shortcuts feature to combine the necessary atomic styles,
thus realizing the style of the component.

> [source code](https://github.com/ikun-svelte/ikun-ui/tree/main/preset/src/shortcuts)

```typescript jsx
export const notificationShortcuts: Record<string, string> = {
	// notification
	'k-notification--base':
		'k-notify-transition fixed z-1001 rounded shadow bg-ikun-white p2 min-w-240px',
	'k-notification--body': 'fbc w-full',
	'k-notification--title': 'fcc text-lg text-ikun-tx-base my-0',
	'k-notification--type--icon': 'mr-2',
	'k-notification--close--icon': 'hover:text-ikun-main',
	'k-notification--content': 'p2 mt-2',
	'k-notification--info': 'text-ikun-info',
	'k-notification--warning': 'text-ikun-warning',
	'k-notification--error': 'text-ikun-error',
	'k-notification--success': 'text-ikun-success',
	'k-notification--icon--info': 'i-carbon-information-filled',
	'k-notification--icon--warning': 'i-carbon-warning-filled',
	'k-notification--icon--error': 'i-carbon-error-filled',
	'k-notification--icon--success': 'i-carbon-checkmark-filled',
	// dark
	'k-notification--base__dark': 'dark:bg-ikun-dark-500 dark:shadow-ikun-main'
};
```

## Rules

In addition to using the shortcuts feature to combine component styles,
`@ikun-ui/preset` also customizes some rules,
which realize partial animation and shadow of components.

> [source code](https://github.com/ikun-svelte/ikun-ui/blob/main/preset/src/rules.ts)

```typescript jsx
const inputRules = {
	'k-input-shadow': { 'box-shadow': '0 0 0 2px #ff787542' }
};
const btnRules = {
	'k-btn-shadow--success': { 'box-shadow': '0 0 0 2px rgba(74,222,128,0.5)' },
	'k-btn-shadow--error': { 'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)' },
	'k-btn-shadow--warning': { 'box-shadow': '0 0 0 2px rgba(251,191,36,0.5)' },
	'k-btn-shadow--info': { 'box-shadow': '0 0 0 2px rgba(148,163,184,0.5)' },
	'k-btn-shadow--primary': { 'box-shadow': '0 0 0 2px rgba(45,212,191,0.5)' }
};
const iconRules = {
	'k-icon-transition': { transition: 'all 0.3s linear' }
};

const notifyRules = {
	'k-notify-transition': { transition: 'top 0.3s linear' }
};

const switchRules = {
	'k-switch-transition': { transition: 'right .1s linear' }
};
```

## Animation

In most cases, the animation of `ikun-ui` components is implemented by [svelte's built-in animation system](https://svelte.dev/docs/svelte-transition),
but at some point (such as click animation),
the `ikun-ui` component library implements some animations through `unocss`.

> [source code](https://github.com/ikun-svelte/ikun-ui/blob/main/preset/src/theme.ts#L38)

```typescript jsx
const setAnimation = (mainColor: string) => {
	return {
		keyframes: {
			'ikun-checking': `{
			 		0% { box-shadow: 0 0 0 2px rgba(${mainColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${mainColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${mainColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${mainColor},0.05)}
					}`,
			'ikun-switching': `{
			 	  0% { box-shadow: 0 0 0 2px rgba(${mainColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${mainColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${mainColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${mainColor},0.05)}
			}`
		},
		durations: {
			'ikun-checking': '.3s',
			'ikun-switching': '.3s'
		},
		timingFns: {
			'ikun-checking': 'linear',
			'ikun-switching': 'linear'
		}
	};
};
```

## Preset Api

### presetIkun

It will return an `unocss` preset

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

```typescript jsx
import { presetIkun } from '@ikun-ui/preset';
export default function defineConfig() {
	return {
		presets: [presetIkun()]
	};
}
```

### getSafeList

It will return a list of `ikun-ui` Shortcuts,
usually to avoid component styles being wrongly shaken by packaging tools.

```typescript jsx
import { getSafeList } from '@ikun-ui/preset';
export default function defineConfig() {
	return {
		safelist: [...getSafeList()]
	};
}
```

### getCSSPreflights

According to the color variable passed in,
return the color variable string,
which is usually used in the `preflights` option of `unocss` configuration

```typescript jsx
declare function getCSSPreflights(
	/**
	 * preset color variable
	 * @default defaultColors
	 */
	theme?: Record<string, string | Record<string, string>>
): string;
```

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

### ikunColors

The default color is exposed to users,
and the content inside can be customized to override the default rules

```typescript jsx
import { ikunColors } from '@ikun-ui/preset';
ikunTheme.colors['black'] = '#333333';
```

### ikunTheme

The default theme, the color information used by the package components,
is exposed to the user,
and the content inside can be customized to override the default rules

```typescript jsx
import { ikunRules } from '@ikun-ui/preset';
ikunTheme.colors['ikun-black'] = '#333333';
```

### ikunRules

The default rules, which contain some animation and shadow rules,
are exposed to users,
and the content can be customized to override the default rules

```typescript jsx
import { ikunRules } from '@ikun-ui/preset';
ikunRules['k-input-shadow'] = { 'box-shadow': '0 0 0 2px #ff787542' };
```
