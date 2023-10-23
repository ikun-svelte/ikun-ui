import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KPopoverPlacement from './popover.placement.svelte';
import KPopoverTrigger from './popover.trigger.svelte';
import KPopoverSlots from './popover.slots.svelte';
import KPopoverDisabled from './popover.disabled.svelte';
import KPopoverChange from './popover.change.svelte';
import KPopoverArrow from './popover.arrow.svelte';
let host: HTMLElement;

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
// TODO E2E test
describe('Test: KPopover', () => {
	test('props: placement', async () => {
		const instance = new KPopoverPlacement({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
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

	test('props: disabled', async () => {
		const instance = new KPopoverDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).not.toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: arrow', async () => {
		const instance = new KPopoverArrow({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: trigger', async () => {
		const instance = new KPopoverTrigger({
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
		const instance = new KPopoverSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
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

	test('events: change', async () => {
		let show = false;
		const mockFn = vi.fn();
		const instance = new KPopoverChange({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('change', (e) => {
			show = e.detail;
			mockFn();
		});
		await tick();
		const Elm = host.children[0].getElementsByTagName('div')[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(1);
		expect(show).toBeTruthy();
		Elm.dispatchEvent(
			new MouseEvent('mouseleave', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(mockFn).toBeCalledTimes(2);
		expect(show).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
