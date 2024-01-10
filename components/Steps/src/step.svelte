<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepProps, KStepStatus } from './types';
	import { KIcon } from '@ikun-ui/icon';
	export let active: KStepProps['active'] = 0;
	export let direction: KStepProps['direction'] = 'horizontal';
	export let labelPlacement: KStepProps['labelPlacement'] = 'horizontal';
	export let option: KStepProps['option'] = { title: '', index: '' };
	export let index: KStepProps['index'] = 0;
	export let last: KStepProps['last'] = false;
	export let canClick: KStepProps['canClick'] = false;
	export let dot: KStepProps['dot'] = false;
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
			[`${prefixCls}--click`]: stepStatus === 'finish' || stepStatus === 'wait'
		},
		cls
	);

	$: stepStatus = getStatus(active, index, option.status);
	$: contentCls = clsx(`${prefixCls}-content`);
	$: titleCls = clsx(`${prefixCls}-title`, {
		[`${prefixCls}-title--error`]: !isHover && stepStatus === 'error',
		[`${prefixCls}-title--wait`]: !isHover && stepStatus === 'wait',
		[`${prefixCls}-tail--none`]: last,
		[`${prefixCls}-tail--finish`]: stepStatus === 'finish',
		[`${prefixCls}-title--click`]: isHover
	});
	$: subTitleCls = clsx(`${prefixCls}-sub-title`);
	$: descriptionCls = clsx(`${prefixCls}-description`, {
		[`${prefixCls}-description--error`]: !isHover && stepStatus === 'error',
		[`${prefixCls}-description--no-process`]:
			!isHover && (stepStatus === 'finish' || stepStatus === 'wait'),
		[`${prefixCls}-description--click`]: isHover
	});
	$: iconStatusCls = `${prefixCls}-icon--${getStatus(active, index, option.status)}`;
	$: iconCls = clsx(`${prefixCls}-icon`, {
		[`${prefixCls}-icon--wait-bg`]: stepStatus === 'wait',
		[iconStatusCls]: !(stepStatus === 'wait' && isHover),
		[`${prefixCls}-icon--click`]: isHover
	});
	$: iconInnerCls = clsx(`${prefixCls}-icon--inner`);
</script>

<div
	class={cnames}
	{...$$restProps}
	{...attrs}
	aria-hidden="true"
	on:mouseenter={handleEnter}
	on:mouseleave={handleLeave}
>
	<div class={iconCls}>
		<div class={iconInnerCls}>
			{#if stepStatus === 'error'}
				<KIcon icon="i-carbon-close"></KIcon>
			{:else if stepStatus === 'finish'}
				<KIcon icon="i-carbon-checkmark"></KIcon>
			{:else}
				{eachIndex}
			{/if}
		</div>
	</div>
	{#if !dot}
		<div class={contentCls}>
			<div class={titleCls} data-k-step-title>
				{option.title}
				{#if option.subTitle}
					<div class={subTitleCls}>{option.subTitle}</div>
				{/if}
			</div>
			{#if option.description}
				<div class={descriptionCls}>{option.description}</div>
			{/if}
		</div>
	{/if}
</div>
