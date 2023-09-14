<script lang="ts">
	import { getPrefixCls, KSymbolKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps, KColProps } from './types';
	import { getContext } from 'svelte';
	import { isNumber, isObject } from 'baiwusanyu-utils';

	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};
	export let tag: KColProps['tag'] = 'div';
	export let span: KColProps['span'] = 36;
	export let offset: KColProps['offset'] = 0;
	export let push: KColProps['push'] = 0;
	export let pull: KColProps['pull'] = 0;
	export let xs: KColProps['xs'] = undefined;
	export let sm: KColProps['sm'] = undefined;
	export let md: KColProps['md'] = undefined;
	export let lg: KColProps['lg'] = undefined;
	export let xl: KColProps['xl'] = undefined;

	const prefixCls = getPrefixCls('col');
	$: gutterValue = (getContext(KSymbolKey) as number) || 0;

	$: pxStyle = '';
	$: {
		if (gutterValue) {
			pxStyle = `-${gutterValue / 2}px`;
		}
	}

	$: posMap = {
		span,
		offset,
		push,
		pull
	};

	$: sizeMap = {
		xs,
		sm,
		md,
		lg,
		xl
	};

	const createCls = () => {
		const classes: string[] = [];
		const posNames = ['span', 'offset', 'push', 'pull'] as const;
		posNames.forEach((prop) => {
			const size = posMap[prop];
			if (isNumber(size)) {
				if (prop === 'span') {
					classes.push(`${prefixCls}-${size}`);
				} else if (size > 0) {
					classes.push(`${prefixCls}-${prop}-${size}`);
				}
			}
		});

		const sizeNames = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		sizeNames.forEach((size) => {
			if (isNumber(sizeMap[size])) {
				classes.push(`${prefixCls}-${size}-${sizeMap[size]}`);
			} else if (isObject(sizeMap[size])) {
				Object.entries(sizeMap[size]).forEach(([prop, sizeProp]) => {
					classes.push(
						prop !== 'span'
							? `${prefixCls}-${size}-${prop}-${sizeProp}`
							: `${prefixCls}-${size}-${sizeProp}`
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
			[`${prefixCls}__guttered`]: gutterValue
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
