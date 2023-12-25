import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KStatistic from '../src';
import KStatisticSuffix from './fixture/suffix.svelte';
import KStatisticPrefix from './fixture/prefix.svelte';
import { tick } from 'svelte';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KStatistic', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KStatistic({
			target: host,
			props: {
				cls: 'k-statistic--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-statistic--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: title', async () => {
		// @ts-ignore
		const instance = new KStatistic({
			target: host,
			props: {
				title: 'test-title'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__head')).toBeTruthy();
		expect(host!.innerHTML.includes('test-title')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value', async () => {
		// @ts-ignore
		const instance = new KStatistic({
			target: host,
			props: {
				value: 57454157
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__content')).toBeTruthy();
		expect(host.querySelector('.k-statistic__value')).toBeTruthy();
		expect(host!.innerHTML.includes('57,454,157')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: precision', async () => {
		// @ts-ignore
		const instance = new KStatistic({
			target: host,
			props: {
				precision: 6,
				value: 268500.123456
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__content')).toBeTruthy();
		expect(host.querySelector('.k-statistic__value')).toBeTruthy();
		expect(host!.innerHTML.includes('268,500.123456')).toBeTruthy();
		// @ts-ignore
		instance.$set({ precision: 4 });
		await tick();
		expect(host!.innerHTML.includes('268,500.1234')).toBeTruthy();
	});

	test('slot: prefix', async () => {
		// @ts-ignore
		const instance = new KStatisticPrefix({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__content')).toBeTruthy();
		expect(host.querySelector('.k-statistic__value')).toBeTruthy();
		expect(host.querySelector('.k-statistic__prefix')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: suffix', async () => {
		// @ts-ignore
		const instance = new KStatisticSuffix({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__content')).toBeTruthy();
		expect(host.querySelector('.k-statistic__value')).toBeTruthy();
		expect(host.querySelector('.k-statistic__suffix')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
