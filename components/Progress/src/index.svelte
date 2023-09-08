<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import type { KProgressProps } from './types';
	import ProgressCircle from './circle.svelte';
	import { isFunction } from 'baiwusanyu-utils';
	import clsx from 'clsx';

	export let percentage: KProgressProps['percentage'] = 0;
	export let status: KProgressProps['status'] = 'primary';
	export let type: KProgressProps['type'] = 'line';
	export let strokeWidth: KProgressProps['strokeWidth'] = 6;
	export let width: KProgressProps['width'] = 126;
	export let color: KProgressProps['color'] = '';
	export let textInside: KProgressProps['textInside'] = false;
	export let format: KProgressProps['format'] = null;
	export let duration: KProgressProps['duration'] = 0.28;
	export let showText: KProgressProps['showText'] = true;
	export let cls: KProgressProps['cls'] = undefined;
	export let attrs: KProgressProps['attrs'] = {};

	$: if (percentage >= 100) {
		percentage = 100;
	} else if (percentage <= 0) {
		percentage = 0;
	}

	$: percentageContent = format && isFunction(format) ? format(percentage) : `${percentage}%`;

	// class
	const prefixCls = getPrefixCls('progress');
	$: containerCls = clsx(`${prefixCls}`, cls);
	$: baseCls = clsx(`${prefixCls}--base`, `${prefixCls}--base__dark`);
	$: runwayCls = `${prefixCls}--runway`;
	$: barCls = clsx(`${prefixCls}--bar`, `${prefixCls}--${status}`);
	$: contentTxtInsideCls = `${prefixCls}--content__textInside`;
	$: contentTxtOutsideCls = `${prefixCls}--content__textOutside`;
	$: circleDashboardCls = `${prefixCls}__cd`;
	$: textCls = `${prefixCls}--text__cd`;
</script>

{#if type === 'line'}
	<div class={containerCls} {...$$restProps} {...attrs}>
		<div
			class={baseCls}
			style:width={showText ? '90%' : ''}
			style:height="{strokeWidth}px"
			style:border-radius="{strokeWidth}px"
		>
			<div class={runwayCls}>
				<div
					class={barCls}
					style:width="{percentage}%"
					style:background-color={color}
					style:border-radius="{strokeWidth}px"
					style:transition-duration="{duration}s"
					style:left="0%"
				>
					<div class={contentTxtInsideCls}>
						{#if showText && textInside}
							{#if $$slots.default}
								<slot />
							{:else}
								<span>{percentageContent}</span>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class={contentTxtOutsideCls}>
			{#if showText && !textInside}
				{#if $$slots.default}
					<slot />
				{:else}
					<span>{percentageContent}</span>
				{/if}
			{/if}
		</div>
	</div>
{:else if ['circle', 'dashboard'].includes(type)}
	<div
		class={circleDashboardCls}
		style:width="{width}px"
		style:height="{width}px"
		{...$$restProps}
		{...attrs}
	>
		<svg {width} height={width} viewBox="0 0 {width} {width}">
			<ProgressCircle size={width} {strokeWidth} {percentage} {type} {color} {status}
			></ProgressCircle>
		</svg>
		<div class={textCls}>
			{#if showText}
				{#if $$slots.default}
					<slot />
				{:else}
					<span>{percentageContent}</span>
				{/if}
			{/if}
		</div>
	</div>
{/if}
