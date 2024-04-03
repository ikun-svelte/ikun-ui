<script lang="ts">
	import type { KCalendarProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import dayjs from 'dayjs';
	import {
		type CalendarCell,
		changeMonthYears,
		genCellDateRange,
		genCellMonthRange,
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
	import { createEventDispatcher } from 'svelte';

	export let fullscreen: KCalendarProps['fullscreen'] = false;
	export let locale: KCalendarProps['locale'] = localeConfig;
	export let mode: KCalendarProps['mode'] = 'year';
	export let disabledDate: KCalendarProps['disabledDate'] = undefined;
	export let value: KCalendarProps['value'] = dayjs().locale(locale!.lang.locale);
	export let validRange: KCalendarProps['validRange'] = undefined;
	export let cls: KCalendarProps['cls'] = undefined;
	export let attrs: KCalendarProps['attrs'] = {};

	const dispatch = createEventDispatcher();
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
	$: prefixHYY = locale!.lang.locale.startsWith('zh') ? locale!.lang.year : '';
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
		hMonthList = generateMonthRange(hYear.value, range!, locale!);
		selectValue = changeMonthYears(e.detail.value, selectValue, 'YYYY');
		doUpdateCellList(isMY, selectValue);
		dispatch('select', { date: selectValue, source: 'year' });
	};

	/* month select */
	let hMonth = genMonthSelectOption(value.month(), locale!);
	let hMonthList: KSelectProps['dataList'] = [];
	$: {
		hMonthList = generateMonthRange(hYear.value, range!, locale!);
	}
	const handleHMonthSelect = (e: CustomEvent) => {
		hMonth = e.detail;
		selectValue = changeMonthYears(e.detail.value, selectValue, 'MM');
		doUpdateCellList(isMY, selectValue);
		dispatch('select', { date: selectValue, source: 'month' });
	};

	/* year and month switch */
	let isMY = mode!;
	const handleHMYClick = (v: 'year' | 'month') => {
		isMY = v;
		if (selectValue) {
			doUpdateCellList(isMY, selectValue);
		}

		if (isMY === 'year') {
			hMonth = genMonthSelectOption(selectValue.month(), locale!);
		}

		dispatch('panelChange', { date: selectValue, mode: isMY });
	};

	/*  generate cell list */
	let cellList: Array<Array<CalendarCell>> = [];
	$: {
		doUpdateCellList(isMY!, value);
	}
	// select day
	let selectValue: dayjs.Dayjs = value;
	// current day
	let todayValue = dayjs();
	function handleSelect(day: dayjs.Dayjs, isDisabled: boolean) {
		if (isDisabled) return;
		selectValue = day;
		doUpdateCellList(isMY, selectValue);
		dispatch('select', { date: selectValue, source: isMY });
	}

	function doUpdateCellList(type: 'year' | 'month', v: dayjs.Dayjs) {
		cellList =
			type === 'year'
				? genCellDateRange(v, disabledDate, range!)
				: genCellMonthRange(v, disabledDate, range!);
	}
	const prefixCls = getPrefixCls('calendar');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}-card`]: !fullscreen
		},
		cls
	);
	const headerCls = clsx({
		[`${prefixCls}-header`]: fullscreen,
		[`${prefixCls}-header-card`]: !fullscreen
	});
	$: selectCls = clsx(`${prefixCls}-header-select-y`, {
		[`${prefixCls}-header-select-y-half`]: isMY === 'year',
		[`${prefixCls}-header-select-y-full`]: isMY === 'month'
	});
	const selectMMCls = clsx(`${prefixCls}-header-select-m`);
	const selectGroupCls = clsx(`${prefixCls}-header-select-group`);
	const btnGroupCls = clsx(`${prefixCls}-header-btn-group`);
	const btnCls = clsx(`${prefixCls}-header-btn`);
	const panelCls = clsx({
		[`${prefixCls}-panel`]: fullscreen,
		[`${prefixCls}-panel-card`]: !fullscreen
	});
	const panelDateCls = clsx(`${prefixCls}-date-panel`);
	const panelBodyCls = clsx(`${prefixCls}-body`);
	const contentCls = clsx(`${prefixCls}-content`);
	const theadCls = clsx({
		[`${prefixCls}-thead`]: fullscreen,
		[`${prefixCls}-thead-card`]: !fullscreen
	});
	const cellCls = clsx(`${prefixCls}-cell`, {
		[`${prefixCls}-cell-card`]: !fullscreen
	});
	$: cellInnerCls = (day: dayjs.Dayjs, curMonth: boolean, disabled: boolean) => {
		const fm = isMY === 'year' ? 'YYYY-MM-DD' : 'YYYY-MM';
		return clsx(
			`${prefixCls}-cell-inner`,
			{
				[`${prefixCls}-date`]: fullscreen,
				[`${prefixCls}-date-card`]: !fullscreen && isMY === 'year',
				[`${prefixCls}-date-card-m`]: !fullscreen && isMY === 'month'
			},
			{
				[`${prefixCls}-date-hover`]:
					!selectValue || !(selectValue && day.format(fm) === selectValue.format(fm)),
				[`${prefixCls}-date-v`]: day.format(fm) === value.format(fm),
				[`${prefixCls}-date-c`]: day.format(fm) === todayValue.format(fm),
				[`${prefixCls}-date-s`]:
					fullscreen && selectValue && day.format(fm) === selectValue.format(fm),
				[`${prefixCls}-date-s-card`]:
					!fullscreen && selectValue && day.format(fm) === selectValue.format(fm),
				[`${prefixCls}-date-not`]: !curMonth,
				[`${prefixCls}-date-disabled`]: disabled
			}
		);
	};
	const cellDateValCls = clsx(`${prefixCls}-date-value`);
	const cellDateContentCls = clsx(`${prefixCls}-date-content`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot
		name="header"
		mode={isMY}
		handleYearSelect={handleHYearSelect}
		yearList={hYearList}
		handleMonthSelect={handleHMonthSelect}
		monthList={hYearList}
		handleMYClick={handleHMYClick}
	>
		<div class={headerCls}>
			<div class={selectGroupCls}>
				<KSelect
					size={fullscreen ? 'md' : 'sm'}
					dataList={hYearList}
					cls={selectCls}
					on:updateValue={handleHYearSelect}
					value={hYear}
				></KSelect>
				{#if isMY === 'year'}
					<KSelect
						size={fullscreen ? 'md' : 'sm'}
						dataList={hMonthList}
						cls={selectMMCls}
						on:updateValue={handleHMonthSelect}
						value={hMonth}
					></KSelect>
				{/if}
			</div>
			<KButtonGroup cls={btnGroupCls} size={fullscreen ? 'md' : 'sm'}>
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
	<div class={panelCls}>
		<div class={panelDateCls}>
			<div class={panelBodyCls}>
				<table class={contentCls}>
					{#if isMY === 'year'}
						<thead>
							<tr>
								{#each locale.lang.shortWeekDays as weekDays (weekDays)}
									<th class={theadCls}>{weekDays}</th>
								{/each}
							</tr>
						</thead>
					{/if}
					{#if isMY === 'year'}
						<tbody>
							{#each cellList as row}
								<tr>
									{#each row as date (date.key)}
										<td
											on:click={() => handleSelect(date.instance, date.disabled)}
											title={date.instance.format('YYYY-MM-DD')}
											class={cellCls}
										>
											<div class={cellInnerCls(date.instance, date.current, date.disabled)}>
												<slot name="dateFullCell" {date}>
													<div class={cellDateValCls}>
														{date.instance.date()}
													</div>
													<div class={cellDateContentCls}>
														<slot name="dateCell" {date} />
													</div>
												</slot>
											</div>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					{/if}
					{#if isMY === 'month'}
						<tbody>
							{#each cellList as row}
								<tr>
									{#each row as date (date.key)}
										<td
											title={date.instance.format('YYYY-MM')}
											on:click={() => handleSelect(date.instance, date.disabled)}
											class={cellCls}
										>
											<div class={cellInnerCls(date.instance, date.current, date.disabled)}>
												<slot name="monthFullCell" month={date}>
													<div class={cellDateValCls}>
														{locale.lang.shortMonths[date.instance.month()]}
													</div>
													<div class={cellDateContentCls}>
														<slot name="monthCell" month={date} />
													</div>
												</slot>
											</div>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					{/if}
				</table>
			</div>
		</div>
	</div>
</div>
