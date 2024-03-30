import dayjs from 'dayjs';
import type { ManipulateType } from 'dayjs';

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
