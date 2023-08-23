import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KBadge from '../src';

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

describe('Test: KBadge', () => {
	test('props: cls', async () => {
		const instance = new KBadge({
			target: host,
			props: {
				cls: 'k-badge--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-badge--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value is number', async () => {
		const value = 23;
		const instance = new KBadge({
			target: host,
			props: {
				value
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('sup')?.textContent).toBe(`${value}`);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value is string', async () => {
		const value = 'new';
		const instance = new KBadge({
			target: host,
			props: {
				value
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('sup')?.textContent).toBe(value);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: max', async () => {
		const value = 102;
		const max = 99;
		const instance = new KBadge({
			target: host,
			props: {
				value,
				max
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('sup')?.textContent).toBe(`${max}+`);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: isDot', async () => {
		const isDot = true;
		const instance = new KBadge({
			target: host,
			props: {
				isDot
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-badge--content-dot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: show', async () => {
		const show = false;
		const instance = new KBadge({
			target: host,
			props: {
				show
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('sup')).toBeNull();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		const types = ['primary', 'success', 'error', 'warning', 'info'];
		const value = 102;
		for (const type of types) {
			host.remove();
			initHost();
			const instance = new KBadge({
				target: host,
				props: {
					type,
					value
				}
			});
			expect(instance).toBeTruthy();
			expect((host as HTMLElement)!.innerHTML.includes(`k-badge--content-${type}`)).toBeTruthy();
			expect(host.innerHTML).matchSnapshot();
		}
	});
});
