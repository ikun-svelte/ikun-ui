import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCarousel from '../src';

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

describe('Test: KCarousel', () => {
	test('props: cls', async () => {
		const instance = new KCarousel({
			target: host,
			props: {
				cls: 'k-carousel--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-carousel--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
