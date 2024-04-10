<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTourProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { onMount, tick } from 'svelte';
	import { createEventDispatcher } from "svelte";
	import { KIcon } from "@ikun-ui/icon";
	import { KButton } from "@ikun-ui/button";

	export let steps: KTourProps['steps'] = [];
	export let mask: KTourProps['mask'] = true;
	export let closeIcon: KTourProps['closeIcon'] = 'i-carbon-close';
	export let placement: KTourProps['placement'] = 'top';
	export let current: KTourProps['current'] = 0;
	export let scrollIntoViewOptions: KTourProps['scrollIntoViewOptions'] = true;
	export let zIndex: KTourProps['zIndex'] = 1001;
	export let open: KTourProps['open'] = false;
	export let cls: KTourProps['cls'] = undefined;
	export let contentCls: KTourProps['contentCls'] = undefined;
	export let attrs: KTourProps['attrs'] = {};
	const dispatch = createEventDispatcher();
	let index = current;
	$: {
		initIndex(current, steps.length)
	}
	function initIndex(cur: number, max: number){
		if (cur < 0) {
			index = 0;
		}
		if (current > max) {
			index = max
		}
	}

	const handleClick = async () => {
		index++;
		if (index >= steps.length) {
			await doClose(false)
			dispatch('finish')
			return;
		}
		await setTriggerElStyle();
		await handleAppend();
		popoverRef.forceUpdated();
		dispatch('change', index)
	};

	async function handleAppend() {
		const { target } = steps[index];
		const el: null | HTMLElement = popoverRef.getPopoverContainerRef();
		if (target && el) {
			(target as HTMLElement).appendChild(el);
			scrollIntoViewOptions && target.scrollIntoView(scrollIntoViewOptions)
		}
	}

	let popoverRef: any = null;
	let maskWidth = ''
	let maskHeight = ''
	let maskBorderTopWidth = ''
	let maskBorderLeftWidth = ''
	let maskBorderRightWidth = ''
	let maskBorderBottomWidth = ''
	async function setTriggerElStyle() {
		const { target } = steps[index];
		const el: null | HTMLElement = popoverRef.getPopoverContainerRef();
		if (el && target) {
			const { left, top, width, height } = target.getBoundingClientRect();
			el.style.width = `${width}px`;
			el.style.height = `${height}px`;
			el.style.position = 'fixed';
			el.style.top = `${top}px`;
			el.style.left = `${left}px`;

			maskWidth = `${width}px`;
			maskHeight = `${height}px`;

			maskBorderTopWidth = `${Math.max(top, 0)}px`;
			maskBorderLeftWidth = `${Math.max(left, 0)}px`;
			const { marginRight, marginLeft, marginBottom, marginTop } = window.getComputedStyle(document.body)
			const widthWithMargin = document.body.offsetWidth + parseInt(marginLeft) + parseInt(marginRight);
			const heightWithMargin = document.body.offsetHeight + parseInt(marginBottom) + parseInt(marginTop);
			maskBorderBottomWidth = `${Math.max(heightWithMargin - height - top, 0)}px`;
			maskBorderRightWidth = `${Math.max(widthWithMargin - width - left, 0)}px`;
			await tick()
			setMaskCls = mask && isShow
		}
	}
	async function doShow(show: boolean) {
		isShow = show
		await tick();
		if (popoverRef) {
			if(isShow){
				await setTriggerElStyle();
				await handleAppend();
				await tick();
			}
			popoverRef.updateShow(show);
		}
	}

	async function doClose(isDispatch:boolean){
		index = current
		popoverRef.updateShow(false);
		isShow = open = false
		if(isDispatch){
			dispatch('finish')
		}
	}

	let isShow = open
	$: {
		doShow(open);
	}
	onMount(() => {
		isShow && doShow(isShow);
	});

	const prefixCls = getPrefixCls('tour');
	let setMaskCls = false
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-mask`]: setMaskCls
		},
		cls
	);
	$: contentClass = clsx(`${prefixCls}-content`, contentCls);
	const headerCls = clsx(`${prefixCls}-header`);
	const closeCls = clsx(`${prefixCls}-close`);
	const bodyCls = clsx(`${prefixCls}-body`);
	const footerCls = clsx(`${prefixCls}-footer`);
</script>

{#if isShow}
	<div class={cnames} {...$$restProps} {...attrs}
		 style:width={maskWidth}
		 style:height={maskHeight}
		 style:border-left-width={maskBorderLeftWidth}
		 style:border-top-width={maskBorderTopWidth}
		 style:border-bottom-width={maskBorderBottomWidth}
		 style:border-right-width={maskBorderRightWidth}
		 style:z-index={zIndex}>
		<KPopover bind:this={popoverRef} trigger="manual" {placement}>
			<div slot="contentEl" class={contentClass}>
				<div class={headerCls}>
					<slot name="title" current={index}>
						{#if steps[index].title}
							<span>{steps[index].title}</span>
						{/if}
					</slot>
					<div class={closeCls}
						 role="button"
						 aria-hidden="true"
						 on:click={() => doClose(true)}>
						<KIcon icon={closeIcon} width="auto" height="auto"></KIcon>
					</div>
				</div>
				<div class={bodyCls}>
					<slot current={index} name="description">
						{#if steps[index].description}
							<span>{steps[index].description}</span>
						{/if}
					</slot>
				</div>

				<button on:click={handleClick}>next</button>
			</div>
		</KPopover>
	</div>
{/if}
<svelte:window on:scroll={setTriggerElStyle} />

