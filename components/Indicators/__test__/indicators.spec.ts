import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KIndicators from '../src';
import KIndicatorsSlot from './fixture/slots.svelte';
import { tick } from 'svelte';
import { fireEvent } from '@testing-library/svelte';
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

describe('Test: KIndicators', () => {
	test('props: cls', async () => {
		const instance = new KIndicators({
			target: host,
			props: {
				cls: 'k-indicators--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-indicators--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: defaultPageIndex', async () => {
		const instance = new KIndicators({
			target: host,
			props: {
				defaultPageIndex: 4,
				count: 6
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: count', async () => {
		const instance = new KIndicators({
			target: host,
			props: {
				count: 6
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: trigger is click', async () => {
		let index = 0;
		const instance = new KIndicators({
			target: host,
			props: {
				count: 6,
				trigger: 'click'
			}
		});
		expect(instance).toBeTruthy();
		instance.$on('change', (e: CustomEvent) => {
			index = e.detail.index;
		});
		const btn = host.querySelectorAll('.k-indicators-item')[3];
		btn.click();
		await tick();
		expect(index).toBe(3);
	});

	test('props: trigger is hover', async () => {
		let index = 0;
		const instance = new KIndicators({
			target: host,
			props: {
				count: 6,
				trigger: 'hover'
			}
		});
		expect(instance).toBeTruthy();
		instance.$on('change', (e: CustomEvent) => {
			index = e.detail.index;
		});
		const btn = host.querySelectorAll('.k-indicators-item')[3];
		await fireEvent.mouseEnter(btn);
		await tick();
		expect(index).toBe(3);
	});

	test('slots: default', async () => {
		const instance = new KIndicatorsSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
