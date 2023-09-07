import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCheckboxGroup from '../src';

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

describe('Test: KCheckboxGroup', () => {
	test('props: cls', async () => {
		const instance = new KCheckboxGroup({
			target: host,
			props: {
				cls: 'k-checkbox-group--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-checkbox-group--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
