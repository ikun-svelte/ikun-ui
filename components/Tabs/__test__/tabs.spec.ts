import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KTabsValue from './fixtrue/value.svelte';
import KTabsClose from './fixtrue/closeable.svelte';
import KTabsEdit from './fixtrue/ediotable.svelte';
import KTabsLeave from './fixtrue/before-leave.svelte';
import KTabsCard from './fixtrue/card.svelte';
import KTabsBorder from './fixtrue/border.svelte';
import KTabsOption from './fixtrue/nav-options.svelte';
import KTabsSlot from './fixtrue/slot.default.svelte';
import KTabsSlotAdd from './fixtrue/slot.add.svelte';
import KTabsClick from './fixtrue/click.svelte';
import KTabsRemove from './fixtrue/remove.svelte';
import KTabsChange from './fixtrue/change.svelte';
import KTabsAdd from './fixtrue/add.svelte';
import KTabsEditEvt from './fixtrue/edit.svelte';
import KTabsAddTab from './fixtrue/add-tab.svelte';
import { tick } from 'svelte';
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
describe('Test: KTabs', () => {
	test('props: value', async () => {
		// @ts-ignore
		const instance = new KTabsValue({
			target: host
		});
		expect(instance).toBeTruthy();
		const activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label2')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: closeable', async () => {
		// @ts-ignore
		const instance = new KTabsClose({
			target: host
		});
		expect(instance).toBeTruthy();
		let activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label2')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).toBeTruthy();

		const btn = host.querySelector('button');
		btn.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: editable', async () => {
		// @ts-ignore
		const instance = new KTabsEdit({
			target: host
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-add')).toBeTruthy();

		let activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label2')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).toBeTruthy();

		const btn = host.querySelector('button');
		btn.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: beforeLeave', async () => {
		// @ts-ignore
		const instance = new KTabsLeave({
			target: host
		});

		expect(instance).toBeTruthy();

		let activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();

		const tab = host.querySelectorAll('[role="tab"]')[1];
		tab.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type is card', async () => {
		// @ts-ignore
		new KTabsCard({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type is border', async () => {
		// @ts-ignore
		new KTabsBorder({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type is navOptions', async () => {
		// @ts-ignore
		const instance = new KTabsOption({
			target: host
		});
		expect(instance).toBeTruthy();
		let activeElm = host.querySelector('.k-tabs__nav-item--active');

		expect(activeElm.innerHTML.includes('label2')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).toBeTruthy();

		const tab = host.querySelectorAll('[role="tab"]');
		tab[0].click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();

		tab[2].click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		activeElm = host.querySelector('.k-tabs__nav-item--active');
		expect(activeElm.innerHTML.includes('label1')).toBeTruthy();
		expect(activeElm.innerHTML.includes('i-carbon-close')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: click', async () => {
		// @ts-ignore
		const instance = new KTabsClick({
			target: host
		});
		expect(instance).toBeTruthy();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('2');

		const tab = host.querySelectorAll('[role="tab"]');
		tab[0].click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: remove', async () => {
		// @ts-ignore
		const instance = new KTabsRemove({
			target: host
		});
		expect(instance).toBeTruthy();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('2');

		const tab = host.querySelectorAll('[role="tab"]')[1];
		tab.querySelector('.k-tabs__close').click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('1');
		expect(host.querySelectorAll('[role="tab"]').length).toBe(1);
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: change', async () => {
		// @ts-ignore
		const instance = new KTabsChange({
			target: host
		});
		expect(instance).toBeTruthy();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('2');

		const tab = host.querySelectorAll('[role="tab"]')[1];
		tab.querySelector('.k-tabs__close').click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('1');
		expect(host.querySelectorAll('[role="tab"]').length).toBe(1);
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: add', async () => {
		// @ts-ignore
		const instance = new KTabsAdd({
			target: host
		});
		expect(instance).toBeTruthy();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('1');

		const add = host.querySelector('.k-tabs__add');
		add.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('5');
		expect(host.querySelectorAll('[role="tab"]').length).toBe(5);
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: edit', async () => {
		// @ts-ignore
		const instance = new KTabsEditEvt({
			target: host
		});
		expect(instance).toBeTruthy();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('2');

		const add = host.querySelector('.k-tabs__add');
		add.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('3');
		expect(host.querySelectorAll('[role="tab"]').length).toBe(3);
		expect(host.querySelector('[data-test-id="event"]').innerHTML).toBe('{"action":"add"}');
	});

	test('api: addTab', async () => {
		// @ts-ignore
		const instance = new KTabsAddTab({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		let res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('2');

		const add = host.querySelector('#add_btn');
		add.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		res = host.querySelector('[data-test-id="result"]');
		expect(res.innerHTML).toBe('3');
		expect(host.querySelectorAll('[role="tab"]').length).toBe(3);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: default', async () => {
		// @ts-ignore
		new KTabsSlot({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: addIcon', async () => {
		// @ts-ignore
		new KTabsSlotAdd({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});
});
