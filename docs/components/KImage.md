---
title: KImage
lang: en-US
---

# KImage

Besides the native features of img, support lazy load, custom placeholder and load failure, etc.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/image
pnpm add @ikun-ui/image-view
```

```bash [yarn]
yarn add @ikun-ui/image
yarn add @ikun-ui/image-view
```

```bash [npm]
npm install @ikun-ui/image
npm install @ikun-ui/image-view
```

:::

## Basic usage

Indicate how the image should be resized to fit its container by fit, same as native [object-fit <span class="i-carbon-link text-12px" />](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

<demo src="image/basic.svelte"  github='Image'></demo>

## Placeholder

You can use the `placeholder` slot to define the placeholder content when the image is not loaded.

<demo src="image/placeholder.svelte"  github='Image'></demo>

## Load Failed

You can use the `error` slot to define the placeholder content when the image fails to load.

<demo src="image/failed.svelte"  github='Image'></demo>

## Lazy Load

The lazy loading function can be turned on through `lazy`,
and the image will not be loaded until it is scrolled into the visible range.

<demo src="image/lazy.svelte"  github='Image'></demo>

## Image Preview

The function of previewing large images can be enabled through `previewSrcList`

<demo src="image/preview.svelte"  github='Image'></demo>

## Image Props

| Name            | Type                                                          | Default | Description                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| scrollContainer | `string \| HTMLElement`                                       | `""`    | The container to add scroll listener when using lazy load. By default, the container to add scroll listener when using lazy load.                                                          |
| loading         | `'eager' \| 'lazy'`                                           | `""`    | Indicates how the browser should load the image, same as [native <span class="i-carbon-link text-12px" />](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading).    |
| previewSrcList  | `string[]`                                                    | `[]`    | Allow big image preview.                                                                                                                                                                   |
| fit             | `'fill' \| 'contain'    \| 'cover' \| 'none' \| 'scale-down'` | `""`    | Indicate how the image should be resized to fit its container, same as [object-fit <span class="i-carbon-link text-12px" />](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit). |
| src             | `string`                                                      | `""`    | Image source, same as native.                                                                                                                                                              |
| alt             | `string`                                                      | `""`    | Native attribute `alt`.                                                                                                                                                                    |
| cls             | `string`                                                      | `""`    | Additional class for component                                                                                                                                                             |
| attrs           | `any`                                                         | `{}`    | Additional attributes                                                                                                                                                                      |

## Image Events

| Name  | Description                       | Type                    |
| ----- | --------------------------------- | ----------------------- |
| load  | same as native load.              | `(event: Event)=> void` |
| error | same as native error..            | `(event: Event)=> void` |
| show  | trigger when the viewer displays. | `(event: Event)=> void` |

## Image Slots

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| placeholder | custom placeholder content when image hasn't loaded yet. |
| error       | custom image load failed content.                        |

## ImageView Props

| Name  | Type       | Default | Description                      |
| ----- | --------   | ------- | ------------------------------   |
| show  | `boolean`  | `false` | Whether to display image preview |
| urls  | `string[]` | `[]`    | Preview image link list          |
| cls   | `string`   | `""`    | Additional class for component   |
| attrs | `any`      | `{}`    | Additional attributes            |

## Image Events

| Name  | Description            | Type                    |
| ----- | ---------------------- | ----------------------- |
| close | triggered when closed. | `(event: Event)=> void` |
