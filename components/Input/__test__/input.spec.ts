import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent } from '@testing-library/svelte';
import KInput from '../src';
import KInputSlots from './input.slots.svelte';
import KInputBindValueUpdate from './input.bind.value.update.svelte';

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

describe('Test: KInput', () => {
	test('props: value', async () => {
		const instance = new KInput({
			target: host,
			props: {
				value: 'ikun'
			}
		});
		expect(instance).toBeTruthy();
		const inputElem = host.getElementsByTagName('input')[0];
		expect(inputElem.value).toBe('ikun');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: iconPrefix', async () => {
		const instance = new KInput({
			target: host,
			props: {
				iconPrefix: 'i-carbon-logo-svelte'
			}
		});
		expect(instance).toBeTruthy();
		const icon = host.getElementsByClassName('k-input--icon')[0];
		expect(icon).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: iconSuffix', async () => {
		const instance = new KInput({
			target: host,
			props: {
				iconSuffix: 'i-carbon-search'
			}
		});
		expect(instance).toBeTruthy();
		const icon = host.getElementsByClassName('k-input--icon')[0];
		expect(icon).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: placeholder', async () => {
		const placeholder = '我见青山多妩媚，料青山见我应如是';
		const instance = new KInput({
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

	test('props: disabled', async () => {
		const instance = new KInput({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.disabled).not.toBeNull();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: cls', async () => {
		const instance = new KInput({
			target: host,
			props: {
				cls: 'ikun'
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByClassName('k-input--base')[0];
		expect(inputElm.className.includes('ikun')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: attrs', async () => {
		const objAttr = {
			name: 'KInput'
		};
		const arrAttr = ['i', 'kun'];
		const instance = new KInput({
			target: host,
			props: {
				attrs: {
					type: 'number',
					strAttr: '你干嘛,哎哟',
					numAttr: 8,
					nullAttr: null,
					undefinedAttr: undefined,
					objAttr,
					arrAttr
				}
			}
		});
		expect(instance).toBeTruthy();
		const inputElm = host.getElementsByTagName('input')[0];
		expect(inputElm.type).toBe('number');
		expect(inputElm.getAttribute('strAttr')).toBe('你干嘛,哎哟');
		expect(inputElm.getAttribute('numAttr')).toBe('8');
		expect(inputElm.getAttribute('nullAttr')).toBeNull();
		expect(inputElm.getAttribute('undefinedAttr')).toBeNull();
		expect(inputElm.getAttribute('objAttr')).not.toEqual(objAttr);
		expect(inputElm.getAttribute('objAttr')).toEqual(objAttr.toString());
		expect(inputElm.getAttribute('arrAttr')).not.toEqual(arrAttr);
		expect(inputElm.getAttribute('arrAttr')).toEqual(arrAttr.toString());
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger input event', async () => {
		let value = '';
		const mockFn = vi.fn();
		const instance = new KInput({
			target: host,
			props: {
				value
			}
		});
		await tick();
		instance.$on('input', (v) => {
			value = v.detail;
			mockFn();
		});
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.value = 'ikun';
		inputElm.dispatchEvent(new Event('input'));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
		expect(value).toBe('ikun');
	});

	test('event: should trigger composition input event', async () => {
		let value = '';
		const mockInputFn = vi.fn();
		const mockCompositionInputFn = vi.fn();
		const mockCompositionStart = vi.fn();
		const mockCompositionEnd = vi.fn();

		const instance = new KInput({
			target: host,
			props: {
				value,
				useCompositionInput: true
			}
		});
		await tick();
		instance.$on('input', () => {
			mockInputFn();
		});

		instance.$on('compositionstart', () => {
			mockCompositionStart();
		});

		instance.$on('compositionend', () => {
			mockCompositionEnd();
		});

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
		expect(mockInputFn.mock.calls.length).toBe(1);
		expect(mockCompositionInputFn.mock.calls.length).toBe(0);
		expect(value).toBe('');

		inputElm.value = 'ikun ikun';
		inputElm.dispatchEvent(new Event('compositionend'));
		await tick();
		expect(mockCompositionEnd).toBeCalled();
		expect(mockInputFn.mock.calls.length).toBe(2);
		expect(mockCompositionInputFn.mock.calls.length).toBe(1);
		expect(value).toBe('ikun ikun');
	});

	test('event: should trigger enter event when pressing enter', async () => {
		const mockFn = vi.fn();
		const instance = new KInput({
			target: host
		});
		await tick();
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(
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
		const instance = new KInput({
			target: host
		});
		await tick();
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(
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
		const instance = new KInput({
			target: host,
			props: {
				value
			}
		});
		await tick();
		instance.$on('change', (v) => {
			value = (v.detail.target as HTMLInputElement).value;
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
		const instance = new KInput({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('input', mockFn);
		instance.$on('change', mockFn);
		instance.$on('enter', mockFn);
		const inputElm = host.getElementsByTagName('input')[0];
		inputElm.dispatchEvent(new Event('input'));
		inputElm.dispatchEvent(
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

	test('slot: prefix and suffix', async () => {
		const instance = new KInputSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		const prefixElm = host.getElementsByClassName('prefix')[0];
		const suffixElm = host.getElementsByClassName('suffix')[0];
		expect(prefixElm).toBeTruthy();
		expect(suffixElm).toBeTruthy();
	});

	test('props: bind value be updated in real time', async () => {
		const instance = new KInputBindValueUpdate({
			target: host
		});
		expect(instance).toBeTruthy();

		const spanElm = host.querySelector('span')!;
		expect(spanElm).toBeTruthy();
		expect(spanElm.textContent).toBe('');

		const inputElm = host.querySelector('input')!;
		expect(inputElm).toBeTruthy();

		await fireEvent.input(inputElm, { target: { value: 'input change' } });
		await tick();

		expect(inputElm.value).toBe('input change');

		expect(spanElm.textContent).toBe('input change');
	});
});
