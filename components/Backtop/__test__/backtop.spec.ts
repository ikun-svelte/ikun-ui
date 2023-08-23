import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KBacktop from '../src';

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

describe('Test: KBacktop', () => {
	test('props: cls', async () => {
		const instance = new KBacktop({
			target: host,
			props: {
				cls: 'k-backtop--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-backtop--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
