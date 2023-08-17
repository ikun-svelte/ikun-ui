import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import { KNotify } from '../src/index';

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
	KNotify.clearAll()
});

describe('Test: KButton', () => {
	test('options: type', async () => {
		KNotify({
			title: 'normal',
			target: host
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			title: 'normal',
			target: host,
			type: 'error'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--error')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			title: 'normal',
			target: host,
			type: 'warning'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--warning')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			title: 'normal',
			target: host,
			type: 'success'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--success')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			title: 'normal',
			target: host,
			type: 'info'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--info')).toBeTruthy();
	});

	test('options: placement', async () => {
		KNotify({
			placement: 'left-top',
			target: host
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(host.innerHTML.includes('top: 20px; left: 20px;')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			placement: 'right-top',
			target: host
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(host.innerHTML.includes('top: 20px; left: calc(100% - 20px);')).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			placement: 'right-bottom',
			target: host
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(
			host.innerHTML.includes('top: calc(100% - 20px); left: calc(100% - 20px);')
		).toBeTruthy();

		host.remove();
		initHost();
		await tick();

		KNotify({
			placement: 'left-bottom',
			target: host
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(host.innerHTML.includes('top: calc(100% - 20px); left: 20px;')).toBeTruthy();
	});

	//
	//  test('options: target', async () => {
	//
	//  });
	//
	//  test('options: close', async () => {
	//
	//  });
	//
	//  test('options: autoClose', async () => {
	//
	//  });
	//
	//  test('options: onClose', async () => {
	//
	//  });
	//
	//  test('options: duration', async () => {
	//
	//  });
	//
	//  test('options: offset', async () => {
	//
	//  });
	//
	//  test('options: title is string', async () => {
	//
	//  });
	//
	//  test('options: title is svelte component', async () => {
	//
	//  });
	//
	//  test('options: content is string', async () => {
	//
	//  });
	//
	//  test('options: content is svelte component', async () => {
	//
	//  });
	//
	//  test('api: clear', async () => {
	//
	//  });
	//
	//  test('api: clearAll', async () => {
	//
	//  });
	//
	//  test('api: update', async () => {
	//
	//  });
	//
	//  test('api: info', async () => {
	//
	//  });
	//
	//  test('api: warning', async () => {
	//
	//  });
	//
	//  test('api: success', async () => {
	//
	//  });
	//
	//  test('api: error', async () => {
	//
	//  });
});
