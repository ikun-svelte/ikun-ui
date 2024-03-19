import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KColorPicker from '../src';
import { fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import KCPSlotText from './fixtrue/slot.text.svelte';
import KCPSlotDefault from './fixtrue/slot.default.svelte';
import KCPSlotTitle from './fixtrue/slot.title.svelte';
import KCPSlotPreset from './fixtrue/slot.preset.svelte';
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
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

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
		const mockFn = vi.fn();
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
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'rgb'
			}
		});

		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);

		const inputs = host.querySelectorAll('.k-input--inner');
		expect(inputs[0].value).toBe('0');
		expect(inputs[1].value).toBe('255');
		expect(inputs[2].value).toBe('255');
		expect(inputs[3].value).toBe('50');

		const block = host.querySelector('.k-color-picker-block-content');
		const blockMd = host.querySelector('.k-color-picker-block-content--md');
		expect(block !== blockMd).toBeTruthy();
		expect(block.style.backgroundColor).toBe('rgba(0, 255, 255, 0.5)');
		expect(blockMd.style.backgroundColor).toBe('rgba(0, 255, 255, 0.5)');

		const palette = host.querySelector('.k-color-picker-palette');
		expect(palette.style.backgroundColor).toBe('rgb(0, 255, 255)');

		const thumbs = host.querySelectorAll('.k-color-picker-slider--thumb');
		expect(thumbs[1].style.backgroundColor).toBe('rgba(0, 255, 255, 0.5)');
		expect(thumbs[1].style.left).toBe('50%');
		expect(thumbs[0].style.backgroundColor).toBe('rgb(0, 255, 255)');
		expect(thumbs[0].style.left).toBe('50%');

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: allowClear', async () => {
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				allowClear: true,
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'rgb'
			}
		});

		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);

		expect(host!.innerHTML.includes('k-color-picker-clear')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: format', async () => {
		//@ts-ignore
		const instanceRGB = new KColorPicker({
			target: host,
			props: {
				showText: true,
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'rgb'
			}
		});

		//@ts-ignore
		const instanceHSV = new KColorPicker({
			target: host,
			props: {
				showText: true,
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'hsv'
			}
		});

		//@ts-ignore
		const instanceHEX = new KColorPicker({
			target: host,
			props: {
				showText: true,
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'hex'
			}
		});

		expect(instanceRGB).toBeTruthy();
		expect(instanceHSV).toBeTruthy();
		expect(instanceHEX).toBeTruthy();
		await tick();
		const txtEls = host.querySelectorAll('.k-color-picker-txt');
		expect(txtEls[0].innerHTML).toBe('rgba(0, 255, 255, 0.5)');
		expect(txtEls[1].innerHTML).toBe('hsva(180, 100%, 100%, 0.5)');
		expect(txtEls[2].innerHTML).toBe('#00ffff80');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabledAlpha', async () => {
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				disabledAlpha: true,
				value: 'rgba(0, 255, 255, 0.5)',
				defaultValue: '#00FFFF',
				format: 'rgb'
			}
		});

		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);

		expect(host.querySelectorAll('.k-input--inner').length).toBe(3);
		expect(host!.innerHTML.includes('k-color-picker--alpha')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: presets', async () => {
		const presets = [
			{
				defaultOpen: true,
				label: 'primary',
				colors: [
					'#e6f4ff',
					'#bae0ff',
					'#91caff',
					'#69b1ff',
					'#4096ff',
					'#1677ff',
					'#0958d9',
					'#003eb3',
					'#002c8c',
					'#001d66'
				]
			}
		];
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				presets,
				value: '#69b1ff',
				defaultValue: '#69b1ff',
				format: 'hex'
			}
		});

		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		const labelEl = host.querySelector('.k-color-picker-preset--label');
		const checkBoxs = host.querySelectorAll('.k-checkbox--box');
		expect(labelEl!.innerHTML.includes('primary')).toBeTruthy();
		expect(checkBoxs.length).toBe(10);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: text', async () => {
		//@ts-ignore
		const instance = new KCPSlotText({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		//@ts-ignore
		const instance = new KCPSlotDefault({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: title', async () => {
		//@ts-ignore
		const instance = new KCPSlotTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: preset', async () => {
		//@ts-ignore
		const instance = new KCPSlotPreset({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(host.innerHTML).matchSnapshot();
	});
});
