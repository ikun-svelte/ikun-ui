<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCardProps } from './types';

	export let title: KCardProps['title'] = '';
	export let shadow: KCardProps['shadow'] = 'always';
	export let cls: KCardProps['cls'] = undefined;
	export let attrs: KCardProps['attrs'] = {};

	const prefixCls = getPrefixCls('card');
	$: cardCls = clsx(
		prefixCls,
		`${prefixCls}__dark`,
		`${prefixCls}--shadow__${shadow}`,
		`${prefixCls}--shadow__${shadow}__dark`,
		`${prefixCls}--transition`,
		cls
	);
	$: headerCls = clsx(`${prefixCls}--header`);
	$: bodyCls = clsx(`${prefixCls}--body`);
</script>

<div class={cardCls} {...$$restProps} {...attrs}>
	<div class={headerCls}>
		<slot name="header">{title}</slot>
	</div>
	<div class={bodyCls}>
		<slot />
	</div>
</div>
