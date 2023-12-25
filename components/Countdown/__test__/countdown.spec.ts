import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KCountdown from '../src';
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
	vi.restoreAllMocks();
});

describe('Test: KCountdown', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KCountdown({
			target: host,
			props: {
				cls: 'k-countdown--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-countdown--test')).toBeTruthy();
	});

	test('basic render', async () => {
		//@ts-ignore
		const instance = new KCountdown({
			target: host,
			props: {
				title: 'test-title',
				value: Date.now() + 1000 * 60
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-statistic__content')).toBeTruthy();
		expect(host.querySelector('.k-statistic__value')).toBeTruthy();

		expect(host.querySelector('.k-statistic__head')).toBeTruthy();
		expect(host!.innerHTML.includes('test-title')).toBeTruthy();
		expect(host!.innerHTML.includes('00:00:59')).toBeTruthy();
	});

	test('events: change', async () => {
		const onChange = vi.fn();
		//@ts-ignore
		const instance = new KCountdown({
			target: host,
			props: {
				title: 'test-title',
				value: Date.now() + 1000 * 60
			}
		});

		//@ts-ignore
		instance.$on('change', onChange);
		expect(instance).toBeTruthy();
		await tick();
		vi.advanceTimersByTime(16);
		expect(onChange).toHaveBeenCalledTimes(1);
	});

	test('events: finish', async () => {
		const onFinish = vi.fn();
		//@ts-ignore
		const instance = new KCountdown({
			target: host,
			props: {
				title: 'test-title',
				value: Date.now() + 1000 * 60
			}
		});
		//@ts-ignore
		instance.$on('finish', onFinish);
		vi.advanceTimersByTime(1000 * 30);
		expect(onFinish).not.toHaveBeenCalled();
		vi.runAllTimers();
		expect(onFinish).toHaveBeenCalled();
	});
});
