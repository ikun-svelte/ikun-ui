import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCard from '../src';
import KCardHeader from './fixture/card.slot.header.test.svelte';
import KCardDefault from './fixture/card.slot.default.test.svelte';

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KCard', () => {
	test('props: cls', async () => {
		const instance = new KCard({
			target: host,
			props: {
				cls: 'k-card--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: title', async () => {
		const instance = new KCard({
			target: host,
			props: {
				title: 'IKun UI'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--header')).toBeTruthy();
		expect(host.querySelector('.k-card--header')?.textContent).toBe('IKun UI');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shadow', async () => {
		const instance = new KCard({
			target: host,
			props: {
				shadow: 'always'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--shadow__always')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		instance.$set({ shadow: 'hover' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--shadow__hover')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		instance.$set({ shadow: 'never' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--shadow__never')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: header', async () => {
		const instance = new KCardHeader({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--header-slot')).toBeTruthy();
		expect(host.querySelector('.k-card--header-slot')?.textContent).toBe('IKun UI');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: default', async () => {
		const instance = new KCardDefault({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--default-slot')).toBeTruthy();
		expect(host.querySelector('.k-card--default-slot')?.textContent).toBe('IKun UI');
		expect(host.innerHTML).matchSnapshot();
	});
});
