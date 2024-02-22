<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import type { KAutoCompleteProps } from './types';

	export let label: KAutoCompleteProps['label'] = '';
	export let cls: KAutoCompleteProps['cls'] = '';
	export let disabled: KAutoCompleteProps['disabled'] = false;
	export let isActive: KAutoCompleteProps['isActive'] = false;
	export let attrs: KAutoCompleteProps['attrs'] = {};
	export let fitInputWidth: boolean = false;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		if (disabled) return;
		dispatch('click');
	};

	// class names
	const prefixCls = getPrefixCls('select--option');
	$: cnames = clsx(
		`${prefixCls}`,
		`${prefixCls}__dark`,
		`${prefixCls}__hover`,
		{
			[`${prefixCls}--base__disabled__dark`]: disabled,
			[`${prefixCls}__fit`]: fitInputWidth
		},
		cls
	);
	$: activeCls = isActive ? `${prefixCls}__active` : '';
</script>

<slot>
	<option class={`${cnames} ${activeCls}`} {...$$restProps} {...attrs} on:click={handleClick}>
		{label}
	</option>
</slot>
