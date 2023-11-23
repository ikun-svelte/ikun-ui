import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDescriptionsItem from '../src';

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

describe('Test: KDescriptionsItem', () => {
	test('props: cls', async () => {
		const instance = new KDescriptionsItem({
			target: host,
			props: {
				cls: 'k-descriptions-item--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions-item--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
