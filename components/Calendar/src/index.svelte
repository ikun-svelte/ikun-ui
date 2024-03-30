<script lang="ts">
	import type { KCalendarProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import dayjs from 'dayjs';
	import { genDateRange, generateMonthRange, generateYearRange } from './utils';
	import { KButton } from '@ikun-ui/button';
	import { KButtonGroup } from '@ikun-ui/button-group';
	import { KSelect, type KSelectProps } from '@ikun-ui/select';
	export let fullscreen: KCalendarProps['fullscreen'] = false;
	export let locale: KCalendarProps['locale'] = {
		YY: 'year',
		MM: 'month'
	};
	export let value: KCalendarProps['value'] = dayjs();
	export let validRange: KCalendarProps['validRange'] = undefined;
	export let cls: KCalendarProps['cls'] = undefined;
	export let attrs: KCalendarProps['attrs'] = {};

	let range = validRange;
	$: {
		if (validRange && validRange.length) {
			range = validRange;
		} else {
			range = genDateRange(value) as KCalendarProps['validRange'];
		}
	}

	let hYear = {
		label: `${value.year()}${locale.YY}`,
		value: `${value.year()}`,
		id: `${value.year()}_YY_${locale.YY}`
	};
	let hYearList: KSelectProps['dataList'] = [];
	$: {
		hYearList = generateYearRange(range![0], range![1], locale.YY);
	}
	const handleHYearSelect = (e: CustomEvent) => {
		hYear = e.detail;
		hMonthList = generateMonthRange(hYear.value, range!);
	};

	let hMonth = {
		label: `${value.month() + 1}${locale.MM}`,
		value: `${value.month() + 1}`,
		id: `${value.month() + 1}_MM_${locale.MM}`
	};
	let hMonthList: KSelectProps['dataList'] = [];
	$: {
		hMonthList = generateMonthRange(hYear.value, range!, locale.MM);
	}
	const handleHMonthSelect = (e: CustomEvent) => {
		hMonth = e.detail;
	};

	let isMY = 'year';
	const handleHMYClick = (v: 'year' | 'month') => {
		isMY = v;
	};

	const prefixCls = getPrefixCls('calendar');
	$: cnames = clsx(prefixCls, cls, 'box-border m-0 p-0 text-14px leading-[1.5] bg-white list-none');
	const headerCls = clsx(`${prefixCls}-header my-12px mx-0 block items-center justify-end sm:flex`);
	const selectCls = clsx(`${prefixCls}-header-yymm !w-1/2 !block sm:!w-104px`);
	const selectMMCls = clsx(selectCls, `ml-8px sm:mx-8px`);
	const selectGroupCls = clsx(`${prefixCls}-header-select-group fcc`);
	const btnGroupCls = clsx(`${prefixCls}-header-btn-group flex mt-8px sm:mt-0`);
	const btnCls = clsx(`${prefixCls}-header-btn w-1/2`);
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

				<KSelect
					dataList={hMonthList}
					cls={selectMMCls}
					on:updateValue={handleHMonthSelect}
					value={hMonth}
				></KSelect>
			</div>
			<KButtonGroup cls={btnGroupCls}>
				<KButton
					on:click={() => handleHMYClick('year')}
					cls={btnCls}
					type={isMY === 'year' ? 'main' : 'info'}
					ghost
				>
					{locale.YY}
				</KButton>
				<KButton
					on:click={() => handleHMYClick('month')}
					cls={btnCls}
					type={isMY === 'month' ? 'main' : 'info'}
					ghost
				>
					{locale.MM}
				</KButton>
			</KButtonGroup>
		</div>
	</slot>
</div>
