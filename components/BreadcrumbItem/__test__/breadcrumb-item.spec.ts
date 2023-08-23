import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KBreadcrumbItem from '../src';

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

describe('Test: KBreadcrumbItem', () => {
	test('props: cls', async () => {
		const instance = new KBreadcrumbItem({
			target: host,
			props: {
				cls: 'k-breadcrumb-item--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-breadcrumb-item--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: href is empty', async () => {
		const instance = new KBreadcrumbItem({
			target: host,
			props: {
				href: ''
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-breadcrumb-item-link')).toBeFalsy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: href is not empty', async () => {
		const instance = new KBreadcrumbItem({
			target: host,
			props: {
				href: 'https://github.com/ikun-svelte/ikun-ui'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-breadcrumb-item-link')).toBeTruthy();
		expect(host.querySelector('a')?.getAttribute('href')).toBe(
			'https://github.com/ikun-svelte/ikun-ui'
		);
		expect(host.innerHTML).matchSnapshot();
	});
});
