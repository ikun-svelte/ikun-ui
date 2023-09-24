<script lang="ts">
	import { contextmenuKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KContextmenuProps } from './types';
	import { getContext } from 'svelte';

	export let cls: KContextmenuProps['cls'] = undefined;
	export let attrs: KContextmenuProps['attrs'] = {};
	export let disabled: KContextmenuProps['disabled'] = false;
	export let divider: KContextmenuProps['divider'] = false;

	const ctx = getContext(contextmenuKey) as { close: () => void };
	const handleClick = () => {
		if (disabled) return;
		ctx && ctx.close();
	};

	const prefixCls = getPrefixCls('contextmenu-item');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: !disabled && !divider,
			[`${prefixCls}__disabled`]: disabled && !divider,
			[`${prefixCls}__divider`]: divider
		},
		cls
	);
</script>

<li class={cnames} on:click={handleClick} aria-hidden="true" {...$$restProps} {...attrs}>
	{#if !divider}
		<slot />
	{/if}
</li>
