import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import { fireEvent } from '@testing-library/svelte';
import KDropdown from '../src';
import KDropdownDisabled from './fixture/disabled.svelte';
import KDropdownMaxHeight from './fixture/maxHeight.svelte';
import KDropdownSlots from './fixture/slots.svelte';
import KDropdownChange from './fixture/change.svelte';
import KDropdownOpen from './fixture/handleOpen.svelte';
import KDropdownItemDisabled from './fixture/disabledItem.svelte';
import KDropdownItemDivider from './fixture/divider.svelte';
import KDropdownItemCommand from './fixture/command.svelte';
import { tick } from 'svelte';
let host: any;

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
	vi.restoreAllMocks();
});

describe('Test: KDropdown', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KDropdown({
			target: host,
			props: {
				cls: 'k-dropdown--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-dropdown--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		// @ts-ignore
		const instance = new KDropdownDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('k-cur-disabled k-button--disabled')).toBeTruthy();
		expect(host!.innerHTML.includes('白发三千丈')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: maxHeight', async () => {
		// @ts-ignore
		const instance = new KDropdownMaxHeight({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('k-scrollbar')).toBeTruthy();
		expect(host!.innerHTML.includes('max-height: 10px')).toBeTruthy();
		expect(host!.innerHTML.includes('白发三千丈')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	// TODO: props: hideOnClick test

	test('events: change', async () => {
		let show = false;
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KDropdownChange({
			target: host
		});
		// @ts-ignore
		instance.$on('change', (v) => {
			mockFn();
			show = v.detail;
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(show).toBeTruthy();
		expect(mockFn).toBeCalledTimes(1);
		await fireEvent.click(host);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(show).not.toBeTruthy();
		expect(mockFn).toBeCalledTimes(2);
	});

	test('slots: default and dropdown', async () => {
		// @ts-ignore
		const instance = new KDropdownSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('KDropdown_id')).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('白发三千丈')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('api: handleOpen', async () => {
		// @ts-ignore
		const instance = new KDropdownOpen({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('KDropdown_id')).toBeTruthy();
		expect(host!.innerHTML.includes('白发三千丈')).not.toBeTruthy();
		const btn = host.querySelector('#handle_open');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('白发三千丈')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	// TODO: api: handleClose test
});

describe('Test: KDropdown', () => {
	test('props: disabled', async () => {
		// @ts-ignore
		const instance = new KDropdownItemDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('白发三千丈')).toBeTruthy();
		expect(host!.innerHTML.includes('k-dropdown-item__disabled')).toBeTruthy();
		expect(host!.innerHTML.includes('k-dropdown-item__disabled__dark')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: divider', async () => {
		// @ts-ignore
		const instance = new KDropdownItemDivider({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('白发三千丈')).toBeTruthy();
		expect(host.querySelectorAll('.k-dropdown-item').length).toBe(2);
		expect(
			host.querySelectorAll('.k-dropdown-item')[1] ===
				host.querySelector('.k-dropdown-item__divider')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('KDropdownItem props command and KDropdown command event', async () => {
		let value = '';
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KDropdownItemCommand({
			target: host
		});
		// @ts-ignore
		instance.$on('command', (v) => {
			mockFn();
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const btnItem = host.querySelector('[data-testid="k_dropdown__item"]');
		await fireEvent.click(btnItem);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(1);
		expect(value === '白发三千丈').toBeTruthy();
	});
});
