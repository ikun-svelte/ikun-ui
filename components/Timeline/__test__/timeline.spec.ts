import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KTimeline from '../src';

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

describe('Test: KTimeline', () => {
	test('props: cls', async () => {
		const instance = new KTimeline({
			target: host,
			props: {
				cls: 'k-timeline--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-timeline--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
