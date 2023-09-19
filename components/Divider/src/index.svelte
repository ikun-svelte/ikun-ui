<script lang="ts">
	import type { KDividerProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let direction: KDividerProps['direction'] = 'horizontal';
	export let borderColor: KDividerProps['borderColor'] = 'b-ikun-bd-base';
	// 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
	export let borderStyle: KDividerProps['borderStyle'] = 'solid';
	export let contentPosition: KDividerProps['contentPosition'] = 'center';
	export let cls: KDividerProps['cls'] = undefined;
	export let attrs: KDividerProps['attrs'] = {};

	const prefixCls = getPrefixCls('divider');
	$: dividerCls = clsx(
		prefixCls,
		`${prefixCls}--${direction}`,
		`${prefixCls}--${direction}__${borderStyle}`,
		`${prefixCls}--content-${contentPosition}`,
		borderColor,
		cls
	);
	$: contentCls = clsx(`${prefixCls}--content`);
</script>

<div class={dividerCls} {...$$restProps} {...attrs}>
	{#if direction === 'horizontal' && $$slots.default}
		<span class={contentCls}>
			<slot />
		</span>
	{/if}
</div>
