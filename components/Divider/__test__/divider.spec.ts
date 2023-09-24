import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDivider from '../src';
import KDividerContent from './divider.content.slot.test.svelte';

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

describe('Test: KDivider', () => {
	test('props: cls', async () => {
		const instance = new KDivider({
			target: host,
			props: {
				cls: 'k-divider--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: direction', async () => {
		const instance = new KDivider({
			target: host,
			props: {
				direction: 'horizontal'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--horizontal')).toBeTruthy();
		instance.$set({ direction: 'vertical' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--vertical')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: borderColor', async () => {
		const instance = new KDivider({
			target: host,
			props: {
				borderColor: 'b-red'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('b-red')).toBeTruthy();
		instance.$set({ borderColor: 'b-blue' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('b-blue')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: borderStyle', async () => {
		const instance = new KDivider({
			target: host,
			props: {
				direction: 'horizontal',
				borderStyle: 'solid'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--horizontal__solid')).toBeTruthy();
		instance.$set({ borderStyle: 'dotted' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--horizontal__dotted')).toBeTruthy();
		instance.$set({ direction: 'vertical', borderStyle: 'dashed' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--vertical__dashed')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: content', async () => {
		const instance = new KDividerContent({
			target: host
		});
		expect(instance).toBeTruthy();
		const dividers = host.querySelectorAll('.k-divider');
		expect(dividers[0].getAttribute('class')?.includes('k-divider--content-left')).toBeTruthy();
		expect(dividers[0].textContent).toBe('divider left text');
		expect(dividers[1].getAttribute('class')?.includes('k-divider--content-center')).toBeTruthy();
		expect(dividers[1].textContent).toBe('divider center text');
		expect(dividers[2].getAttribute('class')?.includes('k-divider--content-right')).toBeTruthy();
		expect(dividers[2].textContent).toBe('divider right text');
		expect(host.innerHTML).matchSnapshot();
	});
});
