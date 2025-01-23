<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KImageProps } from './types';
	import { BROWSER } from 'esm-env';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { isString, isElement, throttle } from 'baiwusanyu-utils';
	import { getScrollContainer, isInContainer } from '@ikun-ui/utils';
	import { KImageView } from '@ikun-ui/image-view';
	export let scrollContainer: KImageProps['scrollContainer'] = undefined;
	export let previewSrcList: KImageProps['previewSrcList'] = [];
	export let fit: KImageProps['fit'] = undefined;
	export let loading: KImageProps['loading'] = undefined;
	export let lazy: KImageProps['lazy'] = false;
	export let src: KImageProps['src'] = '';
	export let alt: KImageProps['alt'] = '';
	export let cls: KImageProps['cls'] = undefined;
	export let attrs: KImageProps['attrs'] = {};

	let imageSrc: string | undefined = undefined;
	let hasLoadError = false;
	let isLoading = true;

	const dispatch = createEventDispatcher();
	const loadImage = () => {
		if (!BROWSER) return;
		// reset status
		isLoading = true;
		hasLoadError = false;
		imageSrc = src;
	};

	function handleLoad(event: Event) {
		isLoading = false;
		hasLoadError = false;
		dispatch('load', event);
	}

	function handleError(event: Event) {
		isLoading = false;
		hasLoadError = true;
		dispatch('error', event);
	}

	let container: HTMLElement | undefined = undefined;
	let _scrollContainer: HTMLElement | Window | undefined = undefined;
	function handleLazyLoad() {
		if (isInContainer(container, _scrollContainer)) {
			loadImage();
			removeLazyLoadListener();
		}
	}

	const lazyLoadHandler = throttle(handleLazyLoad, 200);

	async function addLazyLoadListener() {
		if (!BROWSER) return;

		await tick();

		if (isElement(scrollContainer)) {
			_scrollContainer = scrollContainer as HTMLElement;
		} else if (isString(scrollContainer) && scrollContainer !== '') {
			_scrollContainer =
				document.querySelector<HTMLElement>(scrollContainer as string) ?? undefined;
		} else if (container) {
			_scrollContainer = getScrollContainer(container);
		}
		if (_scrollContainer) {
			_scrollContainer.addEventListener('scroll', lazyLoadHandler);
			setTimeout(() => handleLazyLoad(), 100);
		}
	}

	function removeLazyLoadListener() {
		if (!BROWSER || !_scrollContainer || !lazyLoadHandler) return;

		_scrollContainer && _scrollContainer.removeEventListener('scroll', lazyLoadHandler);
		_scrollContainer = undefined;
	}

	const supportLoading = BROWSER && 'loading' in HTMLImageElement.prototype;
	$: isManual = (function (loadingValue, lazy) {
		if (loadingValue === 'eager') return false;
		return (!supportLoading && loadingValue === 'lazy') || lazy;
	})(loading, lazy);

	let oldSrc = src;
	$: {
		if (oldSrc !== src) {
			if (isManual) {
				// reset status
				isLoading = true;
				hasLoadError = false;
				removeLazyLoadListener();
				addLazyLoadListener();
			} else {
				loadImage();
			}
			oldSrc = src;
		}
	}

	onMount(() => {
		if (isManual) {
			addLazyLoadListener();
		} else {
			loadImage();
		}
	});

	let showViewer = false;
	function closeViewer() {
		showViewer = false;
	}

	$: isPreview = Array.isArray(previewSrcList) && previewSrcList.length > 0;
	function clickHandler(event: Event) {
		//  don't show viewer when preview is false
		if (!isPreview) return;
		showViewer = true;
		dispatch('show', event);
	}

	const prefixCls = getPrefixCls('image');
	const btnCls = `${prefixCls}--btn`;
	$: cnames = clsx(prefixCls, cls);
	$: errorCls = clsx(`${prefixCls}__error`);
	$: wrapperCls = clsx(`${prefixCls}__wrapper`);
	$: placeholderCls = clsx(`${prefixCls}__placeholder`);
	$: imageKls = clsx(`${prefixCls}__inner`, {
		[`${prefixCls}__inner`]: isPreview,
		[`${prefixCls}__loading`]: isLoading
	});
</script>

<div class={cnames} bind:this={container}>
	{#if hasLoadError}
		<slot name="error">
			<!--TODO: i18n -->
			<div class={errorCls}>FAILED</div>
		</slot>
	{:else}
		{#if imageSrc !== undefined}
			<button on:click={clickHandler} class={btnCls}>
				<img
					alt={alt || imageSrc}
					{...$$restProps}
					{...attrs}
					src={imageSrc}
					{loading}
					style:object-fit={fit}
					class={imageKls}
					on:load={handleLoad}
					on:error={handleError}
				/>
			</button>
		{/if}
		{#if isLoading}
			<div class={wrapperCls}>
				<slot name="placeholder">
					<div class={placeholderCls} />
				</slot>
			</div>
		{/if}
	{/if}
	{#if isPreview}
		<KImageView urls={previewSrcList} show={showViewer} on:close={closeViewer} />
	{/if}
</div>
