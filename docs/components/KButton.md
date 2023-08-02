---
title: KButton
lang: en-US
---

# KButton

Commonly used button.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/button
```

```bash [yarn]
yarn add @ikun-ui/button
```

```bash [npm]
npm install @ikun-ui/button
```

:::


## Basic usage
Use `type`, `round` and `circle` to define Button's style.

<demo 
src="../../../../example/button/basic.svelte" 
github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Button'>
</demo>

## Disabled Button
Use `disabled` attribute to determine whether a button is disabled.   
It accepts a `Boolean` value.  

<demo
src="../../../../example/button/disabled.svelte"
github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Button'>
</demo>

## Icon Button
Use the icon attribute to add icon.

<demo
src="../../../../example/button/icon.svelte"
github='https://github.com/ikun-svelte/ikun-ui/tree/main/components/Button'>
</demo>

## Button Props

| Name      | Type      | Default                                               | Description                                                |
|-----------|-----------|-------------------------------------------------------|------------------------------------------------------------|
| icon      | `string`  | `-`                                                   | The class name of the icon, following the unocss standard  |
| circle    | `boolean` | `false`                                               | Determine whether it's a circle button                     |
| round     | `string`  | `-`                                                   | Button's border radius                                     |
| disabled  | `boolean` | `false`                                               | Disable the button                                         |
| type      | `enum`    | `'success' / 'error' / 'warning' / 'info'/ 'primary'` | Button type                                                |
| cls       | `string`  | `-`                                                   | Additional class for icons                                 |
| attrs     | `any`     | `{}`                                                  | Additional attributes for icons                            |

## Button Events

| Name     | Description                             | Type                 |
|----------|-----------------------------------------|----------------------|
| click    | Event fired when the button is clicked  | `(e: Event)=> void`  |
