<script lang="ts">
	import type { KButtonGroupProps } from './types';
	import { createCls, getPrefixCls, ButtonGroupKey } from '@ikun-ui/utils';
	import { setContext } from 'svelte';

	export let type: KButtonGroupProps['type'] = 'primary';
	export let size: KButtonGroupProps['size'] = 'md';
	export let iconSize: KButtonGroupProps['iconSize'] = null;
	export let isBorder: KButtonGroupProps['isBorder'] = false;
	export let disabled: KButtonGroupProps['disabled'] = false;
	export let cls: KButtonGroupProps['cls'] = '';
	export let attrs: KButtonGroupProps['attrs'] = {};

	setContext(ButtonGroupKey, {
		type,
		size,
		iconSize,
		isBorder,
		disabled
	});

	// class names
	$: prefixCls = getPrefixCls('button-group');
	$: cnames = createCls(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
