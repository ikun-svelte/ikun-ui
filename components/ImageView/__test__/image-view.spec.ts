import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KImageView from '../src';

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

describe('Test: KImageView', () => {
	test('props: cls', async () => {
		const instance = new KImageView({
			target: host,
			props: {
				cls: 'k-image-view--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-image-view--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
