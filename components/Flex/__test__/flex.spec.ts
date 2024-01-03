import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KFlex from '../src';

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

describe('Test: KFlex', () => {
	test('props: cls', async () => {
		const instance = new KFlex({
			target: host,
			props: {
				cls: 'k-flex--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-flex--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
