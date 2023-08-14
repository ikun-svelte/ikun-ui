import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KTag from '../src/index.svelte';
import KTagSlot from './tag.test.svelte';
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

describe('Test: KTag', () => {
	test('props: type', async () => {
		const instancePrimary = new KTag({
			target: host,
			props: {
				type: 'primary'
			}
		});
		await tick();
		expect(instancePrimary).toBeTruthy();

		const instanceInfo = new KTag({
			target: host,
			props: {
				type: 'info'
			}
		});
		await tick();
		expect(instanceInfo).toBeTruthy();

		const instanceWarning = new KTag({
			target: host,
			props: {
				type: 'warning'
			}
		});
		await tick();
		expect(instanceWarning).toBeTruthy();

		const instanceError = new KTag({
			target: host,
			props: {
				type: 'error'
			}
		});
		await tick();
		expect(instanceError).toBeTruthy();

		const instanceSuccess = new KTag({
			target: host,
			props: {
				type: 'success'
			}
		});
		await tick();
		expect(instanceSuccess).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		const instance = new KTagSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('<span>KTag</span>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
