<script lang="ts">
	import { createPopperActions, type PopperOptions } from 'svelte-popperjs';
	import { scale } from 'svelte/transition';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPopoverProps } from './types';
	import { createEventDispatcher } from 'svelte';

	export let placement: KPopoverProps['placement'] = 'top';
	// hover click manual
	export let trigger: KPopoverProps['trigger'] = 'hover';
	export let attrs: KPopoverProps['attrs'] = {};
	export let disabled: KPopoverProps['disabled'] = false;
	export let cls: KPopoverProps['cls'] = undefined;
	export let clsTrigger: KPopoverProps['clsTrigger'] = undefined;
	export let arrow: KPopoverProps['arrow'] = true;

	/**
	 * @internal
	 */
	export let width: KPopoverProps['width'] = undefined;
	$: curPlacement = placement;
	let arrowRef: null | HTMLElement = null;
	const dispatch = createEventDispatcher();
	const [popperRef, popperContent] = createPopperActions({
		placement,
		onFirstUpdate: updateArrow,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 8]
				}
			},
			{
				name: 'flip',
				options: {
					fallbackPlacements: ['top', 'right', 'bottom', 'left']
				}
			},
			{
				name: 'computeStyles',
				options: {
					gpuAcceleration: false // true by default
				}
			},
			{
				name: 'updated',
				enabled: true,
				phase: 'afterWrite',
				fn(arg: any) {
					if (arg.state.placement !== curPlacement) {
						curPlacement = arg.state.placement;
						updateArrow();
					}
				}
			}
		],
		strategy: 'fixed'
	} as PopperOptions<any>);

	let isShow = false;
	const handleClick = () => {
		if (trigger === 'manual') {
			updateShow(!isShow);
		}

		if (trigger === 'click') {
			updateShow(true);
		}
	};

	let isEnter = false;
	const handleMouseenter = () => {
		if (trigger === 'hover') {
			isEnter = true;
			updateShow(true);
		}
	};
	const handleMouseleave = () => {
		if (trigger === 'hover') {
			isEnter = false;
			updateShow(false);
		}
	};

	export function updateShow(show: boolean) {
		if (disabled) return;
		setTimeout(
			async () => {
				if (isEnter) {
					isShow = true;
					dispatch('change', isShow);
					return;
				}
				isShow = show;
				dispatch('change', isShow);
			},
			trigger === 'hover' ? 200 : 0
		);
	}

	function updateArrow() {
		arrowRef && arrowRef.removeAttribute(`data-popper-arrow-top`);
		arrowRef && arrowRef.removeAttribute(`data-popper-arrow-bottom`);
		arrowRef && arrowRef.removeAttribute(`data-popper-arrow-left`);
		arrowRef && arrowRef.removeAttribute(`data-popper-arrow-right`);
		arrowRef && arrowRef.setAttribute(`data-popper-arrow-${curPlacement}`, '');
	}
	function clickOutside(node: HTMLElement) {
		function handleClickOutside(e: MouseEvent) {
			const target = e.target as HTMLElement;
			const container = node;
			if (target && container && !container.contains(target)) {
				updateShow(false);
			}
		}
		trigger === 'click' && window.addEventListener('click', handleClickOutside);
		return {
			destroy: () => {
				trigger === 'click' && window.removeEventListener('click', handleClickOutside);
			}
		};
	}

	$: prefixCls = getPrefixCls('popover');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__${placement}`,
		`${prefixCls}--base__${placement}__dark`,
		`${prefixCls}--base__dark`,
		cls
	);

	$: triggerCls = clsx('flex', clsTrigger);
</script>

<div
	aria-hidden="true"
	use:popperRef
	on:click={handleClick}
	class={triggerCls}
	style:width
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
>
	<slot name="triggerEl" />
</div>

{#if isShow}
	<div
		class={cnames}
		out:scale={{ duration: 200, start: 0.3, opacity: 0 }}
		in:scale={{ duration: 200, start: 0.3, opacity: 0 }}
		data-popper-placement
		aria-hidden="true"
		{...attrs}
		on:mouseenter={handleMouseenter}
		on:mouseleave={handleMouseleave}
		use:clickOutside
		use:popperContent
	>
		<slot name="contentEl" />
		{#if arrow}
		<div
			{...{ 'k-popover-arrow': true }}
			data-popper-arrow-bottom
			data-popper-arrow-top
			data-popper-arrow-right
			data-popper-arrow-left
			bind:this={arrowRef}
		/>
		{/if}
	</div>
{/if}

<style>
	[k-popover-arrow]::after {
		content: ' ';
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		background-color: var(--ikun-white);
		top: 0;
		position: absolute;
		left: 0;
	}

	:global(.dark [k-popover-arrow]::after) {
		--at-apply: bg-ikun-dark-300;
	}

	[data-popper-arrow-top] {
		bottom: 4px;
		position: absolute;
		left: calc(50% - 4px);
	}

	:global(.dark [data-popper-arrow-top]::after) {
		--at-apply: k-popover-arrow-shadow__top__dark;
	}

	[data-popper-arrow-bottom] {
		top: -4px;
		position: absolute;
		left: calc(50% - 4px);
	}

	:global(.dark [data-popper-arrow-bottom]::after) {
		--at-apply: k-popover-arrow-shadow__bottom__dark;
	}

	[data-popper-arrow-right] {
		top: calc(50% - 4px);
		position: absolute;
		left: -4px;
	}

	:global(.dark [data-popper-arrow-right]::after) {
		--at-apply: k-popover-arrow-shadow__right__dark;
	}

	[data-popper-arrow-left] {
		top: calc(50% - 4px);
		position: absolute;
		right: 4px;
	}

	:global(.dark [data-popper-arrow-left]::after) {
		--at-apply: k-popover-arrow-shadow__left__dark;
	}
</style>
