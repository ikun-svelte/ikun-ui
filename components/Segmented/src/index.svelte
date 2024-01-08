<script lang="ts">
	import { getPrefixCls, segmentedKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSegmentedProps, SizeChangeFns, ValueChangeFns } from './types';
	import { createEventDispatcher, setContext } from 'svelte';

	export let value: KSegmentedProps['value'] = '';
	export let size: KSegmentedProps['size'] = 'md';
	export let block: KSegmentedProps['block'] = false;
	export let cls: KSegmentedProps['cls'] = undefined;
	export let attrs: KSegmentedProps['attrs'] = {};

	let sizeChangeFns: SizeChangeFns = [];
	let valueChangeFns: ValueChangeFns = [];
	setContext(segmentedKey, {
		segmentedValue: value,
		segmentedSize: size,
		onChange,
		block,
		sizeChangeFns,
		valueChangeFns
	});
	function setValue(value: KSegmentedProps['value']) {
		valueChangeFns.forEach((fn) => {
			fn(value);
		});
	}
	function setSize(value: KSegmentedProps['size']) {
		sizeChangeFns.forEach((fn) => {
			fn(value);
		});
	}

	$: {
		setValue(value);
	}

	$: {
		setSize(size);
	}

	const dispatch = createEventDispatcher();
	function onChange(value: KSegmentedProps['value']) {
		dispatch('change', value);
	}

	const prefixCls = getPrefixCls('segmented');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-block`]: block
		},
		cls
	);

	const groupCls = `${prefixCls}-group`;
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={groupCls}>
		<slot />
	</div>
</div>
