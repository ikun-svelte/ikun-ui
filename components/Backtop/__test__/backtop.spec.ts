import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KBacktop from '../src';
import KBacktopSlot from './backtop.test.svelte';
import { tick } from 'svelte';

const initHost = () => {
	document.body.style.height = '100px';
	document.body.style.overflow = 'auto';
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	document.body.innerHTML = '';
});

describe('Test: KBacktop', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: showHeight & right & bottom', async () => {
		new KBacktop({
			target: document.body,
			props: {
				right: 66,
				bottom: 66,
				showHeight: 100
			}
		});

		await tick();
		expect(document.documentElement.innerHTML.includes('k-backtop')).not.toBeTruthy();

		document.documentElement.scrollTop = 50;
		document.documentElement.dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		expect(document.body.innerHTML.includes('k-backtop')).not.toBeTruthy();

		document.documentElement.scrollTop = 110;
		document.documentElement.dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		expect(document.documentElement.innerHTML.includes('k-backtop')).toBeTruthy();
		expect(document.documentElement.innerHTML.includes('right: 66px; bottom: 66px;')).toBeTruthy();
	});

	test('events: click', async () => {
		const mockFn = vi.fn();
		const instance = new KBacktop({
			target: document.body
		});
		await tick();
		instance.$on('click', mockFn);
		expect(document.documentElement.innerHTML.includes('k-backtop')).not.toBeTruthy();

		document.documentElement.scrollTop = 210;
		document.documentElement.dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		expect(document.documentElement.innerHTML.includes('k-backtop')).toBeTruthy();
		const triggerEl = document.body.children[0];
		triggerEl.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('slot: custom render', async () => {
		new KBacktopSlot({
			target: document.body
		});

		await tick();
		expect(document.documentElement.innerHTML.includes('k-backtop')).not.toBeTruthy();
		document.documentElement.scrollTop = 50;
		document.documentElement.dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		expect(document.documentElement.innerHTML.includes('k-backtop')).toBeTruthy();
		expect(document.documentElement.innerHTML.includes('__BACKTO_TEST')).toBeTruthy();
	});
});
