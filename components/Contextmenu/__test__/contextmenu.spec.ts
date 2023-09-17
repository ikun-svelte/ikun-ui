import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KContextmenu from '../src';

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

describe('Test: KContextmenu', () => {
	test('props: cls', async () => {
		const instance = new KContextmenu({
			target: host,
			props: {
				cls: 'k-contextmenu--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-contextmenu--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
