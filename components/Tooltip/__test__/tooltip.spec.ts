import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KTooltipPlacement from './fixture/tooltip.placement.svelte';
import KTooltipTrigger from './fixture/tooltip.trigger.svelte';
import KTooltipSlots from './fixture/tooltip.slots.svelte';

let host: HTMLElement;
// TODO E2E test
const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KTooltip', () => {
	test('props: placement', async () => {
		const instance = new KTooltipPlacement({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: trigger', async () => {
		const instance = new KTooltipTrigger({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
		Elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: triggerEl & contentEl', async () => {
		const instance = new KTooltipSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(
			host.innerHTML.includes('triggerEl') && host.innerHTML.includes('contentEl')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
