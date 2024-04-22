import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KPopoverPlacement from './fixture/popover.placement.svelte';
import KPopoverTrigger from './fixture/popover.trigger.svelte';
import KPopoverSlots from './fixture/popover.slots.svelte';
import KPopoverDisabled from './fixture/popover.disabled.svelte';
import KPopoverChange from './fixture/popover.change.svelte';
import KPopoverArrow from './fixture/popover.arrow.svelte';
import KPopoverDelay from './fixture/popover.delay.svelte';
import KPopoverOpen from './fixture/popover.open.svelte';
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
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: placement', async () => {
		//@ts-ignore
		const instance = new KPopoverPlacement({
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

	test('props: disabled', async () => {
		//@ts-ignore
		const instance = new KPopoverDisabled({
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
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).not.toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: arrow', async () => {
		//@ts-ignore
		const instance = new KPopoverArrow({
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
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: defaultOpen', async () => {
		//@ts-ignore
		const instance = new KPopoverOpen({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
	});

	test('props: trigger', async () => {
		//@ts-ignore
		const instance = new KPopoverTrigger({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0] as HTMLElement;
		Elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: mouseEnterDelay & mouseLeaveDelay', async () => {
		//@ts-ignore
		let show = false;
		//@ts-ignore
		const instance = new KPopoverDelay({
			target: host
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('change', (e) => {
			show = e.detail;
		});
		await tick();
		const Elm = host.children[0];
		Elm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);

		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).not.toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).not.toBeTruthy();
		expect(show).not.toBeTruthy();
		await vi.advanceTimersByTimeAsync(1000);
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(show).toBeTruthy();

		Elm.dispatchEvent(
			new MouseEvent('mouseleave', {
				cancelable: true
			})
		);

		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('有美一人，清扬婉兮')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(show).toBeTruthy();
		await vi.advanceTimersByTimeAsync(1000);
		await tick();
		expect(show).not.toBeTruthy();
	});

	test('slots: triggerEl & contentEl', async () => {
		//@ts-ignore
		const instance = new KPopoverSlots({
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

	test('events: change', async () => {
		let show = false;
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KPopoverChange({
			target: host
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('change', (e) => {
			show = e.detail;
			mockFn();
		});
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
