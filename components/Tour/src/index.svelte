<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTourProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { onMount, tick } from 'svelte';

	export let steps: KTourProps['steps'] = [];
	export let mask: KTourProps['mask'] = true;
	export let closeIcon: KTourProps['closeIcon'] = 'i-carbon-close';
	export let placement: KTourProps['placement'] = 'top';
	export let current: KTourProps['current'] = 0;
	export let scrollIntoViewOptions: KTourProps['scrollIntoViewOptions'] = true;
	export let zIndex: KTourProps['zIndex'] = 1001;
	export let open: KTourProps['open'] = false;
	export let cls: KTourProps['cls'] = undefined;
	export let attrs: KTourProps['attrs'] = {};

	let index = current;
	$: {
		if (current < 0) {
			index = 0;
		}
		if (current > steps.length) {
			index = steps.length;
		}
	}
	const handleClick = async () => {
		index++;
		if (index >= steps.length) {
			popoverRef.updateShow(false);
			return;
		}
		await handleAppend();
		await tick();
		popoverRef.forceUpdated();
	};

	async function handleAppend() {
		const { target } = steps[index];
		const el: null | HTMLElement = popoverRef.getPopoverContainerRef();
		if (target && el) {
			(target as HTMLElement).appendChild(el);
		}
	}

	let popoverRef: any = null;
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
		}
	}
	async function doShow(show: boolean) {
		if (popoverRef) {
			await tick();
			await setTriggerElStyle();
			await handleAppend();
			await tick();
			popoverRef.updateShow(show);
		}
	}
	$: {
		doShow(open);
	}
	onMount(() => {
		open && doShow(true);
	});

	const prefixCls = getPrefixCls('tour');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-mask w-100vw h-100vh bg-gray-400/15 pf left-0 top-0`]: mask && open
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs} style:z-index={zIndex}>
	<KPopover bind:this={popoverRef} trigger="manual" {placement}>
		<div slot="contentEl" class="flex flex-col">
			<slot current={index}>high light</slot>
			<button on:click={handleClick}>next</button>
		</div>
	</KPopover>
</div>
<svelte:window on:scroll={setTriggerElStyle} />
