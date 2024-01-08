import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSegmented from '../src';

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

describe('Test: KSegmented', () => {
	test('props: cls', async () => {
		const instance = new KSegmented({
			target: host,
			props: {
				cls: 'k-segmented--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-segmented--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
