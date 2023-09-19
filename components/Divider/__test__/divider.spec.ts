import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDivider from '../src';

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

describe('Test: KDivider', () => {
	test('props: cls', async () => {
		const instance = new KDivider({
			target: host,
			props: {
				cls: 'k-divider--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-divider--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
