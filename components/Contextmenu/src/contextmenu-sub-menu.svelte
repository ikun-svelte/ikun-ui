<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KContextmenuProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { tick } from 'svelte';

	export let cls: KContextmenuProps['cls'] = undefined;
	export let attrs: KContextmenuProps['attrs'] = {};
	export let title: KContextmenuProps['title'] = '';

	let show = false;
	const style = {
		left: '0',
		top: '0',
		zIndex: '-999'
	};
	let itemRef: HTMLElement | null = null;
	const handleEnter = async (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		show = true;
		await tick();
		if (target && itemRef) {
			const { width, height, top, left } = target.getBoundingClientRect();
			const { width: itemWidth, height: itemHeight } = (
				itemRef as HTMLElement
			).getBoundingClientRect();
			let y = top - itemHeight / 2 + height / 2;
			let x = width + left;

			if (y + itemHeight >= window.innerHeight) y -= height;

			if (x + itemWidth >= window.innerWidth) x -= width + itemWidth;

			style.top = `${y}px`;
			style.left = `${x}px`;
			style.zIndex = `999`;
		}
	};

	const handleLeave = () => {
		show = false;
	};

	// class
	const prefixCls = getPrefixCls('contextmenu-sub-menu');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);

	$: itemCls = clsx({
		[`${prefixCls}-item`]: true
	});
</script>

<li
	class={cnames}
	on:mouseenter={handleEnter}
	on:mouseleave={handleLeave}
	{...$$restProps}
	{...attrs}
>
	<span>{title}</span>
	<KIcon icon="i-carbon-chevron-right" width="auto" height="auto"></KIcon>
	{#if show}
		<div
			class={itemCls}
			style:left={style.left}
			style:top={style.top}
			bind:this={itemRef}
			style:z-index={style.zIndex}
		>
			<slot />
		</div>
	{/if}
</li>
<li />
