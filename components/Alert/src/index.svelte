<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls, createCls } from '@ikun-ui/utils';
	import type { IKunTypeBase } from '@ikun-ui/utils/src';

	export let type: IKunTypeBase = 'info';
	export let title: string = '';
	export let description: string = '';
	export let showIcon: boolean = false;
	// will cover type icon
	export let icon: string = '';
	export let closable: boolean = true;
	export let closeIcon: string = 'i-carbon-close';
	export let cls: string = '';
	export let attrs: Record<string, string> = {};

	const dispatch = createEventDispatcher();

	$: visible = true;
	const onClose = (event: PointerEvent) => {
		event.stopPropagation();
		visible = false;
		dispatch('close', event);
		handleAnimation();
	};

	// class names
	const prefixCls = getPrefixCls('alert');
	$: baseCls = createCls(prefixCls, `${prefixCls}--${type}`, cls);
	$: iconCls = createCls(`${prefixCls}--icon`);
	$: contentCls = createCls(`${prefixCls}--content`);
	$: titleCls = createCls(`${prefixCls}--title`);
	$: noTitle = !(title || $$slots.title);
	$: descriptionCls = createCls(`${prefixCls}--description`, {
		[`${prefixCls}--description__no-title`]: noTitle
	});
	$: closeCls = createCls(
		`${prefixCls}--close`,
		`${prefixCls}--close__icon-color`,
		{
			[`${prefixCls}--close__no-title`]: noTitle,
			[`${prefixCls}--${type}__close-icon`]: !$$slots.close
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
			{#if closable}
				<span bind:this={closeRef} class={closeCls} aria-hidden="true" on:click={onClose}>
					<slot name="close">
						<KIcon cls="inline-flex" icon={closeIcon} width="18px" height="18px"></KIcon>
					</slot>
				</span>
			{/if}
		</div>
	</div>
{/if}
