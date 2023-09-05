<script lang="ts">
	import type { KAlertProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';

	export let type: KAlertProps['type'] = 'info';
	export let title: KAlertProps['title'] = '';
	export let description: KAlertProps['description'] = '';
	export let showIcon: KAlertProps['showIcon'] = false;
	// will cover type icon
	export let icon: KAlertProps['icon'] = '';
	export let closable: KAlertProps['closable'] = true;
	export let closeIcon: KAlertProps['closeIcon'] = 'i-carbon-close';
	export let cls: KAlertProps['cls'] = undefined;
	export let attrs: KAlertProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	$: visible = true;
	const onClose = (event: Event) => {
		event.stopPropagation();
		visible = false;
		dispatch('close', event);
		handleAnimation();
	};

	// class names
	const prefixCls = getPrefixCls('alert');
	$: baseCls = clsx(prefixCls, `${prefixCls}--${type}`, cls);
	$: iconCls = clsx(`${prefixCls}--icon`);
	$: contentCls = clsx(`${prefixCls}--content`);
	$: titleCls = clsx(`${prefixCls}--title`);
	$: noTitle = !(title || $$slots.title);
	$: descriptionCls = clsx(`${prefixCls}--description`, {
		[`${prefixCls}--description__no-title`]: noTitle
	});
	$: closeCls = clsx(
		`${prefixCls}--close`,
		`${prefixCls}--close__icon-color`,
		{
			[`${prefixCls}--close__no-title`]: noTitle,
			[`${prefixCls}--${type}__close-icon`]: !$$slots.close
		},
		{
			[`${prefixCls}--close__has-description`]: !noTitle && (description || $$slots.default)
		},
		animationCls
	);

	// default type icon
	$: typeIcon = `${prefixCls}--${type}__icon`;
	$: typeIconColor = `${prefixCls}--${type}__icon-color`;
	$: typeIconSize = noTitle ? '18px' : '24px';

	// animation
	let closeRef: HTMLElement | null = null;
	let animationCls = '';
	const handleAnimation = () => {
		if (closeRef) {
			animationCls = `${prefixCls}--${type}__animate`;
			setTimeout(() => {
				animationCls = '';
			}, 310);
		}
	};
</script>

{#if visible}
	<div
		class={baseCls}
		{...$$restProps}
		{...attrs}
		transition:slide={{ delay: 50, easing: quintOut }}
	>
		{#if showIcon && (icon || type || $$slots.icon)}
			<div class={iconCls}>
				<slot name="icon">
					<KIcon
						icon={icon || typeIcon}
						color={typeIconColor}
						width={typeIconSize}
						height={typeIconSize}
					></KIcon>
				</slot>
			</div>
		{/if}
		<div class={contentCls}>
			{#if title || $$slots.title}
				<span class={titleCls}>
					<slot name="title">{title}</slot>
				</span>
			{/if}
			{#if description || $$slots.default}
				<div class={descriptionCls}>
					<slot>{description}</slot>
				</div>
			{/if}
		</div>
		{#if closable}
			<div bind:this={closeRef} class={closeCls} aria-hidden="true" on:click={onClose}>
				<slot name="close">
					<KIcon cls="inline-flex" icon={closeIcon} width="16px" height="16px"></KIcon>
				</slot>
			</div>
		{/if}
	</div>
{/if}
