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

## Use

```typescript jsx
/*App.svelte*/
<script lang="ts">
    import { KButton } from "@ikun-ui/core";
    import 'virtual:uno.css'
</script>
<KButton>KButton</KButton>

```

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
// unocss.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetIcons(), presetIkun()],
    safelist: [...getSafeList()],
    preflights: [
        {
            layer: 'base',
            getCSS: () => `:root {${getCSSPreflights()}}`
        }
    ]
});
```
