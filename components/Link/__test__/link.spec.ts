import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KLink from '../src';
import KLinkIcon from './fixture/link.icon.svelte';
import { tick } from 'svelte';

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

describe('Test: KLink', () => {
	test('props: cls', async () => {
		const instance = new KLink({
			target: host,
			props: {
				cls: 'k-link--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-link--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		const instanceDefault = new KLink({
			target: host
		});
		expect(instanceDefault).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--default k-link--default__hover')
		).toBeTruthy();

		const instanceInfo = new KLink({
			target: host,
			props: {
				type: 'info'
			}
		});
		expect(instanceInfo).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--info k-link--info__hover')
		).toBeTruthy();

		const instanceError = new KLink({
			target: host,
			props: {
				type: 'error'
			}
		});
		expect(instanceError).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--error k-link--error__hover')
		).toBeTruthy();

		const instanceWarning = new KLink({
			target: host,
			props: {
				type: 'warning'
			}
		});
		expect(instanceWarning).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--warning k-link--warning__hover')
		).toBeTruthy();

		const instanceSuccess = new KLink({
			target: host,
			props: {
				type: 'success'
			}
		});
		expect(instanceSuccess).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--success k-link--success__hover')
		).toBeTruthy();

		const instancePrimary = new KLink({
			target: host,
			props: {
				type: 'primary'
			}
		});
		expect(instancePrimary).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--primary k-link--primary__hover')
		).toBeTruthy();
	});

	test('props: href', async () => {
		const instance = new KLink({
			target: host,
			props: {
				href: 'jinitaimei'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('href="jinitaimei"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		const instance = new KLink({
			target: host,
			props: {
				icon: 'i-carbon-logo-vue'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-icon--base k-icon-transition i-carbon-logo-vue')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: underline', async () => {
		const instance = new KLink({
			target: host,
			props: {
				underline: false
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-link--underline__none')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KLink({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--disabled k-link--underline__none')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: click', async () => {
		const mockFn = vi.fn();
		const instance = new KLink({
			target: host
		});
		await tick();
		instance.$on('click', mockFn);
		expect(instance).toBeTruthy();
		const btn = host.getElementsByTagName('a')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('events: disabled & click', async () => {
		const mockFn = vi.fn();
		const instance = new KLink({
			target: host,
			props: {
				disabled: true
			}
		});
		await tick();
		instance.$on('click', mockFn);
		expect(instance).toBeTruthy();
		const btn = host.getElementsByTagName('a')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(mockFn).not.toBeCalled();
	});

	test('slots: icon', async () => {
		const instance = new KLinkIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('i-carbon-logo-vue')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
