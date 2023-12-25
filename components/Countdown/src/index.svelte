<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCountdownProps } from './types';
	import { formatTime, getTime, rAF, cAF } from './utils';
	import { createEventDispatcher } from 'svelte';
	import { KStatistic } from '@ikun-ui/statistic';

	export let format: KCountdownProps['format'] = 'HH:mm:ss';
	export let value: KCountdownProps['value'] = 0;
	export let prefix: KCountdownProps['prefix'] = undefined;
	export let suffix: KCountdownProps['suffix'] = undefined;
	export let title: KCountdownProps['title'] = undefined;
	export let valueStyle: KCountdownProps['valueStyle'] = undefined;
	export let cls: KCountdownProps['cls'] = undefined;
	export let attrs: KCountdownProps['attrs'] = {};

	let timer: ReturnType<typeof rAF> | undefined;
	let rawValue = getTime(value) - Date.now();
	const formatter = (val: number) => formatTime(val, format);

	const stopTimer = () => {
		if (timer) {
			cAF(timer);
			timer = undefined;
		}
	};

	const dispatch = createEventDispatcher();
	const startTimer = () => {
		const timestamp = getTime(value);
		const frameFunc = () => {
			let diff = timestamp - Date.now();
			dispatch('change', diff);
			if (diff <= 0) {
				diff = 0;
				stopTimer();
				dispatch('finish');
			} else {
				timer = rAF(frameFunc);
			}
			rawValue = diff;
		};
		timer = rAF(frameFunc);
	};

	let oFormat = format;
	let oVal = value;
	$: if (oFormat !== format || oVal !== value) {
		stopTimer();
		startTimer();
		oFormat = format;
		oVal = value;
	}
	stopTimer();
	startTimer();

	const prefixCls = getPrefixCls('countdown');
	$: cnames = clsx(prefixCls, cls);

	$: showPrefix = !!($$slots.prefix || prefix);
	$: showSuffix = !!($$slots.suffix || suffix);
	$: showTitle = !!($$slots.title || title);
</script>

<KStatistic
	{...$$restProps}
	{...attrs}
	cls={cnames}
	value={rawValue}
	{title}
	{prefix}
	{suffix}
	{showPrefix}
	{showSuffix}
	{showTitle}
	{valueStyle}
	{formatter}
>
	<slot name="prefix" slot="prefix">{prefix}</slot>
	<slot name="suffix" slot="suffix">{suffix}</slot>
	<slot name="title" slot="title">{title}</slot>
</KStatistic>
