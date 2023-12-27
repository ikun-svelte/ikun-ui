import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KInputNumber from '../src';
import { tick } from 'svelte';
import KInputNumberAppend from './fixture/append.svelte';

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

describe('Test: KInputNumber', () => {
	test('props: size', async () => {
		const sizes = ['sm', 'md', 'lg'];
		for (const size of sizes) {
			host.remove();
			initHost();
			// @ts-ignore
			const instance = new KInputNumber({
				target: host,
				props: {
					size
				}
			});
			expect(instance).toBeTruthy();
			expect(host!.innerHTML.includes(`k-input-number__${size}`)).toBeTruthy();
			expect(host!.innerHTML.includes(`k-input--icon__${size}`)).toBeTruthy();
			expect(host.innerHTML).matchSnapshot();
		}
	});

	test('props: value', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value: 6
			}
		});
		expect(instance).toBeTruthy();
		const inputElem = host.getElementsByTagName('input')[0];
		expect(inputElem.value).toBe('6');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: placeholder', async () => {
		const placeholder = '我见青山多妩媚，料青山见我应如是';
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				placeholder
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.placeholder).toEqual(placeholder);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: id', async () => {
		const id = '我见青山多妩媚，料青山见我应如是';
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				id
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.id).toEqual(id);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: name', async () => {
		const name = '我见青山多妩媚，料青山见我应如是';
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				name
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.name).toEqual(name);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: readonly', async () => {
		const readonly = true;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				readonly,
				value: null
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.hasAttribute('readonly')).toBeTruthy();
		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		expect(inputElm.value).toBe('');
		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		expect(inputElm.value).toBe('');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: min', async () => {
		let value: null | number = null;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				min: 2
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('');
		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2');
		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2');
		inputElm.value = 1;
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('2');
		expect(value).toBe(2);
	});

	test('props: max', async () => {
		let value: null | number = 4;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				max: 2
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('4');

		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2');

		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2');

		inputElm.value = 3;
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('2');
		expect(value).toBe(2);
	});

	test('props: precision', async () => {
		let value: null | number = 4;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				precision: 2
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('4.00');

		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(3);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('3.00');

		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(4);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('4.00');

		inputElm.value = '5';
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('5.00');
		expect(value).toBe(5);
	});

	test('props: step', async () => {
		let value: null | number = 4;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				precision: 2,
				step: 2
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('4.00');

		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2.00');

		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(4);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('4.00');

		inputElm.value = '5';
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('5.00');
		expect(value).toBe(5);

		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(7);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('7.00');
	});

	test('props: stepStrictly', async () => {
		let value: null | number = 4;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				precision: 2,
				step: 2,
				stepStrictly: true
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('4.00');

		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('2.00');

		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(4);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('4.00');

		inputElm.value = '5';
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('6.00');
		expect(value).toBe(6);

		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(8);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('8.00');
	});

	test('props: valueOnClear', async () => {
		let value: null | number = null;
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				precision: 2,
				step: 2,
				valueOnClear: 999
			}
		});
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.value).toBe('');

		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(-2);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('-2.00');

		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(value).toBe(0);
		// @ts-ignore
		instance.$set({ value });
		expect(inputElm.value).toBe('0.00');

		inputElm.value = '';
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(inputElm.value).toBe('999.00');
		expect(value).toBe(999);
	});

	test('props: disabled', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.disabled).not.toBeNull();
		const upElm = host.querySelector('.k-input-number--up');
		upElm.click();
		await tick();
		expect(inputElm.value).toBe('');
		const downElm = host.querySelector('.k-input-number--down');
		downElm.click();
		await tick();
		expect(inputElm.value).toBe('');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: controls', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				controls: false
			}
		});
		expect(instance).toBeTruthy();
		const controlsElm = host.querySelector('.k-input-number--controls');
		expect(controlsElm).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: prepend', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				prepend: 'i-carbon-logo-svelte'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('i-carbon-logo-svelte')).toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__right')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: append', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				append: 'i-carbon-logo-svelte'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('i-carbon-logo-svelte')).toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__left')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: append & prepend', async () => {
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				append: 'i-carbon-logo-svelte',
				prepend: 'i-carbon-logo-vue'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('i-carbon-logo-svelte')).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-logo-vue')).toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__left')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__left')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger input event', async () => {
		let value = 2;
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
			mockFn();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 4;
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(value).toBe(4);
	});

	test('event: should trigger enter event when pressing enter', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
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
		const instance = new KInputNumber({
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
		let value = 0;
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
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
		inputElm.value = 4;
		inputElm.dispatchEvent(new Event('change'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(inputElm).toBeTruthy();
		expect(value).toEqual('4');
	});

	test('event: should trigger blur event', async () => {
		let value = 0;
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('blur', (v) => {
			value = v.detail.target.value;
			mockFn();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 4;
		inputElm.dispatchEvent(new Event('blur'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(inputElm).toBeTruthy();
		expect(value).toEqual('4');
	});

	test('event: should trigger focus event', async () => {
		let value = 0;
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('focus', (v) => {
			value = v.detail.target.value;
			mockFn();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 4;
		inputElm.dispatchEvent(new Event('focus'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(inputElm).toBeTruthy();
		expect(value).toEqual('4');
	});

	test('event: should not trigger event when disabled', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		// @ts-ignore
		instance.$on('input', mockFn);
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

	test('event: should trigger prepend & append click', async () => {
		let value = '';
		let valueClick = '';
		const mockFn = vi.fn();
		const mockFnClick = vi.fn();
		// @ts-ignore
		const instance = new KInputNumber({
			target: host,
			props: {
				value,
				append: 'i-carbon-logo-svelte',
				prepend: 'i-carbon-logo-vue'
			}
		});
		await tick();
		// @ts-ignore
		instance.$on('input', (v) => {
			value = v.detail;
			mockFn();
		});
		// @ts-ignore
		instance.$on('triggerPrepend', (v) => {
			valueClick = v.detail;
			mockFnClick();
		});
		// @ts-ignore
		instance.$on('triggerAppend', (v) => {
			valueClick = v.detail;
			mockFnClick();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 4;
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(value).toBe(4);
		const btnAppend = host.querySelector('.k-input--append');
		const btnPrepend = host.querySelector('.k-input--prepend');
		btnAppend.click();
		await tick();
		expect(mockFnClick).toBeCalled();
		expect(valueClick).toBe(4);
		valueClick = '';
		btnPrepend.click();
		await tick();
		expect(mockFnClick).toBeCalledTimes(2);
		expect(valueClick).toBe(4);
	});

	test('slot: prepend and append', async () => {
		// @ts-ignore
		const instance = new KInputNumberAppend({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-logo-svelte')).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-logo-vue')).toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__left')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded__left')).not.toBeTruthy();
		expect(host.innerHTML.includes('k-input__rounded')).not.toBeTruthy();
	});
});
