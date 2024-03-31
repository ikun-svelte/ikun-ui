import dayjs from 'dayjs';
import type { ManipulateType } from 'dayjs';
import type { KCalendarProps } from './types';

export function genDateRange(
	date: dayjs.Dayjs,
	unit: ManipulateType = 'year',
	start = 10,
	end = 10
) {
	const startDate = dayjs(date).subtract(start, unit);
	const endDate = dayjs(date).add(end, unit);
	return [startDate, endDate];
}

export function generateYearRange(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, prefix = '') {
	const years = [];
	let currentYear = startDate.year();
	while (currentYear <= endDate.year()) {
		years.push(
			genSelectOption(`${currentYear}${prefix}`, `${currentYear}`, `${currentYear}_YY_${prefix}`)
		);
		currentYear++;
	}
	return years;
}

export function generateMonthRangeFromDate(date: dayjs.Dayjs, locale: Record<string, any>) {
	const monthRange = [];
	const startMonth = date.month();
	for (let i = startMonth; i < 12; i++) {
		monthRange.push(genMonthSelectOption(i, locale));
	}
	return monthRange;
}

export function generateMonthRangeToDate(date: dayjs.Dayjs, locale: Record<string, any>) {
	const monthRange = [];
	const endMonth = date.month();
	for (let i = 0; i <= endMonth; i++) {
		monthRange.push(genMonthSelectOption(i, locale));
	}
	return monthRange;
}

export function generateMonthRange(
	hYear: string,
	range: [dayjs.Dayjs, dayjs.Dayjs],
	locale: Record<string, any>
) {
	if (hYear === `${range![1].year()}`) {
		return generateMonthRangeToDate(range![1], locale);
	} else if (hYear === `${range![0].year()}`) {
		return generateMonthRangeFromDate(range![0], locale);
	} else {
		const res = [];
		for (let i = 0; i < 12; i++) {
			res.push(genMonthSelectOption(i, locale));
		}
		return res;
	}
}

export function genSelectOption(label: string, value: string, id: string) {
	return {
		label,
		value,
		id
	};
}

export function genMonthSelectOption(month: number, locale: Record<string, any>) {
	const mVal = month + 1;
	const shortMonth = locale.lang.locale.startsWith('zh')
		? `${mVal}${locale.lang.month}`
		: locale.lang.shortMonths[month];
	return genSelectOption(shortMonth, `${month + 1}`, `${mVal}_MM_${shortMonth}`);
}

export interface CalendarCell {
	instance: dayjs.Dayjs;
	current: boolean;
	key: string;
	label?: string;
	disabled: boolean;
}
export function genCellDateRange(
	centerDate: dayjs.Dayjs,
	disableCallback: KCalendarProps['disabledDate']
): Array<Array<CalendarCell>> {
	const startDate = dayjs(centerDate).startOf('month');
	const endDate = dayjs(centerDate).endOf('month');
	const daysInMonth = endDate.date();
	const totalDays = 42;

	// Calculate the number of days before and after the current month
	const daysBefore = startDate.day(); // Number of days from previous month
	const daysAfter = totalDays - daysInMonth - daysBefore; // Number of days from next month

	// Generate dates for the previous month
	const prevMonthDates = [];
	const startOfPrevMonth = startDate.subtract(1, 'month').endOf('month');
	for (let i = daysBefore; i > 0; i--) {
		const d = startOfPrevMonth.subtract(i - 1, 'day');
		prevMonthDates.unshift({
			current: false,
			instance: d,
			key: d.format('YYYY-MM-DD'),
			disabled: disableCallback ? disableCallback(d) : false
		});
	}

	// Generate dates for the current month
	const currentMonthDates = [];
	for (let i = 0; i < daysInMonth; i++) {
		const d = startDate.add(i, 'day');
		currentMonthDates.push({
			current: true,
			instance: d,
			key: d.format('YYYY-MM-DD'),
			disabled: disableCallback ? disableCallback(d) : false
		});
	}

	// Generate dates for the next month
	const nextMonthDates = [];
	const startOfNextMonth = endDate.add(1, 'day').startOf('month');
	for (let i = 1; i <= daysAfter; i++) {
		const d = startOfNextMonth.add(i - 1, 'day');
		nextMonthDates.push({
			current: false,
			instance: d,
			key: d.format('YYYY-MM-DD'),
			disabled: disableCallback ? disableCallback(d) : false
		});
	}

	// Combine all date arrays and create the matrix
	const dateMatrix = [];
	dateMatrix.push(...prevMonthDates.reverse());
	dateMatrix.push(...currentMonthDates);
	dateMatrix.push(...nextMonthDates);

	// Split the date matrix into a 6x7 grid
	const resultMatrix = [];
	for (let i = 0; i < totalDays / 7; i++) {
		resultMatrix.push(dateMatrix.slice(i * 7, (i + 1) * 7));
	}

	return resultMatrix;
}

export function changeMonthYears(input: string, date: dayjs.Dayjs, type: 'YYYY' | 'MM') {
	const yearVal = date.year();
	const dateVal = date.date();
	const monthVal = date.month() + 1;
	const newDateStr =
		type === 'YYYY' ? `${input}-${monthVal}-${dateVal}` : `${yearVal}-${input}-${dateVal}`;
	return dayjs(newDateStr);
}

export function genCellMonthRange(
	centerDate: dayjs.Dayjs,
	disableCallback: KCalendarProps['disabledDate']
): Array<Array<CalendarCell>> {
	const year = centerDate.year();
	const months = [];
	for (let i = 0; i < 12; i += 3) {
		const row = [];
		for (let j = 0; j < 3; j++) {
			const month = i + j + 1; // 月份从 1 开始
			const monthDate = dayjs(`${year}-${month.toString().padStart(2, '0')}-${centerDate.date()}`);
			row.push({
				current: centerDate.month() === monthDate.month(),
				instance: monthDate,
				key: monthDate.format('YYYY-MM'),
				disabled: disableCallback ? disableCallback(monthDate) : false
			});
		}
		months.push(row);
	}
	return months;
}
