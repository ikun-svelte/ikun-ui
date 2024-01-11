<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepsProps } from './types';
	import KStep from './step.svelte';
	import { createEventDispatcher } from 'svelte';
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
	function handleChange(e: CustomEvent) {
		if (!canClick) return;
		dispatch('change', e.detail);
	}

	const prefixCls = getPrefixCls('steps');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-horizontal`]: direction === 'horizontal'
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot>
		{#each items as item, index}
			<KStep
				on:change={handleChange}
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
		{/each}
	</slot>
</div>
