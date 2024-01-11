<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepsItem, KStepsProps } from './types';
	import KStep from './step.svelte';
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	export let active: KStepsProps['active'] = 0;
	export let direction: KStepsProps['direction'] = 'horizontal';
	export let labelPlacement: KStepsProps['labelPlacement'] = 'horizontal';
	export let dot: KStepsProps['dot'] = false;
	export let navigation: KStepsProps['navigation'] = false;
	export let items: KStepsProps['items'] = [];
	export let canClick: KStepsProps['canClick'] = false;
	export let cls: KStepsProps['cls'] = undefined;
	export let attrs: KStepsProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	function handleChange(item: KStepsItem) {
		if (!canClick) return;
		dispatch('change', item);
	}
	$: isActive = (index: number) => Number(active) === Number(index);
	const prefixCls = getPrefixCls('steps');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-horizontal`]: direction === 'horizontal'
		},
		cls
	);
	$: containerCls = clsx(`${prefixCls}-container`, {
		[`${prefixCls}-label-container-vertical`]:
			labelPlacement === 'vertical' || direction === 'vertical',
		[`${prefixCls}-container-${direction}`]: !navigation || (dot && navigation),
		[`${prefixCls}-container-horizontal--nav`]: !dot && navigation && direction === 'horizontal'
	});
	$: barCls = clsx({
		[`${prefixCls}-bar-${direction}`]: !dot && navigation && labelPlacement === 'horizontal',
		[`${prefixCls}-bar-lb-horizontal`]:
			!dot && navigation && labelPlacement === 'vertical' && direction === 'horizontal'
	});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot>
		{#each items as item, index}
			<div class={containerCls} aria-hidden="true" data-k-step on:click={() => handleChange(item)}>
				<KStep
					{item}
					eachIndex={index + 1}
					{active}
					{labelPlacement}
					{direction}
					{canClick}
					{dot}
					{navigation}
					last={index === items.length - 1}
					index={item.index}
				></KStep>

				{#if !dot && navigation && isActive(index + 1) && direction === 'horizontal'}
					<div
						class={barCls}
						out:scale={{ duration: 300, start: 0.3 }}
						in:scale={{ duration: 300, start: 0.3 }}
					></div>
				{/if}

				{#if !dot && navigation && isActive(index + 1) && direction === 'vertical'}
					<div
						class={barCls}
						out:scale={{ duration: 300, start: 0.3 }}
						in:scale={{ duration: 300, start: 0.3 }}
					></div>
				{/if}
			</div>
		{/each}
	</slot>
</div>
