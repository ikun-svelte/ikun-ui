<script lang="ts">
	import { getPrefixCls, rowKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps, KColProps, KGridCtx } from './types';
	import { getContext } from 'svelte';
	import { isNumber, isObject } from 'baiwusanyu-utils';

	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};
	export let tag: KColProps['tag'] = 'div';
	export let span: KColProps['span'] = 24;
	export let offset: KColProps['offset'] = 0;
	export let push: KColProps['push'] = 0;
	export let pull: KColProps['pull'] = 0;
	export let xs: KColProps['xs'] = undefined;
	export let sm: KColProps['sm'] = undefined;
	export let md: KColProps['md'] = undefined;
	export let lg: KColProps['lg'] = undefined;
	export let xl: KColProps['xl'] = undefined;

	const prefixCls = getPrefixCls('col');
	$: gutterValue = (getContext(rowKey) as KGridCtx).gutter || 0;
	$: pxStyle = '' as undefined | string;
	$: {
		if (gutterValue) {
			pxStyle = `${gutterValue / 2}px`;
		} else {
			pxStyle = undefined;
		}
	}

	$: posMap = { span, offset, push, pull };

	$: sizeMap = { xs, sm, md, lg, xl };

	const createCls = () => {
		const classes: string[] = [];
		const posNames = ['span', 'offset', 'push', 'pull'] as const;
		posNames.forEach((prop) => {
			const pos = posMap[prop];
			if (isNumber(pos)) {
				if (prop === 'span') {
					classes.push(`${prefixCls}-${pos}`);
				} else if (pos > 0) {
					classes.push(`${prefixCls}-${prop}-${pos}`);
				}
			}
		});

		const sizeNames = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		sizeNames.forEach((size) => {
			const breakingPoint = size === 'xs' ? `ikun-${size}` : `ikun-${size}`;
			if (isNumber(sizeMap[size])) {
				classes.push(`${breakingPoint}:${prefixCls}-${size}-${sizeMap[size]}`);
			} else if (isObject(sizeMap[size])) {
				Object.entries(sizeMap[size] as any).forEach(([prop, sizeProp]) => {
					classes.push(
						prop !== 'span'
							? `${breakingPoint}:${prefixCls}-${size}-${prop}-${sizeProp}`
							: `${breakingPoint}:${prefixCls}-${size}-${sizeProp}`
					);
				});
			}
		});
		return classes;
	};

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true,
			[`${prefixCls}__guttered`]: gutterValue && span,
			[`${prefixCls}__guttered__none`]: gutterValue && !span
		},
		...createCls(),
		cls
	);
</script>

<svelte:element
	this={tag}
	class={cnames}
	style:padding-right={pxStyle}
	style:padding-left={pxStyle}
	{...$$restProps}
	{...attrs}
>
	<slot />
</svelte:element>
