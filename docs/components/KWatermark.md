---
title: KWatermark
lang: en-US
---

# KWatermark

Add text or images to pages to protect page content.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/watermark
```

```bash [yarn]
yarn add @ikun-ui/watermark
```

```bash [npm]
npm install @ikun-ui/watermark
```

:::

## Basic usage

<demo src="watermark/basic.svelte"  github='Watermark'></demo>

## Multi-line

Use `content` to set an array of strings to specify multi-line text watermark content.

<demo src="watermark/content.svelte" github='Watermark'></demo>

## Image

Specify the image address via `image`.
To ensure that the image is clearly displayed and not stretched, please set the width and height.
It is recommended to use an image with at least twice the width and height to ensure the display effect.

<demo src="watermark/image.svelte" github='Watermark'></demo>

## Watermark Props

| Name    | Type                 | Default                | Description                                                                                      |
| ------- | -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| width   | `number`             | `120`                  | The width of the watermark, the default value of `content` is its own width                      |
| height  | `number`             | `64`                   | The height of the watermark, the default value of `content` is its own height                    |
| rotate  | `number`             | `-22`                  | When the watermark is drawn, the rotation Angle, unit `°`                                        |
| zIndex  | `number`             | `9`                    | The z-index of the appended watermark element                                                    |
| image   | `string`             | `-`                    | Image source, it is recommended to export 2x or 3x image, high priority.                         |
| content | `string[] \| string` | `-`                    | Watermark text content.                                                                          |
| font    | `Font`               | `Font`                 | Text style.                                                                                      |
| gap     | `[number, number]`   | `[100, 100]`           | The spacing between watermarks.                                                                  |
| offset  | `[number, number]`   | `[gap[0]/2, gap[1]/2]` | The offset of the watermark from the upper left corner of the container. The default is `gap/2`. |
| cls     | `string`             | `''`                   | Additional class for component                                                                   |
| attrs   | `any`                | `{}`                   | Additional attributes                                                                            |

## Watermark Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | content of the watermark. |
