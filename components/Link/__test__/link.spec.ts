import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KLink from '../src';

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
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-link--test')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
})
	