import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSkeleton from '../src';

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

describe('Test: KSkeleton', () => {
	test('props: cls', async () => {
		const instance = new KSkeleton({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
