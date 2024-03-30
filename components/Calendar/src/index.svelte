<script lang="ts">
	import type { KCalendarProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import dayjs from 'dayjs';
	import {
		genDateRange,
		generateMonthRange,
		generateYearRange,
		genMonthSelectOption,
		genSelectOption
	} from './utils';
	import { KButton } from '@ikun-ui/button';
	import { KButtonGroup } from '@ikun-ui/button-group';
	import { KSelect, type KSelectProps } from '@ikun-ui/select';
	import { localeConfig } from './locale';

	export let fullscreen: KCalendarProps['fullscreen'] = false;
	export let locale: KCalendarProps['locale'] = localeConfig;
	export let value: KCalendarProps['value'] = dayjs().locale(locale.lang.locale);
	export let validRange: KCalendarProps['validRange'] = undefined;
	export let cls: KCalendarProps['cls'] = undefined;
	export let attrs: KCalendarProps['attrs'] = {};

	/* valid range */
	let range = validRange;
	$: {
		if (validRange && validRange.length) {
			range = validRange;
		} else {
			range = genDateRange(value) as KCalendarProps['validRange'];
		}
	}

	/* year select */
	$: prefixHYY = locale.lang.locale.startsWith('zh') ? locale.lang.year : '';
	$: hYear = genSelectOption(
		`${value.year()}${prefixHYY}`,
		`${value.year()}`,
		`${value.year()}_YY_${prefixHYY}`
	);
	let hYearList: KSelectProps['dataList'] = [];
	$: {
		hYearList = generateYearRange(range![0], range![1], prefixHYY);
	}
	const handleHYearSelect = (e: CustomEvent) => {
		hYear = e.detail;
		hMonthList = generateMonthRange(hYear.value, range!, locale);
	};

	/* month select */
	let hMonth = genMonthSelectOption(value.month(), locale);
	let hMonthList: KSelectProps['dataList'] = [];
	$: {
		hMonthList = generateMonthRange(hYear.value, range!, locale);
	}
	const handleHMonthSelect = (e: CustomEvent) => {
		hMonth = e.detail;
	};

	/* year and month switch */
	let isMY = 'year';
	const handleHMYClick = (v: 'year' | 'month') => {
		isMY = v;
	};

	const prefixCls = getPrefixCls('calendar');
	$: cnames = clsx(prefixCls, cls);
	const headerCls = clsx(`${prefixCls}-header`);
	$: selectCls = clsx(`${headerCls}-select-y`, {
		[`${headerCls}-select-y-half`]: isMY === 'year',
		[`${headerCls}-select-y-full`]: isMY === 'month'
	});
	const selectMMCls = clsx(`${headerCls}-select-m`);
	const selectGroupCls = clsx(`${headerCls}-select-group`);
	const btnGroupCls = clsx(`${prefixCls}-header-btn-group`);
	const btnCls = clsx(`${prefixCls}-header-btn`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot name="header">
		<div class={headerCls}>
			<div class={selectGroupCls}>
				<KSelect
					dataList={hYearList}
					cls={selectCls}
					on:updateValue={handleHYearSelect}
					value={hYear}
				></KSelect>
				{#if isMY === 'year'}
					<KSelect
						dataList={hMonthList}
						cls={selectMMCls}
						on:updateValue={handleHMonthSelect}
						value={hMonth}
					></KSelect>
				{/if}
			</div>
			<KButtonGroup cls={btnGroupCls}>
				<KButton
					on:click={() => handleHMYClick('year')}
					cls={btnCls}
					type={isMY === 'year' ? 'main' : 'info'}
					ghost
				>
					{locale.lang.year}
				</KButton>
				<KButton
					on:click={() => handleHMYClick('month')}
					cls={btnCls}
					type={isMY === 'month' ? 'main' : 'info'}
					ghost
				>
					{locale.lang.month}
				</KButton>
			</KButtonGroup>
		</div>
	</slot>
</div>
