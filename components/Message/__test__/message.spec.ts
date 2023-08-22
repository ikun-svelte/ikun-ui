import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import { KMessage, MessageComponent } from '../src/index';
import KMessageContent from './message.content.svelte';

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
	KMessage.clearAll();
});

describe('Test: KMessage', () => {
	test('options: type', async () => {
		KMessage<string>({
			content: 'normal',
			target: host
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		host.remove();
		initHost();

		await tick();

		KMessage({
			content: 'normal',
			target: host,
			type: 'error'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--error')).toBeTruthy();

		host.remove();
		initHost();

		await tick();

		KMessage({
			content: 'normal',
			target: host,
			type: 'warning'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--warning')).toBeTruthy();

		host.remove();
		initHost();

		await tick();

		KMessage({
			content: 'normal',
			target: host,
			type: 'success'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--success')).toBeTruthy();

		host.remove();
		initHost();

		await tick();

		KMessage({
			content: 'normal',
			target: host,
			type: 'info'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--info')).toBeTruthy();
	});

	test('options: close', async () => {
		KMessage({
			target: host,
			close: true
		});
		await tick();
		await vi.advanceTimersByTimeAsync(150);
		expect(host.innerHTML.includes('i-carbon-close')).toBeTruthy();
	});

	test('options: autoClose', async () => {
		KMessage({
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
		KMessage({
			target: host,
			onClose: mockFn
		});
		await tick();
		const btn = host.children[0].children[0].children[0].children[0];
		btn.dispatchEvent(new window.Event('click', { bubbles: true }));
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('options: duration', async () => {
		KMessage({
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
		KMessage({
			target: host,
			offset: 300
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('top: 320px; left: calc(50% - 0px);')).toBeTruthy();
	});

	test('options: content is string', async () => {
		KMessage({
			target: host,
			content: 'bar'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('bar')).toBeTruthy();
	});

	test('options: content is svelte component', async () => {
		KMessage({
			target: host,
			content: KMessageContent
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('message_content')).toBeTruthy();
	});

	test('api: clear', async () => {
		const inst = KMessage({
			target: host,
			content: 'KMessageContent'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		KMessage.clear(inst as MessageComponent);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-notification--base')).not.toBeTruthy();
	});

	test('api: clearAll', async () => {
		KMessage({
			target: host,
			content: 'KMessageContent1'
		});
		KMessage({
			target: host,
			content: 'KMessageContent2'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KMessageContent1')).toBeTruthy();
		expect(host.innerHTML.includes('KMessageContent2')).toBeTruthy();
		KMessage.clearAll();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KMessageContent1')).not.toBeTruthy();
		expect(host.innerHTML.includes('KMessageContent2')).not.toBeTruthy();
	});

	test('api: update', async () => {
		const inst = KMessage({
			target: host,
			content: 'KMessageContent test update'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KMessageContent test update')).toBeTruthy();
		KMessage.update<string>(inst as MessageComponent, {
			content: 'KMessageContent test change'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KMessageContent test change')).toBeTruthy();
	});

	test('api: info', async () => {
		KMessage.info({
			target: host,
			content: 'KMessageContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--info')).toBeTruthy();
	});

	test('api: warning', async () => {
		KMessage.warning({
			target: host,
			content: 'KMessageContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--warning')).toBeTruthy();
	});

	test('api: success', async () => {
		KMessage.success({
			target: host,
			content: 'KMessageContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--success')).toBeTruthy();
	});

	test('api: error', async () => {
		KMessage.error({
			target: host,
			content: 'KMessageContent'
		});
		await tick();
		expect(host.innerHTML.includes('k-notification--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-notification--icon--error')).toBeTruthy();
	});
});
