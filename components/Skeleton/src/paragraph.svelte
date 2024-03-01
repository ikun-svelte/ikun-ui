<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonParagraphProps, KSkeletonProps } from './types';
	import { isArray } from 'baiwusanyu-utils';

	export let width: KSkeletonParagraphProps['width'] = undefined;
	export let active: KSkeletonParagraphProps['active'] = false;
	export let size: KSkeletonParagraphProps['size'] = 'md';
	export let rows: KSkeletonParagraphProps['rows'] = 3;
	export let round: KSkeletonProps['round'] = false;
	export let cls: KSkeletonParagraphProps['cls'] = '';
	export let attrs: KSkeletonParagraphProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-paragraph');
	const prefixClsSke = getPrefixCls('skeleton');
	$: cnames = clsx(prefixCls, cls);

	$: itemCls = clsx(`${prefixCls}--item`, `${prefixCls}--${size}`, {
		[`${prefixCls}--round`]: round,
		[`${prefixClsSke}--active`]: active
	});

	let list: Array<{ width: string }> = [];
	$: {
		list = [];
		for (let i = 0; i < rows!; i++) {
			const item = { width: '100%' };
			if (width && isArray(width) && (width as Array<number | string>)[i]) {
				item.width = `${(width as Array<number | string>)[i]}px`;
			} else if (i === rows! - 1 && width) {
				item.width = `${width}px`;
			} else if (i === rows! - 1 && !width) {
				item.width = `60%`;
			}
			list.push(item);
		}
	}
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	{#each list as item}
		<li style:width={item.width} class={itemCls}></li>
	{/each}
</ul>
