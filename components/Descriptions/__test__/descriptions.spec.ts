import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDescriptions from '../src';

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

describe('Test: KDescriptions', () => {
	test('props: cls', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				cls: 'k-descriptions--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
