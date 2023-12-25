import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KInputNumber from '../src';

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

describe('Test: KInputNumber', () => {
	test('props: cls', async () => {
		const instance = new KInputNumber({
			target: host,
			props: {
				cls: 'k-input-number--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-input-number--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
