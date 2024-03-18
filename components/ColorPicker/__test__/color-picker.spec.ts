import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KColorPicker from '../src';
import { fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';

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

describe('Test: KColorPicker', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				cls: 'k-color-picker--test'
			}
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('k-color-picker--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		//@ts-ignore
		const instanceSm = new KColorPicker({
			target: host,
			props: {
				size: 'sm'
			}
		});

		//@ts-ignore
		const instanceMd = new KColorPicker({
			target: host,
			props: {
				size: 'md'
			}
		});

		//@ts-ignore
		const instanceLg = new KColorPicker({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instanceSm).toBeTruthy();
		expect(instanceMd).toBeTruthy();
		expect(instanceLg).toBeTruthy();

		expect(host!.innerHTML.includes('k-color-picker-block-w--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-content--sm')).toBeTruthy();

		expect(host!.innerHTML.includes('k-color-picker-block-w--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-content--sm')).toBeTruthy();

		expect(host!.innerHTML.includes('k-color-picker-block-w--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-content--sm')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showText', async () => {
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				value: '#1677FF',
				defaultValue: '#1677FF',
				format: 'hex',
				showText: true
			}
		});

		expect(instance).toBeTruthy();
		const textEl = host.querySelector('.k-color-picker-txt');
		expect(textEl!.innerHTML === '#1677ffff').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const mockFn = vi.fn()
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				value: '#1677FF',
				defaultValue: '#1677FF',
				format: 'hex',
				disabled: true
			}
		});

		expect(instance).toBeTruthy();
		await tick();
		//@ts-ignore
		instance.$on('openChange', mockFn);
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).not.toBeCalled();
		expect(host!.innerHTML.includes('k-color-picker-trigger--disabled')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-w--disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: defaultValue & defaultValue', async () => {
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				value: '#1677FF',
				defaultValue: '#1677FF',
				format: 'hex',
			}
		});

		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		debugger
		expect(host.innerHTML).matchSnapshot();
	});
});
