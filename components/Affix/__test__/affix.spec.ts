import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KAffix from '../src';

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

describe('Test: KAffix', () => {
	test('props: cls', async () => {
		const instance = new KAffix({
			target: host,
			props: {
				cls: 'k-affix--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-affix--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
