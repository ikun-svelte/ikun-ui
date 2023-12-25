<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStatisticProps } from './types';
	import { isFunction, isNumber } from 'baiwusanyu-utils';

	export let decimalSeparator: KStatisticProps['decimalSeparator'] = '.';
	export let groupSeparator: KStatisticProps['groupSeparator'] = ',';
	export let precision: KStatisticProps['precision'] = 0;
	export let formatter: KStatisticProps['formatter'] = undefined;
	export let value: KStatisticProps['value'] = 0;
	export let prefix: KStatisticProps['prefix'] = undefined;
	export let suffix: KStatisticProps['suffix'] = undefined;
	export let title: KStatisticProps['title'] = undefined;
	export let valueStyle: KStatisticProps['valueStyle'] = undefined;
	export let cls: KStatisticProps['cls'] = undefined;
	export let attrs: KStatisticProps['attrs'] = {};

	$: displayValue = () => {
		if (isFunction(formatter)) return formatter!(value);

		if (!isNumber(value)) return value;

		let [integer, decimal = ''] = String(value).split('.');
		decimal = decimal.padEnd(precision, '0').slice(0, precision > 0 ? precision : 0);
		integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
		return [integer, decimal].join(decimal ? decimalSeparator : '');
	};

	const namespaceCls = getPrefixCls('statistic');
	$: cnames = clsx(namespaceCls, cls);
	$: headCls = clsx(`${namespaceCls}__head`);
	$: contentCls = clsx(`${namespaceCls}__content`);
	$: prefixCls = clsx(`${namespaceCls}__prefix`);
	$: valueCls = clsx(`${namespaceCls}__value`);
	$: suffixCls = clsx(`${namespaceCls}__suffix`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if $$slots.title || title}
		<div class={headCls}>
			<slot name="title">
				{title}
			</slot>
		</div>
	{/if}
	<div class={contentCls}>
		{#if $$slots.prefix || prefix}
			<div class={prefixCls}>
				<slot name="prefix">
					<span>{prefix}</span>
				</slot>
			</div>
		{/if}

		<span class={valueCls} style={valueStyle}>
			{displayValue()}
		</span>

		{#if $$slots.suffix || suffix}
			<div class={suffixCls}>
				<slot name="suffix">
					<span>{suffix}</span>
				</slot>
			</div>
		{/if}
	</div>
</div>
