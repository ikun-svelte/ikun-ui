import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KCalendar from '../src';
import KCalendarValue from './fixture/value.svelte';
import KCalendarLocale from './fixture/locale.svelte';
import KCalendarMode from './fixture/mode.svelte';
import KCalendarDisabledDate from './fixture/disabledDate.svelte';
import KCalendarRange from './fixture/range.svelte';
import KCalendarHeader from './fixture/slot.header.svelte';
import KCalendarMonthFull from './fixture/slot.monthFullCell.svelte';
import KCalendarMonth from './fixture/slot.monthCell.svelte';
import KCalendarDate from './fixture/slot.dateCell.svelte';
import KCalendarDateFull from './fixture/slot.dateFullCell.svelte';
import { tick } from 'svelte';
import dayjs from 'dayjs';
let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KCalendar', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KCalendar({
			target: host,
			props: {
				cls: 'k-calendar--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-calendar--test')).toBeTruthy();
	});
	test('props: value', async () => {
		//@ts-ignore
		const instance = new KCalendarValue({
			target: host
		});
		expect(instance).toBeTruthy();
		const cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('props: locale', async () => {
		//@ts-ignore
		const instance = new KCalendarLocale({
			target: host
		});
		expect(instance).toBeTruthy();
		const th = host.querySelectorAll('.k-calendar-thead')[0];
		expect(th.innerHTML.includes('周一')).toBeTruthy();
		const btns = host.querySelectorAll('.k-button');
		expect(btns[0].innerHTML.includes('年')).toBeTruthy();
		expect(btns[1].innerHTML.includes('月')).toBeTruthy();

		btns[1].click();
		await tick();
		const v = host.querySelectorAll('.k-calendar-date-value')[0];
		expect(v.innerHTML.includes('一月')).toBeTruthy();
	});

	test('props: fullscreen is false and mode is year', async () => {
		//@ts-ignore
		const instance = new KCalendar({
			target: host,
			props: {
				fullscreen: false,
				mode: 'year'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-s-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-header-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-thead-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-cell-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-panel-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-s-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-card-m')).not.toBeTruthy();
	});

	test('props: fullscreen is false and mode is month', async () => {
		//@ts-ignore
		const instance = new KCalendar({
			target: host,
			props: {
				fullscreen: false,
				mode: 'month'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-s-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-header-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-thead-card')).not.toBeTruthy();
		expect(host.querySelector('.k-calendar-cell-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-panel-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-s-card')).toBeTruthy();
		expect(host.querySelector('.k-calendar-date-card-m')).toBeTruthy();
	});

	test('props: mode', async () => {
		//@ts-ignore
		const instance = new KCalendarMode({
			target: host
		});
		expect(instance).toBeTruthy();
		let cells = host.querySelectorAll('.k-calendar-cell');
		expect(cells.length).toBe(12);
		let cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
		const monthBtn = host.querySelectorAll('button')[0];
		expect(monthBtn.innerHTML.includes('Year')).toBeTruthy();
		monthBtn.click();
		await tick();
		cells = host.querySelectorAll('.k-calendar-cell');
		expect(cells.length).toBe(42);
		cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('props: disabledDate', async () => {
		//@ts-ignore
		const instance = new KCalendarDisabledDate({
			target: host
		});
		expect(instance).toBeTruthy();
		const trDate = host.querySelector('[title="2024-04-26"]');
		const test = host.querySelector('#test');
		expect(trDate.innerHTML.includes('k-calendar-date-disabled')).toBeTruthy();
		const trigger = trDate.children[0];
		trigger.click();
		await tick();
		expect(test.innerHTML).toBe('2024-04-25');
		const monthBtn = host.querySelectorAll('button')[1];
		monthBtn.click();
		await tick();
		const trMonth = host.querySelector('[title="2024-06"]');
		expect(trMonth.innerHTML.includes('k-calendar-date-disabled')).toBeTruthy();
		const triggerMonth = trMonth.children[0];
		triggerMonth.click();
		await tick();
		expect(test.innerHTML).toBe('2024-04-25');
	});

	test('props: range', async () => {
		//@ts-ignore
		const instance = new KCalendarRange({
			target: host
		});
		expect(instance).toBeTruthy();
		const triggerY = host.querySelector('[data-popover-trigger]');
		triggerY.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const opContainer = host.querySelector('[data-kv-key="2024_YY_"]');
		expect(opContainer.children.length).toBe(1);
		expect(opContainer.children[0].innerHTML.includes('2024')).toBeTruthy();

		const yearBtn = host.querySelectorAll('button')[0];
		expect(yearBtn.innerHTML.includes('Year')).toBeTruthy();
		yearBtn.click();
		await tick();
		const triggerM = host.querySelectorAll('[data-popover-trigger]')[1];
		triggerM.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const opContainer2 = host.querySelector('[data-kv-key="4_MM_Apr"]');
		expect(opContainer2.children.length).toBe(1);
		expect(opContainer2.children[0].innerHTML.includes('Apr')).toBeTruthy();
	});

	test('slots: header', async () => {
		//@ts-ignore
		const instance = new KCalendarHeader({
			target: host
		});
		expect(instance).toBeTruthy();
		const header = host.querySelector('[slot="header"]');
		expect(header.innerHTML).matchSnapshot();
	});

	test('slots: monthFullCell', async () => {
		//@ts-ignore
		const instance = new KCalendarMonthFull({
			target: host
		});
		expect(instance).toBeTruthy();
		const cells = host.querySelectorAll('[slot="monthFullCell"]');
		expect(cells.length).toBe(12);
		const cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('slots: monthCell', async () => {
		//@ts-ignore
		const instance = new KCalendarMonth({
			target: host
		});
		expect(instance).toBeTruthy();
		const cells = host.querySelectorAll('[slot="monthCell"]');
		expect(cells.length).toBe(12);
		const cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('slots: dateCell', async () => {
		//@ts-ignore
		const instance = new KCalendarDate({
			target: host
		});
		expect(instance).toBeTruthy();
		const cells = host.querySelectorAll('[slot="dateCell"]');
		expect(cells.length).toBe(42);
		const cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('slots: dateFullCell', async () => {
		//@ts-ignore
		const instance = new KCalendarDateFull({
			target: host
		});
		expect(instance).toBeTruthy();
		const cells = host.querySelectorAll('[slot="dateFullCell"]');
		expect(cells.length).toBe(42);
		const cellS = host.querySelector('.k-calendar-date-s');
		expect(cellS.innerHTML).matchSnapshot();
	});

	test('events: panelChange', async () => {
		const mockFn = vi.fn();
		let data: any = null;
		//@ts-ignore
		const instance = new KCalendar({
			target: host,
			value: dayjs('2024-04-07')
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('panelChange', (e: CustomEvent) => {
			data = {
				date: e.detail.date.format('YYYY-MM-DD'),
				source: e.detail.source
			};
			mockFn();
		});

		const btn1 = host.querySelectorAll('button')[1];
		btn1.click();
		await tick();
		expect(mockFn).toBeCalledTimes(1);
		expect(data).matchSnapshot();

		const btn2 = host.querySelectorAll('button')[0];
		btn2.click();
		await tick();
		expect(mockFn).toBeCalledTimes(2);
		expect(data).matchSnapshot();
	});

	test('events: select', async () => {
		const mockFn = vi.fn();
		let data: any = null;
		//@ts-ignore
		const instance = new KCalendar({
			target: host,
			props: {
				value: dayjs('2024-04-25')
			}
		});

		//@ts-ignore
		instance.$on('select', (e: CustomEvent) => {
			data = {
				date: e.detail.date.format('YYYY-MM-DD'),
				source: e.detail.source
			};
			mockFn();
		});
		expect(instance).toBeTruthy();
		const dateTrigger = host.querySelector('[title="2024-04-01"]').children[0];
		dateTrigger.click();
		await tick();
		expect(mockFn).toBeCalledTimes(1);
		expect(data).matchSnapshot();

		const triggerY = host.querySelectorAll('[data-popover-trigger]')[0];
		triggerY.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const opContainer = host.querySelector('[data-kv-key="2021_YY_"]').children[0];
		opContainer.click();
		expect(mockFn).toBeCalledTimes(2);
		expect(data).matchSnapshot();

		const triggerM = host.querySelectorAll('[data-popover-trigger]')[1];
		triggerM.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const opContainerM = host.querySelector('[data-kv-key="1_MM_Jan"]').children[0];
		opContainerM.click();
		expect(mockFn).toBeCalledTimes(3);
		expect(data).matchSnapshot();
	});
});
