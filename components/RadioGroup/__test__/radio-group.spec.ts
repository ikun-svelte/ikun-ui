import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KRadioGroup from '../src';

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

describe('Test: KRadioGroup', () => {
	test('props: cls', async () => {
		const instance = new KRadioGroup({
			target: host,
			props: {
				cls: 'k-radio-group--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-radio-group--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
