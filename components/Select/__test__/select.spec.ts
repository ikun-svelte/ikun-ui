import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KSelect from '../src';
import KSelectValue from './select.value.svelte';
import KSelectValueObj from './select.object.svelte';
import KSelectSlots from './select.slots.svelte';

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

describe('Test: KSelect', () => {
	test('props: value', async () => {
		const instance = new KSelectValue({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const selectElm = host.getElementsByTagName('input')[0] as HTMLSelectElement;
		expect(selectElm).not.toBeNull();
		expect(selectElm.value).toBe('Normal');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value & object', async () => {
		const instance = new KSelectValueObj({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const selectElm = host.getElementsByTagName('input')[0] as HTMLSelectElement;
		expect(selectElm).not.toBeNull();
		expect(selectElm.value).toBe('foo8');
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
		expect(host.innerHTML.includes('placeholder="绣面芙蓉一笑开"')).toBeTruthy();
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
		expect(host.innerHTML.includes('k-select--base__disabled__dark')).toBeTruthy();
		expect(host.innerHTML.includes('k-select--inner__disabled__dark')).toBeTruthy();
		instance.$set({
			disabled: false
		});
		await tick();
		expect(host.innerHTML.includes('k-select--base__disabled')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-select--base__disabled__dark')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-select--inner__disabled__dark')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
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
