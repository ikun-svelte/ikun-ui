import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KTour from '../src';

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

describe('Test: KTour', () => {
	test('props: cls', async () => {
		const instance = new KTour({
			target: host,
			props: {
				cls: 'k-tour--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-tour--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
