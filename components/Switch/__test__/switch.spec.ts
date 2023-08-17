import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import KSwitch from '../src';

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

describe('Test: KSwitch', () => {
	test('props: value', async () => {
		const value = true;
		const instance = new KSwitch({
			target: host,
			props: {
				value
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-switch__checked')).toBe(true);
		instance.$set({
			value: false
		});
		await tick();
		expect(host.innerHTML.includes('k-switch__un_checked')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-switch__disabled')).toBe(true);
		instance.$set({
			disabled: false
		});
		await tick();
		expect(host.innerHTML.includes('k-switch__disabled')).toBe(false);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: loading', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				loading: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-switch-loading')).toBe(true);
		instance.$set({
			loading: false
		});
		await tick();
		expect(host.innerHTML.includes('k-switch-loading')).toBe(false);
		expect(host.innerHTML).matchSnapshot();
	});
});
