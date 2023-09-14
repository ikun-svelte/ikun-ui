import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KGrid from '../src';

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KGrid', () => {
	test('props: cls', async () => {
		const instance = new KGrid({
			target: host,
			props: {
				cls: 'k-grid--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-grid--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
