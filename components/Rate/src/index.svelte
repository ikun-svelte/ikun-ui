<script lang="ts">
	import type { KRateProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls, createCls } from '@ikun-ui/utils';
	import { isString } from 'baiwusanyu-utils';
	import { createEventDispatcher } from 'svelte';

	export let max: KRateProps['max'] = 5;
	export let value: KRateProps['value'] = 0;
	// TODO allow half
	// export let allowHalf: KRateProps['allowHalf'] = false;
	export let showScore: KRateProps['showScore'] = false;
	export let scoreTemplate: KRateProps['scoreTemplate'] = '{value}';
	// showText will cover showScore
	export let showText: KRateProps['showText'] = false;
	export let texts: KRateProps['texts'] = '';
	export let textColor: KRateProps['textColor'] = 'color-#303133';
	export let icons: KRateProps['icons'] = 'i-carbon-star-filled';
	export let colors: KRateProps['colors'] = 'color-#f7ba2a';
	export let voidIcon: KRateProps['voidIcon'] = 'i-carbon-star';
	export let voidColor: KRateProps['voidColor'] = 'color-#cdd0d6';
	export let disabled: KRateProps['disabled'] = false;
	export let disableVoidIcon: KRateProps['disableVoidIcon'] = 'i-carbon-star-filled';
	export let disableVoidColor: KRateProps['disableVoidColor'] = 'color-#f0f2f5';
	// TODO clearable
	// export let clearable: KRateProps['clearable'] = false;
	export let cls: KRateProps['cls'] = '';
	export let attrs: KRateProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	// TODO customize size
	const iconSize = '18px';

	const maxNumbers = Array.from({ length: max }, (v, i) => i + 1);

	$: currentValue = value;
	$: rateDisabled = disabled;

	// text or score, text will cover score
	let text = '';
	$: {
		if (showText) {
			text = isString(texts) ? texts : texts[Math.ceil(currentValue)];
		} else if (showScore) {
			text = scoreTemplate.replace(
				/\{\s*value\s*\}/,
				rateDisabled ? `${value}` : `${currentValue}`
			);
		}
	}

	const setCurrentValue = (value: number) => {
		if (rateDisabled) {
			return;
		}
		currentValue = value;
	};

	const resetCurrentValue = () => {
		if (rateDisabled) {
			return;
		}
		currentValue = value;
	};

	$: valueDecimal = value * 100 - Math.floor(value) * 100;
	$: valueDecimalLeftWidth = +iconSize.replace(/px/g, '') * (valueDecimal / 100);
	$: valueDecimalRightWidth = +iconSize.replace(/px/g, '') - valueDecimalLeftWidth;
	const showDecimalIcon = (item: number) => {
		return rateDisabled && valueDecimal > 0 && item - 1 < value && item > value;
	};

	const getContinuity = (
		numbers: number[],
		nkObj: string | Record<number, string>
	): Record<number, string> => {
		if (isString(nkObj)) {
			return numbers.reduce((previous, current) => {
				previous[current] = nkObj;
				return previous;
			}, {});
		} else {
			const oks = Object.keys(nkObj);
			return numbers.reduce((previous, current) => {
				const nk = oks.find((k) => k >= current);
				previous[current] = nk ? nkObj[nk] : nkObj[oks[oks.length - 1]];
				return previous;
			}, {});
		}
	};

	const iconsMap = getContinuity(maxNumbers, icons);
	$: activeIcon = iconsMap[Math.ceil(currentValue)];

	const colorsMap = getContinuity(maxNumbers, colors);
	$: activeColor = colorsMap[Math.ceil(currentValue)];

	$: decimalIcon = iconsMap[Math.ceil(value)];
	$: decimalActiveColor = colorsMap[Math.ceil(value)];
	$: decimalVoidColor = voidColor;

	const handleUpdateValue = () => {
		if (rateDisabled) {
			return;
		}
		dispatch('updateValue', currentValue);
	};

	// class names
	const prefixCls = getPrefixCls('rate');
	$: baseCls = createCls(prefixCls, { [`${prefixCls}--disabled`]: rateDisabled }, cls);
	$: itemCls = createCls(`${prefixCls}--item`);
	$: textCls = createCls(`${prefixCls}--text`);

	// decimal icon => not full checked
	$: decimalIconLeftCls = createCls(
		`${prefixCls}--icon__decimal`,
		`${prefixCls}--icon__decimal-left`
	);
	$: decimalIconRightCls = createCls(
		`${prefixCls}--icon__decimal`,
		`${prefixCls}--icon__decimal-right`
	);
</script>

<div class={baseCls} {...$$restProps} {...attrs}>
	{#each maxNumbers as item}
		<span
			class={itemCls}
			on:mousemove={() => setCurrentValue(item)}
			on:mouseleave={resetCurrentValue}
			on:click={handleUpdateValue}
		>
			{#if !showDecimalIcon(item)}
				{#if item <= currentValue}
					<KIcon icon={activeIcon} width={iconSize} height={iconSize} color={activeColor}></KIcon>
				{:else}
					<KIcon
						icon={rateDisabled ? disableVoidIcon : voidIcon}
						width={iconSize}
						height={iconSize}
						color={rateDisabled ? disableVoidColor : voidColor}
					></KIcon>
				{/if}
			{:else}
				<KIcon
					cls={decimalIconLeftCls}
					icon={decimalIcon}
					width={iconSize}
					height={iconSize}
					color={decimalActiveColor}
					attrs={{
						style: `width: ${valueDecimalLeftWidth}px`
					}}
				></KIcon>
				<KIcon
					cls={decimalIconRightCls}
					icon={decimalIcon}
					width="0px"
					height={iconSize}
					color={decimalVoidColor}
					attrs={{
						style: `width: ${valueDecimalRightWidth}px`
					}}
				></KIcon>
			{/if}
		</span>
	{/each}
	{#if showText || showScore}
		<span class={textCls} style={`color: ${textColor}`}>{text}</span>
	{/if}
</div>
