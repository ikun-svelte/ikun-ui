import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCheckboxGroup from '../src';
import KGroupBase from './group.base.svelte';
import KGroupChange from './group.change.svelte';
import { tick } from "svelte";
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

describe('Test: KCheckboxGroup', () => {
	test('props: cls', async () => {
		const instance = new KCheckboxGroup({
			target: host,
			props: {
				cls: 'k-checkbox-group--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox-group--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value of the checkbox can be initialized.', async () => {
		const instance = new KGroupBase({
			target: host,
		});
		await tick()
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input')
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('When it is not disabled, the value changes and the status of the checkbox also changes.', async () => {
		const instance = new KGroupChange({
			target: host,
		});
		await tick()
		expect(instance).toBeTruthy();
		const inputEls = host.querySelectorAll('input')
		expect(inputEls[0].value === 'false').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'true').toBeTruthy();
		const btn = host.querySelector('#group_change_btn')
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(inputEls[0].value === 'true').toBeTruthy();
		expect(inputEls[1].value === 'false').toBeTruthy();
		expect(inputEls[2].value === 'false').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

});
