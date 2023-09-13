import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KEllipsis from '../src';

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

describe('Test: KEllipsis', () => {
	test('props: cls', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				cls: 'k-ellipsis--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-ellipsis--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
