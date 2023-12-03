<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KWatermarkProps } from './types';
	import { onMount } from "svelte";

	export let width: KWatermarkProps['width'] = 120;
	export let height: KWatermarkProps['height'] = 64;
	export let rotate: KWatermarkProps['rotate'] = 22;
	export let zIndex: KWatermarkProps['zIndex'] = 9;
	// TODO
	export let image: KWatermarkProps['image'] = '';
	export let content: KWatermarkProps['content'] = '';
	export let font: KWatermarkProps['font'] = {
		color: 'rgba(0,0,0,.15)',
		fontSize: 16,
		fontWeight: 'normal',
		fontFamily: 'sans-serif',
		fontStyle: 'normal',
		textBaseline: 'top'
	};
	export let gap: KWatermarkProps['gap'] = [100, 100];
	export let offset: KWatermarkProps['offset'] = [gap[0] / 2, gap[1] / 2];
	export let cls: KWatermarkProps['cls'] = undefined;
	export let attrs: KWatermarkProps['attrs'] = {};

	$: color = font?.color ?? 'rgba(0,0,0,.15)';
	$: fontSize = font?.fontSize ?? 16;
	$: fontWeight = font?.fontWeight ?? 'normal';
	$: fontStyle = font?.fontStyle ?? 'normal';
	$: fontFamily = font?.fontFamily ?? 'sans-serif';
	$: textBaseline = font?.textBaseline ?? 'top';

	$: gapX = gap[0];
	$: gapY = gap[1];

	$: gapXCenter = gapX / 2;
	$: gapYCenter = gapY / 2;
	$: offsetLeft = offset?.[0] ?? gapXCenter;
	$: offsetTop = offset?.[1] ?? gapYCenter;

	const ratio = window.devicePixelRatio || 1
	let watermarkRef: null | HTMLElement = null
	const setFontStyle = (ctx: CanvasRenderingContext2D, angleInRadians = ((rotate * Math.PI) / 180)) => {
		ctx.rotate(angleInRadians);
		ctx.fillStyle = color;
		ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
		ctx.textBaseline = textBaseline
	}
	const createImgBase = () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.height = height * ratio
		canvas.width = width * ratio
		if (ctx) {
			if(content){
				setFontStyle(ctx)
				const textMetrics = ctx.measureText(content as string);
				const textWidth = textMetrics.width;
				const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
				const angleInRadians = (rotate * Math.PI) / 180
				const realWidth = Math.abs(textWidth * Math.cos(angleInRadians)) + Math.abs(textHeight * Math.sin(angleInRadians));
				const realHeight = Math.abs(textWidth * Math.sin(angleInRadians)) + Math.abs(textHeight * Math.cos(angleInRadians));

				canvas.width = realWidth + offsetLeft
				canvas.height = (realHeight + offsetTop)

				const centerX = canvas.width / 2;
				const centerY = canvas.height / 2;
				ctx.translate(centerX, centerY);
				setFontStyle(ctx, angleInRadians)
				ctx.fillText(content as string, -textWidth / 2, -textHeight / 2);
			} else if(image){
				const imgEl = new Image()
				imgEl.src = image
				imgEl.onload = () => {
					ctx.drawImage(imgEl, 20, 30, imgEl.width, imgEl.height);
				}
			}

		}
		return canvas.toDataURL('image/png');
	};

	const prefixCls = getPrefixCls('watermark');
	const genWaterMark = () => {
		const dataURL = createImgBase();
		// return
		const defaultStyle = document.createElement('style');
		defaultStyle.innerHTML = `
		.${prefixCls}::after {
    		content: '';
    		display: block;
    		width: 100%;
    		height: 100vh;
    		background-image: url(${dataURL});
    		background-repeat: repeat;
    		pointer-events: none;
    		position: fixed;
    		z-index: ${zIndex};
    		top: 0;
    		left: 0;
    	}`;
		watermarkRef && watermarkRef.appendChild(defaultStyle);
	};

	onMount(genWaterMark)

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames}
	 {...$$restProps}
	 {...attrs}
	 bind:this={watermarkRef}>
	<slot />
</div>
