<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KMask } from '@ikun-ui/mask';
	import { KClientOnly } from '@ikun-ui/client-only';
	import { clsx } from 'clsx';
	import type { KImageViewProps } from './types';
	import { createEventDispatcher, onMount } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	export let urls: KImageViewProps['urls'] = [];
	export let show: KImageViewProps['show'] = false;
	export let cls: KImageViewProps['cls'] = undefined;
	export let attrs: KImageViewProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	const handleClose = (e: Event) => {
		dispatch('close', e);
	};

	let isZoomIn = false;
	const handleWheel = (e: WheelEvent) => {
		if (e.deltaY < 0) {
			handleZoomIn();
		} else {
			handleZoomOut();
		}
	};
	const handleZoomIn = () => {
		isZoomIn = true;
		resolveScale(0.5, 2, 14);
	};
	const handleZoomOut = () => {
		resolveScale(-0.5, 2, 14);
	};

	const resolveScale = (step: number, min: number, max: number) => {
		let resolveFlipHorizontal = Math.abs(isFlipHorizontal) + step;
		let resolveFlipVertical = Math.abs(isFlipVertical) + step;
		if (resolveFlipHorizontal + resolveFlipVertical <= min) {
			resolveFlipHorizontal = min / 2;
			resolveFlipVertical = min / 2;
			isZoomIn = false;
		}
		if (resolveFlipHorizontal + resolveFlipVertical > max) {
			resolveFlipHorizontal = max / 2;
			resolveFlipVertical = max / 2;
		}
		isFlipHorizontal = isFlipHorizontal >= 0 ? resolveFlipHorizontal : -1 * resolveFlipHorizontal;
		isFlipVertical = isFlipVertical >= 0 ? resolveFlipVertical : -1 * resolveFlipVertical;
	};

	let degValue = 0;
	const handleLeftHanded = () => {
		degValue -= 90;
	};

	const handleRightHanded = () => {
		degValue += 90;
	};

	let isFlipHorizontal = 1;
	const handleFlipHorizontal = () => {
		isFlipHorizontal = isFlipHorizontal > 0 ? -1 * isFlipHorizontal : Math.abs(isFlipHorizontal);
	};

	let isFlipVertical = 1;
	const handleFlipVertical = () => {
		isFlipVertical = isFlipVertical > 0 ? -1 * isFlipVertical : Math.abs(isFlipVertical);
	};

	$: transformValue = `translate3d(0px, 0px, 0px) scale3d(${isFlipHorizontal}, ${isFlipVertical}, 1) rotate(${degValue}deg)`;
	$: imgStyle = `
		transform: ${transformValue};
		transition: transform 0.3s ease 0s;
	`;

	$: isShowPage = urls.length > 1;
	const prefixCls = getPrefixCls('image-view');
	$: cnames = clsx(prefixCls, cls);
	$: footerWrapperCls = clsx(`${prefixCls}--footer__wrapper`);
	$: closeCls = clsx(`${prefixCls}--close`);
	$: bodyCls = clsx(`${prefixCls}--body`);
	$: bodyImgCls = clsx(`${prefixCls}--body__img`);
	$: footerCls = clsx(`${prefixCls}--footer`);
	$: footerIconCls = clsx(`${prefixCls}--footer__icon`);
	$: zoomOutIconCls = clsx({
		[`${prefixCls}--footer__icon`]: isZoomIn,
		[`${prefixCls}--footer__icon__disabled`]: !isZoomIn
	});

	let left = '';
	let top = '';
	function drag(node: HTMLElement) {
		let x: number | undefined, y: number | undefined;

		function handleMouseDown(event: MouseEvent) {
			x = event.clientX;
			y = event.clientY;

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		}

		function handleMouseMove(event: MouseEvent) {
			const deltaX = event.clientX - x!;
			const deltaY = event.clientY - y!;
			x = event.clientX;
			y = event.clientY;
			// 更新元素位置
			left = `${node.offsetLeft + deltaX}px`;
			top = `${node.offsetTop + deltaY}px`;
		}
		function handleMouseUp() {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}
		onMount(() => {
			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);
			};
		});
		node.addEventListener('mousedown', handleMouseDown);
		return {
			destroy() {
				node.removeEventListener('mousedown', handleMouseDown);
			}
		};
	}
</script>

<KClientOnly>
	<KMask target={document.body} value={show}>
		<div class={cnames} {...$$restProps} {...attrs}>
			<div class={closeCls} on:click={handleClose} aria-hidden="true">
				<KIcon width="26px" height="26px" icon="i-carbon-close" />
			</div>

			<div class={bodyCls} on:wheel={handleWheel}>
				<img
					src={urls[0]}
					use:drag
					alt={urls[0]}
					class={bodyImgCls}
					style:left
					style:top
					style={imgStyle}
				/>
			</div>

			<div class={footerWrapperCls}>
				<div class={footerCls}>
					{#if isShowPage}
						<KIcon cls={footerIconCls} width="26px" height="26px" icon="i-carbon-chevron-left" />
					{/if}

					<KIcon
						on:click={handleFlipVertical}
						cls={footerIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-arrows-vertical"
					/>
					<KIcon
						on:click={handleFlipHorizontal}
						cls={footerIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-arrows-horizontal"
					/>
					<KIcon
						on:click={handleLeftHanded}
						cls={footerIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-rotate-counterclockwise"
					/>
					<KIcon
						on:click={handleRightHanded}
						cls={footerIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-rotate-clockwise"
					/>
					<KIcon
						on:click={handleZoomOut}
						cls={zoomOutIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-zoom-out"
					/>
					<KIcon
						on:click={handleZoomIn}
						cls={footerIconCls}
						width="20px"
						height="20px"
						icon="i-carbon-zoom-in"
					/>

					{#if isShowPage}
						<KIcon cls={footerIconCls} width="26px" height="26px" icon="i-carbon-chevron-right" />
					{/if}
				</div>
			</div>
		</div>
	</KMask>
</KClientOnly>
