import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KAutoComplete from '../src';

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

describe('Test: KAutoComplete', () => {
	test('props: cls', async () => {
		const instance = new KAutoComplete({
			target: host,
			props: {
				cls: 'k-auto-complete--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-auto-complete--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
