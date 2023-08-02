---
title: KIcon
lang: en-US
---

# KIcon

Thanks to unocss capabilities, any Iconify icon can be used in ikun-ui.

Use **any** icons with Pure CSS for ikun-ui.

For more icon information view [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/icon
```

```bash [yarn]
yarn add @ikun-ui/icon
```

```bash [npm]
npm install @ikun-ui/icon
```

:::

## Icon Collection

Get all icons, try on [icones](https://icones.js.org/)

![](https://raw.githubusercontent.com/antfu/icones/main/screenshots/2.png)
![](https://raw.githubusercontent.com/antfu/icones/main/screenshots/6.png)

## Basic usage

Use the `icon` attribute to define Icon. In addition,the `color` attribute can be used to set the color of the icon.

<demo 
src="../../../../example/icon/basic.svelte" 
github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Icon'>
</demo>

## Icon Props

| Name   | Type      | Default | Description                                                |
| ------ | --------- | ------- |------------------------------------------------------------|
| icon   | `string`  | `-`     | The class name of the icon, following the unocss standard  |
| btn    | `boolean` | `false` | icon as button                                             |
| width  | `string`  | `24px`  | Icon's width                                               |
| height | `string`  | `24px`  | Icon's height                                              |
| color  | `string`  | `-`     | Icon's color                                               |
| cls    | `string`  | `-`     | Additional class for icons                                 |
| attrs  | `any`     | `{}`    | Additional attributes for icons                            |
