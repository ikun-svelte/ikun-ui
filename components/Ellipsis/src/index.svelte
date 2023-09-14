<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KTooltip } from '@ikun-ui/tooltip';
	import { clsx } from 'clsx';
	import type { KEllipsisProps } from './types';

	export let content: KEllipsisProps['content'] = '';
	export let text: KEllipsisProps['text'] = '';
	export let expand: KEllipsisProps['expand'] = false;
	// TODO: How to mock this in vitest ?
	export let lineClamp: KEllipsisProps['lineClamp'] = null;
	export let num: KEllipsisProps['num'] = 5;
	export let placement: KEllipsisProps['placement'] = 'right';
	export let cls: KEllipsisProps['cls'] = '';
	export let attrs: KEllipsisProps['attrs'] = {};

	let isExpand = false;
	let textCache = '';
	let textInner = text;
	let placementInner = placement;
	const handleText = () => {
		if (num === 0) return;
		if (placementInner === 'right') textInner = `${text?.slice(0, text?.length - num)}...`;

		if (placementInner === 'center') {
			const elpNumCenter = num / 2;
			const lenCenter = text?.length / 2;
			const subStrHead = text?.substring(0, lenCenter - elpNumCenter);
			const subStrFoot = text?.substring(lenCenter + elpNumCenter, text.length);
			textInner = `${subStrHead}...${subStrFoot}`;
		}
		if (placementInner === 'left') textInner = `...${text.substring(num, text.length)}`;
	};
	$: {
		textCache = text;
		placementInner = placement;
		handleText();
	}

	let styleStr = `-webkit-line-clamp:${lineClamp};
      display:-webkit-inline-box;
      -webkit-box-orient:vertical;
      overflow:hidden;`;

	let styleContent = !lineClamp ? '' : styleStr;

	const handleExpand = () => {
		if (!expand) return;
		isExpand = !isExpand;
		styleContent = isExpand ? '' : styleStr;
		isExpand && (textInner = textCache);
		!isExpand && handleText();
	};
	// class
	const prefixCls = getPrefixCls('ellipsis');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>

<KTooltip {content} placement="top">
	<div
		class={cnames}
		slot="triggerEl"
		{...$$restProps}
		{...attrs}
		aria-hidden="true"
		style={styleContent}
		on:click={handleExpand}
	>
		{textInner}
	</div>
</KTooltip>
