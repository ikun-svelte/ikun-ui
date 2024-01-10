<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepsOption, KStepsProps } from './types';
	import KStep from './step.svelte';
	import { createEventDispatcher } from 'svelte';
	export let active: KStepsProps['active'] = 0;
	export let direction: KStepsProps['direction'] = 'horizontal';
	export let labelPlacement: KStepsProps['labelPlacement'] = 'horizontal';
	export let dot: KStepsProps['dot'] = false;
	export let navigation: KStepsProps['navigation'] = false;
	export let options: KStepsProps['options'] = [];
	export let canClick: KStepsProps['canClick'] = false;
	export let cls: KStepsProps['cls'] = undefined;
	export let attrs: KStepsProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	function handleChange(option: KStepsOption) {
		if (!canClick) return;
		dispatch('change', option);
	}

	const prefixCls = getPrefixCls('steps');
	$: cnames = clsx(prefixCls, cls);
	$: containerCls = clsx(`${prefixCls}-container`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot>
		{#each options as option, index}
			<div
				class={containerCls}
				aria-hidden="true"
				data-k-step
				on:click={() => handleChange(option)}
			>
				<KStep
					{option}
					eachIndex={index + 1}
					{active}
					{labelPlacement}
					{direction}
					{canClick}
					{dot}
					last={index === options.length - 1}
					index={option.index}
				></KStep>
			</div>
		{/each}
	</slot>
</div>
