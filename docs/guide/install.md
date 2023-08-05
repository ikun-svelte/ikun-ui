# Installation

This section explains how to properly install and use an Ikun UI.

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/core && pnpm add -D unocss && pnpm add -D @ikun-ui/preset
```

```bash [yarn]
yarn add @ikun-ui/core && yarn add -D unocss && pnpm add -D @ikun-ui/preset
```

```bash [npm]
npm install @ikun-ui/core && npm install unocss -D && pnpm add -D @ikun-ui/preset
```

:::

// TODO 全局导入
Add `onu-ui` in your main entry file.

```ts
// main.ts
import OnuUI from 'onu-ui';
import 'uno.css';
import 'onu-ui/dist/style.css';

createApp(App).use(OnuUI).mount('#app');
```

// TODO 精简unocss配置

## Custom UnoCSS config

install icon
::: code-group

```bash [pnpm]
pnpm add -D @iconify-json/carbon
```

```bash [yarn]
yarn add -D @iconify-json/carbon
```

```bash [npm]
npm install @iconify-json/carbon
```

:::

Custom your UnoCSS config:

```ts
// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetWind } from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';
export default defineConfig({
	presets: [presetWind(), presetAttributify(), presetIcons(), presetIkun()],
	safelist: [...getSafeList()],
	preflights: [
		{
			layer: 'base',
			getCSS: () => `:root {${getCSSPreflights()}}`
		}
	]
});
```
