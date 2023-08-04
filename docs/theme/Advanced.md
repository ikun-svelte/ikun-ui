---
title: Advanced
lang: en-US
---

# Advanced theme

Through the basic chapter, we learned what components `@ikun-ui/preset` consists of,
so in this chapter, we can fully customize the component style based on these.

## Simple theme color

If you just want to simply change the theme color, then ikun-preset can be easily implemented.

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
		presetIkun()
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
