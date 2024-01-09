import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSteps from '../src';

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

describe('Test: KSteps', () => {
	test('props: cls', async () => {
		const instance = new KSteps({
			target: host,
			props: {
				cls: 'k-steps--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-steps--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
