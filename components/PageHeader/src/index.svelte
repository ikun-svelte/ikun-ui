<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPageHeaderProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { KDivider } from '@ikun-ui/divider';
	import { createEventDispatcher } from 'svelte';

	export let title: KPageHeaderProps['title'] = '';
	export let icon: KPageHeaderProps['icon'] = 'i-carbon-arrow-left';
	export let content: KPageHeaderProps['content'] = '';
	export let cls: KPageHeaderProps['cls'] = undefined;
	export let attrs: KPageHeaderProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	function handleClick() {
		dispatch('back');
	}

	const prefixCls = getPrefixCls('page-header');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--has-breadcrumb`]: !!$$slots.breadcrumb,
			[`${prefixCls}--has-extra`]: !!$$slots.extra,
			[`${prefixCls}--contentful`]: !!$$slots.default
		},
		cls
	);

	$: breadcrumbCls = clsx(`${prefixCls}__breadcrumb`);
	$: headCls = clsx(`${prefixCls}__head`);
	$: leftCls = clsx(`${prefixCls}__left`);
	$: backCls = clsx(`${prefixCls}__back`);
	$: iconCls = clsx(`${prefixCls}__icon`);
	$: titleCls = clsx(`${prefixCls}__title`);
	$: contentCls = clsx(`${prefixCls}__content`);
	$: extraCls = clsx(`${prefixCls}--extra`);
	$: mainCls = clsx(`${prefixCls}--main`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if $$slots.breadcrumb}
		<div class={breadcrumbCls}>
			<slot name="breadcrumb" />
		</div>
	{/if}
	<div class={headCls}>
		<div class={leftCls}>
			<button class={backCls} tabindex="0"  on:click={handleClick}>
				{#if icon || $$slots.icon}
					<div aria-label={title || 'Back'} class={iconCls}>
						<slot name="icon">
							<KIcon width="16px" height="16px" icon={icon || ''}></KIcon>
						</slot>
					</div>
				{/if}
				<div class={titleCls}>
					<slot name="title">{title || 'Back'}</slot>
				</div>
			</button>
			<KDivider direction="vertical" />
			<div class={contentCls}>
				<slot name="content">{content}</slot>
			</div>
		</div>

		{#if $$slots.extra}
			<div class={extraCls}>
				<slot name="extra" />
			</div>
		{/if}
	</div>

	{#if $$slots.default}
		<div class={mainCls} data-pager-header="main">
			<slot />
		</div>
	{/if}
</div>
