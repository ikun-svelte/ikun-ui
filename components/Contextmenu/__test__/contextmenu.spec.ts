import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KContextmenuBase from './contextmenu.base.svelte'
import { tick } from "svelte";

let host: HTMLElement;
const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.restoreAllMocks();
});

describe('Test: KContextmenu', () => {
	test('base render', async () => {
		const instance = new KContextmenuBase({
			target: host,
		});
		expect(instance).toBeTruthy();
		const container = host.children[0]
		container.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }));
		await tick()
		await vi.advanceTimersByTimeAsync(300);
		debugger
		expect((host as HTMLElement)!.innerHTML.includes('k-contextmenu--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {









	});

	test('props: item disabled', async () => {









	});

	test('props: item divider', async () => {









	});

	test('props: sub menu title', async () => {









	});

	test('props: sub menu disabled', async () => {









	});

	test('events: contextmenu', async () => {









	});

	test('events: change', async () => {









	});
});
