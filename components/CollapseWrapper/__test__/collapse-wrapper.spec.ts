import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KCollapseWrapper from '../src';

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

describe('Test: KCollapseWrapper', () => {
	test('props: cls', async () => {
		const instance = new KCollapseWrapper({
			target: host,
			props: {
				cls: 'k-collapse-wrapper--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-collapse-wrapper--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
