<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KWatermarkProps } from './types';
	import { onDestroy, onMount, tick } from 'svelte';
	import { getPixelRatio, getStyleStr, reRendering } from './utils';
	import useClips, { FontGap } from './useClips';

	export let width: KWatermarkProps['width'] = 120;
	export let height: KWatermarkProps['height'] = 64;
	export let rotate: KWatermarkProps['rotate'] = -22;
	export let zIndex: KWatermarkProps['zIndex'] = 9;
	export let image: KWatermarkProps['image'] = '';
	export let content: KWatermarkProps['content'] = '';
	export let font: KWatermarkProps['font'] = {
		color: 'rgba(0,0,0,.15)',
		fontSize: 16,
		fontWeight: 'normal',
		fontFamily: 'sans-serif',
		textAlign: 'center',
		fontStyle: 'normal',
		textBaseline: 'top'
	};
	export let gap: KWatermarkProps['gap'] = [100, 100];
	export let offset: KWatermarkProps['offset'] = [gap[0] / 2, gap[1] / 2];
	export let cls: KWatermarkProps['cls'] = undefined;
	export let attrs: KWatermarkProps['attrs'] = {};

	const style = {
		position: 'relative'
	};

	$: color = font?.color ?? 'rgba(0,0,0,.15)';
	$: fontSize = font?.fontSize ?? 16;
	$: fontWeight = font?.fontWeight ?? 'normal';
	$: fontStyle = font?.fontStyle ?? 'normal';
	$: fontFamily = font?.fontFamily ?? 'sans-serif';
	$: textBaseline = font?.textBaseline ?? 'top';
	$: textAlign = font?.textAlign ?? 'center';

	$: gapX = gap[0];
	$: gapY = gap[1];

	$: gapXCenter = gapX / 2;
	$: gapYCenter = gapY / 2;
	$: offsetLeft = offset?.[0] ?? gapXCenter;
	$: offsetTop = offset?.[1] ?? gapYCenter;

	const getMarkStyle = () => {
		const markStyle = {
			zIndex: zIndex,
			position: 'absolute',
			left: '0',
			top: '0',
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
			backgroundRepeat: 'repeat',
			backgroundPosition: ''
		};

		/** Calculate the style of the offset */
		let positionLeft = offsetLeft - gapXCenter;
		let positionTop = offsetTop - gapYCenter;
		if (positionLeft > 0) {
			markStyle.left = `${positionLeft}px`;
			markStyle.width = `calc(100% - ${positionLeft}px)`;
			positionLeft = 0;
		}
		if (positionTop > 0) {
			markStyle.top = `${positionTop}px`;
			markStyle.height = `calc(100% - ${positionTop}px)`;
			positionTop = 0;
		}
		markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

		return markStyle;
	};

	let containerRef: HTMLDivElement | null = null;
	let watermarkRef: HTMLDivElement | null = null;
	let stopObservation = false;

	const destroyWatermark = () => {
		if (watermarkRef) {
			watermarkRef.remove();
			watermarkRef = null;
		}
	};
	const appendWatermark = (base64Url: string, markWidth: number) => {
		if (containerRef && watermarkRef) {
			stopObservation = true;
			watermarkRef.setAttribute(
				'style',
				getStyleStr({
					...getMarkStyle(),
					backgroundImage: `url('${base64Url}')`,
					backgroundSize: `${Math.floor(markWidth)}px`
				})
			);
			containerRef?.append(watermarkRef);
			// Delayed execution
			setTimeout(() => {
				stopObservation = false;
			});
		}
	};

	/**
	 * Get the width and height of the watermark. The default values are as follows
	 * Image: [120, 64]; Content: It's calculated by content;
	 */
	const getMarkSize = (ctx: CanvasRenderingContext2D) => {
		let defaultWidth = 120;
		let defaultHeight = 64;
		if (!image && ctx.measureText) {
			ctx.font = `${Number(fontSize)}px ${fontFamily}`;
			const contents = Array.isArray(content) ? content : [content];
			const sizes = contents.map((item) => {
				const metrics = ctx.measureText(item!);

				return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
			});
			defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
			defaultHeight =
				Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length +
				(contents.length - 1) * FontGap;
		}
		return [width ?? defaultWidth, height ?? defaultHeight] as const;
	};

	const getClips = useClips();

	$: renderWatermark = async () => {
		await tick();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (ctx) {
			if (!watermarkRef) {
				watermarkRef = document.createElement('div');
			}

			const ratio = getPixelRatio();
			const [markWidth, markHeight] = getMarkSize(ctx);

			const drawCanvas = (
				drawContent?: NonNullable<KWatermarkProps['content']> | HTMLImageElement
			) => {
				const [textClips, clipWidth] = getClips(
					drawContent || '',
					rotate,
					ratio,
					markWidth,
					markHeight,
					{
						color: color,
						fontSize: fontSize,
						fontStyle: fontStyle,
						fontWeight: fontWeight,
						fontFamily: fontFamily,
						textAlign: textAlign,
						textBaseline: textBaseline
					},
					gapX,
					gapY
				);
				appendWatermark(textClips, clipWidth);
			};

			if (image) {
				const img = new Image();
				img.onload = () => {
					drawCanvas(img);
				};
				img.onerror = () => {
					drawCanvas(content);
				};
				img.crossOrigin = 'anonymous';
				img.referrerPolicy = 'no-referrer';
				img.src = image;
			} else {
				drawCanvas(content);
			}
		}
	};

	const onMutate = (mutations: MutationRecord[]) => {
		if (stopObservation) {
			return;
		}
		mutations.forEach((mutation) => {
			if (reRendering(mutation, watermarkRef)) {
				destroyWatermark();
				renderWatermark();
			}
		});
	};

	const observer = new MutationObserver(onMutate);
	onMount(() => {
		renderWatermark();
		if (containerRef) {
			observer.observe(containerRef, {
				attributes: true
			});
		}
	});

	onDestroy(() => {
		destroyWatermark();
		observer.disconnect();
	});

	const prefixCls = getPrefixCls('watermark');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div
	class={cnames}
	bind:this={containerRef}
	style:position={style.position}
	{...$$restProps}
	{...attrs}
>
	<slot />
</div>
