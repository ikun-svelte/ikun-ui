import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KPageHeader from '../src';
import KPageHeaderIcon from './fixture/slot.icon.svelte';
import KPageHeaderBreadcrumb from './fixture/slot.breadcrumb.svelte';
import KPageHeaderExtra from './fixture/slot.extra.svelte';
import KPageHeaderMain from './fixture/slot.default.svelte';
import KPageHeaderContent from './fixture/slot.content.svelte';
import KPageHeaderTitle from './fixture/slot.title.svelte';
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

const CONTENT = 'I‘m Ikun';
describe('Test: KPageHeader', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KPageHeader({
			target: host,
			props: {
				cls: 'k-page-header--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-page-header--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('basic render', async () => {
		// @ts-ignore
		const instance = new KPageHeader({
			target: host,
			props: {
				content: CONTENT
			}
		});
		expect(instance).toBeTruthy();
		const contentElm = host.querySelector('.k-page-header__content');
		expect(contentElm.innerHTML).toBe(CONTENT);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		// @ts-ignore
		const instance = new KPageHeader({
			target: host,
			props: {
				icon: 'i-carbon-logo-vue'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			host.innerHTML.includes(
				'class="k-icon--base k-icon--base__dark k-icon-transition i-carbon-logo-vue"'
			)
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: title', async () => {
		// @ts-ignore
		const instance = new KPageHeader({
			target: host,
			props: {
				title: CONTENT
			}
		});
		expect(instance).toBeTruthy();
		const titleElm = host.querySelector('.k-page-header__title');
		expect(titleElm.innerHTML).toBe(CONTENT);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: icon', async () => {
		// @ts-ignore
		const instance = new KPageHeaderIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('<span slot="icon">custom icon</span>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: title', async () => {
		// @ts-ignore
		const instance = new KPageHeaderTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('<span slot="title">custom title</span>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: extra', async () => {
		// @ts-ignore
		const instance = new KPageHeaderExtra({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('<span slot="extra">custom extra</span>')).toBeTruthy();
		expect(host.innerHTML.includes('k-page-header--has-extra')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: default', async () => {
		// @ts-ignore
		const instance = new KPageHeaderMain({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('<span>custom default</span>')).toBeTruthy();
		expect(host.innerHTML.includes('k-page-header--contentful')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: content', async () => {
		// @ts-ignore
		const instance = new KPageHeaderContent({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(
			host.innerHTML.includes(
				'<div class="k-page-header__content"><span slot="content">custom content</span></div>'
			)
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: breadcrumb', async () => {
		// @ts-ignore
		const instance = new KPageHeaderBreadcrumb({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(
			host.innerHTML.includes(
				'<div class="k-page-header__breadcrumb"><span slot="breadcrumb">custom breadcrumb</span></div>'
			)
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: back', async () => {
		const mockFn = vi.fn();
		// @ts-ignore
		const instance = new KPageHeader({
			target: host,
			props: {
				content: CONTENT
			}
		});
		expect(instance).toBeTruthy();
		// @ts-ignore
		instance.$on('back', () => {
			mockFn();
		});
		const backElm = host.querySelector('.k-page-header__back');
		backElm.click();
		await tick();
		expect(mockFn).toBeCalled();
	});
});
