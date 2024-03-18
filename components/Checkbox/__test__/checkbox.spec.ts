import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KCheckBox from '../src/index.svelte';

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

describe('Test: KCheckBox', () => {
	test('props: value', async () => {
		let value = true;
		const instance = new KCheckBox({
			target: host,
			props: {
				value
			}
		});
		instance.$on('updateValue', (v) => {
			value = v.detail;
		});
		const input = host.getElementsByTagName('input')[0];
		expect(instance).toBeTruthy();
		expect(input.value === 'true').toBeTruthy();
		input.click();
		await tick();
		instance.$set({ value });
		await tick();
		expect(value).not.toBeTruthy();
		expect(input.value === 'false').toBeTruthy();

		initHost();

		let value2 = false;
		const instance2 = new KCheckBox({
			target: host,
			props: {
				value: value2
			}
		});
		instance2.$on('updateValue', (v) => {
			value2 = v.detail;
		});
		const input2 = host.getElementsByTagName('input')[0];
		expect(instance2).toBeTruthy();
		expect(input2.value === 'false').toBeTruthy();
		input2.click();
		await tick();
		instance2.$set({ value: value2 });
		await tick();
		expect(value2).toBeTruthy();
		expect(input2.value === 'true').toBeTruthy();
	});

	test('props: label', async () => {
		const instance = new KCheckBox({
			target: host,
			props: {
				label: 'foo'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('foo')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instance = new KCheckBox({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		instance.$set({ size: 'md' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox--md')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		instance.$set({ size: 'sm' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox--sm')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KCheckBox({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-cur-disabled')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox--box__disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: indeterminate', async () => {
		const instance = new KCheckBox({
			target: host,
			props: {
				indeterminate: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('i-carbon-subtract')).toBeTruthy();
		instance.$set({ indeterminate: false });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('i-carbon-subtract')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: checkColor & bgCheckColor ', async () => {
		new KCheckBox({
			target: host,
			props: {
				value: true,
				checkColor: 'text-red',
				bgCheckColor: 'blue'
			}
		});
		await tick();
		expect(host.innerHTML.includes('border-ikun-main" style="background-color: blue')).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-checkmark text-red')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: bgUnCheckColor ', async () => {
		new KCheckBox({
			target: host,
			props: {
				value: false,
				bgUnCheckColor: 'green'
			}
		});
		await tick();
		expect(
			host.innerHTML.includes('k-checkbox--box" style="background-color: green;')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger updateValue event', async () => {
		const mockFn = vi.fn();
		let value = false;
		const instance = new KCheckBox({
			target: host,
			props: {
				value
			}
		});
		await tick();
		instance.$on('updateValue', (v) => {
			value = v.detail;
			mockFn();
		});
		const input = host.getElementsByTagName('input')[0];
		input.click(); // or input.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(value).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('event: should not trigger updateValue event when disabled', async () => {
		const mockFn = vi.fn();
		let value = false;
		const instance = new KCheckBox({
			target: host,
			props: {
				disabled: true,
				value
			}
		});
		await tick();
		instance.$on('updateValue', (v) => {
			value = v.detail;
			mockFn();
		});
		const input = host.getElementsByTagName('input')[0];
		input.click(); // or input.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(value).not.toBeTruthy();
		expect(mockFn).not.toBeCalled();
	});
});
