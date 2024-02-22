import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KAutoComplete from '../src';
import { tick } from 'svelte';
import KAutoCompleteFit from './fixture/autocomplete.fit.svelte';
import KAutoCompleteBasic from './fixture/autocomplete.basic.svelte';
import KAutoCompleteClear from './fixture/autocomplete.clear.svelte';
import KAutoCompleteDisabled from './fixture/autocomplete.disabled.svelte';
import KAutoCompleteSlot from './fixture/autocomplete.slot.svelte';
import KAutoCompleteDefault from './fixture/autocomplete.default.svelte';
let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KAutoComplete', () => {
	test('props: cls', async () => {
		const instance = new KAutoComplete({
			target: host,
			props: {
				cls: 'k-auto-complete--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-auto-complete--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
	test('props: value', async () => {
		const instance = new KAutoComplete({
			target: host,
			props: {
				value: 'svelte'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const selectElm = host.getElementsByTagName('input')[0] as HTMLInputElement;
		expect(selectElm).not.toBeNull();
		expect(selectElm.value).toBe('svelte');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: placeholder', async () => {
		const instance = new KAutoComplete({
			target: host,
			props: {
				placeholder: '绣面芙蓉一笑开'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('placeholder="绣面芙蓉一笑开"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instanceSm = new KAutoComplete({
			target: host,
			props: {
				size: 'sm'
			}
		});
		const instanceMd = new KAutoComplete({
			target: host,
			props: {
				size: 'md'
			}
		});
		const instanceLg = new KAutoComplete({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instanceSm).toBeTruthy();
		expect(instanceMd).toBeTruthy();
		expect(instanceLg).toBeTruthy();
		await tick();
		const selectElms = document.querySelectorAll('.k-input--base');
		expect(selectElms[0].className.includes('k-input__sm')).toBeTruthy();
		expect(selectElms[1].className.includes('k-input__md')).toBeTruthy();
		expect(selectElms[2].className.includes('k-input__lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: fitInputWidth', async () => {
		const instance = new KAutoCompleteFit({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('.k-input--inner');
		(triggerEl as HTMLElement)?.dispatchEvent(new Event('input'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-select--option__fit')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: clearable', async () => {
		const instance = new KAutoCompleteClear({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const triggerEl = host.querySelector('.k-input--inner');
		expect(triggerEl.value === 'vue').toBeTruthy();
		const clearEl = host.querySelector('.k-input--clear-icon');
		(clearEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(triggerEl.value === 'vue').not.toBeTruthy();
	});

	test('basic functional testing', async () => {
		const instance = new KAutoCompleteBasic({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('.k-input--inner');
		(triggerEl as HTMLElement)?.dispatchEvent(new Event('input', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const options = host.querySelector('[data-kv-key="vue-router"]').children[0];
		options.click();
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(triggerEl.value === 'vue-router').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KAutoCompleteDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('.k-input--inner');
		(triggerEl as HTMLElement)?.dispatchEvent(new Event('input', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const options = host.querySelector('[data-kv-key="vue-router"]');
		expect(options).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: prefix and suffix', async () => {
		const instance = new KAutoCompleteSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		const instance = new KAutoCompleteDefault({
			target: host
		});
		expect(instance).toBeTruthy();
		const triggerEl = host.querySelector('.k-input--inner');
		(triggerEl as HTMLElement)?.dispatchEvent(new Event('input', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger composition input event', async () => {
		let value = '';
		const mockCompositionInputFn = vi.fn();
		const mockCompositionStart = vi.fn();
		const mockCompositionEnd = vi.fn();
		// @ts-ignore
		const instance = new KAutoComplete({
			target: host,
			props: {
				value,
				useCompositionInput: true
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('compositionstart', () => {
			mockCompositionStart();
		});
		// @ts-ignore
		instance.$on('compositionend', () => {
			mockCompositionEnd();
		});
		// @ts-ignore
		instance.$on('compositionInput', (v) => {
			value = v.detail;
			mockCompositionInputFn();
		});

		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 'ikun';
		inputElm.dispatchEvent(new Event('compositionstart'));
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockCompositionStart).toBeCalled();
		expect(mockCompositionInputFn.mock.calls.length).toBe(0);
		expect(value).toBe('');

		inputElm.value = 'ikun ikun';
		inputElm.dispatchEvent(new Event('compositionend'));
		await tick();
		expect(mockCompositionEnd).toBeCalled();
		expect(mockCompositionInputFn.mock.calls.length).toBe(1);
		expect(value).toBe('ikun ikun');
	});

	test('event: should trigger enter event when pressing enter', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KAutoComplete({
			target: host
		});
		await tick();
		// @ts-ignore
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(
			// @ts-ignore
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'Enter',
				code: 'Enter'
			})
		);
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('event: should trigger keydown event when not pressing enter', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KAutoComplete({
			target: host
		});
		await tick();
		// @ts-ignore
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(
			// @ts-ignore
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'A',
				code: 'KeyA'
			})
		);
		await tick();
		expect(mockFn).not.toBeCalled();
	});

	test('event: should trigger change event', async () => {
		let value = '';
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KAutoComplete({
			target: host,
			props: {
				value
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('change', (v) => {
			value = v.detail.target.value;
			mockFn();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 'ikun';
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(inputElm).toBeTruthy();
		expect(value).toEqual('ikun');
	});

	test('event: should not trigger event when disabled', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KAutoComplete({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		// @ts-ignore
		instance.$on('change', mockFn);
		// @ts-ignore
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(new Event('input'));
		inputElm.dispatchEvent(
			// @ts-ignore
			new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 'Enter',
				code: 'KeyEnter'
			})
		);
		inputElm.value = 'ikun';

		inputElm.dispatchEvent(new Event('change'));
		await tick();
		expect(mockFn).not.toBeCalled();
	});
});
