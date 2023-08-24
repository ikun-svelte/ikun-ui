import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import { KMsgBox } from '../src/index';
import KMsgBoxTitle from './message-box.title.svelte';
import KMsgBoxContent from './message-box.content.svelte';

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

describe('Test: KMsgBox', () => {
	test('options: emoType & info', async () => {
		KMsgBox.confirm<string, string>({
			content: 'content',
			title: 'title',
			target: host,
			emoType: 'info'
		});
		await tick();
		expect(host.innerHTML.includes('k-msg-box--info')).toBeTruthy();
	});

	test('options: emoType & error', async () => {
		KMsgBox.confirm<string, string>({
			content: 'content',
			title: 'title',
			target: host,
			emoType: 'error'
		});
		await tick();
		expect(host.innerHTML.includes('k-msg-box--error')).toBeTruthy();
	});

	test('options: emoType & warning', async () => {
		KMsgBox.confirm<string, string>({
			content: 'content',
			title: 'title',
			target: host,
			emoType: 'warning'
		});
		await tick();
		expect(host.innerHTML.includes('k-msg-box--warning')).toBeTruthy();
	});

	test('options: emoType & success', async () => {
		KMsgBox.confirm<string, string>({
			content: 'content',
			title: 'title',
			target: host,
			emoType: 'success'
		});
		await tick();
		expect(host.innerHTML.includes('k-msg-box--success')).toBeTruthy();
	});

	test('options: onConfirm', async () => {
		const mockFn = vi.fn();
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			onConfirm() {
				mockFn();
			}
		});
		await tick();
		const btn = host.getElementsByTagName('button')[1];
		btn.click();
		expect(mockFn).toBeCalled();
	});

	test('options: onCancel', async () => {
		const mockFn = vi.fn();
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			onCancel() {
				mockFn();
			}
		});
		await tick();
		const btn = host.getElementsByTagName('button')[0];
		btn.click();
		expect(mockFn).toBeCalled();
	});

	test('options: confirmBtnText', async () => {
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			confirmBtnText: '🏀'
		});
		await tick();
		const btn = host.getElementsByTagName('button')[1];
		expect(btn.innerHTML.trim()).toBe('🏀');
	});

	test('options: cancelBtnText', async () => {
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			cancelBtnText: '🏀'
		});
		await tick();
		const btn = host.getElementsByTagName('button')[0];
		expect(btn.innerHTML.trim()).toBe('🏀');
	});

	test('options: cancelBtnCls', async () => {
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			cancelBtnCls: '🏀'
		});
		await tick();
		const btn = host.getElementsByTagName('button')[0];
		expect(btn.getAttribute('class')?.includes('🏀')).toBeTruthy();
	});

	test('options: confirmBtnCls', async () => {
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			confirmBtnCls: '🏀'
		});
		await tick();
		const btn = host.getElementsByTagName('button')[1];
		expect(btn.getAttribute('class')?.includes('🏀')).toBeTruthy();
	});

	test('options: layout', async () => {
		KMsgBox<string, string>({
			target: host,
			title: '🐔 ！！',
			content: 'just because you are so beautiful',
			layout: 'center'
		});
		await tick();
		expect(host.innerHTML.includes('k-msg-box--footer justify-center')).toBeTruthy();
	});

	test('options: title is string', async () => {
		KMsgBox({
			target: host,
			title: 'bar'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('bar')).toBeTruthy();
	});

	test('options: title is svelte component', async () => {
		KMsgBox({
			target: host,
			title: KMsgBoxTitle
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('message_box_title')).toBeTruthy();
	});

	test('options: content is string', async () => {
		KMsgBox({
			target: host,
			content: 'foo'
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('foo')).toBeTruthy();
	});

	test('options: content is svelte component', async () => {
		KMsgBox({
			target: host,
			content: KMsgBoxContent
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('message_box_content')).toBeTruthy();
	});

	test('options: inputValidator & inputErrorMessage', async () => {
		let rV: boolean | undefined = undefined;
		let vV: string | undefined = undefined;
		KMsgBox.prompt({
			target: host,
			title: 'KMsgBox.prompt title',
			content: 'KMsgBox.prompt info',
			inputErrorMessage: 'Invalid input',
			inputValidator: /^\d+$/,
			onConfirm(r, v) {
				rV = r;
				vV = v;
			}
		});
		await tick();
		expect(!host.innerHTML.includes('Invalid input')).toBeTruthy();
		const btns = host.getElementsByTagName('button');
		btns[1].click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('Invalid input')).toBeTruthy();
		expect(rV).toBe(false);
		expect(vV).toBe('');

		const input = host.getElementsByTagName('input');
		input[0].value = 'bar';
		input[0].dispatchEvent(new window.Event('input', { bubbles: true }));
		await tick();
		btns[1].click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('Invalid input')).toBeTruthy();
		expect(rV).toBe(false);
		expect(vV).toBe('');

		input[0].value = 1;
		input[0].dispatchEvent(new window.Event('input', { bubbles: true }));
		await tick();
		btns[1].click();
		await tick();
		expect(rV).toBe(true);
		expect(vV).toBe('1');
	});

	test('api: confirm', async () => {
		KMsgBox.confirm({
			target: host,
			title: 'KMsgBox.confirm title',
			content: 'KMsgBox.confirm info'
		});
		await tick();
		expect(host.innerHTML.includes('KMsgBox.confirm title')).toBeTruthy();
		expect(host.innerHTML.includes('KMsgBox.confirm info')).toBeTruthy();
		const btns = host.getElementsByTagName('button');
		expect(btns.length).toBe(2);
		expect(btns[0].innerHTML.trim()).toBe('cancel');
		expect(btns[1].innerHTML.trim()).toBe('confirm');
	});

	test('api: alert', async () => {
		KMsgBox.alert({
			target: host,
			title: 'KMsgBox.alert title',
			content: 'KMsgBox.alert info'
		});
		await tick();
		expect(host.innerHTML.includes('KMsgBox.alert title')).toBeTruthy();
		expect(host.innerHTML.includes('KMsgBox.alert info')).toBeTruthy();
		const btns = host.getElementsByTagName('button');
		expect(btns.length).toBe(1);
		expect(btns[0].innerHTML.trim()).toBe('confirm');
	});

	test('api: prompt', async () => {
		KMsgBox.prompt({
			target: host,
			title: 'KMsgBox.prompt title',
			content: 'KMsgBox.prompt info'
		});
		await tick();
		expect(host.innerHTML.includes('KMsgBox.prompt title')).toBeTruthy();
		expect(host.innerHTML.includes('KMsgBox.prompt info')).toBeTruthy();
		const btns = host.getElementsByTagName('button');
		expect(btns.length).toBe(2);
		expect(btns[0].innerHTML.trim()).toBe('cancel');
		expect(btns[1].innerHTML.trim()).toBe('confirm');
	});
});
