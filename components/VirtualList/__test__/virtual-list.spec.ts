import { afterEach, expect, test, describe, beforeEach, vi } from "vitest";
import KVirtualList from '../src';
import { onDestroy, tick } from "svelte";

let host: HTMLElement;
const dataList: any = []
for (let i = 0; i < 1000; i++){
	dataList.push({id: i, label: `this is item ${i}`})
}
const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	host.style.height = '50px'
	host.style.overflow = 'auto';
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

describe('Test: KVirtualList', () => {

	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount,
			// @ts-ignore
			onDestroy: (await import('svelte/internal')).onDestroy,
			// @ts-ignore
			afterUpdate: (await import('svelte/internal')).afterUpdate,
		};
	});

	test('props: cls', async () => {
		const instance = new KVirtualList({
			target: host,
			props: {
				data: dataList,
				cls: 'k-virtual-list--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-virtual-list--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: keeps', async () => {
		const instance = new KVirtualList({
			target: host,
			props: {
				data: dataList,
				keeps: 10
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll('.k-virtual-list--item').length === 10).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: isHorizontal', async () => {
		const instance = new KVirtualList({
			target: host,
			props: {
				data: dataList,
				isHorizontal: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll('.k-virtual-list--item').length === 30).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-virtual-list--base')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-virtual-list--wrapper')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: scroll', async () => {
		const mockFn = vi.fn();
		const instance = new KVirtualList({
			target: host,
			props: {
				data: dataList,
			}
		});
		await tick();
		instance.$on('scroll', (data)=> {
			debugger
			mockFn()
		});
		expect(instance).toBeTruthy();
		host.children[0].scrollTop = 210;
		host.children[0].dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		debugger
		expect(host.querySelectorAll('.k-virtual-list--item').length === 30).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-virtual-list--base')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-virtual-list--wrapper')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
