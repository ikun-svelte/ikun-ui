import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KPagination from '../src';
import { tick } from 'svelte';

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

describe('Test: KPagination', () => {
	test('props: cls', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				cls: 'k-pagination--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-pagination--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: total & pageSize & pagerCount', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('21');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(7);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('8');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: nextText & prevText', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				prevText: 'prevText',
				nextText: 'nextText',
				nextIcon: 'i-carbon-logo-vue',
				prevIcon: 'i-carbon-logo-vue',
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(document.querySelector('[data-k-page-next]')?.innerHTML).toBe('nextText');
		expect(document.querySelector('[data-k-page-prev]')?.innerHTML).toBe('prevText');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: prevIcon & nextIcon', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				nextIcon: 'i-carbon-logo-vue',
				prevIcon: 'i-carbon-logo-vue',
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(
			document.querySelector('[data-k-page-next]')?.innerHTML.includes('i-carbon-logo-vue')
		).toBeTruthy();
		expect(
			document.querySelector('[data-k-page-prev]')?.innerHTML.includes('i-carbon-logo-vue')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instanceSm = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				size: 'sm'
			}
		});
		const instanceLg = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				size: 'lg'
			}
		});
		await tick();
		expect(instanceSm).toBeTruthy();
		expect(instanceLg).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-pager__lg')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-pager__sm')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: isBg', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				isBg: true
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-pager__bg__active')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-pager__bg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: layout', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				layout: ['pager', 'total', 'sizes', 'jumper']
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-total')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-sizes')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-jumper')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: layout total', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				layout: ['pager', 'total']
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('Total 500')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: layout jumper', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 999,
				layout: ['pager', 'jumper']
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		const inputEl = document.querySelector('.k-input--inner') as HTMLInputElement;
		expect(inputEl.value).toBe('21');

		inputEl.value = 'ikun';
		inputEl.dispatchEvent(new Event('input'));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(inputEl.value).toBe('21');

		inputEl.value = '0';
		inputEl.dispatchEvent(new Event('input'));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(inputEl.value).toBe('1');

		inputEl.value = '5';
		inputEl.dispatchEvent(new Event('input'));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(inputEl?.value).toBe('5');

		inputEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		await tick();
		await vi.advanceTimersByTimeAsync(400);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(value).toBe(5);
	});

	test('props: layout sizes', async () => {
		let size = 10;
		const instance = new KPagination({
			target: host,
			props: {
				total: 200,
				pageSize: size,
				currentPage: 20,
				layout: ['pager', 'sizes']
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('sizeChange', (v) => {
			size = v.detail.size;
			value = v.detail.currentPage;
		});
		const triggerEl = host.querySelector('[data-popover-trigger]');
		(triggerEl as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const option100El = host.querySelector('[data-kv-key="100"]')?.children[0];
		(option100El as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(value).toBe(2);
		expect(size).toBe(100);

		const option10El = host.querySelector('[data-kv-key="10"]')?.children[0];
		(option10El as HTMLElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		expect(value).toBe(20);
		expect(size).toBe(10);
	});

	test('props: disabled', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 500,
				pageSize: 24,
				pagerCount: 9,
				currentPage: 8,
				disabled: true,
				layout: ['pager', 'total', 'sizes', 'jumper']
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-pager__disabled')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-sizes__disabled')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-jumper__disabled')).toBeTruthy();
		expect(host.innerHTML.includes('k-pagination-total__disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The interactive change of next when pagerCount is an odd number', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 3,
				currentPage: 1,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(1);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		const nextElm = document.querySelector('[data-k-page-next]') as HTMLElement;
		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('2');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(2);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('3');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(3);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(5);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(6);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The interactive change of prev when pagerCount is an odd number', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 3,
				currentPage: 7,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(1);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		const nextElm = document.querySelector('[data-k-page-prev]') as HTMLElement;
		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(6);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(5);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('3');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(3);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('2');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(2);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(1);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(1);

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The interactive change of next when pagerCount is an even number', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 4,
				currentPage: 1,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(2);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		const nextElm = document.querySelector('[data-k-page-next]') as HTMLElement;
		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('2');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(2);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('3');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(3);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(5);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(6);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The interactive change of prev when pagerCount is an even number', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 4,
				currentPage: 7,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(2);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		const nextElm = document.querySelector('[data-k-page-prev]') as HTMLElement;
		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(6);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(5);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('3');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(3);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('2');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(2);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(1);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(1);

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: pagerCount changes interactively when it exceeds the maximum number of pages', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 7,
				currentPage: 1,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(5);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		const nextElm = document.querySelector('[data-k-page-next]') as HTMLElement;
		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('2');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(2);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('3');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(3);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(4);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('5');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(5);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(6);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		nextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);

		expect(host.innerHTML).matchSnapshot();
	});

	test('quick next', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 3,
				currentPage: 1,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(1);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		const quickNextElm = document.querySelector('[data-k-page-next-exp]') as HTMLElement;
		quickNextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		quickNextElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(value).toBe(7);
	});

	test('quick prev', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 20,
				pageSize: 3,
				pagerCount: 3,
				currentPage: 7,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('7');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(1);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		const quickPrevElm = document.querySelector('[data-k-page-prev-exp]') as HTMLElement;
		quickPrevElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('4');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(4);

		quickPrevElm.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('1');
		expect(document.querySelector('[data-k-page-prev-exp]')).not.toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(1);
	});

	test('pager click', async () => {
		const instance = new KPagination({
			target: host,
			props: {
				total: 200,
				pageSize: 3,
				currentPage: 7,
				cls: 'k-pagination--test'
			}
		});
		await tick();
		expect(instance).toBeTruthy();
		let value = '';
		instance.$on('currentChange', (v) => {
			value = v.detail;
		});
		expect(document.querySelector('[data-k-page-first]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-last]')!.innerHTML).toBe('67');
		expect(document.querySelectorAll('[data-k-page-center]').length).toBe(5);
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('7');
		const trigger8 = document.querySelector('[data-k-page-center="8"]') as HTMLElement;
		trigger8.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('8');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(8);

		const trigger6 = document.querySelector('[data-k-page-center="6"]') as HTMLElement;
		trigger6.click();
		await tick();
		expect(document.querySelector('.k-pagination-pager__active')!.innerHTML).toBe('6');
		expect(document.querySelector('[data-k-page-prev-exp]')).toBeTruthy();
		expect(document.querySelector('[data-k-page-next-exp]')).toBeTruthy();
		expect(value).toBe(6);
	});
});
