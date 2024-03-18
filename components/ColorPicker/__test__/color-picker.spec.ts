import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KColorPicker from '../src';

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

describe('Test: KColorPicker', () => {
	test('props: cls', async () => {
		const instance = new KColorPicker({
			target: host,
			props: {
				cls: 'k-color-picker--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-color-picker--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
