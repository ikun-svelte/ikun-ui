import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KSelect from '../src';
import KSelectValue from './select.value.svelte';
import KSelectSlots from './select.slots.svelte';

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KSelect', () => {
	test('props: value', async () => {
		const instance = new KSelectValue({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const selectElm = host.getElementsByTagName('select')[0] as HTMLSelectElement;
		expect(selectElm).not.toBeNull();
		expect(selectElm.value).toBe('Normal');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: iconPrefix and iconSuffix', async () => {
		const instance = new KSelect({
			target: host,
			props: {
				iconPrefix: 'i-carbon-logo-svelte',
				iconSuffix: 'i-carbon-search'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('i-carbon-logo-svelte')).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-search')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: placeholder', async () => {
		const instance = new KSelect({
			target: host,
			props: {
				placeholder: '绣面芙蓉一笑开'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const firstOptionElm = host.getElementsByTagName('option')[0] as HTMLOptionElement;
		expect(firstOptionElm.innerHTML.includes('绣面芙蓉一笑开')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KSelect({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-select--base__disabled')).toBeTruthy();
		instance.$set({
			disabled: false
		});
		await tick();
		expect(host.innerHTML.includes('k-select--base__disabled')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger updateValue event', async () => {
		const mockFn = vi.fn();
		const instance = new KSelect({
			target: host,
			props: {
				value: ''
			}
		});
		expect(instance).toBeTruthy();
		instance.$on('updateValue', () => {
			mockFn();
		});
		await tick();
		const selectElm = host.getElementsByTagName('select')[0] as HTMLSelectElement;
		selectElm.dispatchEvent(new Event('change'));
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('event: should not trigger updateValue event when disabled', async () => {
		const mockFn = vi.fn();
		const instance = new KSelect({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		instance.$on('updateValue', () => {
			mockFn();
		});
		await tick();
		const selectElm = host.getElementsByTagName('select')[0] as HTMLSelectElement;
		selectElm.dispatchEvent(new Event('change'));
		await tick();
		expect(mockFn).not.toBeCalled();
	});

	test('slots: prefix and suffix', async () => {
		const instance = new KSelectSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		const prefixElm = host.getElementsByClassName('prefix')[0];
		const suffixElm = host.getElementsByClassName('suffix')[0];
		expect(prefixElm).toBeTruthy();
		expect(suffixElm).toBeTruthy();
	});
});
