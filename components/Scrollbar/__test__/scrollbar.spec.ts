import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KScrollbar from '../src';

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

describe('Test: KScrollbar', () => {
	test('props: cls', async () => {
		const instance = new KScrollbar({
			target: host,
			props: {
				cls: 'k-scrollbar--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-scrollbar--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('basic render', async () => {
		const instance = new KScrollbar({
			target: host,
			props: {
				cls: 'k-scrollbar--test',
				width: '10px',
				height: '10px',
				thumbBackground: 'red',
				thumbRadius: '50px',
				trackRadius: '50px',
				trackBackground: 'green'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
