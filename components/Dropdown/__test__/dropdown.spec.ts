import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDropdown from '../src';

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

describe('Test: KDropdown', () => {
	test('props: cls', async () => {
		const instance = new KDropdown({
			target: host,
			props: {
				cls: 'k-dropdown--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-dropdown--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
