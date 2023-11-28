<script lang="ts">
	import type { KButtonGroupProps } from './types';
	import { getPrefixCls, buttonGroupKey } from '@ikun-ui/utils';
	import { setContext } from 'svelte';
	import clsx from 'clsx';

	export let type: KButtonGroupProps['type'] = 'primary';
	export let size: KButtonGroupProps['size'] = 'md';
	export let iconSize: KButtonGroupProps['iconSize'] = null;
	export let isBorder: KButtonGroupProps['isBorder'] = false;
	export let disabled: KButtonGroupProps['disabled'] = false;
	export let cls: KButtonGroupProps['cls'] = '';
	export let attrs: KButtonGroupProps['attrs'] = {};

	setContext(buttonGroupKey, {
		type,
		size,
		iconSize,
		isBorder,
		disabled
	});

	// class names
	$: prefixCls = getPrefixCls('button-group');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
