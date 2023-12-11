import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KTabs from '../src';

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

describe('Test: KTabs', () => {
	test('props: cls', async () => {
		const instance = new KTabs({
			target: host,
			props: {
				cls: 'k-tabs--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-tabs--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
