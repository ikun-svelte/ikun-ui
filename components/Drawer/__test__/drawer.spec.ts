import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KDrawer from '../src';
import KDrawerContent from './fixture/drawer.content.test.svelte';
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

describe('Test: KDrawer', () => {
	test('props: value', async () => {
		const instance = new KDrawer({
			target: host,
			props: {
				value: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-drawer--base')).toBeTruthy();
		instance.$set({ value: false });
		await tick();
		// The exit animation appears, which means that the drawer is closed
		// (I don’t know why I still can’t get the dom after
		// the animation is completed using `advanceTimersByTimeAsync`)
		expect(host.innerHTML.includes('250ms linear 0ms 1 both')).toBeTruthy();
	});

	test('props: left and right', async () => {
		const instanceL = new KDrawer({
			target: host,
			props: {
				placement: 'left',
				value: true
			}
		});
		expect(instanceL).toBeTruthy();
		expect(host.innerHTML.includes('k-drawer--base k-drawer--base__dark left-0')).toBeTruthy();
		initHost();
		const instanceR = new KDrawer({
			target: host,
			props: {
				placement: 'right',
				value: true
			}
		});
		expect(instanceR).toBeTruthy();
		expect(host.innerHTML.includes('k-drawer--base k-drawer--base__dark right-0')).toBeTruthy();
	});

	test('event: should trigger when close', async () => {
		const mockFn = vi.fn();
		const instance = new KDrawer({
			target: host,
			props: {
				value: true
			}
		});
		await tick();
		instance.$on('close', mockFn);
		const btn = host.children[0].children[0].children[0].children[0];
		btn.dispatchEvent(new window.Event('click', { bubbles: true }));
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('slot: content', async () => {
		const instance = new KDrawerContent({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(document.getElementById('k_drawer_content'));
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: header', async () => {
		const instance = new KDrawer({
			target: host,
			props: {
				value: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-drawer--op')).toBeTruthy();
	});
});
