<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepProps, KStepsItem, KStepStatus } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	export let active: KStepProps['active'] = 0;
	export let direction: KStepProps['direction'] = 'horizontal';
	export let labelPlacement: KStepProps['labelPlacement'] = 'horizontal';
	export let item: KStepProps['item'] = { title: '', index: '' };
	export let index: KStepProps['index'] = 0;
	export let last: KStepProps['last'] = false;
	export let canClick: KStepProps['canClick'] = false;
	export let dot: KStepProps['dot'] = false;
	export let navigation: KStepProps['navigation'] = false;
	export let eachIndex: KStepProps['eachIndex'] = 0;
	export let cls: KStepProps['cls'] = undefined;
	export let attrs: KStepProps['attrs'] = {};

	function getStatus(
		active: KStepProps['active'],
		index: KStepProps['index'],
		status?: KStepStatus
	) {
		if (status) return status;
		if (Number(active) === Number(index)) {
			return 'process';
		} else if (Number(active) > Number(index)) {
			return 'finish';
		} else {
			return 'wait';
		}
	}
	let isHover = false;
	const handleEnter = () => {
		if (canClick && (stepStatus === 'finish' || stepStatus === 'wait')) {
			isHover = true;
		}
	};
	const handleLeave = () => {
		isHover = false;
	};
	const dispatch = createEventDispatcher();
	function handleChange(item: KStepsItem) {
		if (!canClick) return;
		dispatch('change', item);
	}

	$: isActive = (index: number) => Number(active) === Number(index);
	const prefixCls = getPrefixCls('step');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--click`]: canClick && (stepStatus === 'finish' || stepStatus === 'wait'),
			[`${prefixCls}-vertical`]: direction === 'vertical' && !dot,
			[`${prefixCls}-vertical--dot`]: direction === 'vertical' && dot,
			[`${prefixCls}-lb-vertical`]: labelPlacement === 'vertical' && direction === 'horizontal'
		},
		cls
	);

	$: stepStatus = getStatus(active, index, item.status);
	$: contentCls = clsx(`${prefixCls}-content`, {
		[`${prefixCls}-content-vertical`]: direction === 'vertical',
		[`${prefixCls}-content-lb-vertical`]:
			labelPlacement === 'vertical' && direction === 'horizontal'
	});
	$: tailCls = clsx({
		[`${prefixCls}-tail`]: direction === 'vertical' && !dot,
		[`${prefixCls}-tail-lb-horizontal--dot`]:
			(labelPlacement === 'horizontal' || direction === 'vertical') && dot,
		[`${prefixCls}-tail-lb-vertical`]: labelPlacement === 'vertical' && direction === 'horizontal',
		[`${prefixCls}-tail-lb-vertical--dot`]:
			labelPlacement === 'vertical' && direction === 'horizontal' && dot,
		[`${prefixCls}-tail-vertical`]: direction === 'vertical',
		[`${prefixCls}-tail-vertical--dot`]: direction === 'vertical' && dot,
		[`${prefixCls}-tail-horizontal--dot`]: direction === 'horizontal' && dot,
		[`${prefixCls}-tail--none`]: last,
		[`${prefixCls}-tail--finish`]: stepStatus === 'finish'
	});
	$: titleCls = clsx(`${prefixCls}-title`, {
		[`${prefixCls}-title--error`]: !isHover && stepStatus === 'error',
		[`${prefixCls}-title--wait`]: !isHover && stepStatus === 'wait',
		[`${prefixCls}-title--click`]: isHover,
		[`${prefixCls}-title-lb-vertical`]: labelPlacement === 'vertical' && direction === 'horizontal',

		[`${prefixCls}-tail-horizontal`]:
			labelPlacement === 'horizontal' &&
			direction === 'horizontal' &&
			(!navigation || (dot && navigation)),
		[`${prefixCls}-tail-horizontal--dot`]: dot && (!navigation || (dot && navigation)),
		[`${prefixCls}-tail--none`]: last && (!navigation || (dot && navigation)),
		[`${prefixCls}-tail--finish`]: stepStatus === 'finish' && (!navigation || (dot && navigation))
	});
	$: subTitleCls = clsx(`${prefixCls}-sub-title`, {
		[`${prefixCls}-sub-title-lb-vertical`]:
			labelPlacement === 'vertical' && direction === 'horizontal'
	});
	$: descriptionCls = clsx(`${prefixCls}-description`, {
		[`${prefixCls}-description--error`]: !isHover && stepStatus === 'error',
		[`${prefixCls}-description--no-process`]:
			!isHover && (stepStatus === 'finish' || stepStatus === 'wait'),
		[`${prefixCls}-description--click`]: isHover
	});
	$: iconStatusCls = `${prefixCls}-icon--${getStatus(active, index, item.status)}`;
	$: iconCls = clsx(`${prefixCls}-icon`, `${prefixCls}-icon-lb-${labelPlacement}`, {
		[`${prefixCls}-icon-lb-vertical`]: labelPlacement === 'vertical' && direction === 'horizontal',
		[`${prefixCls}-icon-lb-horizontal`]: labelPlacement === 'vertical' && direction === 'vertical',
		[`${prefixCls}-icon--dot`]: dot,
		[`${prefixCls}-icon--wait-bg`]: stepStatus === 'wait',
		[iconStatusCls]: !(stepStatus === 'wait' && isHover),
		[`${prefixCls}-icon--click`]: isHover
	});
	$: iconInnerCls = clsx(`${prefixCls}-icon--inner`);

	$: arrowCls = clsx({
		[`${prefixCls}-arrow-lb-vertical`]:
			!dot && navigation && labelPlacement === 'vertical' && direction === 'horizontal',
		[`${prefixCls}-arrow-horizontal`]: !dot && navigation && direction === 'horizontal',
		[`${prefixCls}-arrow-vertical`]: !dot && navigation && direction === 'vertical'
	});

	const namespaceCls = getPrefixCls('steps');
	$: containerCls = clsx(`${namespaceCls}-container`, {
		[`${namespaceCls}-label-container-vertical`]:
			labelPlacement === 'vertical' || direction === 'vertical',
		[`${namespaceCls}-container-${direction}`]: !navigation || (dot && navigation),
		[`${namespaceCls}-container-horizontal--nav`]: !dot && navigation && direction === 'horizontal'
	});
	$: barCls = clsx({
		[`${namespaceCls}-bar-horizontal`]: !dot && navigation && direction === 'horizontal',
		[`${namespaceCls}-bar-vertical`]: !dot && navigation && direction === 'vertical',
		[`${namespaceCls}-bar-lb-horizontal`]:
			!dot && navigation && labelPlacement === 'vertical' && direction === 'horizontal'
	});
</script>

<div class={containerCls} aria-hidden="true" data-k-step on:click={() => handleChange(item)}>
	<div
		class={cnames}
		{...$$restProps}
		{...attrs}
		aria-hidden="true"
		on:mouseenter={handleEnter}
		on:mouseleave={handleLeave}
	>
		{#if (direction === 'vertical' || labelPlacement === 'vertical') && !last && (!navigation || (dot && navigation))}
			<div class={tailCls}></div>
		{/if}

		{#if !dot && direction === 'horizontal' && !last && navigation}
			<div class={arrowCls}>
				<KIcon icon="i-carbon-chevron-right"></KIcon>
			</div>
		{/if}

		{#if !dot && direction === 'vertical' && !last && navigation}
			<div class={arrowCls}>
				<KIcon icon="i-carbon-chevron-down"></KIcon>
			</div>
		{/if}

		<div class={iconCls}>
			{#if !dot}
				<slot name="icon">
					<div class={iconInnerCls}>
						{#if stepStatus === 'error'}
							<KIcon icon="i-carbon-close"></KIcon>
						{:else if stepStatus === 'finish'}
							<KIcon icon="i-carbon-checkmark"></KIcon>
						{:else}
							{eachIndex}
						{/if}
					</div>
				</slot>
			{/if}
		</div>

		<div class={contentCls}>
			<div class={titleCls} data-k-step-title>
				<slot name="title">{item.title}</slot>
				{#if item.subTitle || $$slots.subTitle}
					<div class={subTitleCls}>
						<slot name="subTitle">{item.subTitle}</slot>
					</div>
				{/if}
			</div>
			{#if item.description || $$slots.subTitle}
				<div class={descriptionCls}>
					<slot name="description">{item.description}</slot>
				</div>
			{/if}
		</div>
	</div>

	{#if !dot && navigation && isActive(eachIndex) && direction === 'horizontal'}
		<div
			class={barCls}
			out:scale={{ duration: 300, start: 0.3 }}
			in:scale={{ duration: 300, start: 0.3 }}
		></div>
	{/if}

	{#if !dot && navigation && isActive(eachIndex) && direction === 'vertical'}
		<div
			class={barCls}
			out:scale={{ duration: 300, start: 0.3 }}
			in:scale={{ duration: 300, start: 0.3 }}
		></div>
	{/if}
</div>
