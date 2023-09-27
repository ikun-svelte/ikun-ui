import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCard from '../src';

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

describe('Test: KCard', () => {
	test('props: cls', async () => {
		const instance = new KCard({
			target: host,
			props: {
				cls: 'k-card--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-card--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
