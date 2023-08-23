import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KAlert from '../src';

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

describe('Test: KAlert', () => {
	test('props: cls', async () => {
		const instance = new KAlert({
			target: host,
			props: {
				cls: 'k-alert--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-alert--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
