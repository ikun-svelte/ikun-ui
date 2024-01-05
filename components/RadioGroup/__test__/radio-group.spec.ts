import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KRadioGroup from '../src';
import KGroupBase from './fixture/group.base.svelte';
import KGroupChange from './fixture/group.change.svelte';
import KGroupTrigger from './fixture/group.trigger.svelte';
import KGroupBaseDisabled from './fixture/group.base.disabled.svelte';
import KGroupChangeDisabled from './fixture/group.change.disabled.svelte';
import KGroupTriggerDisabled from './fixture/group.trigger.disabled.svelte';
import KGroupModelDisabled from './fixture/group.model.disabled.svelte';
import KGroupSize from './fixture/group.size.svelte';

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
	vi.restoreAllMocks();
});

describe('Test: KRadioGroup', () => {
	test('props: cls', async () => {
		const instance = new KRadioGroup({
			target: host,
			props: {
				cls: 'k-radio-group--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-radio-group--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instance = new KGroupSize({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const smEls = host.querySelector('#group-sm') as HTMLElement;
		expect(smEls.querySelectorAll('.k-radio--sm').length).toBe(3);
		const mdEls = host.querySelector('#group-md') as HTMLElement;
		expect(mdEls.querySelectorAll('.k-radio--md').length).toBe(5);
		const lgEls = host.querySelector('#group-lg') as HTMLElement;
		expect(lgEls.querySelectorAll('.k-radio--lg').length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value of the radio can be initialized.', async () => {
		const instance = new KGroupBase({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'true').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value changes and the status of the radio changes.', async () => {
		const instance = new KGroupChange({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_btn') as HTMLElement;
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, when a value of the radio changes, the group value is triggered.', async () => {
		const instance = new KGroupTrigger({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const divEl = host.querySelector('#group_trigger_value');
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		expect(divEl?.innerHTML).toBe('1');
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		inputEls[1].click();
		await tick();
		expect(divEl?.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, the value of the radio can be initialized.', async () => {
		const instance = new KGroupBaseDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		expect(host.innerHTML.includes('k-radio--box__disabled')).toBeTruthy();
		expect(host.innerHTML.match(/k-radio--box__disabled/g)?.length === 3).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, the value changes and the status of the radio not changes.', async () => {
		const instance = new KGroupChangeDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_disabled_btn') as HTMLElement;
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is disabled, when a value of the radio changes, the group value is not triggered.', async () => {
		const instance = new KGroupTriggerDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const divEl = host.querySelector('#group_trigger_value');
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		inputEls[1].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		inputEls[0].click();
		await tick();
		inputEls[1].click();
		await tick();
		inputEls[2].click();
		await tick();
		expect(divEl?.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();
	});

	test('When the disabled value changes, the radio value can be synchronized.', async () => {
		const instance = new KGroupModelDisabled({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input');
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_value_btn') as HTMLElement;
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();

		const btn2 = host.querySelector('#group_change_disabled_btn') as HTMLElement;
		btn2.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});
});
