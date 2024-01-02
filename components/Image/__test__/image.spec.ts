import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KImage from '../src';
import KImageFit from './fixture/fix.svelte';
import KImagePlaceHolder from './fixture/placeholder.svelte';
import { tick } from 'svelte';
let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KImage', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KImage({
			//@ts-ignore
			target: host,
			props: {
				cls: 'k-image--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-image--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: src', async () => {
		//@ts-ignore
		const instance = new KImage({
			target: host,
			props: {
				src: 'demo'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host!.innerHTML.includes('src="demo"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: alt', async () => {
		//@ts-ignore
		const instance = new KImage({
			target: host,
			props: {
				alt: 'demo'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host!.innerHTML.includes('alt="demo"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: fit', async () => {
		//@ts-ignore
		const instance = new KImageFit({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: previewSrcList', async () => {
		//@ts-ignore
		const instance = new KImage({
			target: host,
			props: {
				previewSrcList: ['previewSrcList']
			}
		});
		expect(instance).toBeTruthy();
		const imgBtn = host.querySelector('.k-image__inner');
		imgBtn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: show', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KImage({
			target: host,
			props: {
				previewSrcList: ['previewSrcList']
			}
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('show', mockFn);
		const imgBtn = host.querySelector('.k-image__inner');
		imgBtn.click();
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('slots: placeHolder', async () => {
		//@ts-ignore
		const instance = new KImagePlaceHolder({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});
});
