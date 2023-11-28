import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KFormInit from './fixture/init.svelte';
import KFormLabelWidth from './fixture/labelWidth.svelte';
import KFormLabelAlign from './fixture/labelAlign.svelte';
import KFormLabelPosition from './fixture/labelPosition.svelte';
import KFormDisabled from './fixture/disabled.svelte';
import KFormSize from './fixture/size.svelte';
import KFormManualValidate from './fixture/manualValidate.svelte';
import KFormValidateForm from './fixture/validateForm.svelte';
import KFormResetForm from './fixture/resetForm.svelte';
import KFormGetForm from './fixture/getForm.svelte';
import KFormSetForm from './fixture/setForm.svelte';
import KFormSetField from './fixture/setField.svelte';
import KFormClearValidateField from './fixture/clearValidateField.svelte';
import KFormValidateField from './fixture/validateField.svelte';
import KFormItemShowMsg from './fixture/showMsg.svelte';
import KFormItemLabel from './fixture/label.svelte';
import KFormErrorSlot from './fixture/errorSlot.svelte';
import KFormItemLabelSlot from './fixture/labelSlot.svelte';
import KFormValidateEvent from './fixture/validateEvent.svelte';
import KFormValidateEventSefField from './fixture/validateEventSefField.svelte';
import KFormValidateEventValidateField from './fixture/validateEventvalidateField.svelte';
import { tick } from 'svelte';
import { fireEvent, screen, render, waitFor } from '@testing-library/svelte';
import { getValueByPath, parsePath, setValueByPath } from '../src/helpers/fields';

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
describe('Test: KForm', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: KForm initValue', async () => {
		const instance = new KFormInit({
			target: host
		});
		expect(instance).toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput');

		expect(host.innerHTML.includes(`k-form-item-label__right`)).toBeTruthy();

		expect(host.querySelectorAll('.k-rate--active-icon').length === 4).toBeTruthy();

		expect(host.querySelectorAll('.k-radio__selected').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-radio')[2].innerHTML.includes('k-radio__selected')
		).toBeTruthy();

		expect(host.querySelectorAll('.i-carbon-checkmark').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-checkbox--base')[1].innerHTML.includes('i-carbon-checkmark')
		).toBeTruthy();

		const selectInput = host.querySelectorAll('.k-select--inner');
		expect(selectInput[0].value).toBe('不知明镜里');
		expect(selectInput[1].value).toBe('Huge');

		const sliderEl = host.querySelector('.k-slider--button__wrapper');
		expect(sliderEl.style.left).toBe('43%');

		const value = JSON.parse(host.querySelector('#form_value')?.innerHTML);
		expect(value).toMatchObject({
			KInput: 'KInput',
			KSwitch: true,
			KRate: 4,
			KRadio: '3',
			KCheckbox: ['2'],
			KSelect: {
				label: '不知明镜里',
				value: '不知',
				id: '3'
			},
			KSelectString: 'Huge',
			slider: 43,
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: KForm labelWidth', async () => {
		const instance = new KFormLabelWidth({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const labelEl = host.querySelector('.k-form-item-label');
		expect(labelEl.style.width).toBe('200px');
		const btnEl = host.querySelector('button');
		btnEl?.click();
		await tick();
		expect(labelEl.style.width).toBe('100px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: KForm labelAlign', async () => {
		const instance = new KFormLabelAlign({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.querySelector('.k-form-item-label__left')).toBeTruthy();

		let btnEl = host.querySelector('#align_right');
		btnEl?.click();
		await tick();
		expect(host.querySelector('.k-form-item-label__right')).toBeTruthy();

		btnEl = host.querySelector('#align_center');
		btnEl?.click();
		await tick();
		expect(host.querySelector('.k-form-item-label__center')).toBeTruthy();

		btnEl = host.querySelector('#align_left');
		btnEl?.click();
		await tick();
		expect(host.querySelector('.k-form-item-label__left')).toBeTruthy();
	});

	test('props: KForm labelPosition', async () => {
		const instance = new KFormLabelPosition({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.querySelector('.k-form-item-label__right')).not.toBeTruthy();
		expect(host.querySelector('.k-form-item-label__horizontal')).not.toBeTruthy();
		expect(host.querySelector('.k-form-item-label__vertical')).toBeTruthy();
		const btnEl = host.querySelector('button');
		btnEl?.click();
		await tick();
		expect(host.querySelector('.k-form-item-label__right')).toBeTruthy();
		expect(host.querySelector('.k-form-item-label__horizontal')).toBeTruthy();
		expect(host.querySelector('.k-form-item-label__vertical')).not.toBeTruthy();
	});

	test('props: KForm disabled', async () => {
		const instance = new KFormDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		expect(host.querySelectorAll('.k-form-item-label__disabled').length).toBe(8);
		expect(host.querySelector('.k-input__disabled')).toBeTruthy();
		expect(host.querySelector('.k-switch__disabled')).toBeTruthy();
		expect(host.querySelector('.k-rate--item__disabled')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--box__disabled').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--box__disabled').length).toBe(4);
		expect(host.querySelectorAll('.k-select--base__disabled').length).toBe(4);
		expect(host.querySelector('.k-slider .k-cur-disabled')).toBeTruthy();

		const btnEl = host.querySelector('button');
		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-label__disabled').length).toBe(0);
		expect(host.querySelector('.k-input__disabled')).not.toBeTruthy();
		expect(host.querySelector('.k-switch__disabled')).not.toBeTruthy();
		expect(host.querySelector('.k-rate--item__disabled')).not.toBeTruthy();
		expect(host.querySelectorAll('.k-radio--box__disabled').length).toBe(1);
		expect(host.querySelectorAll('.k-checkbox--box__disabled').length).toBe(1);
		expect(host.querySelectorAll('.k-select--base__disabled').length).toBe(0);
		expect(host.querySelector('.k-slider .k-cur-disabled')).not.toBeTruthy();

		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-label__disabled').length).toBe(8);
		expect(host.querySelector('.k-input__disabled')).toBeTruthy();
		expect(host.querySelector('.k-switch__disabled')).toBeTruthy();
		expect(host.querySelector('.k-rate--item__disabled')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--box__disabled').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--box__disabled').length).toBe(4);
		expect(host.querySelectorAll('.k-select--base__disabled').length).toBe(4);
		expect(host.querySelector('.k-slider .k-cur-disabled')).toBeTruthy();
	});

	test('props: KForm size', async () => {
		const instance = new KFormSize({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();

		expect(host.querySelectorAll('.k-form-item-label__sm').length).toBe(8);
		expect(host.querySelector('.k-input__sm')).toBeTruthy();
		expect(host.querySelector('.k-switch--sm')).toBeTruthy();
		expect(host.querySelector('.k-rate--sm')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__wrapper__sm')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__sm')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--sm').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--sm').length).toBe(4);
		expect(host.querySelectorAll('.k-select__sm').length).toBe(2);

		let btnEl = host.querySelector('#size_lg');
		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-label__lg').length).toBe(8);
		expect(host.querySelector('.k-input__lg')).toBeTruthy();
		expect(host.querySelector('.k-switch--lg')).toBeTruthy();
		expect(host.querySelector('.k-rate--lg')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__wrapper__lg')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__lg')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--lg').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--lg').length).toBe(4);
		expect(host.querySelectorAll('.k-select__lg').length).toBe(2);

		btnEl = host.querySelector('#size_md');
		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-label__md').length).toBe(8);
		expect(host.querySelector('.k-input__md')).toBeTruthy();
		expect(host.querySelector('.k-switch--md')).toBeTruthy();
		expect(host.querySelector('.k-rate--md')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__wrapper__md')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__md')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--md').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--md').length).toBe(4);
		expect(host.querySelectorAll('.k-select__md').length).toBe(2);

		btnEl = host.querySelector('#size_sm');
		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-label__sm').length).toBe(8);
		expect(host.querySelector('.k-input__sm')).toBeTruthy();
		expect(host.querySelector('.k-switch--sm')).toBeTruthy();
		expect(host.querySelector('.k-rate--sm')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__wrapper__sm')).toBeTruthy();
		expect(host.querySelector('.k-slider--button__sm')).toBeTruthy();
		expect(host.querySelectorAll('.k-radio--sm').length).toBe(4);
		expect(host.querySelectorAll('.k-checkbox--sm').length).toBe(4);
		expect(host.querySelectorAll('.k-select__sm').length).toBe(2);
	});

	test('props: KForm manualValidate', async () => {
		let value = {};
		const instance = new KFormManualValidate({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const inputEl = host.querySelector('.k-input--inner');
		expect(inputEl.value).toBe('KInput');
		await fireEvent.input(inputEl, { target: { value: '' } });
		await tick();
		expect(inputEl.value).toBe('');
		expect(host.innerHTML.includes('k-form-item-msg_error')).not.toBeTruthy();
		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		expect(host.innerHTML.includes('k-form-item-msg_error')).toBeTruthy();
		expect(value).toMatchObject({
			data: {
				KInput: ''
			},
			isValid: false,
			invalidFields: [
				{
					message: 'Please input',
					fieldValue: '',
					field: 'KInput'
				}
			]
		});
	});

	test('events: KForm validate & api validateField', async () => {
		const mockFn = vi.fn();
		let value: any = {};
		const instance = new KFormValidateEventValidateField({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
			mockFn();
		});
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();

		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(1);
		expect(value).matchSnapshot();
	});

	test('events: KForm validate & api setField', async () => {
		const mockFn = vi.fn();
		let value: any = {};
		const initValue = {
			KInput: 'KInput'
		};
		const instance = new KFormValidateEventSefField({
			target: host,
			props: {
				initValue,
				isValidate: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
			mockFn();
		});

		const btnSetForm = host.querySelector('#setField');
		btnSetForm?.click();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput change');
		expect(mockFn).toBeCalledTimes(1);
		expect(value).matchSnapshot();
	});

	test('events: KForm validate & input interaction', async () => {
		const mockFn = vi.fn();
		let value: any = {};
		const instance = new KFormValidateEvent({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
			mockFn();
		});

		const inputEl = host.querySelector('.k-input--inner');
		await fireEvent.input(inputEl, { target: { value: '' } });
		expect(host.innerHTML.includes('KInput required')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(1);
		expect(value).matchSnapshot();

		await fireEvent.input(inputEl, { target: { value: 'KInput' } });
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(2);
		expect(value).matchSnapshot();

		const checkboxEl = host.querySelectorAll('[type="checkbox"]')[0];
		checkboxEl?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		checkboxEl?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KCheckbox error')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(3);
		expect(value).matchSnapshot();

		const selectInput = host.querySelectorAll('.k-select--inner');
		// expect(selectInput[1].value).toBe('Huge')
		const triggerEl = host.querySelectorAll('[data-popover-trigger]')[0];
		triggerEl.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="1"]')?.children[0];
		itemEl?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(selectInput[0].value).toBe('白发三千丈');
		const clearTrigger = host.querySelectorAll('[slot="triggerEl"]')[0];
		await clearTrigger?.dispatchEvent(new Event('mouseenter', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const clearEl = host.querySelector('[data-k-select-clear]');
		clearEl?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KSelect error')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(4);
		expect(value).matchSnapshot();

		const selectInput2 = host.querySelectorAll('.k-select--inner');
		// expect(selectInput[1].value).toBe('Huge')
		const triggerEl2 = host.querySelectorAll('[data-popover-trigger]')[1];
		triggerEl2.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl2 = host.querySelector('[data-kv-key="Huge"]')?.children[0];
		itemEl2?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(selectInput2[1].value).toBe('Huge');
		const clearTrigger2 = host.querySelectorAll('[slot="triggerEl"]')[1];
		await clearTrigger2?.dispatchEvent(new Event('mouseenter', { cancelable: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const clearEl2 = host.querySelector('[data-k-select-clear]');
		clearEl2?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KSelect error')).toBeTruthy();
		expect(mockFn).toBeCalledTimes(5);
		expect(value).matchSnapshot();
	});

	test('api: KForm validateForm', async () => {
		let value = {};
		const instance = new KFormValidateForm({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		expect(host.querySelectorAll('.k-form-item-star').length).toBe(7);
		expect(host.querySelectorAll('.k-form-item-msg_error').length).toBe(6);
		expect(host.innerHTML.includes('KSelectString custom error')).toBeTruthy();
		expect(value).toMatchSnapshot(JSON.stringify(value));
	});

	test('api: KForm resetForm', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput',
			KSwitch: true,
			KRate: null,
			KRadio: '',
			KCheckbox: [],
			KSelect: null,
			KSelectString: '',
			slider: 0
		};
		const instance = new KFormResetForm({
			target: host,
			props: {
				initValue
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		expect(value.data).toMatchObject(initValue);

		const inputEl = host.querySelector('.k-input--inner');
		await fireEvent.input(inputEl, { target: { value: 'test' } });

		const switchEl = host.querySelector('.k-switch');
		switchEl?.click();

		const rateEl = host.querySelectorAll('.k-rate--item')[0];
		rateEl?.click();

		const radioEl = host.querySelectorAll('[type="radio"]')[0];
		radioEl?.click();

		const checkboxEl = host.querySelectorAll('[type="checkbox"]')[0];
		checkboxEl?.click();

		const triggerEl = host.querySelectorAll('[data-popover-trigger]')[0];
		triggerEl.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="1"]')?.children[0];
		itemEl?.click();

		const triggerEl2 = host.querySelectorAll('[data-popover-trigger]')[1];
		triggerEl2.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl2 = host.querySelector('[data-kv-key="Huge"]')?.children[0];
		itemEl2?.click();

		btn?.click();
		await tick();

		expect(value.data).toMatchObject({
			KInput: 'test',
			KSwitch: false,
			KRate: 0,
			KRadio: '1',
			KCheckbox: ['1'],
			KSelect: {
				label: '白发三千丈',
				value: '白发',
				id: '1'
			},
			KSelectString: 'Huge',
			slider: 0
		});

		const btnReset = host.querySelector('#reset');
		btnReset?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		btn?.click();
		await tick();
		expect(value.data).toMatchObject(initValue);
	});

	test('api: KForm getForm', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput',
			KSwitch: true,
			KRate: null,
			KRadio: '',
			KCheckbox: [],
			KSelect: null,
			KSelectString: ''
		};
		const instance = new KFormGetForm({
			target: host,
			props: {
				initValue
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#getForm');
		btn?.click();
		await tick();
		expect(value).toMatchObject(initValue);

		const inputEl = host.querySelector('.k-input--inner');
		await fireEvent.input(inputEl, { target: { value: 'test' } });

		const switchEl = host.querySelector('.k-switch');
		switchEl?.click();

		const rateEl = host.querySelectorAll('.k-rate--item')[0];
		rateEl?.click();

		const radioEl = host.querySelectorAll('[type="radio"]')[0];
		radioEl?.click();

		const checkboxEl = host.querySelectorAll('[type="checkbox"]')[0];
		checkboxEl?.click();

		const triggerEl = host.querySelectorAll('[data-popover-trigger]')[0];
		triggerEl.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl = host.querySelector('[data-kv-key="1"]')?.children[0];
		itemEl?.click();

		const triggerEl2 = host.querySelectorAll('[data-popover-trigger]')[1];
		triggerEl2.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const itemEl2 = host.querySelector('[data-kv-key="Huge"]')?.children[0];
		itemEl2?.click();

		btn?.click();
		await tick();

		expect(value).toMatchObject({
			KInput: 'test',
			KSwitch: false,
			KRate: 0,
			KRadio: '1',
			KCheckbox: ['1'],
			KSelect: {
				label: '白发三千丈',
				value: '白发',
				id: '1'
			},
			KSelectString: 'Huge'
		});
	});

	test('api: KForm setForm & isValidate is true', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput',
			KSwitch: true,
			KRate: null,
			KRadio: '',
			KCheckbox: [],
			KSelect: null,
			KSelectString: ''
		};
		const instance = new KFormSetForm({
			target: host,
			props: {
				initValue,
				isValidate: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#getForm');
		btn?.click();
		await tick();
		expect(value).toMatchObject(initValue);

		const btnSetForm = host.querySelector('#setForm');
		btnSetForm?.click();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput change');

		expect(host.querySelectorAll('.k-rate--active-icon').length === 1).toBeTruthy();

		expect(host.querySelectorAll('.k-switch__unchecked').length === 1).toBeTruthy();

		expect(host.querySelectorAll('.k-radio__selected').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-radio')[0].innerHTML.includes('k-radio__selected')
		).toBeTruthy();

		expect(host.querySelectorAll('.i-carbon-checkmark').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-checkbox--base')[0].innerHTML.includes('i-carbon-checkmark')
		).toBeTruthy();

		const selectInput = host.querySelectorAll('.k-select--inner');
		expect(selectInput[0].value).toBe('白发三千丈');
		expect(selectInput[1].value).toBe('Huge');

		btn?.click();
		await tick();
		expect(value).toMatchObject({
			KInput: 'KInput change',
			KSwitch: false,
			KRate: {
				sub: 1
			},
			KRadio: '1',
			KCheckbox: ['1'],
			KSelect: {
				label: '白发三千丈',
				value: '白发',
				id: '1'
			},
			KSelectString: 'Huge'
		});
	});

	test('api: KForm setForm & isValidate is false', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput',
			KSwitch: true,
			KRate: null,
			KRadio: '',
			KCheckbox: [],
			KSelect: null,
			KSelectString: ''
		};
		const instance = new KFormSetForm({
			target: host,
			props: {
				initValue,
				isValidate: false
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#getForm');
		btn?.click();
		await tick();
		expect(value).toMatchObject(initValue);

		const btnSetForm = host.querySelector('#setForm');
		btnSetForm?.click();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput change');

		expect(host.querySelectorAll('.k-rate--active-icon').length === 1).toBeTruthy();

		expect(host.querySelectorAll('.k-switch__unchecked').length === 1).toBeTruthy();

		expect(host.querySelectorAll('.k-radio__selected').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-radio')[0].innerHTML.includes('k-radio__selected')
		).toBeTruthy();

		expect(host.querySelectorAll('.i-carbon-checkmark').length === 1).toBeTruthy();
		expect(
			host.querySelectorAll('.k-checkbox--base')[0].innerHTML.includes('i-carbon-checkmark')
		).toBeTruthy();

		const selectInput = host.querySelectorAll('.k-select--inner');
		expect(selectInput[0].value).toBe('白发三千丈');
		expect(selectInput[1].value).toBe('Huge');

		btn?.click();
		await tick();
		expect(value).toMatchObject({
			KInput: 'KInput change',
			KSwitch: false,
			KRate: {
				sub: 1
			},
			KRadio: '1',
			KCheckbox: ['1'],
			KSelect: {
				label: '白发三千丈',
				value: '白发',
				id: '1'
			},
			KSelectString: 'Huge'
		});
	});

	test('api: KForm setField & isValidate is true', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput'
		};
		const instance = new KFormSetField({
			target: host,
			props: {
				initValue,
				isValidate: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#getForm');
		btn?.click();
		await tick();
		expect(value).toMatchObject(initValue);

		const btnSetForm = host.querySelector('#setField');
		btnSetForm?.click();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput change');

		btn?.click();
		await tick();
		expect(value).toMatchObject({
			KInput: 'KInput change'
		});
	});

	test('api: KForm setField & isValidate is false', async () => {
		let value: any = {};
		const initValue = {
			KInput: 'KInput'
		};
		const instance = new KFormSetField({
			target: host,
			props: {
				initValue,
				isValidate: false
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = host.querySelector('#getForm');
		btn?.click();
		await tick();
		expect(value).toMatchObject(initValue);

		const btnSetForm = host.querySelector('#setField');
		btnSetForm?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();

		const input = host.querySelector('.k-input--inner');
		expect(input.value).toBe('KInput change');

		btn?.click();
		await tick();
		expect(value).toMatchObject({
			KInput: 'KInput change'
		});
	});

	test('api: KForm clearValidateField', async () => {
		let value: any = {};
		const instance = render(KFormClearValidateField);
		instance.component.$on('getRes', (data) => {
			value = data.detail;
		});
		const btn = await screen.getByTestId('validate');
		await fireEvent.click(btn);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const res = await screen.findByText('KInput 3 ~5');
		expect(res).toBeTruthy();
		expect(value).toMatchSnapshot();
		const btnClear = await screen.getByTestId('clearValidateField');
		await fireEvent.click(btnClear);
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		await waitFor(() => {
			// @ts-ignore
			expect(document.body.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();
			expect(value).toMatchSnapshot();
		});

		btn?.click();
		await tick();
		// @ts-ignore
		expect(document.body.innerHTML.includes('KInput 3 ~5')).toBeTruthy();
		expect(value).toMatchSnapshot();
	});

	test('api: KForm validateField', async () => {
		const instance = new KFormValidateField({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();

		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KInput 3 ~5')).toBeTruthy();
	});

	test('props: KFormItem showMsg', async () => {
		const instance = new KFormItemShowMsg({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();

		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('KInput 3 ~5')).not.toBeTruthy();
	});

	test('props: KFormItem label', async () => {
		const instance = new KFormItemLabel({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('KInput-Label')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: KFormItem label', async () => {
		const instance = new KFormItemLabelSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('KInput-Slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: KFormItem error', async () => {
		const instance = new KFormErrorSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('Error-Slot')).not.toBeTruthy();

		const btn = host.querySelector('#validate');
		btn?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('Error-Slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KForm helper fields', () => {
	const target = {
		example: {
			path: {
				value: 'testValue'
			}
		}
	};
	test('parsePath should return an array for string input', async () => {
		const path = 'example.path';
		const result = parsePath(path);
		expect(Array.isArray(result)).toBeTruthy();
		expect(result).toMatchObject(['example', 'path']);
	});
	test('parsePath should return the input array unchanged', async () => {
		const path = ['example', 'path'];
		const result = parsePath(path);
		expect(result === path).toBeTruthy();
	});
	test('parsePath should return an empty array for invalid input', async () => {
		const path = 123; // Invalid input
		const result = parsePath(path as any);
		expect(Array.isArray(result)).toBeTruthy();
		expect(result.length === 0).toBeTruthy();
	});

	test('getValueByPath should return the correct value for valid path', async () => {
		const path = 'example.path.value';
		const result = getValueByPath(path, target);
		expect(result === 'testValue').toBeTruthy();
	});

	test('getValueByPath should return undefined for non-existent path', async () => {
		const path = 'nonExistent.path.value';
		const result = getValueByPath(path, target);
		expect(result === undefined).toBeTruthy();
	});

	test('getValueByPath should return undefined for invalid path', async () => {
		const path = 123; // Invalid path
		const result = getValueByPath(path as any, target);
		expect(result === target).toBeTruthy();
	});

	test('setValueByPath should set the value at the correct path', () => {
		const target = {
			example: {
				path: {
					value: 'oldValue'
				}
			}
		};

		const path = 'example.path.value';
		const newValue = 'newValue';
		const result = setValueByPath(path, target, newValue);
		expect(result.example.path.value === newValue).toBeTruthy();
	});

	test('setValueByPath should create intermediate objects if they do not exist', () => {
		const target = {};

		const path = 'example.path.value';
		const newValue = 'newValue';
		const result = setValueByPath(path, target, newValue);
		expect(result.example.path.value === newValue).toBeTruthy();
	});

	test('setValueByPath should handle array indices correctly', () => {
		const target = {
			example: {
				array: ['oldValue']
			}
		};

		const path = 'example.array';
		const newValue = ['newValue'];
		const result = setValueByPath(path, target, newValue);
		expect(result.example.array === newValue).toBeTruthy();
	});

	test('setValueByPath should handle non-existent intermediate objects correctly', () => {
		const target = {
			example: {}
		};

		const path = 'example.path.value';
		const newValue = 'newValue';
		const result = setValueByPath(path, target, newValue);
		expect(result.example.path.value === newValue).toBeTruthy();
	});
});
