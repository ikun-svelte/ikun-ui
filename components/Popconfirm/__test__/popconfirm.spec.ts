import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KPopconfirmType from './popconfirm.type.svelte';
import KPopconfirmIcon from './popconfirm.icon.svelte';
import KPopconfirmDiabled from './popconfirm.disabled.svelte';
import KPopconfirmCancel from './popconfirm.cancel.svelte';
import KPopconfirmBtn from './popconfirm.btn.svelte';
import KPopconfirmBase from './popconfirm.base.svelte';
import KPopconfirmAsync from './popconfirm.async.svelte';
import KPopconfirmEvtCancel from './popconfirm.event.cancel.svelte';
import KPopconfirmEvtChange from './popconfirm.event.change.svelte';
import KPopconfirmEvtConfirm from './popconfirm.event.confirm.svelte';
import KPopconfirmSlotFooter from './popconfirm.slot.footer.svelte';
import KPopconfirmSlotContent from './popconfirm.slot.content.svelte';
import KPopconfirmSlotTitle from './popconfirm.slot.title.svelte';
import { tick } from 'svelte';
// TODO E2E test
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

describe('Test: KPopconfirm', () => {
	test('props: base', async () => {
		const instance = new KPopconfirmBase({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		const instance = new KPopconfirmIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host.innerHTML.includes('k-popconfirm--error')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		const instance = new KPopconfirmType({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elmInfo = host.querySelector('#test_trigger_error');
		elmInfo.click();
		const elmWarning = host.querySelector('#test_trigger_info');
		elmWarning.click();
		const elmSuccess = host.querySelector('#test_trigger_warning');
		elmSuccess.click();
		const elmError = host.querySelector('#test_trigger_success');
		elmError.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('k-popconfirm--error')).toBeTruthy();
		expect(host.innerHTML.includes('k-popconfirm--info')).toBeTruthy();
		expect(host.innerHTML.includes('k-popconfirm--warning')).toBeTruthy();
		expect(host.innerHTML.includes('k-popconfirm--success')).toBeTruthy();
	});

	test('props: disabled', async () => {
		const instance = new KPopconfirmDiabled({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人')).not.toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showCancel', async () => {
		const instance = new KPopconfirmCancel({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(host.innerHTML.includes('cancel')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: confirmBtnText & confirmBtnCls & cancelBtnText & cancelBtnCls', async () => {
		const instance = new KPopconfirmBtn({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(host.innerHTML.includes('confirmBtnText')).toBeTruthy();
		expect(host.innerHTML.includes('confirmBtnCls')).toBeTruthy();
		expect(host.innerHTML.includes('cancelBtnText')).toBeTruthy();
		expect(host.innerHTML.includes('cancelBtnCls')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: async', async () => {
		const mockFn = vi.fn();
		let data = null;
		const instance = new KPopconfirmAsync({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('confirm', (e) => {
			mockFn();
			data = e.detail;
		});
		instance.$on('cancel', (e) => {
			mockFn();
			data = e.detail;
		});
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		const btnCancel = host.querySelector('.k-button--info__ghost');
		const btnConfirm = host.querySelector('.k-button--primary__fill');
		btnConfirm.click();
		btnCancel.click();
		await tick();
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(mockFn).toBeCalledTimes(2);
		expect(data).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: change', async () => {
		const mockFn = vi.fn();
		let show = false;
		const instance = new KPopconfirmEvtChange({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('change', (e) => {
			mockFn();
			show = e.detail;
		});
		const elm = host.querySelector('#test_trigger');
		elm.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(mockFn).toBeCalledTimes(1);
		expect(show).toBeTruthy();
		const btnConfirm = host.querySelector('.k-button--primary__fill');
		btnConfirm?.dispatchEvent(
			new Event('click', {
				bubbles: true
			})
		);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(2);
		expect(show).not.toBeTruthy();
	});

	test('events: cancel', async () => {
		const mockFn = vi.fn();
		let show = null;
		const instance = new KPopconfirmEvtCancel({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('cancel', (e) => {
			mockFn();
			show = e.detail;
		});
		const elm = host.querySelector('#test_trigger');
		elm.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(mockFn).toBeCalledTimes(0);
		expect(show).not.toBeTruthy();
		const btnCancel = host.querySelector('.k-button--info__ghost');
		btnCancel?.dispatchEvent(
			new Event('click', {
				bubbles: true
			})
		);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(1);
		expect(show).toBeTruthy();
		expect((show! as { type: string }).type === 'cancel').toBeTruthy();
	});

	test('events: confirm', async () => {
		const mockFn = vi.fn();
		let show = null;
		const instance = new KPopconfirmEvtConfirm({
			target: host
		});
		expect(instance).toBeTruthy();
		instance.$on('confirm', (e) => {
			mockFn();
			show = e.detail;
		});
		const elm = host.querySelector('#test_trigger');
		elm.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('有美一人')).toBeTruthy();
		expect(
			host.innerHTML.includes('<div class="k-popconfirm--content">清扬婉兮</div>')
		).toBeTruthy();
		expect(mockFn).toBeCalledTimes(0);
		expect(show).not.toBeTruthy();
		const btnConfirm = host.querySelector('.k-button--primary__fill');
		btnConfirm?.dispatchEvent(
			new Event('click', {
				bubbles: true
			})
		);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(1);
		expect(show).toBeTruthy();
		expect((show! as { type: string }).type === 'confirm').toBeTruthy();
	});

	test('slot: title', async () => {
		const instance = new KPopconfirmSlotTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('test title')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: content', async () => {
		const instance = new KPopconfirmSlotContent({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('test content')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: footer', async () => {
		const instance = new KPopconfirmSlotFooter({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('#test_trigger');
		elm.click();
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('test footer')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
