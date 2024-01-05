import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KMask from '../src/index.svelte';

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	host.style.width = '100px';
	host.style.height = '100px';
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KMask', () => {
	test('props: value', async () => {
		const instance = new KMask({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).not.toBeTruthy();

		const instance2 = new KMask({
			target: host,
			props: {
				value: true
			}
		});
		expect(instance2).toBeTruthy();
		expect(host.innerHTML.includes('top: 0px; left: 0px; width: 100%; height: 100%;')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: target', async () => {
		const target = document.createElement('div');
		target.setAttribute('id', 'target');
		document.body.appendChild(host);
		await tick();
		const instance = new KMask({
			target: host,
			props: {
				target,
				value: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(target.style.position).toBe('relative');
		expect(target.style.overflow).matchSnapshot('hidden');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: color', async () => {
		const instance = new KMask({
			target: host,
			props: {
				value: true,
				color: 'red'
			}
		});
		expect(instance).toBeTruthy();
		expect((host.children[0] as HTMLElement)!.style.backgroundColor).toBe('red');
		expect(host.innerHTML).matchSnapshot();
	});
});
// TODO e2e test
