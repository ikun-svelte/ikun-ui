<script lang="ts">
	import { contextmenuKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KContextmenuProps } from './types';
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	export let cls: KContextmenuProps['cls'] = undefined;
	export let attrs: KContextmenuProps['attrs'] = {};
	export let disabled: KContextmenuProps['disabled'] = false;

	let show = false;
	const dispatch = createEventDispatcher();
	let contextmenuRef: null | HTMLElement = null;
	let parentEl: null | HTMLElement = null;

	const style = {
		left: '0',
		top: '0',
		zIndex: '-999'
	};
	const setPosition = (x: number, y: number) => {
		if (contextmenuRef) {
			const contextmenuWidth: number = contextmenuRef.clientWidth;
			const contextmenuHeight: number = contextmenuRef.clientHeight;
			let top = y;
			let left = x;
			if (contextmenuHeight + y >= window.innerHeight) top -= contextmenuHeight;

			if (contextmenuWidth + x >= window.innerWidth) left -= contextmenuWidth;

			style.top = `${top}px`;
			style.left = `${left + 3}px`;
			style.zIndex = `999`;
		}
	};
	const handleShow = async (evt: MouseEvent) => {
		window.__IKUN_CONTEXTMMENU_CLOSE.forEach((v: () => void) => v());

		const event = evt as MouseEvent;
		event.preventDefault();
		if (disabled) return;

		show = true;
		await tick();
		setPosition(event.clientX, event.clientY);
		dispatch('contextmenu', event);
		dispatch('change', true);
	};

	const handleClose = () => {
		if (show) {
			show = false;
			dispatch('change', false);
		}
	};

	setContext(contextmenuKey, {
		close: handleClose
	});

	onMount(() => {
		if (contextmenuRef) {
			parentEl = contextmenuRef.parentElement || document.body;
			parentEl.addEventListener('contextmenu', handleShow);
		}
		!window.__IKUN_CONTEXTMMENU_CLOSE && (window.__IKUN_CONTEXTMMENU_CLOSE = []);
		window.__IKUN_CONTEXTMMENU_CLOSE.push(handleClose);
	});

	onDestroy(() => {
		if (contextmenuRef) {
			parentEl = contextmenuRef.parentElement || document.body;
			parentEl.removeEventListener('contextmenu', handleShow);
		}
	});

	// TODO refactor
	function clickOutside(node: HTMLElement) {
		function handleClickOutside(e: MouseEvent) {
			const target = e.target as HTMLElement;
			const container = node;
			if (target && container && !container.contains(target)) {
				handleClose();
			}
		}

		window.addEventListener('click', handleClickOutside);
		return {
			destroy: () => {
				window.removeEventListener('click', handleClickOutside);
			}
		};
	}

	// class
	const prefixCls = getPrefixCls('contextmenu');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<ul
	class={cnames}
	{...$$restProps}
	{...attrs}
	style:left={style.left}
	style:top={style.top}
	style:z-index={style.zIndex}
	use:clickOutside
	bind:this={contextmenuRef}
>
	{#if show}
		<div out:fade={{ duration: 200 }} in:fade={{ duration: 300 }}>
			<slot />
		</div>
	{/if}
</ul>
