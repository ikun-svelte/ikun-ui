import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KBreadcrumb from '../src';

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

describe('Test: KBreadcrumb', () => {
	test('props: cls', async () => {
		const instance = new KBreadcrumb({
			target: host,
			props: {
				cls: 'k-breadcrumb--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-breadcrumb--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
