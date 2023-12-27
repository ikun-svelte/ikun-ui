import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KPageHeader from '../src';

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

describe('Test: KPageHeader', () => {
	test('props: cls', async () => {
		const instance = new KPageHeader({
			target: host,
			props: {
				cls: 'k-page-header--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-page-header--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
