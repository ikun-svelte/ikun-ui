import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KAlert from '../src';
import KAlertTitle from './fixture/alert.title.test.svelte';
import KAlertDescription from './fixture/alert.description.test.svelte';
import KAlertIcon from './fixture/alert.icon.test.svelte';
import KAlertClose from './fixture/alert.close.test.svelte';

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

describe('Test: KAlert', () => {
	test('props: cls', async () => {
		const instance = new KAlert({
			target: host,
			props: {
				cls: 'k-alert--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-alert--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		const types = ['success', 'error', 'warning', 'info'];
		for (const type of types) {
			host.remove();
			initHost();
			const instance = new KAlert({
				target: host,
				props: {
					type
				}
			});
			expect(instance).toBeTruthy();
			expect((host as HTMLElement)!.innerHTML.includes(`k-alert--${type}`)).toBeTruthy();
			expect(host.innerHTML).matchSnapshot();
		}
	});

	test('props: title', async () => {
		const title = 'this is title';
		const instance = new KAlert({
			target: host,
			props: {
				title
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-alert--title')?.textContent).toBe(title);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: description', async () => {
		const description = 'this is description';
		const instance = new KAlert({
			target: host,
			props: {
				description
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-alert--description')?.textContent).toBe(description);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showIcon is false', async () => {
		const instance = new KAlert({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-alert--icon')).toBeFalsy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showIcon is true', async () => {
		const showIcon = true;
		const instance = new KAlert({
			target: host,
			props: {
				showIcon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-alert--icon')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		const icon = 'i-carbon-settings';
		const instance = new KAlert({
			target: host,
			props: {
				showIcon: true,
				icon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes(icon)).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: closable is false', async () => {
		const closable = false;
		const instance = new KAlert({
			target: host,
			props: {
				closable
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-alert--close')).toBeFalsy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: closable is true', async () => {
		const instance = new KAlert({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-alert--close')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: closeIcon', async () => {
		const closeIcon = 'i-carbon-settings';
		const instance = new KAlert({
			target: host,
			props: {
				closeIcon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes(closeIcon)).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: title', async () => {
		const instance = new KAlertTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('#alert-title')?.textContent).toBe('this is title slot');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: description => default', async () => {
		const instance = new KAlertDescription({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('#alert-description')?.textContent).toBe('this is description slot');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: icon', async () => {
		const instance = new KAlertIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('#alert-icon')?.textContent).toBe('this is icon slot');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: closeIcon', async () => {
		const instance = new KAlertClose({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('#alert-close')?.textContent).toBe('this is close slot');
		expect(host.querySelector('#alert-console')?.textContent).toBe('true');
		await tick();
		const closeElm = host.getElementsByClassName(' k-alert--close')[0] as HTMLDivElement;
		closeElm.dispatchEvent(new Event('click'));
		await tick();
		expect(host.querySelector('#alert-console')?.textContent).toBe('false');
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: close event', async () => {
		const mockFn = vi.fn();
		const instance = new KAlert({
			target: host,
			props: {
				closable: true,
				title: 'KAlert title'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('close', mockFn);
		const closeElm = host.getElementsByClassName(' k-alert--close')[0] as HTMLDivElement;
		closeElm.dispatchEvent(new Event('click'));
		await tick();
		expect(mockFn).toBeCalled();
	});
});
