import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KInfinite from '../src';

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

describe('Test: KInfinite', () => {
	test('props: cls', async () => {
		const instance = new KInfinite({
			target: host,
			props: {
				cls: 'k-infinite--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-infinite--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
