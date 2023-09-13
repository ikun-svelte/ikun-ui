<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KTooltip } from '@ikun-ui/tooltip';
	import clsx from 'clsx';
	import type { KEllipsisProps } from './types';

	export let content: KEllipsisProps['content'] = '';
	export let text: KEllipsisProps['content'] = '';
	export let expend: KEllipsisProps['expend'] = false;
	export let lineClamp: KEllipsisProps['lineClamp'] = null;
	export let num: KEllipsisProps['num'] = 5;
	export let placement: KEllipsisProps['placement'] = 'right';
	export let cls: string = '';
	export let attrs: Record<string, string> = {};

	let isExpand = false;
	let textCache = '';
	let textInner = text;
	const handleText = () => {
		if (num === 0) return;
		if (placement === 'right') textInner = `${text?.slice(0, text?.length - num)}...`;

		if (placement === 'center') {
			const elpNumCenter = num / 2;
			const lenCenter = text?.length / 2;
			const subStrHead = text?.substring(0, lenCenter - elpNumCenter);
			const subStrFoot = text?.substring(lenCenter + elpNumCenter, text.length);
			textInner = `${subStrHead}...${subStrFoot}`;
		}
		if (placement === 'left') textInner = `...${text.substring(num, text.length)}`;
	};
	$: {
		textCache = text;
		handleText();
	}

	let styleStr = `-webkit-line-clamp:${lineClamp};
      display:-webkit-inline-box;
      -webkit-box-orient:vertical;
      overflow:hidden;`;

	let styleContent = !lineClamp ? '' : styleStr;

	const handleExpend = () => {
		if (!expend) return;
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
		on:click={handleExpend}
	>
		{textInner}
	</div>
</KTooltip>
