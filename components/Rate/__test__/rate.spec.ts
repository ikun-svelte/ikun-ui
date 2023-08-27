import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KRate from '../src';

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

describe('Test: KRate', () => {
	test('props: cls', async () => {
		const instance = new KRate({
			target: host,
			props: {
				cls: 'k-rate--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-rate--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
