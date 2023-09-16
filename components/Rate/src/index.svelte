<script lang="ts">
	import type { KRateProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';
	import { isString } from 'baiwusanyu-utils';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KIcon } from '@ikun-ui/icon';

	export let max: KRateProps['max'] = 5;
	export let value: KRateProps['value'] = 0;
	export let allowHalf: KRateProps['allowHalf'] = false;
	export let showScore: KRateProps['showScore'] = false;
	export let scoreTemplate: KRateProps['scoreTemplate'] = '{value}';
	// showText will cover showScore
	export let showText: KRateProps['showText'] = false;
	export let texts: KRateProps['texts'] = '';
	export let textColor: KRateProps['textColor'] = 'var(--ikun-zinc-500)';
	export let icons: KRateProps['icons'] = 'i-carbon-star-filled';
	export let colors: KRateProps['colors'] = 'var(--ikun-amber-500)';
	export let voidIcon: KRateProps['voidIcon'] = 'i-carbon-star';
	export let voidColor: KRateProps['voidColor'] = 'var(--ikun-stone-300)';
	export let disabled: KRateProps['disabled'] = false;
	export let readonly: KRateProps['readonly'] = false;
	export let readonlyVoidIcon: KRateProps['readonlyVoidIcon'] = 'i-carbon-star-filled';
	export let readonlyVoidColor: KRateProps['readonlyVoidColor'] = 'var(--ikun-light-700)';
	export let clearable: KRateProps['clearable'] = false;
	export let cls: KRateProps['cls'] = undefined;
	export let attrs: KRateProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	const iconSize = '18px';
	const maxNumbers = Array.from({ length: max }, (_, i) => i + 1);

	$: currentValue = value;

	const getContinuity = (
		numbers: number[],
		nkObj: string | Record<number, string>
	): Record<number, string> => {
		if (isString(nkObj)) {
			return numbers.reduce((previous: Record<number, string>, current) => {
				previous[current] = nkObj as string;
				return previous;
			}, {});
		} else {
			const oks = Object.keys(nkObj).map((m) => +m);
			return numbers.reduce((previous: Record<number, string>, current) => {
				const nk = oks.find((k) => k >= current);
				previous[current] = nk ? nkObj[nk] : nkObj[oks[oks.length - 1]];
				return previous;
			}, {});
		}
	};

	// text or score, text will cover score
	let textsMap: Record<number, string>;
	let text = '';
	$: {
		textsMap = getContinuity(maxNumbers, texts);
		if (showText) {
			text = (isString(texts) ? texts : textsMap[Math.ceil(currentValue)]) as string;
		} else if (showScore) {
			text = scoreTemplate.replace(
				/\{\s*value\s*\}/g,
				readonly || disabled ? `${value}` : `${currentValue}`
			);
		} else {
			text = '';
		}
	}

	const originValueDecimal = value * 100 - Math.floor(value) * 100;
	const originPointerHalf = value !== Math.floor(value);

	$: pointerAtLeftHalf = originPointerHalf;
	$: valueDecimal = originValueDecimal;

	let showDecimalIcon: (item: number) => boolean;
	$: {
		showDecimalIcon = (item: number) => {
			const showWhenReadonlyOrDisabled =
				(readonly || disabled) && valueDecimal > 0 && item - 1 < value && item > value;
			const showWhenAllowHalf =
				allowHalf && pointerAtLeftHalf && item - 0.5 <= currentValue && item > currentValue;
			return showWhenReadonlyOrDisabled || showWhenAllowHalf;
		};
	}

	const setCurrentValue = (index: number, event: MouseEvent) => {
		if (readonly || disabled) {
			return;
		}
		if (allowHalf && event) {
			let target = event.target as HTMLElement;
			pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth;
			valueDecimal = pointerAtLeftHalf ? 50 : originValueDecimal;
			currentValue = pointerAtLeftHalf ? index - 0.5 : index;
		} else {
			resetOrigin(index);
		}
	};

	const resetCurrentValue = () => {
		if (readonly || disabled) {
			return;
		}
		resetOrigin();
	};

	const resetOrigin = (index?: number) => {
		if (allowHalf) {
			pointerAtLeftHalf = originPointerHalf;
		}
		valueDecimal = originValueDecimal;
		currentValue = index || value;
	};

	let iconsMap: Record<number, string>;
	let activeIcon: string;
	let decimalIcon: string;
	$: {
		iconsMap = getContinuity(maxNumbers, icons);
		activeIcon = iconsMap[Math.ceil(currentValue)];
		decimalIcon = iconsMap[Math.ceil(currentValue)];
	}

	let colorsMap: Record<number, string>;
	let activeColor: string;
	let decimalActiveColor: string;
	$: {
		colorsMap = getContinuity(maxNumbers, colors);
		activeColor = colorsMap[Math.ceil(currentValue)];
		decimalActiveColor = colorsMap[Math.ceil(currentValue)];
	}

	$: decimalBackground = `linear-gradient(to right, ${decimalActiveColor} 0%, ${decimalActiveColor} ${valueDecimal}%, ${readonlyVoidColor} ${valueDecimal}%, ${readonlyVoidColor} 100%);`;

	const handleUpdateValue = () => {
		if (readonly || disabled) {
			return;
		}
		if (clearable && value === currentValue) {
			dispatch('updateValue', 0);
		} else {
			dispatch('updateValue', currentValue);
		}
	};

	// class names
	const prefixCls = getPrefixCls('rate');
	$: baseCls = clsx(
		prefixCls,
		{
			[`${prefixCls}--readonly`]: readonly,
			[`${prefixCls}--disabled`]: disabled
		},
		cls
	);
	$: itemCls = clsx(`${prefixCls}--item`, {
		[`${prefixCls}--item__not-readonly`]: !readonly,
		[`${prefixCls}--item__disabled`]: disabled
	});
	$: textCls = clsx(`${prefixCls}--text`);
</script>

<div class={baseCls} {...$$restProps} {...attrs}>
	{#each maxNumbers as item}
		<span
			class={itemCls}
			aria-hidden="true"
			on:mousemove={(event) => setCurrentValue(item, event)}
			on:mouseleave={resetCurrentValue}
			on:click={handleUpdateValue}
		>
			{#if !showDecimalIcon(item)}
				{#if item <= currentValue}
					<KIcon
						icon={activeIcon}
						width={iconSize}
						height={iconSize}
						style="background: {activeColor};"
					></KIcon>
				{:else}
					<KIcon
						icon={readonly ? readonlyVoidIcon : voidIcon}
						width={iconSize}
						height={iconSize}
						style="background: {readonly ? readonlyVoidColor : voidColor}"
					></KIcon>
				{/if}
			{:else}
				<KIcon
					icon={decimalIcon}
					width={iconSize}
					height={iconSize}
					style="background: {decimalBackground}"
				></KIcon>
			{/if}
		</span>
	{/each}
	{#if (showText || showScore) && text}
		<span class={textCls} style:color={textColor}>{text}</span>
	{/if}
</div>
