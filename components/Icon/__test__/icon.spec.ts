import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KIcon from '../src/index.svelte';
import KIconCustomizable from './fixture/customizable.icon.color.test.svelte';

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

describe('Test: KIcon', () => {
	test('props: icon', async () => {
		const instance = new KIcon({
			target: host,
			props: {
				icon: 'i-carbon-settings'
			}
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: btn', async () => {
		const instance = new KIcon({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				btn: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host.children[0].getAttribute('role') == 'button').toBeTruthy();
		expect(host.innerHTML.includes('k-icon--role-button')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: color', async () => {
		const instance = new KIcon({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				color: 'text-red'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('text-red')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: width & height', async () => {
		const instance = new KIcon({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				width: '30px',
				height: '30px'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.children[0].style.width).toBe('30px');
		expect(host.children[0].style.height).toBe('30px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger click event', async () => {
		const mockFn = vi.fn();
		let value = false;
		const instance = new KIcon({
			target: host,
			props: {
				icon: 'i-carbon-settings'
			}
		});
		await tick();
		instance.$on('click', (v) => {
			value = v.detail;
			mockFn();
		});
		const input = host.children[0];
		input.click(); // or input.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(value).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('style: customizable icon color', async () => {
		const instance = new KIconCustomizable({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.children[0].style.background).toBe('red');
		expect(host.innerHTML).matchSnapshot();
	});
});
