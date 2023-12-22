import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KStatistic from '../src';

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

describe('Test: KStatistic', () => {
	test('props: cls', async () => {
		const instance = new KStatistic({
			target: host,
			props: {
				cls: 'k-statistic--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-statistic--test')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
})
	