<script lang="ts">
	import { isNumber } from 'baiwusanyu-utils';
	import type { IKunTypePro } from '@ikun-ui/utils';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let value: string | number = '';
	export let max: number = 99;
	export let isDot: boolean = false;
	export let show: boolean = true;
	export let type: IKunTypePro = 'error';
	export let cls: ClassValue = '';
	export let attrs: Record<string, string> = {};

	let content = `${value}`;
	$: if (isDot) {
		content = '';
	}
	$: if (isNumber(value) && isNumber(max)) {
		content = max < (value as number) ? `${max}+` : `${value}`;
	}

	// class names
	const prefixCls = getPrefixCls('badge');
	$: baseCls = clsx(prefixCls, `${prefixCls}--base`, cls);
	$: supCls = clsx(
		`${prefixCls}--content`,
		`${prefixCls}--content-${type}`,
		`${prefixCls}--content-fixed`,
		{
			[`${prefixCls}--content-dot`]: isDot
		},
		`${prefixCls}--content__dark`
	);
</script>

<div class={baseCls} {...attrs}>
	<slot />
	{#if show && (content || isDot)}
		<sup class={supCls}>{content}</sup>
	{/if}
</div>
