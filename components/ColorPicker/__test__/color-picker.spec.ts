import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KColorPicker from '../src';
import { fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import KCPSlotText from './fixtrue/slot.text.svelte';
import KCPSlotDefault from './fixtrue/slot.default.svelte';
import KCPSlotTitle from './fixtrue/slot.title.svelte';
import KCPSlotPreset from './fixtrue/slot.preset.svelte';
import KCPEventFormatChange from './fixtrue/event.formatChange.svelte';
import KCPControl from './fixtrue/control.svelte';
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
		await vi.advanceTimersByTimeAsync(500);
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
		expect(host!.innerHTML.includes('k-color-picker-block-content--sm')).toBeTruthy();

		expect(host!.innerHTML.includes('k-color-picker-block-w--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-content--md')).toBeTruthy();

		expect(host!.innerHTML.includes('k-color-picker-block-w--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker-block-content--lg')).toBeTruthy();
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
		await vi.advanceTimersByTimeAsync(500);

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
		await vi.advanceTimersByTimeAsync(500);

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
		await vi.advanceTimersByTimeAsync(500);

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
		await vi.advanceTimersByTimeAsync(500);
		const labelEl = host.querySelector('.k-color-picker-preset--label');
		const checkBoxs = host.querySelectorAll('.k-checkbox--box');
		expect(labelEl!.innerHTML.includes('primary')).toBeTruthy();
		expect(checkBoxs.length).toBe(10);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: text', async () => {
		//@ts-ignore
		const instance = new KCPSlotText({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: default', async () => {
		//@ts-ignore
		const instance = new KCPSlotDefault({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: title', async () => {
		//@ts-ignore
		const instance = new KCPSlotTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: preset', async () => {
		//@ts-ignore
		const instance = new KCPSlotPreset({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: formatChange', async () => {
		//@ts-ignore
		const instance = new KCPEventFormatChange({
			target: host
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		const resDom = host.querySelector('#format_test');
		expect(resDom.innerHTML).toBe('hsv');
		expect(host.innerHTML.includes('hsv(211, 59%, 100%)')).toBeTruthy();

		const formatTrigger = host.querySelector('.k-dropdown');
		await fireEvent.click(formatTrigger);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const formatItems = host.querySelectorAll('.k-dropdown-item');
		await fireEvent.click(formatItems[0]);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(resDom.innerHTML).toBe('rgb');
		expect(host.innerHTML.includes('rgb(105, 177, 255)')).toBeTruthy();

		await fireEvent.click(formatItems[1]);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(resDom.innerHTML).toBe('hex');
		expect(host.innerHTML.includes('#69b1ffff')).toBeTruthy();

		await fireEvent.click(formatItems[2]);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(resDom.innerHTML).toBe('hsv');
		expect(host.innerHTML.includes('hsv(211, 59%, 100%)')).toBeTruthy();
	});

	test('events: openChange', async () => {
		let open = false;
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KColorPicker({
			target: host
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('openChange', (e: CustomEvent) => {
			mockFn();
			open = e.detail;
		});
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalled();
		expect(open).toBeTruthy();
	});

	test('events: clear', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KColorPicker({
			target: host,
			props: {
				allowClear: true,
				value: '#1677FF',
				defaultValue: '#1677FF',
				format: 'hex'
			}
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('clear', () => {
			mockFn();
		});
		const btn = host.querySelector('[slot="triggerEl"]');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const alphaInput = host.querySelector('[type="number"]');
		expect(alphaInput.value).toBe('100');

		const block = host.querySelector('.k-color-picker-block-content');
		const blockMd = host.querySelector('.k-color-picker-block-content--md');
		expect(block !== blockMd).toBeTruthy();
		expect(block.style.backgroundColor).toBe('rgb(22, 119, 255)');
		expect(blockMd.style.backgroundColor).toBe('rgb(22, 119, 255)');

		const thumbs = host.querySelectorAll('.k-color-picker-slider--thumb');
		expect(thumbs[1].style.backgroundColor).toBe('rgb(22, 119, 255)');
		expect(thumbs[1].style.left).toBe('100%');

		const clear = host.querySelector('.k-color-picker-clear');
		await fireEvent.click(clear);
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(alphaInput.value).toBe('0');
		expect(block.style.backgroundColor).toBe('rgba(22, 119, 255, 0)');
		expect(blockMd.style.backgroundColor).toBe('rgba(22, 119, 255, 0)');
		expect(thumbs[1].style.backgroundColor).toBe('rgba(22, 119, 255, 0)');
		expect(thumbs[1].style.left).toBe('0%');
		expect(mockFn).toBeCalled();
	});

	test('apis: handleOpen & handleClose', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KCPControl({
			target: host
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('trigger', mockFn);
		const btn = host.querySelector('#open');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(mockFn).toBeCalledTimes(1);
		expect(host.innerHTML).matchSnapshot();
		const close = host.querySelector('#close');
		await fireEvent.click(close);
		await tick();
		await vi.advanceTimersByTimeAsync(500);
		expect(mockFn).toBeCalledTimes(2);
	});
	// TODO: events change unit test
	// TODO: events changeComplete unit test
});
