import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KContextmenuBase from './fixture/contextmenu.base.svelte';
import KContextmenuDisabled from './fixture/contextmenu.disabled.svelte';
import KContextmenuItemDisabled from './fixture/contextmenu.item.disabled.svelte';
import KContextmenuItemDivider from './fixture/contextmenu.item.divider.svelte';
import KContextmenuSub from './fixture/contextmenu.sub.svelte';
import KContextmenuSubDisabled from './fixture/contextmenu.sub.disabled.svelte';
import KContextmenuEvt from './fixture/contextmenu.event.contextmenu.svelte';
import KContextmenuEvtChange from './fixture/contextmenu.event.change.svelte';
import { tick } from 'svelte';

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
	vi.restoreAllMocks();
});

describe('Test: KContextmenu', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('base render', async () => {
		const instance = new KContextmenuBase({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 3).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KContextmenuDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 0).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: item disabled', async () => {
		const instance = new KContextmenuItemDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 3).toBeTruthy();
		expect(host.innerHTML.includes('k-contextmenu-item__disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: item divider', async () => {
		const instance = new KContextmenuItemDivider({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 3).toBeTruthy();
		expect(host.innerHTML.includes('k-contextmenu-item__divider')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: sub menu', async () => {
		const instance = new KContextmenuSub({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 3).toBeTruthy();
		expect(host.innerHTML.includes('<span>contextmenu-sub-title</span>')).toBeTruthy();
		expect(host.innerHTML.includes('options 4')).not.toBeTruthy();
		const submenu = host.querySelector('.k-contextmenu-sub-menu--base');
		submenu!.dispatchEvent(new Event('mouseenter', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('options 4')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: sub menu disabled', async () => {
		const instance = new KContextmenuSubDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-contextmenu-item').length === 3).toBeTruthy();
		expect(host.innerHTML.includes('<span>contextmenu-sub-title</span>')).toBeTruthy();
		expect(host.innerHTML.includes('options 4')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-contextmenu-sub-menu__disabled')).toBeTruthy();
		const submenu = host.querySelector('.k-contextmenu-sub-menu--base');
		submenu!.dispatchEvent(new Event('mouseenter', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('options 4')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: contextmenu', async () => {
		const mockFn = vi.fn();
		const instance = new KContextmenuEvt({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('contextmenu', () => {
			mockFn();
		});
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalled();
	});

	test('events: change', async () => {
		const mockFn = vi.fn();
		const instance = new KContextmenuEvtChange({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('change', () => {
			mockFn();
		});
		const container = host.children[0];
		container.dispatchEvent(new Event('contextmenu', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		document.body.dispatchEvent(new Event('click', { bubbles: true }));
		expect(mockFn).toBeCalled();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(2);
	});
});
