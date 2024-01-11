<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepProps, KStepStatus } from './types';
	import { KIcon } from '@ikun-ui/icon';
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
		[`${prefixCls}-content-lb-vertical`]: labelPlacement === 'vertical'
	});
	$: tailCls = clsx({
		[`${prefixCls}-tail`]: labelPlacement === 'horizontal' && !dot,
		[`${prefixCls}-tail-lb-horizontal--dot`]: labelPlacement === 'horizontal' && dot,
		[`${prefixCls}-tail-lb-vertical`]: labelPlacement === 'vertical',
		[`${prefixCls}-tail-lb-vertical--dot`]: labelPlacement === 'vertical' && dot,
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
		[`${prefixCls}-title-lb-vertical`]: labelPlacement === 'vertical',

		[`${prefixCls}-tail-horizontal`]:
			labelPlacement === 'horizontal' &&
			direction === 'horizontal' &&
			(!navigation || (dot && navigation)),
		[`${prefixCls}-tail-horizontal--dot`]: dot && (!navigation || (dot && navigation)),
		[`${prefixCls}-tail--none`]: last && (!navigation || (dot && navigation)),
		[`${prefixCls}-tail--finish`]: stepStatus === 'finish' && (!navigation || (dot && navigation))
	});
	$: subTitleCls = clsx(`${prefixCls}-sub-title`, {
		[`${prefixCls}-sub-title-lb-vertical`]: labelPlacement === 'vertical'
	});
	$: descriptionCls = clsx(`${prefixCls}-description`, {
		[`${prefixCls}-description--error`]: !isHover && stepStatus === 'error',
		[`${prefixCls}-description--no-process`]:
			!isHover && (stepStatus === 'finish' || stepStatus === 'wait'),
		[`${prefixCls}-description--click`]: isHover
	});
	$: iconStatusCls = `${prefixCls}-icon--${getStatus(active, index, item.status)}`;
	$: iconCls = clsx(`${prefixCls}-icon`, `${prefixCls}-icon-lb-${labelPlacement}`, {
		[`${prefixCls}-icon--dot`]: dot,
		[`${prefixCls}-icon--wait-bg`]: stepStatus === 'wait',
		[iconStatusCls]: !(stepStatus === 'wait' && isHover),
		[`${prefixCls}-icon--click`]: isHover
	});
	$: iconInnerCls = clsx(`${prefixCls}-icon--inner`);

	$: arrowCls = clsx({
		[`${prefixCls}-arrow-lb-vertical`]: !dot && navigation && labelPlacement === 'vertical',
		[`${prefixCls}-arrow-horizontal`]: !dot && navigation && direction === 'horizontal',
		[`${prefixCls}-arrow-vertical`]: !dot && navigation && direction === 'vertical'
	});
</script>

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

	{#if !dot && (direction === 'horizontal' || labelPlacement === 'vertical') && !last && navigation}
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
			<div class={iconInnerCls}>
				{#if stepStatus === 'error'}
					<KIcon icon="i-carbon-close"></KIcon>
				{:else if stepStatus === 'finish'}
					<KIcon icon="i-carbon-checkmark"></KIcon>
				{:else}
					{eachIndex}
				{/if}
			</div>
		{/if}
	</div>
	<div class={contentCls}>
		<div class={titleCls} data-k-step-title>
			{item.title}
			{#if item.subTitle}
				<div class={subTitleCls}>{item.subTitle}</div>
			{/if}
		</div>
		{#if item.description}
			<div class={descriptionCls}>{item.description}</div>
		{/if}
	</div>
</div>
