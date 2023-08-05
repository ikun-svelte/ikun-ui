---
title: Advanced
lang: en-US
---

# Advanced theme

Through the basic chapter, we learned what components `@ikun-ui/preset` consists of,
so in this chapter, we can fully customize the component style based on these.

## Simple theme color

If you just want to simply change the theme color, then ikun-preset can be easily implemented.

![WX20230805-132646@2x.png](..%2Fpublic%2FWX20230805-132646%402x.png)

**e.g**

```typescript jsx
// unocss.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';
export default defineConfig({
	presets: [
		presetWind(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetTypography(),
		presetIkun('@ikun-ui/preset', '#5fbe5f')
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: [...getSafeList()],
	preflights: [
		{
			layer: 'base',
			getCSS: () => `
                :root {
                  ${getCSSPreflights()}
                }
                button,select,input,option {
                  outline: none;
                  -webkit-appearance: none
                }`
		}
	]
});
```

## Fully Custom Themes

This summary takes modifying a button style as an example,
modifying and customizing a style,
these methods can be extended to all components

### 1. Define a color variable

```typescript jsx
import { ikunColors } from '@ikun-ui/preset';
const customColors = JSON.parse(JSON.stringify(ikunColors));
customColors['custom-primary'] = '#5fbe5f';
```

### 2. Define a color in the theme

```typescript jsx
import { ikunTheme } from '@ikun-ui/preset';
const customTheme = JSON.parse(JSON.stringify(ikunTheme));
customTheme.colors['custom-color'] = 'var(--ikun-custom-primary)';
```

### 3. Shortcuts for overriding components

```typescript jsx
import { buttonShortcuts, ikunShortcuts } from '@ikun-ui/preset';
const customBtnShortcuts = JSON.parse(JSON.stringify(buttonShortcuts));
customBtnShortcuts['k-button--primary'] = 'bg-custom-color text-white';
const finalShortcuts = ikunShortcuts;
finalShortcuts.push(customBtnShortcuts);
```

### 4. Rules for overriding components

```typescript jsx
import { ikunRules } from '@ikun-ui/preset';
const customRules = JSON.parse(JSON.stringify(ikunRules));
customRules['k-btn-shadow--primary'] = { 'box-shadow': '0 0 0 2px red' };
```

### 5. Rules for overriding components

```typescript jsx
// unocss.config.ts
export default defineConfig({
	presets: [
		// ...
		presetIkun('@ikun-ui/preset', undefined, customTheme, customColors, finalShortcuts, customRules)
	]
	// ...
});
```

![WX20230805-132525@2x.png](..%2Fpublic%2FWX20230805-132525%402x.png)
