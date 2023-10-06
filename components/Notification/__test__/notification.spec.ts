import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import { KNotify, NotifyComponent } from '../src/index';
import KNotifyContent from './notification.content.svelte';
import KNotifyTitle from './notification.title.svelte';

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
	KNotify.clearAll();
});

describe('Test: KNotify', () => {
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

	test('options: target', async () => {
		const target = document.createElement('div');
		target.setAttribute('id', 'target');
		KNotify({
			target
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(target.innerHTML.includes('k-notification--base')).toBeTruthy();
	});

	test('options: close', async () => {
		KNotify({
			target: host,
			close: true
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(host.innerHTML.includes('i-carbon-close')).toBeTruthy();
	});

	test('options: autoClose', async () => {
		KNotify({
			target: host,
			close: true
		});
		await tick();
		await vi.advanceTimersByTimeAsync(2000);
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		await vi.advanceTimersByTimeAsync(4000);
		expect(host.innerHTML.includes('k-notification--base')).not.toBeTruthy();
	});

	test('options: onClose', async () => {
		const mockFn = vi.fn();
		const inst = KNotify({
			target: host,
			onClose: mockFn
		});
		await tick();
		const btn = host.children[0].children[0].children[0];
		btn.dispatchEvent(new window.Event('click', { bubbles: true }));
		await tick();
		KNotify.clear(inst!);
		KNotify.clear(inst!);
		KNotify.clear(inst!);
		KNotify.clear(inst!);
		await tick();
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	test('options: duration', async () => {
		KNotify({
			target: host,
			duration: 3500
		});
		await tick();
		await vi.advanceTimersByTimeAsync(3500);
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		await vi.advanceTimersByTimeAsync(1000);
		expect(host.innerHTML.includes('k-notification--base')).not.toBeTruthy();
	});

	test('options: offset', async () => {
		KNotify({
			target: host,
			offset: 300
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('top: 320px; left: calc(100% - 20px);')).toBeTruthy();
	});

	test('options: title is string', async () => {
		KNotify({
			target: host,
			title: 'foo'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('foo')).toBeTruthy();
	});

	test('options: title is svelte component', async () => {
		KNotify({
			target: host,
			title: KNotifyTitle
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('notification_title')).toBeTruthy();
	});

	test('options: content is string', async () => {
		KNotify({
			target: host,
			content: 'bar'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('bar')).toBeTruthy();
	});

	test('options: content is svelte component', async () => {
		KNotify({
			target: host,
			title: KNotifyContent
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('notification_content')).toBeTruthy();
	});

	test('api: clear', async () => {
		const inst = KNotify({
			target: host,
			title: KNotifyContent
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		KNotify.clear(inst as NotifyComponent);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-notification--base')).not.toBeTruthy();
	});

	test('api: clearAll', async () => {
		KNotify({
			target: host,
			title: 'KNotifyContent1'
		});
		KNotify({
			target: host,
			title: 'KNotifyContent2'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KNotifyContent1')).toBeTruthy();
		expect(host.innerHTML.includes('KNotifyContent2')).toBeTruthy();
		KNotify.clearAll();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KNotifyContent1')).not.toBeTruthy();
		expect(host.innerHTML.includes('KNotifyContent2')).not.toBeTruthy();
	});

	test('api: update', async () => {
		const inst = KNotify({
			target: host,
			title: 'KNotifyContent test update'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KNotifyContent test update')).toBeTruthy();
		KNotify.update(inst as NotifyComponent, {
			title: 'KNotifyContent test change'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KNotifyContent test change')).toBeTruthy();
	});

	test('api: info', async () => {
		KNotify.info({
			target: host,
			title: 'KNotifyContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--info')).toBeTruthy();
	});

	test('api: warning', async () => {
		KNotify.warning({
			target: host,
			title: 'KNotifyContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--warning')).toBeTruthy();
	});

	test('api: success', async () => {
		KNotify.success({
			target: host,
			title: 'KNotifyContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--success')).toBeTruthy();
	});

	test('api: error', async () => {
		KNotify.error({
			target: host,
			title: 'KNotifyContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--error')).toBeTruthy();
	});
});
