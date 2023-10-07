import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KEmpty from '../src';

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

describe('Test: KEmpty', () => {
	test('props: cls', async () => {
		const instance = new KEmpty({
			target: host,
			props: {
				cls: 'k-empty--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
