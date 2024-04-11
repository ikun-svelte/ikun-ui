import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KCarousel from '../src';
import KCarouselInit from './fixture/init.svelte';
import KCarouselTriggerClick from './fixture/trigger.click.svelte';
import KCarouselTriggerHover from './fixture/trigger.hover.svelte';
import KCarouselAlways from './fixture/arrow.always.svelte';
import KCarouselHover from './fixture/arrow.hover.svelte';
import KCarouselNever from './fixture/arrow.never.svelte';
import KCarouselLoop from './fixture/loop.svelte';
import KCarouselPlay from './fixture/play.svelte';
import KCarouselApiNext from './fixture/api.next.svelte';
import KCarouselApiPrev from './fixture/api.prev.svelte';
import KCarouselApiGoto from './fixture/api.goto.svelte';
import KCarouselEvtApi from './fixture/event.api.svelte';
import KCarouselEvt from './fixture/event.svelte';
import KCarouselEvtPlay from './fixture/event.play.svelte';
import KCarouselCustom from './fixture/custom.svelte';
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
	vi.restoreAllMocks();
});

describe('Test: KCarousel', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KCarousel({
			target: host,
			props: {
				count: 3,
				initialIndex: 0,
				cls: 'k-carousel--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-carousel--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: initialIndex', async () => {
		// @ts-ignore
		const instance = new KCarouselInit({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: trigger indicators click', async () => {
		// @ts-ignore
		const instance = new KCarouselTriggerClick({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const indicatorsElms = host.querySelectorAll('.k-indicators-item');
		indicatorsElms[2].click();
		await tick();
		expect(host.querySelector('[data-active="2"]')).toBeTruthy();
	});

	test('props: trigger indicators hover', async () => {
		// @ts-ignore
		const instance = new KCarouselTriggerHover({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const indicatorsElms = host.querySelectorAll('.k-indicators-item');
		indicatorsElms[2].dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		expect(host.querySelector('[data-active="2"]')).toBeTruthy();
	});

	test('props: arrow is always', async () => {
		// @ts-ignore
		const instance = new KCarouselAlways({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-prev')).toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-next')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: arrow is hover', async () => {
		// @ts-ignore
		const instance = new KCarouselHover({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-prev')).not.toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-next')).not.toBeTruthy();
		const carouselElm = host.querySelector('.k-carousel');
		carouselElm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		expect(host.querySelector('.k-carousel-arrow-prev')).toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-next')).toBeTruthy();
	});

	test('props: arrow is never', async () => {
		// @ts-ignore
		const instance = new KCarouselNever({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-prev')).not.toBeTruthy();
		expect(host.querySelector('.k-carousel-arrow-next')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: loop', async () => {
		// @ts-ignore
		const instance = new KCarouselLoop({
			target: host
		});
		expect(instance).toBeTruthy();
		const carouselElm1 = host.querySelector('[test-id="loop_open"]');
		const carouselElm2 = host.querySelector('[test-id="loop_close"]');
		expect(carouselElm1.querySelector('[data-active="2"]')).toBeTruthy();
		expect(carouselElm2.querySelector('[data-active="2"]')).toBeTruthy();

		const nextBtn1 = carouselElm1.querySelector('.k-carousel-arrow-next');
		const nextBtn2 = carouselElm2.querySelector('.k-carousel-arrow-next');
		nextBtn1.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(carouselElm1.querySelector('[data-active="0"]')).toBeTruthy();
		nextBtn2.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(carouselElm2.querySelector('[data-active="2"]')).toBeTruthy();

		const prevBtn1 = carouselElm1.querySelector('.k-carousel-arrow-prev');
		prevBtn1.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(carouselElm1.querySelector('[data-active="2"]')).toBeTruthy();
	});

	test('props: autoplay & interval & pauseOnHover', async () => {
		// @ts-ignore
		const instance = new KCarouselPlay({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelector('[data-active="2"]')).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelector('[data-active="0"]')).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();

		const carouselElm = host.querySelector('.k-carousel');
		carouselElm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(600);
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
	});

	test('api: goto', async () => {
		// @ts-ignore
		const instance = new KCarouselApiGoto({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const btn = host.querySelector('button');
		btn.click();
		await tick();
		expect(host.querySelector('[data-active="2"]')).toBeTruthy();
	});

	test('api: prev', async () => {
		// @ts-ignore
		const instance = new KCarouselApiPrev({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const btn = host.querySelector('button');
		btn.click();
		await tick();
		expect(host.querySelector('[data-active="0"]')).toBeTruthy();
	});

	test('api: next', async () => {
		// @ts-ignore
		const instance = new KCarouselApiNext({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const btn = host.querySelector('button');
		btn.click();
		await tick();
		expect(host.querySelector('[data-active="2"]')).toBeTruthy();
	});
	test('event: change event caused by arrow and indicators', async () => {
		// @ts-ignore
		const instance = new KCarouselEvt({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('[data-active="1"]')).toBeTruthy();
		const indicatorsElms = host.querySelectorAll('.k-indicators-item');
		indicatorsElms[2].click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":2,"oldIndex":1}');
		const nextBtn = host.querySelector('.k-carousel-arrow-next');
		nextBtn.click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":1,"oldIndex":2}');
		const prevBtn = host.querySelector('.k-carousel-arrow-prev');
		prevBtn.click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":2,"oldIndex":1}');
	});

	test('event: change event caused by auto play', async () => {
		// @ts-ignore
		const instance = new KCarouselEvtPlay({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).toMatchSnapshot('{"index":2,"oldIndex":1}');
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).toMatchSnapshot('{"index":1,"oldIndex":2}');
	});

	test('event: change event caused by api', async () => {
		// @ts-ignore
		const instance = new KCarouselEvtApi({
			target: host
		});
		expect(instance).toBeTruthy();
		const btnGoto = host.querySelector('#btn_goto');
		btnGoto.click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":2,"oldIndex":1}');

		const btnNext = host.querySelector('#btn_next');
		btnNext.click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":0,"oldIndex":2}');

		const btnPrev = host.querySelector('#btn_prev');
		btnPrev.click();
		await tick();
		expect(host.innerHTML).toMatchSnapshot('{"index":2,"oldIndex":0}');
	});

	test('slot: custom arrow indicators ', async () => {
		// @ts-ignore
		const instance = new KCarouselCustom({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
