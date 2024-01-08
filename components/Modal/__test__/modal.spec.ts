import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import { KModal } from '../src/index';
import KModalSlotfrom from './fixture/modal.slot.svelte';

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

describe('Test: KModal', () => {
	test('options: show', async () => {
		const instance = new KModal({
			target: host,
			props: {
				title: '🐔 ！！',
				show: false
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-modal--base')).not.toBeTruthy();
		instance.$set({ show: true });
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-modal--base')).toBeTruthy();
	});

	test('options: title', async () => {
		const instance = new KModal({
			target: host,
			props: {
				title: '🐔',
				show: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('🐔')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: footer', async () => {
		const instance = new KModal({
			target: host,
			props: {
				title: '🐔',
				show: true,
				footer: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-modal--footer')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: layout & center', async () => {
		const instance = new KModal({
			target: host,
			props: {
				title: '🐔',
				show: true,
				footer: true,
				layout: 'center'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-modal--footer justify-center')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: layout & right', async () => {
		const instance = new KModal({
			target: host,
			props: {
				title: '🐔',
				show: true,
				footer: true,
				layout: 'right'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-modal--footer justify-end')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger cancel event', async () => {
		const mockFn = vi.fn();
		const instance = new KModal({
			target: host,
			props: {
				footer: true,
				show: true
			}
		});
		await tick();
		instance.$on('cancel', mockFn);
		const btn = host.querySelector('.k-button--info__fill');
		btn!.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('event: should trigger confirm  event', async () => {
		const mockFn = vi.fn();
		const instance = new KModal({
			target: host,
			props: {
				footer: true,
				show: true
			}
		});
		await tick();
		instance.$on('confirm', mockFn);
		const btn = host.querySelector('.k-button--primary__fill');
		btn!.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('event: should trigger close event', async () => {
		const mockFn = vi.fn();
		const instance = new KModal({
			target: host,
			props: {
				footer: true,
				show: true
			}
		});
		await tick();
		instance.$on('close', mockFn);
		const btn = host.querySelector('.i-carbon-close');
		btn!.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('slot: custom render', async () => {
		const instance = new KModalSlotfrom({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('🐔')).toBeTruthy();
		expect(host.innerHTML.includes('💕')).toBeTruthy();
		expect(host.innerHTML.includes('🏀')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
