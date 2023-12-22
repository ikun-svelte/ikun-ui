<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KAffixProps } from './types';
	import type { ScrollTarget } from './utils';
	import { unwrapElement, getScrollTop, getRect, beforeNextFrameOnce } from './utils';
	import { onDestroy, onMount } from 'svelte';
	export let cls: KAffixProps['cls'] = undefined;
	export let attrs: KAffixProps['attrs'] = {};
	export let listenTo: KAffixProps['listenTo'] = undefined;
	export let top: KAffixProps['top'] = undefined;
	export let bottom: KAffixProps['bottom'] = undefined;
	export let triggerTop: KAffixProps['triggerTop'] = undefined;
	export let triggerBottom: KAffixProps['triggerBottom'] = undefined;
	export let positionOption: KAffixProps['positionOption'] = 'fixed';

	let scrollTarget: ScrollTarget | null = null;
	let stickToTopRef = false;
	let stickToBottomRef = false;
	let bottomAffixedTriggerScrollTopRef: number | null = null;
	let topAffixedTriggerScrollTopRef: number | null = null;
	$: affixedRef = stickToBottomRef || stickToTopRef;
	$: mergedOffsetTopRef = triggerTop ?? top;
	$: mergedTopRef = top ?? triggerTop;
	$: mergedBottomRef = bottom ?? triggerBottom;
	$: mergedOffsetBottomRef = triggerBottom ?? bottom;
	let selfRef: Element | null = null;

	const init = (): void => {
		if (listenTo) {
			scrollTarget = unwrapElement(listenTo);
		} else {
			scrollTarget = document;
		}
		if (scrollTarget) {
			scrollTarget.addEventListener('scroll', handleScroll);
			handleScroll();
		}
	};
	function handleScroll(): void {
		beforeNextFrameOnce(doHandleScroll);
	}

	function doHandleScroll(): void {
		const selfEl = selfRef;
		if (!scrollTarget || !selfEl) return;
		const scrollTop = getScrollTop(scrollTarget);
		if (affixedRef) {
			if (topAffixedTriggerScrollTopRef !== null && scrollTop < topAffixedTriggerScrollTopRef) {
				stickToTopRef = false;
				topAffixedTriggerScrollTopRef = null;
			}
			if (
				bottomAffixedTriggerScrollTopRef !== null &&
				scrollTop > bottomAffixedTriggerScrollTopRef
			) {
				stickToBottomRef = false;
				bottomAffixedTriggerScrollTopRef = null;
			}
			return;
		}
		const containerRect = getRect(scrollTarget);
		const affixRect = selfEl.getBoundingClientRect();
		const pxToTop = affixRect.top - containerRect.top;
		const pxToBottom = containerRect.bottom - affixRect.bottom;
		const mergedOffsetTop = mergedOffsetTopRef;
		const mergedOffsetBottom = mergedOffsetBottomRef;
		if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
			stickToTopRef = true;
			topAffixedTriggerScrollTopRef = scrollTop - (mergedOffsetTop - pxToTop);
		} else {
			stickToTopRef = false;
			topAffixedTriggerScrollTopRef = null;
		}
		if (mergedOffsetBottom !== undefined && pxToBottom <= mergedOffsetBottom) {
			stickToBottomRef = true;
			bottomAffixedTriggerScrollTopRef = scrollTop + mergedOffsetBottom - pxToBottom;
		} else {
			stickToBottomRef = false;
			bottomAffixedTriggerScrollTopRef = null;
		}
	}
	onMount(init);
	onDestroy(() => {
		if (!scrollTarget) return;
		scrollTarget.removeEventListener('scroll', handleScroll);
	});

	let styleTop: string = '';
	$: {
		if (stickToTopRef && mergedOffsetTopRef !== undefined && mergedTopRef !== undefined) {
			styleTop = `${mergedTopRef}px`;
		}
	}

	let styleBottom: string = '';
	$: {
		if (stickToBottomRef && mergedOffsetBottomRef !== undefined && mergedBottomRef !== undefined) {
			styleBottom = `${mergedBottomRef}px`;
		}
	}

	const prefixCls = getPrefixCls('affix');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--affixed`]: affixedRef,
			[`${prefixCls}--absolute-positioned`]: positionOption === 'absolute'
		},
		cls
	);
</script>

<div
	class={cnames}
	style:top={styleTop}
	style:bottom={styleBottom}
	bind:this={selfRef}
	{...$$restProps}
	{...attrs}
>
	<slot />
</div>
