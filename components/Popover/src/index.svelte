<script lang="ts">
	import { createPopperActions, type PopperOptions } from 'svelte-popperjs';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	// top left right bottom
	export let placement = 'top';
	// hover click manual
	export let trigger: 'manual' | 'click' | 'hover' = 'hover';
	export let customClass = '';
	let arrowRef:null | HTMLElement = null;
	const [popperRef, popperContent, getPopperInst] = createPopperActions({
		placement,
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
					fallbackPlacements: ['top', 'right', 'bottom']
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

	function updateShow(show: boolean) {
		setTimeout(
			async () => {
				if (isEnter) {
					isShow = true;
					await tick();
					updateArrow();
					return;
				}
				isShow = show;
				await tick();
				updateArrow();
			},
			trigger === 'hover' ? 200 : 0
		);
	}

	let curPlacement = placement;
	$: if (curPlacement !== placement) {
		updateArrow();
	}
	function updateArrow() {
		const popper = getPopperInst();
		popper && (curPlacement = popper.state.placement);
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
</script>

<div class="ui-popover">
	<div
		aria-hidden="true"
		use:popperRef
		class={customClass}
		on:click={handleClick}
		on:mouseenter={handleMouseenter}
		on:mouseleave={handleMouseleave}
	>
		<slot name="triggerEl" />
	</div>

	{#if isShow}
		<div
			class="rounded p2 bg-white shadow-lg z-999 box-border dark:bg-dark-500 dark:shadow-main dark:shadow"
			out:fade={{ duration: 200 }}
			in:fade={{ duration: 200 }}
			data-popper-placement
			aria-hidden="true"
			on:mouseenter={handleMouseenter}
			on:mouseleave={handleMouseleave}
			use:clickOutside
			use:popperContent
		>
			<slot name="contentEl" />
			<div
				{...{'ui-popover-arrow': true}}
				data-popper-arrow-bottom
				data-popper-arrow-top
				data-popper-arrow-right
				data-popper-arrow-left
				bind:this={arrowRef}
			/>
		</div>
	{/if}
</div>

<style>
	[ui-popover-arrow]::after {
		content: ' ';
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		background-color: #fff;
		top: 0;
		position: absolute;
		left: 0;
	}

	:global(.dark [ui-popover-arrow]::after) {
		background-color: #1f1f1f;
	}

	[data-popper-arrow-top] {
		bottom: 4px;
		position: absolute;
		left: calc(50% - 4px);
	}

	[data-popper-arrow-bottom] {
		top: -4px;
		position: absolute;
		left: calc(50% - 4px);
	}

	[data-popper-arrow-right] {
		top: calc(50% - 4px);
		position: absolute;
		left: -4px;
	}

	[data-popper-arrow-left] {
		top: calc(50% - 4px);
		position: absolute;
		right: 4px;
	}

	.ui-popover {
		width: fit-content;
	}
</style>