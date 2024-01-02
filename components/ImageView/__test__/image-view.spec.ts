import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KImageView from '../src';
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

describe('Test: KImageView', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				cls: 'k-image-view--test',
				show: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-image-view--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('basic render', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: close', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		//@ts-ignore
		instance.$on('close', mockFn);
		const closeBtn = host.querySelector('.k-image-view--close');
		closeBtn.click();
		await tick();
		expect(mockFn).toBeCalled();
	});

	test('flip image horizontally', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('.i-carbon-arrows-horizontal');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('flip image vertically', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('.i-carbon-arrows-vertical');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('rotate image left', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('.i-carbon-rotate-counterclockwise');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('rotate image right', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		const btn = host.querySelector('.i-carbon-rotate-clockwise');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('zoom in image', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		expect(
			host!.innerHTML.includes('i-carbon-zoom-out k-image-view--footer__icon__disabled')
		).toBeTruthy();
		const btn = host.querySelector('.i-carbon-zoom-in');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('zoom out image', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		expect(
			host!.innerHTML.includes('i-carbon-zoom-out k-image-view--footer__icon__disabled')
		).toBeTruthy();
		const btn = host.querySelector('.i-carbon-zoom-in');
		btn.click();
		await tick();
		expect(
			host!.innerHTML.includes('i-carbon-zoom-out k-image-view--footer__icon__disabled')
		).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();

		const outBtn = host.querySelector('.i-carbon-zoom-out');
		outBtn.click();
		await tick();
		expect(
			host!.innerHTML.includes('i-carbon-zoom-out k-image-view--footer__icon__disabled')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('page turning image', async () => {
		//@ts-ignore
		const instance = new KImageView({
			target: host,
			props: {
				show: true,
				urls: [
					'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
					'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg'
				]
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		const btn = host.querySelector('.i-carbon-chevron-right');
		btn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
		const outBtn = host.querySelector('.i-carbon-chevron-left');
		outBtn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});
});
