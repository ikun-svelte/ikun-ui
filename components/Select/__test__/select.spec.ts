import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KSelect from '../src';
import KSelectValue from './select.value.svelte';
import KSelectValueObj from './select.object.svelte';
import KSelectSlots from './select.slots.svelte';
import KSelectClearable from './select.clearable.svelte';
import KSelectUpdated from './select.updated.svelte';
import KSelectDisabled from './select.disabled.svelte';
import KSelectCustom from './select.custom.svelte';
import KSelectString from './select.string.svelte';
import KSelectNumber from './select.number.svelte';
import KSelectFit from './select.fit.svelte';
import KSelectRemote from './select.remote.svelte';
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
		const selectElm = host.getElementsByTagName('input')[0] as HTMLInputElement;
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
		const selectElm = host.getElementsByTagName('input')[0] as HTMLInputElement;
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

	test('props: fitInputWidth', async () => {
		const instance = new KSelectFit({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('k-select--option__fit')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: remote', async () => {
		const instance = new KSelectRemote({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const contentEl = host.querySelector('[slot="contentEl"]');
		const valueEl = host.querySelector('#k_select_remote');
		expect(valueEl?.innerHTML).toBe(
			'{"label":"Connecticut","value":"Connecticut","id":"Connecticut"}'
		);
		expect(contentEl).not.toBeTruthy();
		const inputEl = triggerEl?.querySelector('input');
		inputEl.value = 'ikun';
		inputEl.dispatchEvent(new Event('input', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(host.innerHTML.includes('no data')).toBeTruthy();
		inputEl.value = 'Alabama';
		inputEl.dispatchEvent(new Event('input', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		const optionEl = host?.querySelectorAll('.k-virtual-list--item')[0].children[0];
		(optionEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(valueEl?.innerHTML).toBe('{"label":"Alabama","value":"Alabama","id":"Alabama"}');
	});

	test('props: clearable', async () => {
		const instance = new KSelectClearable({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[slot="triggerEl"]');
		const valueE = document.getElementById('k_select_clear_value');
		expect(valueE?.innerHTML).toBe('200');
		(triggerEl as HTMLElement)?.dispatchEvent(new Event('mouseenter', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const clearEl = host.querySelector('[data-k-select-clear]');
		(clearEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(valueE?.innerHTML).toBe('undefined');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: dataList as number[]', async () => {
		const instance = new KSelectNumber({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		const valueE = document.getElementById('k_select_number');
		expect(valueE?.innerHTML).toBe('1');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="5"]')?.children[0];
		(itemEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(valueE?.innerHTML).toBe('5');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: dataList as string[]', async () => {
		const instance = new KSelectString({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		const valueE = document.getElementById('k_select_string');
		expect(valueE?.innerHTML).toBe('Normal');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="Huge"]')?.children[0];
		(itemEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(valueE?.innerHTML).toBe('Huge');
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

	test('slots: custom render', async () => {
		const instance = new KSelectCustom({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('<button>Normal true</button>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger updateValue event', async () => {
		const instance = new KSelectUpdated({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		const valueE = document.getElementById('k_select_updated_value');
		expect(valueE?.innerHTML).toBe('200');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="4"]')?.children[0];
		(itemEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(valueE?.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should not trigger updateValue event when disabled', async () => {
		const instance = new KSelectDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		const triggerEl = host.querySelector('[data-popover-trigger]');
		const valueE = document.getElementById('k_select_disabled_value');
		expect(valueE?.innerHTML).toBe('200');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="4"]');
		expect(itemEl).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
