import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSwitch from '../src';

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
		expect(host.innerHTML.includes('k-switch__unchecked')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: unCheckedValue and checkedValue', async () => {
		let value = '微笑';
		const instance = new KSwitch({
			target: host,
			props: {
				value,
				unCheckedValue: '哭泣',
				checkedValue: '微笑'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('updateValue', (v) => {
			value = v.detail;
			instance.$set({
				value,
				unCheckedValue: '哭泣',
				checkedValue: '微笑'
			});
		});
		const switchElm = host.getElementsByTagName('span')[0];
		switchElm.click();
		await tick();
		expect(value).toBe('哭泣');
		switchElm.click();
		await tick();
		expect(value).toBe('微笑');
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

	test('props: unCheckedColor and checkedColor', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				value: false,
				unCheckedColor: '#520',
				checkedColor: '#1314'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('#520')).toBe(true);
		instance.$set({
			value: true
		});
		await tick();
		expect(host.innerHTML.includes('#1314')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				size: 'sm'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-switch--sm')).toBeTruthy();
		expect(host.innerHTML.includes('k-switch-circle--sm')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();

		instance.$set({ size: 'md' });
		await tick();
		expect(host.innerHTML.includes('k-switch--md')).toBeTruthy();
		expect(host.innerHTML.includes('k-switch-circle--md')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();

		instance.$set({ size: 'lg' });
		await tick();
		expect(host.innerHTML.includes('k-switch--lg')).toBeTruthy();
		expect(host.innerHTML.includes('k-switch-circle--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: cls', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				cls: '关关雎鸠,在河之洲'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('关关雎鸠,在河之洲')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: attrs', async () => {
		const instance = new KSwitch({
			target: host,
			props: {
				attrs: {
					you: 'world'
				}
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.children[0].getAttribute('you')).toBe('world');
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger click event', async () => {
		const mockFn = vi.fn();
		const instance = new KSwitch({
			target: host,
			props: {
				value: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('click', () => {
			mockFn();
		});
		const switchElm = host.getElementsByClassName('k-switch--base')[0] as HTMLDivElement;
		switchElm.click();
		await tick();
		await vi.advanceTimersByTimeAsync(350);
		expect(mockFn).toBeCalled();
	});

	test('event: should trigger updateValue event', async () => {
		const updateEvent = vi.fn();
		const instance = new KSwitch({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('updateValue', () => {
			updateEvent();
		});
		const switchElm = host.getElementsByClassName('k-switch--base')[0] as HTMLDivElement;
		switchElm.click();
		await tick();
		expect(updateEvent).toBeCalled();
	});

	test('event: should trigger change event', async () => {
		const changeEvent = vi.fn();
		const instance = new KSwitch({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('change', () => {
			changeEvent();
		});
		const switchElm = host.getElementsByClassName('k-switch--base')[0] as HTMLDivElement;
		switchElm.click();
		await tick();
		expect(changeEvent).toBeCalled();
	});

	test('event: should not trigger click & updateValue & change event when disabled', async () => {
		const eventFn = vi.fn();
		const instance = new KSwitch({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		instance.$on('updateValue', eventFn);
		instance.$on('change', eventFn);
		instance.$on('click', eventFn);
		await tick();
		const switchElm = host.getElementsByClassName('k-switch--base')[0] as HTMLDivElement;
		switchElm.click();
		expect(eventFn).not.toBeCalled();
	});
});
