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
		years.push({
			label: `${currentYear}${prefix}`,
			value: `${currentYear}`,
			id: `${currentYear}_YY_${prefix}`
		});
		currentYear++;
	}
	return years;
}

export function generateMonthRangeFromDate(date: dayjs.Dayjs, prefix = '') {
	const monthRange = [];
	const startMonth = date.month() + 1; // month() 返回的是 0 到 11
	for (let i = startMonth; i <= 12; i++) {
		monthRange.push({
			label: `${i}${prefix}`,
			value: `${i}`,
			id: `${i}_MM_${prefix}`
		});
	}
	return monthRange;
}

export function generateMonthRangeToDate(date: dayjs.Dayjs, prefix = '') {
	const monthRange = [];
	const endMonth = date.month() + 1; // month() 返回的是 0 到 11
	for (let i = 1; i <= endMonth; i++) {
		monthRange.push({
			label: `${i}${prefix}`,
			value: `${i}`,
			id: `${i}_month_${prefix}`
		});
	}
	return monthRange;
}

export function generateMonthRange(hYear: string, range: [dayjs.Dayjs, dayjs.Dayjs], prefix = '') {
	if (hYear === `${range![1].year()}`) {
		return generateMonthRangeToDate(range![1], prefix);
	} else if (hYear === `${range![0].year()}`) {
		return generateMonthRangeFromDate(range![0], prefix);
	} else {
		const res = [];
		for (let i = 1; i <= 12; i++) {
			res.push({
				label: `${i}${prefix}`,
				value: `${i}`,
				id: `${i}_MM_${prefix}`
			});
		}
		return res;
	}
}
