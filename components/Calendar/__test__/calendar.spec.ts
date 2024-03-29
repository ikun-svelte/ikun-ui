import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KCalendar from '../src';

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

describe('Test: KCalendar', () => {
	test('props: cls', async () => {
		const instance = new KCalendar({
			target: host,
			props: {
				cls: 'k-calendar--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-calendar--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
