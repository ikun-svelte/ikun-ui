import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KImage from '../src';

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

describe('Test: KImage', () => {
	test('props: cls', async () => {
		const instance = new KImage({
			target: host,
			props: {
				cls: 'k-image--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-image--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
