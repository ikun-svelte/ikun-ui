---
title: KEllipsis
lang: en-US
---

# KEllipsis

It can omit your text to a certain extent.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/ellipsis
```

```bash [yarn]
yarn add @ikun-ui/ellipsis
```

```bash [npm]
npm install @ikun-ui/ellipsis
```

:::

## Basic usage

Basic single line ellipsis with tooltip.  
`content` is the text you need to display in the tooltip, `text` is the text you need to abbreviate.

<demo src="ellipsis/basic.svelte"  github='Ellipsis'></demo>

## Omit the number of characters

You can specify the number of words you need to omit through `num`.

<demo src="ellipsis/num.svelte" github='Ellipsis'></demo>

## omitted position

`placement` can specify the position where the ellipsis appears

<demo src="ellipsis/position.svelte" github='Ellipsis'></demo>

## Omit multiple lines

See [caniuse <span class="i-carbon-link text-12px" />](https://caniuse.com/?search=line-clamp) for compatibility.

<demo src="ellipsis/line-clamp.svelte" github='Ellipsis'></demo>

## Ellipsis Props

| Name      | Type                            | Default | Description                                                    |
| --------- | ------------------------------- | ------- | -------------------------------------------------------------- |
| content   | `string`                        | `''`    | The text content displayed by tooltip.                         |
| text      | `string`                        | `''`    | Text content that needs to be omitted.                         |
| expand    | `boolean`                       | `false` | Abbreviated content trigger event to expand to the full text.. |
| lineClamp | `number \| null`                | `null`  | Maximum lines.                                                 |
| num       | `number`                        | `5`     | Number of characters to omit.                                  |
| placement | `'left' \| 'right' \| 'center'` | `right` | Ellipsis display position.                                     |
| cls       | `string`                        | `''`    | Additional class for                                           |
| attrs     | `Record<string, string>`        | `{}`    | Additional attributes                                          |
