import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KVirtualList from '../src';

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

describe('Test: KVirtualList', () => {
	test('props: cls', async () => {
		const instance = new KVirtualList({
			target: host,
			props: {
				cls: 'k-virtual-list--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-virtual-list--test')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
})
	