import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KPopconfirm from '../src';

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

describe('Test: KPopconfirm', () => {
	test('props: cls', async () => {
		const instance = new KPopconfirm({
			target: host,
			props: {
				cls: 'k-popconfirm--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-popconfirm--test')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
})
	