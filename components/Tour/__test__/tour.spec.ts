import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KTour from '../src';
import KTourSlotsTitle from './fixture/slots.title.svelte';
import KTourSlotsDescr from './fixture/slots.descr.svelte';
import KTourSlotsClose from './fixture/slots.close.svelte';
import KTourSlotsIndicators from './fixture/slots.indicator.svelte';
import KTourSlotsFooter from './fixture/slots.footer.svelte';
import KTourSlotsBtn from './fixture/slots.btn.svelte';
import KTourOpen from './fixture/open.svelte';
import { tick } from 'svelte';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	const target = globalThis.document.createElement('div');
	target.id = 'ikun-ui-tour';
	const target2 = globalThis.document.createElement('div');
	target2.id = 'ikun-ui-tour2';
	const target3 = globalThis.document.createElement('div');
	target3.id = 'ikun-ui-tour3';
	host.appendChild(target);
	host.appendChild(target2);
	host.appendChild(target3);
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

describe('Test: KTour', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: cls', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				cls: 'k-tour--test',
				open: true,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host!.innerHTML.includes('k-tour--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: open', async () => {
		// @ts-ignore
		const instance = new KTourOpen({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
		const trigger = document.querySelector('#bwsy_trigger');
		(trigger as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: mask', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: prevBtnText & nextBtnText', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				prevBtnText: '上一步',
				nextBtnText: '下一步',
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const btns = document.querySelectorAll('.k-button');
		expect(btns[0].innerHTML.includes('上一步')).toBeTruthy();
		expect(btns[1].innerHTML.includes('下一步')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: closeIcon', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				closeIcon: 'i-custom-icon',
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const close = document.querySelector('.k-tour-close');
		expect(close!.innerHTML.includes('i-custom-icon')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: current', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		const target2 = document.querySelector('#ikun-ui-tour2');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				current: 1,
				steps: [{ target }, { target: target2 }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: zIndex', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				zIndex: 2077,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const ktEl = document.querySelector('.k-tour');
		expect((ktEl as HTMLElement)!.style.zIndex).toBe('2077');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: steps', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				steps: [
					{
						target,
						title: 'ikun-ui title',
						description: 'ikun-ui description'
					}
				]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML.includes('ikun-ui title')).toBeTruthy();
		expect(host.innerHTML.includes('ikun-ui description')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: zIndex', async () => {
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				zIndex: 2077,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const ktEl = document.querySelector('.k-tour');
		expect((ktEl as HTMLElement)!.style.zIndex).toBe('2077');
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: close', async () => {
		const mockFn = vi.fn();
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		// @ts-ignore
		instance.$on('close', () => {
			mockFn();
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const close = document.querySelector('.k-tour-close');
		(close as HTMLButtonElement)?.click();
		await tick();
		expect(mockFn).toBeCalled();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: finish', async () => {
		const mockFn = vi.fn();
		const target = document.querySelector('#ikun-ui-tour');
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				open: true,
				mask: false,
				steps: [{ target }]
			}
		});
		expect(instance).toBeTruthy();
		// @ts-ignore
		instance.$on('finish', () => {
			mockFn();
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const next = document.querySelector('.k-button--primary__fill');
		(next as HTMLButtonElement)?.click();
		await tick();
		expect(mockFn).toBeCalled();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: change', async () => {
		const mockFn = vi.fn();
		const target = document.querySelector('#ikun-ui-tour');
		const target2 = document.querySelector('#ikun-ui-tour2');
		let current = 0;
		// @ts-ignore
		const instance = new KTour({
			target: host,
			props: {
				current,
				open: true,
				mask: false,
				steps: [{ target }, { target: target2 }]
			}
		});
		expect(instance).toBeTruthy();
		// @ts-ignore
		instance.$on('change', (e) => {
			current = e.detail;
			mockFn();
		});
		await tick();
		await vi.advanceTimersByTimeAsync(300);

		const next = document.querySelector('.k-button--primary__fill');
		(next as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalled();
		expect(current).toBe(1);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: title', async () => {
		// @ts-ignore
		const instance = new KTourSlotsTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: description', async () => {
		// @ts-ignore
		const instance = new KTourSlotsDescr({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: closeIcon', async () => {
		// @ts-ignore
		const instance = new KTourSlotsClose({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const close = document.querySelector('#bwsy');
		expect(host.innerHTML.includes('custom close')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		(close as HTMLButtonElement)?.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: indicators', async () => {
		// @ts-ignore
		const instance = new KTourSlotsIndicators({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: footer', async () => {
		// @ts-ignore
		const instance = new KTourSlotsFooter({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
		const prev = document.querySelector('#bwsy_prev');
		(prev as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
		const next = document.querySelector('#bwsy_next');
		(next as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: nextButton & prevButton', async () => {
		// @ts-ignore
		const instance = new KTourSlotsBtn({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
		const prev = document.querySelector('#bwsy_prev');
		(prev as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
		const next = document.querySelector('#bwsy_next');
		(next as HTMLButtonElement)?.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});
});
