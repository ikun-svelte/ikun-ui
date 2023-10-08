<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KEmptyProps } from './types';
	import KNoData from './no-data.svelte';

	export let cls: KEmptyProps['cls'] = undefined;
	export let attrs: KEmptyProps['attrs'] = {};
	export let emptyDescription: KEmptyProps['emptyDescription'] = 'No Data';
	export let image: KEmptyProps['image'] = '';
	export let imageSize: KEmptyProps['imageSize'] = undefined;

	$: imgSize = imageSize ? `${imageSize}px` : imageSize;

	// class
	const prefixCls = getPrefixCls('empty');
	$: cnames = clsx(prefixCls, cls);

	$: imageCls = clsx(`${prefixCls}__image`);
	$: imgCls = clsx(`${prefixCls}__img`);
	$: descriptionCls = clsx(`${prefixCls}__description`);
	$: descriptionPCls = clsx(`${prefixCls}__description__p`);
	$: bottomCls = clsx(`${prefixCls}__bottom`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={imageCls} style:width={imgSize}>
		{#if image}
			<img class={imgCls} src={image} on:dragstart={() => false} alt="" />
		{:else}
			<slot name="image">
				<KNoData></KNoData>
			</slot>
		{/if}
	</div>
	<div class={descriptionCls}>
		{#if $$slots.description}
			<slot name="description" />
		{:else}
			<p class={descriptionPCls}>{emptyDescription}</p>
		{/if}
	</div>
	{#if $$slots.default}
		<div class={bottomCls}>
			<slot />
		</div>
	{/if}
</div>
