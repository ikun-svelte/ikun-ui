import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KMenu from '../src';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KMenu', () => {
	test('props: cls', async () => {
		const instance = new KMenu({
			target: host,
			props: {
				cls: 'k-menu--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-menu--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
